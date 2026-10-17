import React from 'react';
import { playCandleBlowSound } from '../services/audioService';

export default function CandlePolaroids({
  photos,
  blownCandles,
  setBlownCandles,
  isCreatorMode,
  onUploadPhoto
}) {
  const candles = [
    {
      index: 0,
      id: 'candleImg-0',
      label: '✨ Loukya',
      theme: 'rose',
      rotate: '-2deg',
      flameColor: 'from-amber-300 via-rose-500 to-amber-200'
    },
    {
      index: 1,
      id: 'candleImg-1',
      label: '👑 Loukya',
      theme: 'purple',
      rotate: '1deg',
      flameColor: 'from-amber-300 via-pink-500 to-purple-400'
    },
    {
      index: 2,
      id: 'candleImg-2',
      label: '💖 Loukya',
      theme: 'amber',
      rotate: '2deg',
      flameColor: 'from-yellow-300 via-amber-500 to-rose-400'
    }
  ];

  function handleCandleClick(idx) {
    if (blownCandles[idx] && !isCreatorMode) return;
    playCandleBlowSound();
    setBlownCandles(prev => {
      const next = [...prev];
      next[idx] = true;
      return next;
    });
  }

  return (
    <div className="flex flex-col items-center mb-6 sm:mb-8">
      <div className="flex items-end justify-center gap-3 sm:gap-6 md:gap-8 max-w-lg mx-auto w-full px-2">
        {candles.map(c => {
          const isBlown = blownCandles[c.index] || isCreatorMode;
          const photoUrl = photos[c.id] || `/sudhan%20and%20lok.jpg`;

          return (
            <div key={c.index} className="flex flex-col items-center">
              {/* Flame / Blow Interactivity */}
              <button
                type="button"
                onClick={() => handleCandleClick(c.index)}
                className={`mb-2 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-display font-semibold transition cursor-pointer flex items-center gap-1 shadow-sm ${
                  isBlown
                    ? 'bg-slate-100 text-slate-500 opacity-80'
                    : 'bg-amber-100 hover:bg-amber-200 text-amber-700 animate-pulse'
                }`}
                title={isBlown ? 'Candle Wish Blown!' : 'Tap to Make a Wish & Blow Flame!'}
              >
                <span>{isBlown ? '💨' : '🕯️'}</span>
                <span>{isBlown ? 'Wish Made ✨' : 'Blow Flame'}</span>
              </button>

              {/* Polaroid Photo Card */}
              <div
                style={{ transform: `rotate(${c.rotate})` }}
                className="bg-white p-1.5 pb-2.5 sm:p-2 sm:pb-3 rounded-2xl shadow-xl border-2 border-slate-100 w-24 sm:w-32 md:w-36 transition hover:scale-105 duration-300"
              >
                <div className="aspect-square w-full rounded-xl overflow-hidden bg-rose-50 relative border border-slate-100">
                  <img
                    id={c.id}
                    src={photoUrl}
                    alt={c.label}
                    className="w-full h-full object-cover"
                  />

                  {isCreatorMode && (
                    <label
                      className="cursor-pointer absolute bottom-1 right-1 w-6 h-6 rounded-full bg-white/95 hover:bg-rose-500 text-rose-600 hover:text-white flex items-center justify-center shadow text-xs transition"
                      title="Upload Photo"
                    >
                      <i className="fa-solid fa-camera"></i>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => onUploadPhoto(e, c.id)}
                      />
                    </label>
                  )}
                </div>
                <p className="font-display font-bold text-[10px] sm:text-xs text-center text-slate-700 mt-1.5 truncate">
                  {c.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
