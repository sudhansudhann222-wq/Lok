import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';

export default function ScratchCardItem({
  config,
  cardData,
  photoUrl,
  isCreatorMode,
  onUploadPhoto,
  onEditNote
}) {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawing = useRef(false);

  function drawFoil() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth || 340;
    canvas.height = canvas.offsetHeight || 255;

    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, config.gradientColors[0]);
    grad.addColorStop(0.5, config.gradientColors[1]);
    grad.addColorStop(1, config.gradientColors[2]);

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Decorative patterns
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 6]);
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
    ctx.restore();

    // Text on foil
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 6;
    ctx.font = 'bold 17px Fredoka, sans-serif';
    ctx.fillText(config.titleText, canvas.width / 2, canvas.height / 2 - 12);

    ctx.font = '500 12px Inter, sans-serif';
    ctx.fillText(config.subText, canvas.width / 2, canvas.height / 2 + 15);
    ctx.restore();
  }

  useEffect(() => {
    if (!isRevealed) {
      drawFoil();
    }
  }, [isRevealed, config]);

  function scratch(e) {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();

    checkPercentage();
  }

  function checkPercentage() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    const total = imgData.data.length / 4;

    for (let i = 3; i < imgData.data.length; i += 16) {
      if (imgData.data[i] === 0) transparent++;
    }

    if (transparent / (total / 4) > 0.42) {
      reveal();
    }
  }

  function reveal() {
    setIsRevealed(true);
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.7 }
    });
  }

  function rescratch() {
    setIsRevealed(false);
    setTimeout(drawFoil, 50);
  }

  return (
    <div
      className={`glass-card rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col justify-between relative overflow-hidden border-t-4 ${config.borderColor} shadow-2xl transition hover:shadow-rose-200/50`}
    >
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between gap-2 mb-3 sm:mb-4 flex-wrap">
          <span
            dangerouslySetInnerHTML={{ __html: cardData.badge || '' }}
            className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-rose-50 text-slate-800 font-display font-bold text-xs sm:text-sm"
          />

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={rescratch}
              className="text-[11px] sm:text-xs font-semibold bg-slate-50 hover:bg-slate-100 text-slate-600 px-2.5 py-1 sm:py-1.5 rounded-full border border-slate-200 transition cursor-pointer"
              title="Reset Scratch Foil"
            >
              <i className="fa-solid fa-rotate-right mr-1"></i>Rescratch
            </button>

            {isCreatorMode && (
              <>
                <button
                  type="button"
                  onClick={() => onEditNote(config.key)}
                  className="text-[11px] sm:text-xs font-semibold bg-white hover:bg-rose-50 text-rose-600 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-rose-200 shadow-sm transition items-center gap-1 cursor-pointer flex"
                  title="Edit Note & Captions"
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                  <span>Edit</span>
                </button>

                <label
                  className="cursor-pointer inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold bg-white hover:bg-rose-50 text-rose-600 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full border border-rose-200 shadow-sm transition"
                >
                  <i className="fa-solid fa-camera"></i>
                  <span>Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => onUploadPhoto(e, `${config.key === 'sister' ? 'sister' : config.key}Photo`)}
                  />
                </label>
              </>
            )}
          </div>
        </div>

        {/* Scratch Badge Indicator */}
        <div className="text-center mb-3">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full font-display font-bold text-[11px] sm:text-xs shadow-sm ${
              isRevealed
                ? 'bg-emerald-100 text-emerald-800'
                : 'bg-rose-100 text-rose-800 animate-pulse'
            }`}
          >
            {isRevealed ? config.unlockedBadgeText : `🪙 Scratch foil below or tap Instant Reveal!`}
          </span>
        </div>

        {/* Polaroid Scratch Frame */}
        <div className="bg-white p-2.5 sm:p-3.5 pb-3.5 sm:pb-5 rounded-2xl shadow-lg border border-slate-100 max-w-sm mx-auto mb-4 sm:mb-6">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-50 select-none touch-none">
            <img
              src={photoUrl}
              alt="Friend Photo"
              className="w-full h-full object-cover pointer-events-none"
            />
            {!isRevealed && (
              <canvas
                ref={canvasRef}
                onMouseDown={() => (isDrawing.current = true)}
                onMouseUp={() => (isDrawing.current = false)}
                onMouseMove={e => isDrawing.current && scratch(e)}
                onTouchStart={() => (isDrawing.current = true)}
                onTouchEnd={() => (isDrawing.current = false)}
                onTouchMove={scratch}
                className="absolute inset-0 w-full h-full cursor-crosshair z-10 transition-opacity duration-500"
              />
            )}
          </div>
          <p className="font-script text-center text-lg sm:text-xl text-slate-700 mt-2.5 sm:mt-3">
            {cardData.photoCaption || ''}
          </p>
        </div>

        {/* Locked / Unlocked Words */}
        {!isRevealed ? (
          <div className="text-center bg-slate-50/80 rounded-2xl p-4 sm:p-6 border-2 border-dashed border-rose-300 text-rose-600">
            <div className="text-2xl sm:text-3xl mb-1.5 sm:mb-2">🔒✨</div>
            <h4 className="font-display font-bold text-sm sm:text-base text-slate-800">
              Birthday Wishes Locked!
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Scratch off the foil on the photo above or tap below for instant reveal!
            </p>
            <button
              onClick={reveal}
              className="mt-2.5 sm:mt-3 px-4 py-1.5 rounded-full bg-white hover:bg-rose-50 text-rose-600 font-display font-bold text-xs border border-rose-200 shadow-sm transition cursor-pointer"
            >
              ✨ Instant Reveal
            </button>
          </div>
        ) : (
          <div className="text-left space-y-2.5 sm:space-y-3 bg-gradient-to-br from-rose-50/70 via-pink-50/50 to-white rounded-2xl p-3.5 sm:p-5 border-2 border-rose-200 shadow-inner animate-fade-in">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="font-display text-base sm:text-lg md:text-xl font-bold text-slate-800 flex items-center gap-2">
                <span>{cardData.title || ''}</span>
              </h3>
              <div className="flex items-center gap-1.5">
                {isCreatorMode && (
                  <button
                    type="button"
                    onClick={() => onEditNote(config.key)}
                    className="items-center gap-1 text-[11px] font-bold bg-rose-100 hover:bg-rose-200 text-rose-800 px-2.5 py-1 rounded-full border border-rose-300 shadow-sm transition cursor-pointer flex"
                    title="Edit Note"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                    <span>Edit Note</span>
                  </button>
                )}
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
                  🔓 Unlocked!
                </span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {cardData.paragraphs &&
                cardData.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-100">
        {cardData.tags &&
          cardData.tags.map((t, idx) => {
            const colors = [
              'bg-teal-100 text-teal-800',
              'bg-emerald-100 text-emerald-800',
              'bg-purple-100 text-purple-800',
              'bg-pink-100 text-pink-800',
              'bg-rose-100 text-rose-800'
            ];
            const c = colors[idx % colors.length];
            return (
              <span key={idx} className={`px-2.5 py-1 rounded-lg ${c} text-[11px] sm:text-xs font-semibold`}>
                {t}
              </span>
            );
          })}
      </div>
    </div>
  );
}
