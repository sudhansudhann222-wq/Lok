import React, { useState } from 'react';
import { playGiftOpenFanfare } from '../services/audioService';

export default function Screen3GiftBox({ onOpenGift }) {
  const [isOpening, setIsOpening] = useState(false);

  function handleUnwrap() {
    if (isOpening) return;
    setIsOpening(true);
    playGiftOpenFanfare();
    setTimeout(() => {
      onOpenGift();
    }, 1100);
  }

  return (
    <section className="screen-section w-full max-w-lg mx-auto my-auto text-center animate-fade-in">
      <div className="glass-card rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        <span className="inline-block px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 font-display text-xs sm:text-sm font-semibold tracking-wide uppercase mb-3">
          Special Delivery 🎀
        </span>

        <h2 className="font-display text-2xl sm:text-4xl font-bold text-slate-800 mb-2">
          Unwrap Your Surprise! ✨
        </h2>

        <p className="text-slate-600 text-xs sm:text-base mb-8">
          Tap the gift box below to reveal what I made for you, Loukya!
        </p>

        {/* 3D Gift Box Interactive Visual */}
        <div
          onClick={handleUnwrap}
          className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto cursor-pointer group select-none"
        >
          {/* Glow backdrop */}
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-400 to-rose-400 rounded-3xl blur-2xl opacity-40 group-hover:opacity-75 transition duration-500"></div>

          {/* Lid */}
          <div
            className={`absolute top-4 left-4 right-4 h-14 sm:h-16 bg-gradient-to-r from-rose-500 to-pink-500 rounded-2xl shadow-xl z-20 flex items-center justify-center transition-transform ${
              isOpening ? 'unwrap-lid' : 'group-hover:-translate-y-2'
            }`}
          >
            <div className="w-8 h-full bg-amber-400 shadow-sm mx-auto"></div>
            {/* Ribbon Bow */}
            <div className="absolute -top-4 w-12 h-10 bg-amber-400 rounded-full shadow-md flex items-center justify-center text-lg">
              🎀
            </div>
          </div>

          {/* Box Body */}
          <div
            className={`absolute bottom-4 left-6 right-6 h-32 sm:h-36 bg-gradient-to-b from-rose-500 via-pink-600 to-rose-700 rounded-b-2xl shadow-2xl z-10 overflow-hidden flex justify-center transition-transform ${
              isOpening ? 'unwrap-box' : 'group-hover:scale-105'
            }`}
          >
            <div className="w-8 h-full bg-amber-400 shadow-inner"></div>
            <div className="absolute top-1/2 left-0 right-0 h-6 bg-amber-400/80 -translate-y-1/2"></div>
          </div>
        </div>

        <button
          onClick={handleUnwrap}
          className="mt-8 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-display font-bold text-sm sm:text-base shadow-xl hover:scale-105 active:scale-95 transition cursor-pointer"
        >
          ✨ TAP TO UNWRAP GIFT 🎁
        </button>
      </div>
    </section>
  );
}
