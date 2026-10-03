import { SchoolMediaItem, MediaCategory, MediaType, MediaStatus } from '../types';
import { getBrowserSupabaseClient } from '../lib/supabase';

const BUCKET_NAME = 'school-media';
const PRIMARY_TABLE = 'media';
const FALLBACK_TABLE = 'school_media';

/**
 * Fetch all published media items for public viewing on the website.
 * Guaranteed to only return items with status = 'published'.
 */
export async function fetchPublishedMedia(): Promise<SchoolMediaItem[]> {
  const supabase = getBrowserSupabaseClient();
  if (!supabase) return [];

  // Try primary table first ('media')
  try {
    let { data, error } = await supabase
      .from(PRIMARY_TABLE)
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    // Fallback to 'school_media' if 'media' table is not found in schema cache
    if (error && (error.code === 'PGRST205' || error.message?.includes('schema cache'))) {
      const fb = await supabase
        .from(FALLBACK_TABLE)
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false });
      data = fb.data;
      error = fb.error;
    }

    if (error) {
      console.info('[MEDIA SERVICE] Public media fetch notice:', error.message);
      return [];
    }

    return (data || []).map(mapRowToMediaItem);
  } catch (err: any) {
    console.warn('[MEDIA SERVICE] Error fetching published media:', err?.message);
    return [];
  }
}

/**
 * Fetch all media items (both published & draft) for authenticated staff members.
 */
export async function fetchAllStaffMedia(): Promise<SchoolMediaItem[]> {
  const supabase = getBrowserSupabaseClient();
  if (!supabase) throw new Error('Supabase client is not available.');

  let { data, error } = await supabase
    .from(PRIMARY_TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error && (error.code === 'PGRST205' || error.message?.includes('schema cache'))) {
    const fb = await supabase
      .from(FALLBACK_TABLE)
      .select('*')
      .order('created_at', { ascending: false });
    data = fb.data;
    error = fb.error;
  }

  if (error) {
    console.error('[MEDIA SERVICE] Fetch all staff media error:', error);
    throw new Error(
      error.code === '42501'
        ? 'Permission denied: Please ensure you are logged in with authenticated staff permissions.'
        : `Could not load media items: ${error.message}`
    );
  }

  return (data || []).map(mapRowToMediaItem);
}

/**
 * Upload a media file (photo or video) to Supabase Storage.
 */
