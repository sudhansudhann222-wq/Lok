import React from 'react';
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
  return (
    <div className="w-full mb-12 sm:mb-16">
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
                        onChange={e => onUploadPhoto(e, `frameImg-${frame.id}`)}
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
    </div>
  );
}
