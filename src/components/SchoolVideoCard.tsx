import React, { useState, useRef } from 'react';
import { Play, Pause, Maximize2, Volume2, VolumeX, Sparkles, Video as VideoIcon } from 'lucide-react';
import { SchoolMediaItem } from '../types';

interface SchoolVideoCardProps {
  media: SchoolMediaItem;
}

export const SchoolVideoCard: React.FC<SchoolVideoCardProps> = ({ media }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <div className="group rounded-3xl overflow-hidden bg-white border border-[#9CAF88]/30 shadow-botanical-xs hover:shadow-botanical-md transition-all duration-300 flex flex-col">
      {/* Video Container */}
      <div
        onClick={togglePlay}
        className="relative aspect-video bg-black cursor-pointer overflow-hidden flex items-center justify-center select-none"
      >
        <video
          ref={videoRef}
          src={media.file_url}
          poster={media.thumbnail_url || undefined}
          preload="metadata"
          playsInline
          muted={isMuted}
          onEnded={() => setIsPlaying(false)}
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          className="w-full h-full object-contain"
        />

        {/* Video Overlay on Pause */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/35 backdrop-blur-[2px] flex items-center justify-center transition-all group-hover:bg-black/25">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#1E3A2B]/90 hover:bg-[#1E3A2B] text-white flex items-center justify-center shadow-xl border border-[#9CAF88]/40 transform group-hover:scale-110 transition-transform">
              <Play className="w-6 h-6 sm:w-7 sm:h-7 ml-1 fill-current text-[#FAF8F1]" />
            </div>
          </div>
        )}

        {/* Floating Category Badge */}
        <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-xs text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
          <VideoIcon className="w-3.5 h-3.5 text-[#C8A96B]" />
          <span>{media.category}</span>
        </div>

        {/* Live Published Badge */}
        <div className="absolute top-3.5 right-3.5 px-2.5 py-0.5 rounded-full bg-emerald-600/90 backdrop-blur-xs text-white text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-xs">
          <Sparkles className="w-3 h-3 text-[#FAF8F1]" />
          <span>Campus Video</span>
        </div>

        {/* Inline Bottom Floating Controls */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 opacity-90 hover:opacity-100 transition-opacity">
          <button
            type="button"
            onClick={toggleMute}
            className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
          <button
            type="button"
            onClick={handleFullscreen}
            className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-md cursor-pointer"
            title="Fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Video Card Meta */}
      <div className="p-5 bg-[#FAF8F1] flex-1 flex flex-col justify-between border-t border-[#9CAF88]/20 space-y-2">
        <div>
          <h4 className="font-serif-luxury text-base sm:text-lg font-bold text-[#1E3A2B] leading-snug">
            {media.title}
          </h4>
          {media.description && (
            <p className="text-xs text-[#1E3A2B]/70 font-sans leading-relaxed mt-1 line-clamp-2">
              {media.description}
            </p>
          )}
        </div>

        <div className="pt-2 flex items-center justify-between text-[11px] text-stone-500 font-sans border-t border-stone-200/50">
          <span className="flex items-center gap-1 font-medium text-[#1E3A2B]">
            <Play className="w-3 h-3 text-[#C8A96B] fill-current" />
            <span>Click card to {isPlaying ? 'pause' : 'play'}</span>
          </span>
          {media.created_at && (
            <span>
              {new Date(media.created_at).toLocaleDateString('en-IN', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