export async function uploadMediaToStorage(
  file: File
): Promise<{ fileUrl: string; filePath: string; mediaType: MediaType }> {
  const supabase = getBrowserSupabaseClient();
  if (!supabase) throw new Error('Supabase client is not initialized.');

  // Validate session
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    throw new Error('Authentication required. Only authenticated staff can upload media.');
  }

  const isVideo = file.type.startsWith('video/') || /\.(mp4|webm|mov|m4v|ogg)$/i.test(file.name);
  const isImage = file.type.startsWith('image/') || /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(file.name);

  if (!isImage && !isVideo) {
    throw new Error('Unsupported file format. Please upload an image (.jpg, .png, .webp) or video (.mp4, .webm, .mov).');
  }

  const mediaType: MediaType = isVideo ? 'video' : 'photo';
  const folder = isVideo ? 'videos' : 'photos';

  // Sanitize file name
  const sanitizedName = file.name
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/-+/g, '-');
  const uniqueKey = `${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const filePath = `${folder}/${uniqueKey}_${sanitizedName}`;

  // Upload to Supabase Storage bucket
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type || (isVideo ? 'video/mp4' : 'image/jpeg'),
    });

  if (error) {
    console.error('[MEDIA SERVICE] Storage upload error:', error);
    if (error.message?.includes('Bucket not found') || (error as any).statusCode === '404') {
      throw new Error(
        `Storage bucket "${BUCKET_NAME}" does not exist yet. Please run the provided SQL script in the Supabase SQL Editor to initialize the storage bucket.`
      );
    }
    if (error.message?.includes('row-level security') || error.message?.includes('policy')) {
      throw new Error(
        `Storage RLS policy blocked the upload. Please ensure authenticated users have INSERT permission on bucket "${BUCKET_NAME}".`
      );
    }
    throw new Error(`Upload failed: ${error.message}`);
  }

  // Get public URL
  const { data: urlData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path);

  if (!urlData?.publicUrl) {
    throw new Error('Could not retrieve public URL for uploaded file.');
  }

  return {
    fileUrl: urlData.publicUrl,
    filePath: data.path,
    mediaType,
  };
}

/**
 * Save new media record into Supabase database
 */
export async function createMediaRecord(item: {
  title: string;
  description?: string;
  media_type: MediaType;
  category: MediaCategory;
  file_url: string;
  thumbnail_url?: string;
  status: MediaStatus;
}): Promise<SchoolMediaItem> {
  const supabase = getBrowserSupabaseClient();
  if (!supabase) throw new Error('Supabase client is not initialized.');

  const payload = {
    title: item.title.trim(),
    description: item.description?.trim() || null,
    media_type: item.media_type,
    category: item.category,
    file_url: item.file_url,
    thumbnail_url: item.thumbnail_url || null,
    status: item.status,
    updated_at: new Date().toISOString(),
  };

  let { data, error } = await supabase
    .from(PRIMARY_TABLE)
    .insert([payload])
    .select('*')
    .single();

  if (error && (error.code === 'PGRST205' || error.message?.includes('schema cache'))) {
    const fb = await supabase
      .from(FALLBACK_TABLE)
      .insert([payload])
      .select('*')
      .single();
    data = fb.data;
    error = fb.error;
  }

  if (error) {
    console.error('[MEDIA SERVICE] Create media record error:', error);
    if (error.code === '42501' || error.message?.includes('row-level security')) {
      throw new Error('Database RLS blocked the save operation. Please verify staff permissions.');
    }
    throw new Error(`Failed to save media record: ${error.message}`);
  }

  return mapRowToMediaItem(data);
}

/**
 * Update media status (publish / unpublish) or details
 */
export async function updateMediaRecord(
  id: string,
  updates: Partial<Pick<SchoolMediaItem, 'title' | 'description' | 'category' | 'status' | 'thumbnail_url'>>
): Promise<SchoolMediaItem> {
  const supabase = getBrowserSupabaseClient();
  if (!supabase) throw new Error('Supabase client is not initialized.');

  const payload: Record<string, any> = {
    ...updates,
    updated_at: new Date().toISOString(),
  };

  let { data, error } = await supabase
    .from(PRIMARY_TABLE)
    .update(payload)
    .eq('id', id)
    .select('*')
    .single();

  if (error && (error.code === 'PGRST205' || error.message?.includes('schema cache'))) {
    const fb = await supabase
      .from(FALLBACK_TABLE)
      .update(payload)
      .eq('id', id)
      .select('*')
      .single();
    data = fb.data;
    error = fb.error;
  }

  if (error) {
    console.error('[MEDIA SERVICE] Update media record error:', error);
    throw new Error(`Failed to update media: ${error.message}`);
  }

  return mapRowToMediaItem(data);
}

/**
 * Delete a media item from the database and storage
 */
export async function deleteMediaRecord(id: string, fileUrl?: string): Promise<boolean> {
  const supabase = getBrowserSupabaseClient();
  if (!supabase) throw new Error('Supabase client is not initialized.');

  // 1. Delete from database
  let { error } = await supabase.from(PRIMARY_TABLE).delete().eq('id', id);

  if (error && (error.code === 'PGRST205' || error.message?.includes('schema cache'))) {
    const fb = await supabase.from(FALLBACK_TABLE).delete().eq('id', id);
    error = fb.error;
  }

  if (error) {
    console.error('[MEDIA SERVICE] Delete media record error:', error);
    throw new Error(`Failed to delete media item: ${error.message}`);
  }

  // 2. Best-effort delete from storage bucket if fileUrl matches
  if (fileUrl && fileUrl.includes(`/${BUCKET_NAME}/`)) {
    try {
      const parts = fileUrl.split(`/${BUCKET_NAME}/`);
      if (parts[1]) {
        const filePath = decodeURIComponent(parts[1].split('?')[0]);
        await supabase.storage.from(BUCKET_NAME).remove([filePath]);
      }
    } catch (storageErr) {
      console.warn('[MEDIA SERVICE] Storage cleanup notice:', storageErr);
    }
  }

  return true;
}

function mapRowToMediaItem(r: any): SchoolMediaItem {
  return {
    id: String(r.id),
    title: r.title || 'Untitled Media',
    description: r.description || null,
    media_type: (r.media_type === 'video' ? 'video' : 'photo') as MediaType,
    category: (r.category || 'School Life') as MediaCategory,
    file_url: r.file_url || '',
    thumbnail_url: r.thumbnail_url || null,
    status: (r.status === 'draft' ? 'draft' : 'published') as MediaStatus,
    created_at: r.created_at || new Date().toISOString(),
    updated_at: r.updated_at || undefined,
  };
}
