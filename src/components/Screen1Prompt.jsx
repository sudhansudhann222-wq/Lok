import React from 'react';

export default function Screen1Prompt({ onYes, onNo }) {
  return (
    <section className="screen-section w-full max-w-lg mx-auto my-auto animate-fade-in">
      <div className="glass-card rounded-3xl p-5 sm:p-8 md:p-10 text-center relative overflow-hidden shadow-2xl">
        {/* Decorative blur elements */}
        <div className="absolute -top-8 -left-8 w-24 h-24 sm:w-28 sm:h-28 bg-rose-200/50 rounded-full blur-xl pointer-events-none"></div>
        <div className="absolute -bottom-8 -right-8 w-24 h-24 sm:w-28 sm:h-28 bg-purple-200/50 rounded-full blur-xl pointer-events-none"></div>

        {/* Animated Floating Envelope Icon */}
        <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-5 bg-gradient-to-tr from-rose-400 to-pink-500 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-lg shadow-rose-300/60 animate-float">
          <span className="text-3xl sm:text-5xl">💌</span>
        </div>

        <span className="inline-block px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-rose-100 text-rose-600 font-display text-[11px] sm:text-sm font-semibold tracking-wide uppercase mb-3">
          Special Delivery For Loukya ✨
        </span>

        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 leading-snug mb-3 sm:mb-4">
          Hey Loukya! 💖<br />
          <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            I have made something special for you!
          </span>
        </h1>

        <p className="text-slate-600 text-xs sm:text-base mb-6 sm:mb-8 leading-relaxed">
          I spent time putting together a little birthday surprise just for you. Do you want to see it, yes or no? 👀
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={onYes}
            className="w-full sm:w-auto px-7 py-3 sm:px-8 sm:py-3.5 rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-display font-bold text-sm sm:text-base shadow-lg shadow-rose-300 hover:shadow-rose-400 hover:scale-105 active:scale-95 transition cursor-pointer"
          >
            YES, SHOW ME! 🎁
          </button>
          <button
            onClick={onNo}
            className="w-full sm:w-auto px-6 py-2.5 sm:px-7 sm:py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-display font-medium text-xs sm:text-sm transition hover:scale-105 cursor-pointer"
          >
            No, maybe later 🙈
          </button>
        </div>
      </div>
    </section>
  );
}
