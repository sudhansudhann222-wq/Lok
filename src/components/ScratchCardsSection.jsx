import React, { useState } from 'react';
import { SCRATCH_CARDS_LIST } from '../config/defaultData';
import ScratchCardItem from './ScratchCardItem';

export default function ScratchCardsSection({
  photos,
  captions,
  isCreatorMode,
  onUploadPhoto,
  onEditNote
}) {
  // Mode: 'one-by-one' (default requested by user) or 'grid'
  const [viewMode, setViewMode] = useState('one-by-one');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Track which cards have been unlocked
  const [unlockedKeys, setUnlockedKeys] = useState({});

  const currentConfig = SCRATCH_CARDS_LIST[currentIndex];
  const currentCardData = (captions.cards && captions.cards[currentConfig.key]) || {};
  const currentPhotoKey = `${currentConfig.key === 'sister' ? 'sister' : currentConfig.key}Photo`;
  const currentPhotoUrl = photos[currentPhotoKey] || `/sudhan%20and%20lok.jpg`;

  function handlePrev() {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : SCRATCH_CARDS_LIST.length - 1));
  }

  function handleNext() {
    setCurrentIndex((prev) => (prev < SCRATCH_CARDS_LIST.length - 1 ? prev + 1 : 0));
  }

  // When a card is successfully scratched/revealed
  function handleCardRevealed(cardKey) {
    setUnlockedKeys((prev) => ({ ...prev, [cardKey]: true }));

    // Auto-advance to the next card after 1.8 seconds so the user can enjoy the unlocked words, then see the next card automatically!
    if (currentIndex < SCRATCH_CARDS_LIST.length - 1) {
      setTimeout(() => {
        setCurrentIndex((prev) => (prev < SCRATCH_CARDS_LIST.length - 1 ? prev + 1 : prev));
      }, 1800);
    }
  }

  const unlockedCount = Object.keys(unlockedKeys).length;
  const isAllUnlocked = unlockedCount === SCRATCH_CARDS_LIST.length;

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header with View Mode Switcher */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 max-w-4xl px-2">
        <div className="text-center sm:text-left">
          <span className="inline-block px-3.5 py-1 rounded-full bg-rose-100 text-rose-700 font-display text-[11px] sm:text-xs font-bold uppercase tracking-wider mb-1">
            🪙 Interactive Scratch Foil Cards
          </span>
          <h2 className="font-display text-lg sm:text-2xl font-bold text-slate-800">
            Loukya & Birthday Squad Scratch Cards ✨
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm">
            Scratch the foil to reveal photos & heartfelt words — cards advance one by one!
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/80 border border-rose-200 shadow-sm shrink-0">
          <button
            type="button"
            onClick={() => setViewMode('one-by-one')}
            className={`px-3 py-1.5 rounded-xl font-display font-semibold text-xs transition cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'one-by-one'
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>🎴</span>
            <span>One by One</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('grid')}
            className={`px-3 py-1.5 rounded-xl font-display font-semibold text-xs transition cursor-pointer flex items-center gap-1.5 ${
              viewMode === 'grid'
                ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>⊞</span>
            <span>View All Grid</span>
          </button>
        </div>
      </div>

      {/* ==============================================================
          ONE BY ONE SCRATCH MODE (Default requested by user)
          ============================================================== */}
      {viewMode === 'one-by-one' && (
        <div className="w-full max-w-xl mx-auto flex flex-col items-center">
          {/* Card Step Indicator */}
          <div className="flex items-center justify-between w-full px-4 mb-3 text-xs font-display font-bold text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center text-xs">
                {currentIndex + 1}
              </span>
              <span>of {SCRATCH_CARDS_LIST.length} Cards</span>
            </span>

            <span className="text-rose-600 font-semibold flex items-center gap-1">
              <span>{unlockedKeys[currentConfig.key] ? '🔓 Unlocked' : '🔒 Scratch to Unlock'}</span>
            </span>
          </div>

          {/* Pre-rendered Card Deck (All 9 scratch cards preloaded in DOM for 0ms instant display) */}
          {SCRATCH_CARDS_LIST.map((config, idx) => {
            const cardData = (captions.cards && captions.cards[config.key]) || {};
            const photoKey = `${config.key === 'sister' ? 'sister' : config.key}Photo`;
            const photoUrl = photos[photoKey] || `/sudhan%20and%20lok.jpg`;
            const isSelected = idx === currentIndex;

            return (
              <div
                key={config.key}
                className={`${isSelected ? 'w-full block animate-fade-in' : 'hidden'}`}
              >
                <ScratchCardItem
                  config={config}
                  cardData={cardData}
                  photoUrl={photoUrl}
                  isCreatorMode={isCreatorMode}
                  onUploadPhoto={onUploadPhoto}
                  onEditNote={onEditNote}
                  onRevealSuccess={handleCardRevealed}
                  isRevealedProp={unlockedKeys[config.key]}
                />
              </div>
            );
          })}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between w-full mt-4 gap-3 px-1">
            <button
              onClick={handlePrev}
              className="flex-1 py-2.5 px-4 rounded-2xl bg-white hover:bg-rose-50 text-slate-700 font-display font-bold text-xs sm:text-sm border border-slate-200 shadow-sm transition hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>⬅</span>
              <span>Previous Card</span>
            </button>

            <button
              onClick={handleNext}
              className="flex-1 py-2.5 px-4 rounded-2xl bg-gradient-to-r from-rose-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-display font-bold text-xs sm:text-sm shadow-md transition hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Next Card</span>
              <span>➔</span>
            </button>
          </div>

          {/* Dot Pills for Quick Jumping to Any Card */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-4 flex-wrap max-w-full px-2">
            {SCRATCH_CARDS_LIST.map((c, idx) => {
              const isSelected = idx === currentIndex;
              const isUnlocked = unlockedKeys[c.key];

              return (
                <button
                  key={c.key}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full font-display font-bold text-[10px] sm:text-xs transition flex items-center justify-center cursor-pointer shadow-sm ${
                    isSelected
                      ? 'bg-rose-600 text-white scale-110 ring-2 ring-rose-300'
                      : isUnlocked
                      ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
                      : 'bg-white hover:bg-rose-50 text-slate-600 border border-slate-200'
                  }`}
                  title={`Card ${idx + 1} (${isUnlocked ? 'Unlocked' : 'Locked'})`}
                >
                  {isUnlocked ? '🔓' : idx + 1}
                </button>
              );
            })}
          </div>

          {/* Grand Celebration Alert when all 9 cards unlocked */}
          {isAllUnlocked && (
            <div className="w-full mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 text-white font-display font-bold text-xs sm:text-sm text-center shadow-lg animate-pulse">
              🎉 AMAZING! All 9 Scratch Cards & heartfelt wishes are unlocked for Loukya! 💖✨
            </div>
          )}
        </div>
      )}

      {/* ==============================================================
          GRID VIEW MODE (Optional full 2-column overview)
          ============================================================== */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full">
          {SCRATCH_CARDS_LIST.map((config) => {
            const cardData = (captions.cards && captions.cards[config.key]) || {};
            const photoKey = `${config.key === 'sister' ? 'sister' : config.key}Photo`;
            const photoUrl = photos[photoKey] || `/sudhan%20and%20lok.jpg`;

            return (
              <ScratchCardItem
                key={config.key}
                config={config}
                cardData={cardData}
                photoUrl={photoUrl}
                isCreatorMode={isCreatorMode}
                onUploadPhoto={onUploadPhoto}
                onEditNote={onEditNote}
                onRevealSuccess={handleCardRevealed}
                isRevealedProp={unlockedKeys[config.key]}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
