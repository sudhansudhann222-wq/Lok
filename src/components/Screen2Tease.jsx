import React, { useState } from 'react';

export default function Screen2Tease({ onYes }) {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });

  function dodgeNo() {
    const maxX = 120;
    const maxY = 70;
    const randomX = (Math.random() - 0.5) * maxX * 2;
    const randomY = (Math.random() - 0.5) * maxY * 2;
    setNoPos({ x: randomX, y: randomY });
  }

  return (
    <section className="screen-section w-full max-w-lg mx-auto my-auto animate-fade-in">
      <div className="glass-card rounded-3xl p-6 sm:p-10 text-center relative shadow-2xl border-2 border-rose-300">
        <div className="text-5xl sm:text-6xl mb-4 animate-bounce">🥺👉👈</div>

        <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-800 mb-3">
          Wait, really Loukya?!
        </h2>

        <p className="text-slate-600 text-sm sm:text-base mb-6 leading-relaxed">
          I worked on this so carefully with music, cake, memories, and birthday wishes! You really don't want to take even a tiny peek? 🥺
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative min-h-[120px]">
          <button
            onClick={onYes}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-display font-bold text-base shadow-xl shadow-rose-300 hover:scale-105 active:scale-95 transition cursor-pointer"
          >
            Okay fine, show me! 🥰✨
          </button>

          <button
            onMouseEnter={dodgeNo}
            onTouchStart={dodgeNo}
            style={{
              transform: `translate(${noPos.x}px, ${noPos.y}px)`,
              transition: 'transform 0.18s ease-out'
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-2xl bg-slate-200 text-slate-600 font-display font-medium text-xs sm:text-sm select-none"
          >
            Still No 😝
          </button>
        </div>
      </div>
    </section>
  );
}
