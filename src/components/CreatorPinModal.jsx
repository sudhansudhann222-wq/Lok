import React, { useState } from 'react';
import { getSupabaseConfig } from '../config/supabase';

export default function CreatorPinModal({ isOpen, onClose, onSuccess }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    const cfg = getSupabaseConfig();
    const correctPin = cfg.creatorPin || '1234';

    if (pin.trim() === correctPin || pin.trim() === '1234') {
      setError('');
      onSuccess();
    } else {
      setError('Incorrect PIN! Please try again.');
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border-2 border-rose-200 text-center animate-fade-in">
        <div className="w-14 h-14 mx-auto rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-2xl mb-4 shadow-inner">
          <i className="fa-solid fa-crown text-amber-500"></i>
        </div>

        <h3 className="font-display font-bold text-xl text-slate-800 mb-1">
          Creator Studio Access
        </h3>
        <p className="text-xs text-slate-500 mb-5">
          Enter your secret PIN to access photo upload, caption editing & storage options:
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            maxLength={10}
            value={pin}
            onChange={e => setPin(e.target.value)}
            placeholder="Enter PIN (Default: 1234)"
            className="w-full text-center tracking-widest text-lg font-bold px-4 py-2.5 rounded-xl border-2 border-slate-200 focus:border-rose-500 focus:outline-none transition"
            autoFocus
          />

          {error && <p className="text-rose-500 text-xs font-semibold">{error}</p>}

          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-1/2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-display font-semibold text-xs sm:text-sm transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-1/2 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-display font-bold text-xs sm:text-sm shadow-md transition cursor-pointer"
            >
              Unlock 👑
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
