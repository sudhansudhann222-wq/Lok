import React, { useState } from 'react';
import { playCakeSliceSound } from '../services/audioService';

export default function BirthdayCake({ isCut, onCutCake, onRelight }) {
  const [knifePosition, setKnifePosition] = useState(0);

  function handleCut() {
    if (isCut) return;
    playCakeSliceSound();
    onCutCake();
  }

  return (
    <div className="flex flex-col items-center mb-8 sm:mb-12">
      {/* Interactive Birthday Cake Container */}
      <div className="relative w-64 sm:w-80 h-60 sm:h-72 flex flex-col items-center justify-end select-none">
        {/* Knife Drag Visual */}
        <div
          onClick={handleCut}
          className={`absolute top-0 z-30 transition-all duration-700 cursor-pointer ${
            isCut ? 'translate-y-48 rotate-45 opacity-0' : 'animate-bounce'
          }`}
          title="Click to cut the birthday cake!"
        >
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 text-rose-600 font-display font-bold text-xs shadow-lg border border-rose-200">
            <span>🔪</span>
            <span>Tap to Cut Cake!</span>
          </div>
        </div>

        {/* Cake Tier 3 (Top Tier) */}
        <div className="cake-tier-3d w-28 sm:w-36 h-14 sm:h-18 bg-gradient-to-r from-pink-300 via-rose-300 to-pink-400 z-20 flex items-center justify-center relative border-b-2 border-rose-400/30">
          <span className="text-xl sm:text-2xl">🍓</span>
          <span className="text-xs font-script text-rose-800 font-bold ml-1">Loukya</span>
          {/* Frosting Drips */}
          <div className="absolute -bottom-2 left-3 right-3 flex justify-around">
            <span className="w-2 h-3 bg-white rounded-full shadow-sm"></span>
            <span className="w-2.5 h-4 bg-white rounded-full shadow-sm"></span>
            <span className="w-2 h-3 bg-white rounded-full shadow-sm"></span>
            <span className="w-2 h-4 bg-white rounded-full shadow-sm"></span>
          </div>
        </div>

        {/* Cake Tier 2 (Middle Tier) */}
        <div className="cake-tier-3d w-44 sm:w-56 h-16 sm:h-20 bg-gradient-to-r from-rose-400 via-pink-400 to-purple-400 z-10 -mt-2 flex items-center justify-around px-4 border-b-2 border-purple-500/30">
          <span className="text-sm">🌸</span>
          <span className="text-xs font-display font-bold text-white tracking-widest uppercase">
            Happy Birthday
          </span>
          <span className="text-sm">🌸</span>
        </div>

        {/* Cake Tier 1 (Base Tier) */}
        <div className="cake-tier-3d w-56 sm:w-72 h-18 sm:h-22 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 -mt-2 flex items-center justify-around px-6 shadow-2xl">
          <span className="text-base">✨</span>
          <span className="text-xs font-display font-bold text-white/95 tracking-wider">
            QUEEN LOUKYA
          </span>
          <span className="text-base">👑</span>
        </div>

        {/* Cake Stand */}
        <div className="w-64 sm:w-80 h-4 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded-full shadow-md -mt-1 border border-slate-300"></div>
      </div>

      {/* Action Prompt */}
      <div className="mt-4 flex items-center gap-3">
        {!isCut ? (
          <button
            onClick={handleCut}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-display font-bold text-xs sm:text-sm shadow-lg hover:scale-105 active:scale-95 transition cursor-pointer flex items-center gap-2"
          >
            <span>🎂</span>
            <span>Cut the Birthday Cake! 🍰</span>
          </button>
        ) : (
          <button
            onClick={onRelight}
            className="px-5 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-display font-semibold text-xs shadow-sm transition hover:scale-105 cursor-pointer flex items-center gap-1.5"
          >
            <span>🔄</span>
            <span>Relight Candles</span>
          </button>
        )}
      </div>
    </div>
  );
}
