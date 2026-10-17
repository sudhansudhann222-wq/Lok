import React from 'react';

export default function CakeServingDashboard({
  cakeServedState,
  onServeAll,
  onResetServing
}) {
  const count = cakeServedState.filter(Boolean).length;
  const total = cakeServedState.length;
  const pct = Math.round((count / total) * 100);
  const isComplete = count === total;

  return (
    <div
      id="cakeServingDashboard"
      className="w-full mb-6 sm:mb-8 p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-pink-50 via-purple-50 to-amber-50 border-2 border-pink-200/90 shadow-lg text-left transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 text-center md:text-left">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-rose-500 via-pink-500 to-purple-600 text-white flex items-center justify-center text-2xl sm:text-3xl shadow-md shrink-0 animate-bounce">
            🍰
          </div>
          <div>
            <h3 className="font-display font-bold text-slate-800 text-sm sm:text-base md:text-lg">
              Serve Birthday Cake to Loukya & Friends! 🎂✨
            </h3>
            <p className="text-slate-600 text-xs sm:text-sm mt-0.5">
              Tap "Feed Cake" on each friend below, or serve all slices together!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-center">
          <span
            className={`px-3.5 py-1.5 rounded-full font-display font-bold text-xs border shadow-sm flex items-center gap-1.5 ${
              isComplete
                ? 'bg-emerald-100 text-emerald-700 border-emerald-300 animate-pulse'
                : 'bg-rose-100 text-rose-700 border-rose-200'
            }`}
          >
            <span>🍰</span>
            <span>{count} / {total} Fed</span>
          </span>

          {!isComplete ? (
            <button
              onClick={onServeAll}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-display font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>🍰 Serve Slices to Everyone! ✨</span>
            </button>
          ) : (
            <button
              onClick={onResetServing}
              className="px-3.5 py-2 rounded-full bg-white hover:bg-rose-50 text-slate-700 font-display font-semibold text-xs border border-slate-300 shadow-sm transition hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-1"
            >
              <span>🔄 Serve Again</span>
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-pink-100 h-2.5 rounded-full mt-3.5 overflow-hidden border border-pink-200">
        <div
          style={{ width: `${pct}%` }}
          className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 h-full transition-all duration-500 rounded-full"
        ></div>
      </div>

      {/* Grand Alert */}
      {isComplete && (
        <div className="mt-3 p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 text-white font-display font-bold text-xs sm:text-sm text-center shadow-lg animate-pulse">
          🎉 WOO-HOO! Loukya & all 8 friends are happily fed with delicious cake! The celebration is complete! 🥳🎂🥂✨
        </div>
      )}
    </div>
  );
}
