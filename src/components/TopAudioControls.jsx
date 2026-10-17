import React from 'react';

export default function TopAudioControls({ isMusicPlaying, toggleMusic, triggerConfetti }) {
  return (
    <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-40 flex flex-wrap items-center gap-1.5 sm:gap-3">
      <button
        onClick={triggerConfetti}
        className="glass-card px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold text-rose-600 hover:bg-rose-50 active:scale-95 transition flex items-center gap-1.5 sm:gap-2 shadow-md cursor-pointer"
        title="Pop Confetti!"
      >
        <i className="fa-solid fa-wand-magic-sparkles text-amber-500 text-xs sm:text-sm"></i>
        <span className="hidden sm:inline">Confetti!</span>
        <span>🎉</span>
      </button>

      <button
        onClick={toggleMusic}
        className="glass-card px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold text-purple-700 hover:bg-purple-50 active:scale-95 transition flex items-center gap-1.5 sm:gap-2 shadow-md cursor-pointer"
      >
        <i className={`fa-solid fa-music text-rose-500 text-xs sm:text-sm ${isMusicPlaying ? 'animate-bounce' : ''}`}></i>
        <span className="text-xs sm:text-sm">
          {isMusicPlaying ? 'Pause 🎵' : 'Music 🎵'}
        </span>
      </button>
    </div>
  );
}
