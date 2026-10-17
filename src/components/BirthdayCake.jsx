import React, { useState } from 'react';
import { playCandleBlowSound, playCakeSliceSound } from '../services/audioService';

export default function BirthdayCake({
  photos,
  blownCandles,
  setBlownCandles,
  isCut,
  onCutCake,
  onRelight,
  isCreatorMode,
  onUploadPhoto
}) {
  const [isKnifeCutting, setIsKnifeCutting] = useState(false);
  const [smokeActive, setSmokeActive] = useState([false, false, false]);

  const allCandlesBlown = blownCandles.every(Boolean);
  const blownCount = blownCandles.filter(Boolean).length;

  // Blow a specific candle
  function handleBlowCandle(idx) {
    if (blownCandles[idx] && !isCreatorMode) return;

    playCandleBlowSound();

    // Trigger smoke puff
    setSmokeActive((prev) => {
      const next = [...prev];
      next[idx] = true;
      return next;
    });
    setTimeout(() => {
      setSmokeActive((prev) => {
        const next = [...prev];
        next[idx] = false;
        return next;
      });
    }, 900);

    setBlownCandles((prev) => {
      const next = [...prev];
      next[idx] = true;
      return next;
    });
  }

  // Cut cake action
  function handleCut() {
    if (isCut || isKnifeCutting) return;
    setIsKnifeCutting(true);
    playCakeSliceSound();

    setTimeout(() => {
      onCutCake();
      setIsKnifeCutting(false);
    }, 600);
  }

  function scrollToGallery() {
    const el = document.getElementById('cakeServingDashboard');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  const candleConfigs = [
    {
      idx: 0,
      id: 'candleImg-0',
      label: '✨ Loukya',
      defaultUrl: '/9ad4bbc7-304f-481e-90a5-f0a5fab52fac.jpg',
      rotate: '-2deg',
      placeholderBorder: 'border-rose-300 text-rose-400 hover:border-rose-400',
      candleGradient: 'from-pink-400 to-rose-500',
      badge: '✨'
    },
    {
      idx: 1,
      id: 'candleImg-1',
      label: '👑 Loukya',
      defaultUrl: '/Screenshot%202026-10-17%20213023.jpg',
      rotate: '1deg',
      placeholderBorder: 'border-purple-300 text-purple-400 hover:border-purple-400',
      candleGradient: 'from-purple-400 to-indigo-500',
      badge: '💖'
    },
    {
      idx: 2,
      id: 'candleImg-2',
      label: '💖 Loukya',
      defaultUrl: '/eb80199a-45d1-4fb2-b221-cca4e370bf5b.jpg',
      rotate: '2deg',
      placeholderBorder: 'border-amber-300 text-amber-500 hover:border-amber-400',
      candleGradient: 'from-amber-400 to-orange-500',
      badge: '👑'
    }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto mb-10 sm:mb-14">
      <div className="w-full bg-gradient-to-b from-rose-50/90 via-pink-50/80 to-purple-50/80 rounded-3xl p-4 sm:p-8 border border-rose-200/80 shadow-inner relative flex flex-col items-center overflow-hidden">
        {/* Wish Status Banner */}
        <div className="text-[11px] sm:text-sm font-display font-bold text-rose-600 mb-3 sm:mb-5 bg-white/95 py-1.5 px-4 sm:py-2 sm:px-6 rounded-full inline-block shadow-sm border border-rose-100 text-center max-w-full leading-normal">
          {!allCandlesBlown ? (
            <span>
              ✨ Tap each candle below to blow it out & reveal a photo! ({blownCount}/3 Blown) 💨
            </span>
          ) : !isCut ? (
            <span className="text-purple-600 animate-pulse">
              🎉 All wishes made! Tap the knife or button below to cut the birthday cake! 🎂🔪
            </span>
          ) : (
            <span className="text-emerald-600">
              🍰 Delicious Birthday Cake is Cut! Ready to serve Loukya & Friends! 🥳💖
            </span>
          )}
        </div>

        {/* 1. Mini Pop-Up Polaroid Photos Container (Appears directly above candles) */}
        <div className="w-full max-w-md grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6 min-h-[95px] sm:min-h-[140px] items-center justify-items-center">
          {candleConfigs.map((c) => {
            const isBlown = blownCandles[c.idx] || isCreatorMode;
            const photoUrl = photos[c.id] || c.defaultUrl;

            return (
              <div key={c.idx} className="relative w-full flex justify-center">
                {!isBlown ? (
                  /* Dashed Placeholder before blowing */
                  <div
                    onClick={() => handleBlowCandle(c.idx)}
                    className={`cursor-pointer w-[76px] h-[94px] sm:w-28 sm:h-32 rounded-xl sm:rounded-2xl border-2 border-dashed ${c.placeholderBorder} bg-white/60 flex flex-col items-center justify-center p-1.5 sm:p-2 hover:bg-rose-50 transition group shadow-sm touch-manipulation select-none`}
                    title="Tap to make a wish & blow out flame!"
                  >
                    <span className="text-xl sm:text-3xl group-hover:scale-125 transition">🕯️</span>
                    <span className="text-[9px] sm:text-xs font-display font-semibold mt-1 text-center leading-tight">
                      Make Wish ✨
                    </span>
                  </div>
                ) : (
                  /* Revealed Polaroid Card after blowing */
                  <div
                    style={{ transform: `rotate(${c.rotate})` }}
                    className="candle-photo-active bg-white p-1 pb-2 sm:p-2 sm:pb-3 rounded-xl sm:rounded-2xl shadow-xl border-2 border-rose-200 w-[84px] sm:w-32 relative group"
                  >
                    <div className="aspect-square w-full rounded-lg sm:rounded-xl overflow-hidden bg-rose-100 relative border border-slate-100">
                      <img
                        id={c.id}
                        src={photoUrl}
                        alt={c.label}
                        className="w-full h-full object-cover"
                      />
                      {isCreatorMode && (
                        <label
                          className="cursor-pointer absolute bottom-1 right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/90 hover:bg-rose-500 text-rose-600 hover:text-white flex items-center justify-center shadow text-[9px] sm:text-[10px] transition"
                          title="Upload Photo"
                        >
                          <i className="fa-solid fa-camera"></i>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => onUploadPhoto(e, c.id)}
                          />
                        </label>
                      )}
                    </div>
                    <p className="font-display font-bold text-[9px] sm:text-xs text-rose-600 mt-1 sm:mt-1.5 truncate text-center">
                      {c.label}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 2. Interactive Knife & Candles & Splittable Cake Centerpiece */}
        <div className="relative flex flex-col items-center select-none w-full max-w-sm">
          {/* Floating Knife Graphic */}
          <div
            onClick={handleCut}
            className={`relative z-30 mb-[-10px] sm:mb-[-14px] cursor-pointer transition ${
              isKnifeCutting ? 'knife-cutting' : 'knife-floating'
            } ${isCut ? 'opacity-0 pointer-events-none' : ''}`}
            title="Click knife to cut the birthday cake!"
          >
            <div className="flex items-center drop-shadow-lg">
              <div className="w-8 sm:w-9 h-3.5 sm:h-4 bg-gradient-to-r from-rose-600 to-pink-500 rounded-l-full border-2 border-white flex items-center justify-evenly">
                <div className="w-1 h-1 bg-white rounded-full"></div>
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
              <div className="w-14 sm:w-16 h-4 sm:h-5 bg-gradient-to-b from-slate-100 via-white to-slate-300 rounded-r-full border border-slate-300 shadow-md relative overflow-hidden">
                <div className="absolute top-1 left-2 right-3 h-1 bg-white/90 rounded-full"></div>
              </div>
              <span className="ml-1 text-base sm:text-lg">✨</span>
            </div>
          </div>

          {/* 3 Real Candles with Flickering Flames */}
          <div className="flex justify-center gap-7 sm:gap-14 mb-[-6px] z-20">
            {candleConfigs.map((c) => {
              const isBlown = blownCandles[c.idx];
              const isSmoke = smokeActive[c.idx];

              return (
                <div
                  key={c.idx}
                  onClick={() => handleBlowCandle(c.idx)}
                  className="cursor-pointer group flex flex-col items-center p-1.5 -m-1.5 touch-manipulation"
                  title={isBlown ? 'Candle Blown Out!' : 'Tap to Blow Out Candle Flame!'}
                >
                  {/* Smoke Puff */}
                  {isSmoke && (
                    <div className="smoke-puff text-slate-400 text-xs font-bold mb-1">
                      💨
                    </div>
                  )}

                  {/* Flame */}
                  <div
                    className={`candle-flame w-3.5 h-5 sm:w-4 sm:h-6 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full shadow-[0_0_15px_#f59e0b] mb-0.5 group-hover:scale-125 transition ${
                      isBlown ? 'flame-out' : ''
                    }`}
                  ></div>

                  {/* Wick */}
                  <div className="w-1 h-1.5 bg-slate-700"></div>

                  {/* Candle Stick */}
                  <div
                    className={`w-4 sm:w-5 h-12 sm:h-14 bg-gradient-to-b ${c.candleGradient} rounded-t-sm border-2 border-white shadow-sm flex flex-col justify-evenly items-center overflow-hidden relative`}
                  >
                    <span className="text-[8px] sm:text-[9px] font-bold text-white z-10 drop-shadow">
                      {c.badge}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 3. Splittable Cake Visual */}
          <div
            id="cakeVisualWrapper"
            onClick={handleCut}
            className={`relative flex flex-col items-center cursor-pointer ${
              isCut ? 'cake-cut-active' : ''
            }`}
            title={!isCut ? 'Click to cut cake!' : 'Cake is cut!'}
          >
            {/* Seam line */}
            <div className="cake-seam-line absolute top-0 bottom-0 w-1.5 bg-amber-200/90 z-20 rounded-full shadow-[0_0_10px_#fbbf24]"></div>

            {/* Cake Top Tier */}
            <div className="flex items-center justify-center">
              <div className="cake-half-left w-24 sm:w-32 h-14 sm:h-16 bg-gradient-to-r from-rose-300 to-pink-300 rounded-tl-2xl border-y-4 border-l-4 border-white shadow-md relative overflow-hidden flex items-start justify-around">
                <div className="w-7 sm:w-8 h-5 sm:h-6 bg-white/90 rounded-b-full"></div>
                <div className="w-8 sm:w-9 h-7 sm:h-8 bg-white/90 rounded-b-full"></div>
              </div>
              <div className="cake-half-right w-24 sm:w-32 h-14 sm:h-16 bg-gradient-to-r from-pink-300 to-rose-300 rounded-tr-2xl border-y-4 border-r-4 border-white shadow-md relative overflow-hidden flex items-start justify-around">
                <div className="w-8 sm:w-9 h-6 sm:h-7 bg-white/90 rounded-b-full"></div>
                <div className="w-7 sm:w-8 h-5 sm:h-6 bg-white/90 rounded-b-full"></div>
              </div>
            </div>

            {/* Cake Bottom Tier with "Loukya 🎂✨" in script */}
            <div className="flex items-center justify-center relative">
              <div className="cake-half-left w-28 sm:w-36 h-16 sm:h-20 bg-gradient-to-r from-rose-400 to-pink-500 rounded-tl-xl rounded-bl-2xl border-y-4 border-l-4 border-white shadow-xl flex items-center justify-end pr-1.5 sm:pr-2">
                <span className="font-script text-white text-lg sm:text-2xl drop-shadow">
                  Loukya
                </span>
              </div>
              <div className="cake-half-right w-28 sm:w-36 h-16 sm:h-20 bg-gradient-to-r from-pink-500 to-purple-500 rounded-tr-xl rounded-br-2xl border-y-4 border-r-4 border-white shadow-xl flex items-center justify-start pl-1.5 sm:pl-2">
                <span className="font-script text-white text-lg sm:text-2xl drop-shadow">
                  🎂✨
                </span>
              </div>
            </div>
          </div>

          {/* Cake Stand */}
          <div className="w-60 sm:w-80 max-w-[94%] h-3 sm:h-3.5 bg-slate-200 rounded-full shadow-md -mt-1 border border-white"></div>

          {/* Slice Served Alert Badge */}
          {isCut && (
            <div className="mt-4 px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-2xl bg-gradient-to-r from-amber-100 via-rose-100 to-purple-100 border-2 border-rose-300 text-rose-700 font-display font-bold text-xs sm:text-sm shadow-md flex items-center gap-2 max-w-full text-center flex-wrap justify-center animate-bounce">
              <span className="text-lg sm:text-xl">🍰</span>
              <span>Yum! Birthday Cake Cut! Ready to serve Loukya & Friends! 🥳💖</span>
              <button
                onClick={scrollToGallery}
                className="ml-1 sm:ml-2 px-3 py-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-display font-bold text-xs shadow hover:scale-105 active:scale-95 transition cursor-pointer"
              >
                Serve Cake Below! 👇
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 w-full sm:w-auto">
          {!isCut ? (
            <button
              onClick={handleCut}
              className={`w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-display font-bold text-xs sm:text-base shadow-lg shadow-rose-400/40 hover:scale-105 active:scale-95 transition flex items-center justify-center gap-2 cursor-pointer ${
                allCandlesBlown ? 'animate-bounce' : ''
              }`}
            >
              <span>🔪</span>
              <span>Cut the Birthday Cake Together! 🎂</span>
            </button>
          ) : (
            <button
              onClick={onRelight}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-700 font-display font-bold text-xs sm:text-sm transition shadow-sm text-center cursor-pointer flex items-center justify-center gap-1.5 hover:scale-105"
            >
              <span>🔥</span>
              <span>Relight Candles</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
