import React, { useState, useEffect, useRef } from 'react';
import {
  UploadCloud,
  Image as ImageIcon,
  Video as VideoIcon,
  CheckCircle2,
  AlertCircle,
  Trash2,
  Eye,
  EyeOff,
  Edit3,
  ExternalLink,
  RefreshCw,
  Search,
  Filter,
  X,
  Play,
  Pause,
  Sparkles,
  Calendar,
  Layers,
  FileCheck,
  Globe,
  Loader2,
  FolderOpen,
} from 'lucide-react';
import { SchoolMediaItem, MediaCategory, MediaType, MediaStatus } from '../../types';
import {
  fetchAllStaffMedia,
  uploadMediaToStorage,
  createMediaRecord,
  updateMediaRecord,
  deleteMediaRecord,
} from '../../services/mediaService';

interface StaffMediaHubProps {
  onMediaChanged?: () => void;
  onViewOnWebsite?: () => void;
}

const CATEGORIES: MediaCategory[] = [
  'Classroom',
  'Activities',
  'Events',
  'Celebrations',
  'School Life',
  'Other',
];

export const StaffMediaHub: React.FC<StaffMediaHubProps> = ({
  onMediaChanged,
  onViewOnWebsite,
}) => {
  // Media items state
  const [mediaList, setMediaList] = useState<SchoolMediaItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  // Success / Action feedback banner
  const [actionNotice, setActionNotice] = useState<{
    type: 'success' | 'error' | 'info';
    message: string;
  } | null>(null);

  // Form & Upload state
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<MediaType>('photo');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<MediaCategory>('Classroom');
  const [statusToSet, setStatusToSet] = useState<MediaStatus>('published');
  const [isDragOver, setIsDragOver] = useState(false);

  // Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'photo' | 'video'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Edit Modal State
  const [editingItem, setEditingItem] = useState<SchoolMediaItem | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCategory, setEditCategory] = useState<MediaCategory>('Classroom');
  const [editStatus, setEditStatus] = useState<MediaStatus>('published');
  const [isUpdating, setIsUpdating] = useState(false);

  // Delete Confirm Modal State
  const [deletingItem, setDeletingItem] = useState<SchoolMediaItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Preview Lightbox State
  const [previewMediaItem, setPreviewMediaItem] = useState<SchoolMediaItem | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-dismiss notices after 6 seconds
  useEffect(() => {
    if (!actionNotice) return;
    const timer = setTimeout(() => {
      setActionNotice(null);
    }, 6000);
    return () => clearTimeout(timer);
  }, [actionNotice]);

  // Load media on mount
  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    setIsLoading(true);
    setFetchError(null);
    try {
      const items = await fetchAllStaffMedia();
      setMediaList(items);
    } catch (err: any) {
      console.warn('Could not load media list:', err);
      setFetchError(err.message || 'Could not load media items.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle file drop / selection
  const handleFileSelect = (file: File) => {
    const isVideo = file.type.startsWith('video/') || /\.(mp4|webm|mov|m4v)$/i.test(file.name);
    const isPhoto = file.type.startsWith('image/') || /\.(jpg|jpeg|png|webp|gif)$/i.test(file.name);

    if (!isVideo && !isPhoto) {
      setActionNotice({
        type: 'error',
        message: 'Unsupported file format. Please upload a photo (JPG, PNG, WebP) or video (MP4, WebM, MOV).',
      });
      return;
    }

    // Revoke previous object URL if any
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const newPreviewUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(newPreviewUrl);
    setFileType(isVideo ? 'video' : 'photo');

    // Auto-fill title if empty from clean filename
    if (!title) {
      const cleanName = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[_-]+/g, ' ')
        .trim();
      const capitalized = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
      setTitle(capitalized);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleCancelUpload = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setTitle('');
    setDescription('');
    setCategory('Classroom');
    setStatusToSet('published');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle Form Submission: Upload to Supabase Storage -> Create DB Record
  const handleSubmitMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      setActionNotice({
        type: 'error',
        message: 'Please choose or drop a photo or video to upload.',
      });
      return;
    }

    if (!title.trim()) {
      setActionNotice({
        type: 'error',
        message: 'Please enter a title for this media item.',
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(20);

    try {
      // 1. Upload to Supabase Storage
      setUploadProgress(40);
      const { fileUrl, mediaType } = await uploadMediaToStorage(selectedFile);
      setUploadProgress(75);

      // 2. Insert into media database table
      const newRecord = await createMediaRecord({
        title: title.trim(),
        description: description.trim() || undefined,
        media_type: mediaType,
        category,
        file_url: fileUrl,
        thumbnail_url: mediaType === 'photo' ? fileUrl : undefined,
        status: statusToSet,
      });

      setUploadProgress(100);

      // 3. Update local state
      setMediaList((prev) => [newRecord, ...prev]);

      // 4. Show required success prompt
      if (statusToSet === 'published') {
        setActionNotice({
          type: 'success',
          message: 'Published successfully — this content is now live on the website.',
        });
      } else {
        setActionNotice({
          type: 'success',
          message: 'Upload successful (saved as Draft).',
        });
      }

      // Reset form
      handleCancelUpload();

      // Trigger sync callback
      if (onMediaChanged) {
        onMediaChanged();
      }
    } catch (err: any) {
      console.error('Upload process failed:', err);
      setActionNotice({
        type: 'error',
        message: err.message || 'Media upload failed. Please try again.',
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  // Quick toggle Publish / Unpublish
  const handleTogglePublish = async (item: SchoolMediaItem) => {
    const newStatus: MediaStatus = item.status === 'published' ? 'draft' : 'published';
    try {
      const updated = await updateMediaRecord(item.id, { status: newStatus });
      setMediaList((prev) => prev.map((m) => (m.id === item.id ? updated : m)));

      if (newStatus === 'published') {
        setActionNotice({
          type: 'success',
          message: 'Published successfully — this content is now live on the website.',
        });
      } else {
        setActionNotice({
          type: 'info',
          message: 'Content unpublished.',
        });
      }

      if (onMediaChanged) onMediaChanged();
    } catch (err: any) {
      setActionNotice({
        type: 'error',
        message: `Failed to update status: ${err.message}`,
      });
    }
  };

  // Open Edit Modal
  const handleOpenEdit = (item: SchoolMediaItem) => {
    setEditingItem(item);
    setEditTitle(item.title);
    setEditDescription(item.description || '');
    setEditCategory(item.category);
    setEditStatus(item.status);
  };

  // Save Edit
  const handleSaveEdit = async () => {
    if (!editingItem) return;
    if (!editTitle.trim()) {
      alert('Title cannot be empty');
      return;
    }

    setIsUpdating(true);
    try {
      const updated = await updateMediaRecord(editingItem.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || undefined,
        category: editCategory,
        status: editStatus,
      });

      setMediaList((prev) => prev.map((m) => (m.id === editingItem.id ? updated : m)));
      setEditingItem(null);

      if (editStatus === 'published') {
        setActionNotice({
          type: 'success',
          message: 'Published successfully — this content is now live on the website.',
        });
      } else {
        setActionNotice({
          type: 'info',
          message: 'Media details updated successfully.',
        });
      }

      if (onMediaChanged) onMediaChanged();
    } catch (err: any) {
      alert(`Update failed: ${err.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete Media
  const handleConfirmDelete = async () => {
    if (!deletingItem) return;
    setIsDeleting(true);

    try {
      await deleteMediaRecord(deletingItem.id, deletingItem.file_url);
      setMediaList((prev) => prev.filter((m) => m.id !== deletingItem.id));
      setDeletingItem(null);

      setActionNotice({
        type: 'info',
        message: 'Content deleted successfully.',
      });

      if (onMediaChanged) onMediaChanged();
    } catch (err: any) {
      alert(`Deletion failed: ${err.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtered media list
  const filteredList = mediaList.filter((item) => {
    if (filterType !== 'all' && item.media_type !== filterType) return false;
    if (filterStatus !== 'all' && item.status !== filterStatus) return false;
    if (filterCategory !== 'all' && item.category !== filterCategory) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description?.toLowerCase().includes(q);
      const matchCat = item.category.toLowerCase().includes(q);
      return matchTitle || matchDesc || matchCat;
    }
    return true;
  });

  const publishedCount = mediaList.filter((m) => m.status === 'published').length;
  const draftCount = mediaList.filter((m) => m.status === 'draft').length;
  const videoCount = mediaList.filter((m) => m.media_type === 'video').length;
  const photoCount = mediaList.filter((m) => m.media_type === 'photo').length;

  return (
    <div className="space-y-8">
      {/* Top Banner Notice */}
      {actionNotice && (
        <div
          className={`p-4 rounded-2xl border flex items-center justify-between gap-3 text-sm transition-all duration-300 shadow-sm ${
            actionNotice.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
              : actionNotice.type === 'error'
              ? 'bg-rose-50 text-rose-900 border-rose-300'
              : 'bg-amber-50 text-amber-900 border-amber-300'
          }`}
        >
          <div className="flex items-center gap-2.5 font-medium">
            {actionNotice.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : actionNotice.type === 'error' ? (
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            ) : (
              <Sparkles className="w-5 h-5 text-amber-600 shrink-0" />
            )}
            <span>{actionNotice.message}</span>
          </div>
          <button
            onClick={() => setActionNotice(null)}
            className="text-stone-400 hover:text-stone-700 p-1 rounded-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* SECTION 1: MEDIA UPLOAD FORM */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#9CAF88]/25 shadow-botanical-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E2E8E0] text-[#1E3A2B] text-xs font-bold uppercase tracking-wider mb-2">
              <UploadCloud className="w-3.5 h-3.5 text-[#1E3A2B]" />
              <span>Section 1 · Upload & Publish</span>
            </div>
            <h2 className="font-serif-luxury text-2xl font-bold text-[#1E3A2B]">
              Add Photo or Video to Website
            </h2>
            <p className="text-xs text-stone-500 font-sans mt-0.5">
              Upload photos and videos directly to Supabase Storage. Clicking Publish makes it instantly live on the public website.
            </p>
          </div>

          {onViewOnWebsite && (
            <button
              type="button"
              onClick={onViewOnWebsite}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-2xl bg-[#FAF8F1] hover:bg-[#FAF8F1]/80 text-[#1E3A2B] text-xs font-semibold border border-[#9CAF88]/40 transition-colors shadow-2xs self-start sm:self-auto cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-[#1E3A2B]" />
              <span>Preview Live Website</span>
              <ExternalLink className="w-3 h-3 text-stone-400" />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmitMedia} className="mt-6 space-y-6">
          {/* File Picker / Drag & Drop Area */}
          {!previewUrl ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-3 ${
                isDragOver
                  ? 'border-[#1E3A2B] bg-[#E2E8E0]/40 scale-[1.005]'
                  : 'border-[#9CAF88]/50 hover:border-[#1E3A2B] bg-[#FAF8F1]/50 hover:bg-[#FAF8F1]'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
                className="hidden"
              />

              <div className="w-14 h-14 rounded-2xl bg-[#E2E8E0] text-[#1E3A2B] flex items-center justify-center shadow-2xs">
                <UploadCloud className="w-7 h-7 stroke-[2]" />
              </div>

              <div>
                <p className="font-serif-luxury text-base sm:text-lg font-bold text-[#1E3A2B]">
                  Click to select or drag & drop media here
                </p>
                <p className="text-xs text-stone-500 font-sans mt-1">
                  Supports Photos (<span className="font-semibold text-stone-700">JPG, PNG, WebP</span>) and Videos (<span className="font-semibold text-stone-700">MP4, WebM, MOV</span>)
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2 text-[11px] text-stone-400">
                <span className="flex items-center gap-1">
                  <ImageIcon className="w-3 h-3" /> High Resolution Photos
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <VideoIcon className="w-3 h-3" /> Classroom & Event Videos
                </span>
              </div>
            </div>
          ) : (
            /* Media Preview Box Before Publishing */
            <div className="rounded-3xl border border-[#9CAF88]/30 bg-[#FAF8F1] p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-[#1E3A2B] text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                    {fileType === 'video' ? (
                      <>
                        <VideoIcon className="w-3 h-3" /> Video Preview
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-3 h-3" /> Photo Preview
                      </>
                    )}
                  </span>
                  <span className="text-xs text-stone-500 font-mono truncate max-w-[220px] sm:max-w-md">
                    {selectedFile?.name} ({(selectedFile ? selectedFile.size / (1024 * 1024) : 0).toFixed(1)} MB)
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleCancelUpload}
                  className="px-3 py-1 text-xs font-semibold text-rose-700 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Remove / Re-select</span>
                </button>
              </div>

              {/* Real-time Preview Element */}
              <div className="relative rounded-2xl overflow-hidden bg-black/5 border border-stone-200 aspect-video max-h-[360px] flex items-center justify-center">
                {fileType === 'video' ? (
                  <video
                    src={previewUrl}
                    controls
                    className="w-full h-full object-contain bg-black"
                  />
                ) : (
                  <img
                    src={previewUrl}
                    alt="Upload Preview"
                    className="w-full h-full object-contain"
                  />
                )}
              </div>
            </div>
          )}

          {/* Metadata Fields: Title, Category, Description, Status */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Title */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1E3A2B]">
                Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Annual Day Celebration 2026, Montessori Sensorial Discovery, Practical Life Pouring"
                required
                className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#1E3A2B]/10 outline-hidden font-sans text-sm text-[#1E3A2B] bg-[#FAF8F1]/40"
              />
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1E3A2B]">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as MediaCategory)}
                className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#1E3A2B]/10 outline-hidden font-sans text-sm text-[#1E3A2B] bg-white cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Status (Publish Immediately vs Draft) */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1E3A2B]">
                Visibility Status <span className="text-rose-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setStatusToSet('published')}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                    statusToSet === 'published'
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-400 shadow-2xs'
                      : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Publish Immediately</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStatusToSet('draft')}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                    statusToSet === 'draft'
                      ? 'bg-amber-100 text-amber-900 border-amber-400 shadow-2xs'
                      : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  <EyeOff className="w-3.5 h-3.5 text-amber-700" />
                  <span>Save as Draft</span>
                </button>
              </div>
            </div>

            {/* Description / Caption */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#1E3A2B]">
                Description / Caption <span className="text-stone-400 font-normal">(Optional)</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                placeholder="Briefly describe what parents and visitors will see in this photo or video..."
                className="w-full px-4 py-3 rounded-2xl border border-stone-200 focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#1E3A2B]/10 outline-hidden font-sans text-sm text-[#1E3A2B] bg-[#FAF8F1]/40"
              />
            </div>
          </div>

          {/* Upload Progress Bar */}
          {isUploading && (
            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-xs font-semibold text-[#1E3A2B]">
                <span className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[#1E3A2B]" />
                  Uploading {fileType} to Supabase Storage & Database...
                </span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-stone-100 overflow-hidden">
                <div
                  className="h-full bg-[#1E3A2B] transition-all duration-300 rounded-full"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex flex-wrap items-center justify-end gap-3 pt-3 border-t border-stone-100">
            {previewUrl && (
              <button
                type="button"
                onClick={handleCancelUpload}
                disabled={isUploading}
                className="px-5 py-2.5 rounded-2xl border border-stone-200 hover:bg-stone-50 text-stone-600 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={isUploading || !selectedFile}
              className={`px-7 py-3 rounded-2xl font-bold text-xs flex items-center gap-2 shadow-botanical-sm transition-all transform active:scale-95 cursor-pointer ${
                isUploading || !selectedFile
                  ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                  : statusToSet === 'published'
                  ? 'bg-[#1E3A2B] hover:bg-[#1E3A2B]/90 text-[#FAF8F1]'
                  : 'bg-[#C8A96B] hover:bg-[#b59556] text-[#1E3A2B]'
              }`}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing Upload...</span>
                </>
              ) : statusToSet === 'published' ? (
                <>
                  <Globe className="w-4 h-4" />
                  <span>Publish to Live Website</span>
                </>
              ) : (
                <>
                  <FileCheck className="w-4 h-4" />
                  <span>Save as Draft</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* SECTION 2: MEDIA MANAGEMENT LIST / GRID */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#9CAF88]/25 shadow-botanical-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E2E8E0] text-[#1E3A2B] text-xs font-bold uppercase tracking-wider mb-2">
              <Layers className="w-3.5 h-3.5 text-[#1E3A2B]" />
              <span>Section 2 · Media Management</span>
            </div>
            <h3 className="font-serif-luxury text-2xl font-bold text-[#1E3A2B]">
              Published & Draft Media ({mediaList.length})
            </h3>
            <p className="text-xs text-stone-500 font-sans mt-0.5">
              Items marked <span className="text-emerald-700 font-bold">Published</span> are live for parents and visitors. Items marked <span className="text-amber-700 font-bold">Draft</span> are hidden from the public.
            </p>
          </div>

          <button
            type="button"
            onClick={loadMedia}
            disabled={isLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-semibold text-stone-600 transition-colors self-start md:self-auto cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#1E3A2B]' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>

        {/* Quick Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-[#FAF8F1] border border-[#9CAF88]/20">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
              Total Media
            </span>
            <span className="font-serif-luxury text-xl font-bold text-[#1E3A2B]">
              {mediaList.length}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
              Live on Website
            </span>
            <span className="font-serif-luxury text-xl font-bold text-emerald-900">
              {publishedCount}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
              Drafts (Hidden)
            </span>
            <span className="font-serif-luxury text-xl font-bold text-amber-900">
              {draftCount}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 block">
              Videos / Photos
            </span>
            <span className="font-serif-luxury text-xl font-bold text-blue-900">
              {videoCount} <span className="text-xs font-normal text-stone-500">vids</span> / {photoCount} <span className="text-xs font-normal text-stone-500">pics</span>
            </span>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col md:flex-row gap-3 pt-2">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, description, category..."
              className="w-full pl-9 pr-4 py-2 rounded-2xl border border-stone-200 focus:border-[#1E3A2B] focus:ring-2 focus:ring-[#1E3A2B]/10 outline-hidden font-sans text-xs text-[#1E3A2B] bg-[#FAF8F1]/40"
            />
          </div>

          {/* Filter Type (All / Photos / Videos) */}
          <div className="flex items-center gap-1 bg-[#FAF8F1] p-1 rounded-2xl border border-stone-200 text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                filterType === 'all'
                  ? 'bg-[#1E3A2B] text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Types
            </button>
            <button
              onClick={() => setFilterType('photo')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                filterType === 'photo'
                  ? 'bg-[#1E3A2B] text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <ImageIcon className="w-3 h-3" /> Photos
            </button>
            <button
              onClick={() => setFilterType('video')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                filterType === 'video'
                  ? 'bg-[#1E3A2B] text-white shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <VideoIcon className="w-3 h-3" /> Videos
            </button>
          </div>

          {/* Filter Status (All / Published / Draft) */}
          <div className="flex items-center gap-1 bg-[#FAF8F1] p-1 rounded-2xl border border-stone-200 text-xs">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-2.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                filterStatus === 'all' ? 'bg-[#1E3A2B] text-white shadow-2xs' : 'text-stone-600'
              }`}
            >
              Status: All
            </button>
            <button
              onClick={() => setFilterStatus('published')}
              className={`px-2.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                filterStatus === 'published' ? 'bg-emerald-700 text-white shadow-2xs' : 'text-stone-600'
              }`}
            >
              Published
            </button>
            <button
              onClick={() => setFilterStatus('draft')}
              className={`px-2.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
                filterStatus === 'draft' ? 'bg-amber-700 text-white shadow-2xs' : 'text-stone-600'
              }`}
            >
              Drafts
            </button>
          </div>
        </div>

        {/* Media Grid */}
        {isLoading ? (
          <div className="py-16 text-center space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#1E3A2B] mx-auto" />
            <p className="text-xs text-stone-500 font-sans">
              Loading school media records from Supabase...
            </p>
          </div>
        ) : fetchError ? (
          <div className="p-6 rounded-3xl bg-amber-50 border border-amber-300 text-amber-900 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-sm">
              <AlertCircle className="w-4 h-4 text-amber-700" />
              <span>Media Database Setup Required</span>
            </div>
            <p>{fetchError}</p>
            <p className="text-[11px] text-amber-800">
              Please execute the provided Supabase migration SQL to initialize the <code>media</code> table and <code>school-media</code> storage bucket.
            </p>
          </div>
        ) : filteredList.length === 0 ? (
          <div className="py-16 text-center border-2 border-dashed border-stone-200 rounded-3xl space-y-3 bg-[#FAF8F1]/30">
            <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
              <FolderOpen className="w-6 h-6 stroke-1" />
            </div>
            <p className="font-serif-luxury text-base font-bold text-stone-700">
              {searchQuery || filterType !== 'all' || filterStatus !== 'all'
                ? 'No media matches your filter criteria'
                : 'No school media uploaded yet'}
            </p>
            <p className="text-xs text-stone-400 max-w-sm mx-auto">
              Use the upload area above to add your first photo or video. It will appear live on the public website immediately.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredList.map((item) => {
              const isVideo = item.media_type === 'video';
              const isPublished = item.status === 'published';

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border border-stone-200 hover:border-[#9CAF88]/60 shadow-2xs hover:shadow-botanical-sm transition-all overflow-hidden flex flex-col group"
                >
                  {/* Thumbnail / Video Preview Area */}
                  <div
                    onClick={() => setPreviewMediaItem(item)}
                    className="relative aspect-video bg-stone-900 cursor-pointer overflow-hidden flex items-center justify-center"
                  >
                    {isVideo ? (
                      <>
                        <video
                          src={item.file_url}
                          preload="metadata"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/25 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                          <div className="w-11 h-11 rounded-full bg-white/90 text-[#1E3A2B] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                            <Play className="w-5 h-5 ml-0.5 fill-current" />
                          </div>
                        </div>
                      </>
                    ) : (
                      <img
                        src={item.thumbnail_url || item.file_url}
                        alt={item.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}

                    {/* Type Badge Top Left */}
                    <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      {isVideo ? (
                        <>
                          <VideoIcon className="w-3 h-3 text-red-400" /> Video
                        </>
                      ) : (
                        <>
                          <ImageIcon className="w-3 h-3 text-blue-400" /> Photo
                        </>
                      )}
                    </span>

                    {/* Status Badge Top Right */}
                    <span
                      className={`absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-xs ${
                        isPublished
                          ? 'bg-emerald-600 text-white'
                          : 'bg-amber-500 text-white'
                      }`}
                    >
                      {isPublished ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" /> Published (Live)
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3 h-3" /> Draft
                        </>
                      )}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-[#FAF8F1] text-[#1E3A2B] font-semibold text-[10px] border border-[#9CAF88]/30">
                          {item.category}
                        </span>
                        {item.created_at && (
                          <span className="text-[10px] text-stone-400 flex items-center gap-1 ml-auto">
                            <Calendar className="w-3 h-3" />
                            {new Date(item.created_at).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </span>
                        )}
                      </div>

                      <h4 className="font-serif-luxury text-base font-bold text-[#1E3A2B] line-clamp-1">
                        {item.title}
                      </h4>

                      {item.description && (
                        <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {/* Card Actions: Toggle Publish, Edit, Delete */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2">
                      {/* Publish / Unpublish Toggle */}
                      <button
                        type="button"
                        onClick={() => handleTogglePublish(item)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                          isPublished
                            ? 'bg-stone-100 hover:bg-amber-100 text-stone-700 hover:text-amber-900'
                            : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900'
                        }`}
                        title={isPublished ? 'Unpublish from website' : 'Make live on website'}
                      >
                        {isPublished ? (
                          <>
                            <EyeOff className="w-3 h-3" />
                            <span>Unpublish</span>
                          </>
                        ) : (
                          <>
                            <Globe className="w-3 h-3" />
                            <span>Publish Live</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-1">
                        {/* Edit Button */}
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(item)}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-[#1E3A2B] hover:bg-stone-100 transition-colors cursor-pointer"
                          title="Edit Title & Category"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>

                        {/* Preview in modal */}
                        <button
                          type="button"
                          onClick={() => setPreviewMediaItem(item)}
                          className="p-1.5 rounded-lg text-stone-500 hover:text-[#1E3A2B] hover:bg-stone-100 transition-colors cursor-pointer"
                          title="Preview Media"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => setDeletingItem(item)}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Delete from school media"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* EDIT MODAL */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-botanical-xl border border-[#9CAF88]/30 max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="font-serif-luxury text-lg font-bold text-[#1E3A2B]">
                Edit Media Item
              </h3>
              <button
                onClick={() => setEditingItem(null)}
                className="text-stone-400 hover:text-stone-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 block">Title</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm outline-hidden focus:border-[#1E3A2B]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 block">Category</label>
                <select
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value as MediaCategory)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm outline-hidden focus:border-[#1E3A2B]"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 block">Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as MediaStatus)}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm outline-hidden focus:border-[#1E3A2B]"
                >
                  <option value="published">Published (Visible on public website)</option>
                  <option value="draft">Draft (Hidden from public website)</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700 block">Description</label>
                <textarea
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 text-sm outline-hidden focus:border-[#1E3A2B]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
              <button
                type="button"
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEdit}
                disabled={isUpdating}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#1E3A2B] text-white hover:bg-[#1E3A2B]/90 flex items-center gap-1.5"
              >
                {isUpdating ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-botanical-xl border border-rose-200 max-w-md w-full p-6 space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6 stroke-[2]" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="font-serif-luxury text-lg font-bold text-stone-900">
                Delete Media Item?
              </h3>
              <p className="text-xs text-stone-500 font-sans leading-relaxed">
                Are you sure you want to permanently delete <strong className="text-stone-800">"{deletingItem.title}"</strong>? This will remove it from both the Staff Portal and the public website.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeletingItem(null)}
                disabled={isDeleting}
                className="px-4 py-2.5 rounded-xl border border-stone-200 text-xs font-bold text-stone-600 hover:bg-stone-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white flex items-center gap-1.5"
              >
                {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                <span>Yes, Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PREVIEW LIGHTBOX MODAL */}
      {previewMediaItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative max-w-4xl w-full bg-[#1E3A2B] rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-4 bg-black/30 flex items-center justify-between text-white border-b border-white/10">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C8A96B] block">
                  {previewMediaItem.category} • {previewMediaItem.media_type.toUpperCase()}
                </span>
                <h4 className="font-serif-luxury text-base font-bold text-[#FAF8F1]">
                  {previewMediaItem.title}
                </h4>
              </div>
              <button
                onClick={() => setPreviewMediaItem(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 bg-black/40 flex items-center justify-center overflow-auto flex-1">
              {previewMediaItem.media_type === 'video' ? (
                <video
                  src={previewMediaItem.file_url}
                  controls
                  autoPlay
                  className="max-h-[65vh] w-auto rounded-xl shadow-lg"
                />
              ) : (
                <img
                  src={previewMediaItem.file_url}
                  alt={previewMediaItem.title}
                  className="max-h-[65vh] w-auto object-contain rounded-xl shadow-lg"
                />
              )}
            </div>

            {previewMediaItem.description && (
              <div className="p-4 bg-black/50 text-xs text-[#FAF8F1]/80 font-sans border-t border-white/10">
                {previewMediaItem.description}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
