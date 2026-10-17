import React, { useState, useEffect } from 'react';
import { DEFAULT_CAPTIONS } from '../config/defaultData';

export default function CaptionEditorModal({
  isOpen,
  initialKey,
  captions,
  onSave,
  onReset,
  onClose
}) {
  const [selectedKey, setSelectedKey] = useState(initialKey || 'guest4');
  const [noteTitle, setNoteTitle] = useState('');
  const [friendBadge, setFriendBadge] = useState('');
  const [photoCaption, setPhotoCaption] = useState('');
  const [noteBody, setNoteBody] = useState('');
  const [noteTags, setNoteTags] = useState('');

  const [frameTitle, setFrameTitle] = useState('');
  const [frameSubtitle, setFrameSubtitle] = useState('');
  const [frameQuote, setFrameQuote] = useState('');

  useEffect(() => {
    if (initialKey) setSelectedKey(initialKey);
  }, [initialKey]);

  useEffect(() => {
    if (!isOpen) return;

    if (selectedKey.startsWith('frame-')) {
      const idx = selectedKey.replace('frame-', '');
      const frameData = (captions.frames && captions.frames[idx]) || (DEFAULT_CAPTIONS.frames && DEFAULT_CAPTIONS.frames[idx]) || {};
      setFrameTitle(frameData.title || '');
      setFrameSubtitle(frameData.subtitle || '');
      setFrameQuote(frameData.quote || '');
    } else {
      const cardData = (captions.cards && captions.cards[selectedKey]) || (DEFAULT_CAPTIONS.cards && DEFAULT_CAPTIONS.cards[selectedKey]) || {};
      setNoteTitle(cardData.title || '');
      setFriendBadge((cardData.badge || '').replace(/<[^>]*>/g, '').trim());
      setPhotoCaption(cardData.photoCaption || '');
      setNoteBody(Array.isArray(cardData.paragraphs) ? cardData.paragraphs.join('\n\n') : '');
      setNoteTags(Array.isArray(cardData.tags) ? cardData.tags.join(', ') : '');
    }
  }, [selectedKey, captions, isOpen]);

  if (!isOpen) return null;

  const isFrame = selectedKey.startsWith('frame-');

  function handleSave(e) {
    e.preventDefault();
    if (isFrame) {
      const idx = selectedKey.replace('frame-', '');
      onSave(selectedKey, {
        title: frameTitle.trim(),
        subtitle: frameSubtitle.trim(),
        quote: frameQuote.trim()
      });
    } else {
      const paragraphs = noteBody.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
      const tags = noteTags.split(',').map(t => t.trim()).filter(Boolean);

      // Preserve badge icon if user typed plain text
      const prev = (captions.cards && captions.cards[selectedKey]) || (DEFAULT_CAPTIONS.cards && DEFAULT_CAPTIONS.cards[selectedKey]) || {};
      let finalBadge = friendBadge.trim() || prev.badge || '';
      const iconMatch = (prev.badge || '').match(/<i[^>]*><\/i>/);
      if (iconMatch && friendBadge.trim() && !friendBadge.includes('<i')) {
        finalBadge = `${iconMatch[0]} ${friendBadge.trim()}`;
      }

      onSave(selectedKey, {
        badge: finalBadge,
        photoCaption: photoCaption.trim(),
        title: noteTitle.trim(),
        paragraphs: paragraphs.length > 0 ? paragraphs : prev.paragraphs,
        tags: tags.length > 0 ? tags : prev.tags
      });
    }
    onClose();
  }

  function handleReset() {
    onReset(selectedKey);
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-5 sm:p-7 max-w-2xl w-full shadow-2xl border-2 border-rose-300 text-left my-6 sm:my-8 max-h-[92vh] flex flex-col animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-3 sm:mb-4 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-rose-500 via-pink-500 to-amber-500 text-white flex items-center justify-center text-lg sm:text-xl shadow-md shrink-0">
              <i className="fa-solid fa-pen-to-square"></i>
            </div>
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-slate-800">
                Edit Captions & Birthday Notes 📝✨
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500">
                Personalize wishes, titles, quotes & captions for Loukya & friends
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition cursor-pointer"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSave} className="space-y-4 overflow-y-auto pr-1 flex-1 text-xs sm:text-sm">
          {/* Card / Frame Selector */}
          <div className="bg-rose-50/70 p-3 rounded-2xl border border-rose-100">
            <label className="block text-xs font-bold text-slate-700 mb-1.5 flex items-center justify-between">
              <span>Select Card / Note to Edit:</span>
              <span className="text-[11px] text-rose-600 font-semibold font-display">
                {isFrame ? `Frame #${selectedKey.replace('frame-', '')}` : `Card: ${selectedKey}`}
              </span>
            </label>
            <select
              value={selectedKey}
              onChange={e => setSelectedKey(e.target.value)}
              className="w-full text-xs sm:text-sm font-sans px-3.5 py-2.5 rounded-xl border border-rose-200 bg-white focus:border-rose-500 focus:outline-none transition shadow-sm font-medium"
            >
              <optgroup label="✨ Interactive Scratch Cards (Screen 4)">
                <option value="guest4">🌸 Card 5: Soul Sister (Heartfelt Note)</option>
                <option value="sister">👑 Card 1: Loukya (Birthday Wishes)</option>
                <option value="anupriyali">💜 Card 2: Anupriyali (VIP Spotlight)</option>
                <option value="guest2">☀️ Card 3: Sunshine Soul (Sweet Smiles)</option>
                <option value="guest3">🌟 Card 4: Partner in Fun (Party Cheers)</option>
                <option value="guest5">😂 Card 6: Chaos Officer (Iconic Vibe)</option>
                <option value="guest6">🥂 Card 7: Forever Cheerleader (Celebration Toast)</option>
                <option value="guest7">🌟 Card 8: Adventure Partner (Adventure Cheers)</option>
                <option value="guest8">💖 Card 9: Partner in Crime (Heartfelt Love)</option>
              </optgroup>
              <optgroup label="🖼️ Cake Cutting Frames (Top Gallery)">
                <option value="frame-1">👑 Frame 1: Birthday Queen Loukya</option>
                <option value="frame-2">🫶 Frame 2: Special Guest: Anupriyali</option>
                <option value="frame-3">💖 Frame 3: Sunshine Soul</option>
                <option value="frame-4">🌟 Frame 4: Partner in Fun</option>
                <option value="frame-5">🌸 Frame 5: Soul Sister</option>
                <option value="frame-6">🎉 Frame 6: Chaos Officer</option>
                <option value="frame-7">🎂 Frame 7: Forever Cheerleader</option>
                <option value="frame-8">🌟 Frame 8: Adventure Partner</option>
                <option value="frame-9">💖 Frame 9: Partner in Crime</option>
              </optgroup>
            </select>
          </div>

          {!isFrame ? (
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Note Title:
                </label>
                <input
                  type="text"
                  value={noteTitle}
                  onChange={e => setNoteTitle(e.target.value)}
                  placeholder="e.g. Heartfelt Note For Loukya 🌷✨"
                  className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-200 focus:border-rose-500 focus:outline-none transition font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Friend Badge / Header:
                  </label>
                  <input
                    type="text"
                    value={friendBadge}
                    onChange={e => setFriendBadge(e.target.value)}
                    placeholder="e.g. Special Friend: Soul Sister 🌸"
                    className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-200 focus:border-rose-500 focus:outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Polaroid Photo Caption:
                  </label>
                  <input
                    type="text"
                    value={photoCaption}
                    onChange={e => setPhotoCaption(e.target.value)}
                    placeholder="e.g. Gentle soul, warmest heart! 🌷"
                    className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-200 focus:border-rose-500 focus:outline-none transition font-script text-base"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center justify-between">
                  <span>Note Body / Birthday Words:</span>
                  <span className="text-[10px] text-slate-400">Separate paragraphs with blank lines</span>
                </label>
                <textarea
                  rows={5}
                  value={noteBody}
                  onChange={e => setNoteBody(e.target.value)}
                  placeholder="Write your heartfelt birthday wishes here..."
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 focus:border-rose-500 focus:outline-none transition leading-relaxed"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Bottom Tags (comma separated):
                </label>
                <input
                  type="text"
                  value={noteTags}
                  onChange={e => setNoteTags(e.target.value)}
                  placeholder="e.g. 🌷 Purest Heart, 🫶 Comfort Person, 🕊️ Peaceful Vibes"
                  className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-200 focus:border-rose-500 focus:outline-none transition"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Frame Header:
                </label>
                <input
                  type="text"
                  value={frameTitle}
                  onChange={e => setFrameTitle(e.target.value)}
                  placeholder="e.g. 🌸 Special Guest: Soul Sister"
                  className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-200 focus:border-rose-500 focus:outline-none transition font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Photo Subtitle:
                </label>
                <input
                  type="text"
                  value={frameSubtitle}
                  onChange={e => setFrameSubtitle(e.target.value)}
                  placeholder="e.g. 💖 Best Memories"
                  className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-200 focus:border-rose-500 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cake Eating Quote / Reaction:
                </label>
                <textarea
                  rows={3}
                  value={frameQuote}
                  onChange={e => setFrameQuote(e.target.value)}
                  placeholder="e.g. Full of sweetness, love and forever memories! 💕✨"
                  className="w-full text-xs sm:text-sm px-3.5 py-2 rounded-xl border border-slate-200 focus:border-rose-500 focus:outline-none transition italic"
                ></textarea>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="mt-4 pt-3.5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 shrink-0">
            <button
              type="button"
              onClick={handleReset}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-display font-semibold text-xs transition cursor-pointer flex items-center gap-1.5"
            >
              <i className="fa-solid fa-rotate-left"></i>
              <span>Reset This Note</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-display font-semibold text-xs sm:text-sm transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 hover:from-rose-600 hover:to-purple-700 text-white font-display font-bold text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition cursor-pointer flex items-center gap-1.5"
              >
                <i className="fa-solid fa-floppy-disk"></i>
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
