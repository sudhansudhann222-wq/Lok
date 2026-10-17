import React, { useState } from 'react';
import { FRAMES_LIST } from '../config/defaultData';

export default function CakeFeedingGallery({
  photos,
  captions,
  cakeServedState,
  onServeOne,
  isCreatorMode,
  onUploadPhoto,
  onEditFrame
}) {
  // View mode: 'one-by-one' (default requested by user) or 'grid'
  const [viewMode, setViewMode] = useState('one-by-one');
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentFrame = FRAMES_LIST[currentIndex];
  const isCurrentFed = cakeServedState[currentIndex];
  const currentFrameData = (captions.frames && captions.frames[currentFrame.id]) || {};
  const currentPhotoUrl = photos[`frameImg-${currentFrame.id}`] || `/sudhan%20and%20lok.jpg`;

  function handlePrev() {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : FRAMES_LIST.length - 1));
  }

  function handleNext() {
    setCurrentIndex((prev) => (prev < FRAMES_LIST.length - 1 ? prev + 1 : 0));
  }

  function handleFeedAndNext(index) {
    onServeOne(index);
    // Smoothly auto advance after feeding to make feeding one by one exciting!
    if (currentIndex < FRAMES_LIST.length - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => (prev < FRAMES_LIST.length - 1 ? prev + 1 : prev));
      }, 900);
    }
  }

  return (
    <div className="w-full mb-12 sm:mb-16 flex flex-col items-center">
      {/* Gallery Header with View Mode Switcher */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 max-w-4xl px-2">
        <div className="text-center sm:text-left">
          <span className="inline-block px-3.5 py-1 rounded-full bg-purple-100 text-purple-700 font-display text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-1">
            🍰 Cake Feeding Moments
          </span>
          <h2 className="font-display text-lg sm:text-2xl font-bold text-slate-800">
            Loukya & Friends Cake Feeding Gallery 🎂✨
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Feed delicious cake to all 9 wonderful friends one by one!
          </p>
        </div>

        {/* View Mode Toggle Button */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/80 border border-rose-200 shadow-sm shrink-0">
          <button
            type="button"
            onClick={() => setViewMode('one-by-one')}
            className={`px-3 py-1.5 rounded-xl font-display font-semibold text-xs transition cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'one-by-one'
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🎴</span>
            <span>One by One</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded-xl font-display font-semibold text-xs transition cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'grid'
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>⊞</span>
            <span>View All Grid</span>
          </button>
        </div>
      </div>

      {/* ==============================================================
          ONE BY ONE SHOWCASE MODE (Default)
          ============================================================== */}
      {viewMode === 'one-by-one' && (
        <div className="w-full max-w-lg mx-auto flex flex-col items-center">
          {/* Quick Step Indicator */}
          <div className="flex items-center justify-between w-full px-4 mb-3 text-xs font-display font-bold text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs">
                {currentIndex + 1}
              </span>
              <span>of {FRAMES_LIST.length} Friends</span>
            </span>

            <span className="text-rose-600 truncate max-w-[200px]">
              {currentFrameData.title || `Friend #${currentIndex + 1}`}
            </span>
          </div>

          {/* Pre-rendered Card Deck (All 9 frames preloaded in DOM for 0ms instant display) */}
          {FRAMES_LIST.map((frame, index) => {
            const isFed = cakeServedState[index];
            const frameData = (captions.frames && captions.frames[frame.id]) || {};
            const photoUrl = photos[`frameImg-${frame.id}`] || `/sudhan%20and%20lok.jpg`;
            const isSelected = index === currentIndex;

            return (
              <div
                key={frame.id}
                className={`${
                  isSelected ? 'block animate-fade-in' : 'hidden'
                } bg-white p-4 sm:p-5 pb-5 rounded-3xl shadow-2xl border-2 border-rose-200 w-full transition-all duration-300 relative ${
                  isFed ? 'frame-fed-active' : ''
                }`}
              >
                {/* Header Badge */}
                <div
                  className={`bg-gradient-to-r ${frame.gradient} text-white text-xs sm:text-sm font-display font-bold px-4 py-1.5 rounded-full shadow text-center mb-3 flex items-center justify-center gap-2`}
                >
                  <span>{frameData.title || `Frame ${frame.id}`}</span>
                  {isCreatorMode && (
                    <button
                      type="button"
                      onClick={() => onEditFrame(`frame-${frame.id}`)}
                      className="opacity-80 hover:opacity-100 transition cursor-pointer ml-1"
                      title="Edit Frame Caption"
                    >
                      <i className="fa-solid fa-pen text-xs"></i>
                    </button>
                  )}
                </div>

                {/* Photo Container */}
                <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-rose-50 relative border border-slate-100 shadow-inner">
                  {isFed && (
                    <div className="absolute top-3 left-3 z-10 px-3 py-1.5 rounded-full bg-white/95 text-rose-600 font-display font-bold text-xs shadow-lg border border-rose-200 flex items-center gap-1.5 animate-bounce">
                      <span>🍰 Fed!</span>
                    </div>
                  )}

                  <img
                    id={`frameImg-${frame.id}`}
                    src={photoUrl}
                    alt={frameData.title || 'Friend Photo'}
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                  />

                  {isCreatorMode && (
                    <label
                      className="cursor-pointer absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-white/95 hover:bg-rose-600 text-rose-600 hover:text-white flex items-center gap-1.5 shadow-md text-xs font-semibold transition"
                      title="Upload Photo"
                    >
                      <i className="fa-solid fa-camera"></i>
                      <span>Change Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => onUploadPhoto(e, `frameImg-${frame.id}`)}
                      />
                    </label>
                  )}
                </div>

                {/* Subtitle */}
                <p className="font-display font-bold text-sm sm:text-base text-slate-800 mt-3 text-center truncate">
                  {frameData.subtitle || ''}
                </p>

                {/* Cake Serving Action Area */}
                <div className="mt-3 pt-3 border-t border-slate-100 flex flex-col items-center w-full">
                  {!isFed ? (
                    <button
                      onClick={() => handleFeedAndNext(index)}
                      className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-display font-bold text-xs sm:text-sm shadow-md hover:scale-[1.02] active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>🍰</span>
                      <span>{frame.label} ✨</span>
                    </button>
                  ) : (
                    <div className="w-full flex flex-col items-center gap-1.5 animate-fade-in">
                      <div className="w-full py-1 px-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-display font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm">
                        <span>🍰 Fed Delicious Cake! ✨</span>
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-slate-700 italic text-center px-2 leading-relaxed">
                        "{frameData.quote || ''}"
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Previous / Next Controls */}
          <div className="flex items-center justify-between w-full mt-4 gap-3 px-1">
            <button
              onClick={handlePrev}
              className="flex-1 py-2.5 px-4 rounded-2xl bg-white hover:bg-rose-50 text-slate-700 font-display font-bold text-xs sm:text-sm border border-slate-200 shadow-sm transition hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>⬅</span>
              <span>Previous Friend</span>
            </button>

            <button
              onClick={handleNext}
              className="flex-1 py-2.5 px-4 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-display font-bold text-xs sm:text-sm shadow-md transition hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Next Friend</span>
              <span>➔</span>
            </button>
          </div>

          {/* Dot / Avatar Strip for Quick Jumping to Any Friend */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-4 flex-wrap max-w-full px-2">
            {FRAMES_LIST.map((f, idx) => {
              const isSelected = idx === currentIndex;
              const isFed = cakeServedState[idx];

              return (
                <button
                  key={f.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full font-display font-bold text-[10px] sm:text-xs transition flex items-center justify-center cursor-pointer shadow-sm ${
                    isSelected
                      ? 'bg-rose-600 text-white scale-110 ring-2 ring-rose-300'
                      : isFed
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                      : 'bg-white hover:bg-rose-50 text-slate-600 border border-slate-200'
                  }`}
                  title={`${f.label} (${isFed ? 'Fed' : 'Pending'})`}
                >
                  {isFed ? '🍰' : idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ==============================================================
          GRID VIEW MODE (Optional full overview)
          ============================================================== */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch justify-items-center w-full">
          {FRAMES_LIST.map((frame, index) => {
            const isFed = cakeServedState[index];
            const frameData = (captions.frames && captions.frames[frame.id]) || {};
            const photoUrl = photos[`frameImg-${frame.id}`] || `/sudhan%20and%20lok.jpg`;

            return (
              <div
                key={frame.id}
                className={`bg-white p-3 sm:p-3.5 pb-3.5 sm:pb-4 rounded-2xl shadow-xl border-2 border-rose-200 w-full max-w-xs flex flex-col justify-between transition duration-300 ${
                  isFed ? 'frame-fed-active' : ''
                }`}
              >
                <div>
                  {/* Header Title with Edit Icon */}
                  <div
                    className={`bg-gradient-to-r ${frame.gradient} text-white text-[10px] font-display font-bold px-3 py-1 rounded-full shadow text-center mb-2 flex items-center justify-center gap-1.5`}
                  >
                    <span>{frameData.title || `Frame ${frame.id}`}</span>
                    {isCreatorMode && (
                      <button
                        type="button"
                        onClick={() => onEditFrame(`frame-${frame.id}`)}
                        className="opacity-80 hover:opacity-100 transition cursor-pointer"
                        title="Edit Frame Caption"
                      >
                        <i className="fa-solid fa-pen text-[9px]"></i>
                      </button>
                    )}
                  </div>

                  {/* Photo Frame */}
                  <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-rose-50 relative border border-slate-100">
                    {isFed && (
                      <div className="absolute top-2 left-2 z-10 px-2.5 py-1 rounded-full bg-white/95 text-rose-600 font-display font-bold text-[10px] sm:text-[11px] shadow-lg border border-rose-200 flex items-center gap-1 animate-bounce">
                        🍰 Fed!
                      </div>
                    )}

                    <img
                      id={`frameImg-${frame.id}`}
                      src={photoUrl}
                      alt={frameData.title || 'Friend Photo'}
                      className="w-full h-full object-cover"
                    />

                    {isCreatorMode && (
                      <label
                        className="cursor-pointer absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-white/95 hover:bg-rose-600 text-rose-600 hover:text-white flex items-center gap-1 shadow-md text-[11px] font-semibold transition"
                        title="Upload Photo"
                      >
                        <i className="fa-solid fa-camera"></i>
                        <span>Add</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => onUploadPhoto(e, `frameImg-${frame.id}`)}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Subtitle */}
                <p className="font-display font-bold text-xs sm:text-sm text-slate-700 mt-2 text-center truncate">
                  {frameData.subtitle || ''}
                </p>

                {/* Cake Serving Action Box */}
                <div className="mt-2 pt-2 border-t border-slate-100 flex flex-col items-center w-full">
                  {!isFed ? (
                    <button
                      onClick={() => onServeOne(index)}
                      className="w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-display font-bold text-[11px] sm:text-xs shadow-md hover:scale-[1.02] active:scale-95 transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>🍰</span>
                      <span>{frame.label}</span>
                    </button>
                  ) : (
                    <div className="w-full flex flex-col items-center gap-1 animate-fade-in">
                      <div className="w-full py-0.5 px-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 font-display font-bold text-[10px] sm:text-[11px] flex items-center justify-center gap-1 shadow-sm">
                        <span>🍰 Fed Delicious Cake! ✨</span>
                      </div>
                      <p className="font-sans text-[10px] sm:text-[11px] text-slate-700 italic text-center px-1 leading-snug">
                        {frameData.quote || ''}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
