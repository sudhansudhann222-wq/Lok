import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';

export default function ScratchCardItem({
  config,
  cardData,
  photoUrl,
  isCreatorMode,
  onUploadPhoto,
  onEditNote,
  onRevealSuccess,
  isRevealedProp
}) {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(isRevealedProp || false);
  const isDrawing = useRef(false);
  const lastPoint = useRef(null);
  const checkTimer = useRef(null);
  const strokeCount = useRef(0);

  // Sync if prop changes externally
  useEffect(() => {
    if (isRevealedProp !== undefined) {
      setIsRevealed(isRevealedProp);
    }
  }, [isRevealedProp]);

  // Render foil onto canvas
  function drawFoil() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use actual client rect dimensions for pixel-perfect crispness
    const rect = canvas.getBoundingClientRect();
    const width = Math.round(rect.width) || 340;
    const height = Math.round(rect.height) || 255;

    canvas.width = width;
    canvas.height = height;

    // Reset composite operation to draw foil
    ctx.globalCompositeOperation = 'source-over';

    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, config.gradientColors[0]);
    grad.addColorStop(0.5, config.gradientColors[1]);
    grad.addColorStop(1, config.gradientColors[2]);

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Decorative dashed border
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([8, 6]);
    ctx.strokeRect(10, 10, width - 20, height - 20);
    ctx.restore();

    // Text on foil
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
    ctx.shadowBlur = 8;
    ctx.font = 'bold 18px Fredoka, sans-serif';
    ctx.fillText(config.titleText, width / 2, height / 2 - 12);

    ctx.font = '600 13px Inter, sans-serif';
    ctx.fillText(config.subText, width / 2, height / 2 + 15);
    ctx.restore();
  }

  useEffect(() => {
    if (!isRevealed) {
      // Allow DOM to settle layout before measuring canvas width
      const raf = requestAnimationFrame(() => {
        drawFoil();
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isRevealed, config]);

  // Helper to extract canvas relative coordinate
  function getPos(e) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  // Pointer start (Mouse / Touch / Pen)
  function handlePointerDown(e) {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      canvas.setPointerCapture(e.pointerId);
    } catch (err) {}

    isDrawing.current = true;
    const pos = getPos(e);
    lastPoint.current = pos;

    // Draw single circle on touch down
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, 22, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Pointer move (Smooth, lag-free interpolated drawing)
  function handlePointerMove(e) {
    if (!isDrawing.current || isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentPos = getPos(e);
    const prevPos = lastPoint.current || currentPos;

    // Smooth continuous stroke
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 44;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(prevPos.x, prevPos.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.stroke();

    lastPoint.current = currentPos;
    strokeCount.current++;

    // Throttle percentage check to prevent frame-rate drops
    if (strokeCount.current % 12 === 0) {
      scheduleCheck();
    }
  }

  // Pointer up / leave
  function handlePointerUp(e) {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    lastPoint.current = null;
    try {
      if (canvasRef.current && e.pointerId) {
        canvasRef.current.releasePointerCapture(e.pointerId);
      }
    } catch (err) {}

    // Check percentage immediately on release
    scheduleCheck(true);
  }

  // Efficient throttled percentage check
  function scheduleCheck(immediate = false) {
    if (checkTimer.current) clearTimeout(checkTimer.current);

    if (immediate) {
      evaluateTransparency();
    } else {
      checkTimer.current = setTimeout(evaluateTransparency, 150);
    }
  }

  function evaluateTransparency() {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      const width = canvas.width;
      const height = canvas.height;
      if (!width || !height) return;

      // Sample a scaled down subsection or step through pixel buffer efficiently
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;
      let cleared = 0;
      let totalSamples = 0;

      // Sample every 24th pixel for lightning-fast 0ms performance
      for (let i = 3; i < data.length; i += 24) {
        totalSamples++;
        if (data[i] === 0) {
          cleared++;
        }
      }

      // If at least 28% of the foil is scratched away, celebrate and reveal!
      if (totalSamples > 0 && cleared / totalSamples > 0.28) {
        reveal();
      }
    } catch (err) {
      console.warn('Canvas evaluation notice:', err);
    }
  }

  function reveal() {
    if (isRevealed) return;
    setIsRevealed(true);

    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#f43f5e', '#ec4899', '#a855f7', '#fbbf24']
      });
    } catch (e) {}

    if (onRevealSuccess) {
      onRevealSuccess(config.key);
    }
  }

  function rescratch() {
    setIsRevealed(false);
    setTimeout(drawFoil, 60);
  }

  return (
    <div
      className={`glass-card rounded-3xl p-4 sm:p-6 md:p-8 flex flex-col justify-between relative overflow-hidden border-t-4 ${config.borderColor} shadow-2xl transition hover:shadow-rose-200/50 w-full`}
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
            className={`inline-flex items-center gap-1.5 px-3.5 py-1 sm:px-4 sm:py-1 rounded-full font-display font-bold text-[11px] sm:text-xs shadow-sm ${
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
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className="absolute inset-0 w-full h-full cursor-crosshair z-10 transition-opacity duration-300 touch-none select-none"
                style={{ touchAction: 'none' }}
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
            <div className="text-2xl sm:text-3xl mb-1.5 sm:mb-2 animate-bounce">🔒✨</div>
            <h4 className="font-display font-bold text-sm sm:text-base text-slate-800">
              Birthday Wishes Locked!
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Scratch off the foil on the photo above or tap below for instant reveal!
            </p>
            <button
              onClick={reveal}
              className="mt-3 px-5 py-2 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-display font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              ✨ Instant Reveal Words & Photo
            </button>
          </div>
        ) : (
          <div className="text-left space-y-2.5 sm:space-y-3 bg-gradient-to-br from-rose-50/70 via-pink-50/50 to-white rounded-2xl p-4 sm:p-6 border-2 border-rose-200 shadow-inner animate-fade-in">
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
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 shadow-sm">
                  🔓 Unlocked!
                </span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
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
