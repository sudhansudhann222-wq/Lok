import React from 'react';

export default function CreatorToolbar({
  onGoToScreen4,
  onOpenCaptionEditor,
  onOpenSupabaseModal,
  isPreviewingAsLoukya,
  onTogglePreview,
  onLock
}) {
  return (
    <div
      id="creatorToolbar"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900/95 backdrop-blur-md text-white px-4 py-2.5 rounded-full shadow-2xl border border-rose-500/40 flex items-center gap-2.5 sm:gap-3 text-xs sm:text-sm font-sans max-w-[95vw] overflow-x-auto transition-all duration-300 animate-slide-up"
    >
      <span className="flex items-center gap-1.5 text-rose-400 font-bold font-display whitespace-nowrap">
        <i className="fa-solid fa-crown text-amber-400 animate-bounce"></i>
        <span>Creator Studio</span>
      </span>

      <div className="h-4 w-px bg-slate-700"></div>

      <button
        onClick={onGoToScreen4}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-600/90 hover:bg-rose-500 text-white font-medium shadow whitespace-nowrap transition cursor-pointer"
        title="Go to Cake, Gallery Frames & Scratch Cards"
      >
        <i className="fa-solid fa-camera"></i>
        <span>Upload Photos (Screen 4)</span>
      </button>

      <button
        onClick={onOpenCaptionEditor}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-600/90 hover:bg-amber-500 text-white font-medium shadow whitespace-nowrap transition cursor-pointer"
        title="Edit Card Captions, Birthday Notes & Messages"
      >
        <i className="fa-solid fa-pen-to-square"></i>
        <span>Edit Captions ✍️</span>
      </button>

      <button
        onClick={onOpenSupabaseModal}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white font-medium shadow whitespace-nowrap transition cursor-pointer"
      >
        <i className="fa-solid fa-cloud"></i>
        <span className="hidden sm:inline">Supabase</span> Storage
      </button>

      <button
        onClick={onTogglePreview}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-600/90 hover:bg-indigo-500 text-white font-medium shadow whitespace-nowrap transition cursor-pointer"
      >
        <i className={`fa-solid ${isPreviewingAsLoukya ? 'fa-eye-slash' : 'fa-eye'}`}></i>
        <span>{isPreviewingAsLoukya ? 'Exit Loukya View' : 'Preview as Loukya'}</span>
      </button>

      <button
        onClick={onLock}
        className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-rose-500/20 hover:bg-rose-500/40 text-rose-300 font-medium whitespace-nowrap transition cursor-pointer"
        title="Lock Creator Studio"
      >
        <i className="fa-solid fa-lock"></i>
        <span className="hidden sm:inline">Lock</span>
      </button>
    </div>
  );
}
