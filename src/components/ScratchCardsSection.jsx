import React from 'react';
import { SCRATCH_CARDS_LIST } from '../config/defaultData';
import ScratchCardItem from './ScratchCardItem';

export default function ScratchCardsSection({
  photos,
  captions,
  isCreatorMode,
  onUploadPhoto,
  onEditNote
}) {
  return (
    <div className="w-full">
      <div className="w-full text-center mb-8">
        <span className="inline-block px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-rose-100 text-rose-700 font-display text-[11px] sm:text-sm font-bold uppercase tracking-wider mb-2">
          🪙 Interactive Scratch Foil Cards
        </span>
        <h2 className="font-display text-xl sm:text-3xl md:text-4xl font-bold text-slate-800">
          Loukya, Anupriyali & Birthday Squad Scratch Cards ✨
        </h2>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl mx-auto">
          Scratch off the foil on each card below with your finger or mouse (or tap Instant Reveal) to unlock customized photos and heartfelt birthday words!
        </p>
      </div>

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
            />
          );
        })}
      </div>
    </div>
  );
}
