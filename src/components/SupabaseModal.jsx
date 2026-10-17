import React, { useState, useEffect } from 'react';
import { getSupabaseConfig } from '../config/supabase';
import { testSupabaseConnection } from '../services/supabaseService';

export default function SupabaseModal({
  isOpen,
  onClose,
  onSaveConfig,
  onSyncAllPhotos,
  isSyncing
}) {
  const [url, setUrl] = useState('');
  const [anonKey, setAnonKey] = useState('');
  const [bucket, setBucket] = useState('birthday-photos');
  const [testResult, setTestResult] = useState(null);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const cfg = getSupabaseConfig();
      setUrl(cfg.url || '');
      setAnonKey(cfg.anonKey || '');
      setBucket(cfg.bucket || 'birthday-photos');
      setTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleTest() {
    setIsTesting(true);
    setTestResult(null);
    // Temporary apply values to test
    localStorage.setItem('loukya_sb_url', url.trim());
    localStorage.setItem('loukya_sb_anon_key', anonKey.trim());
    localStorage.setItem('loukya_sb_bucket', bucket.trim());

    const res = await testSupabaseConnection();
    setIsTesting(false);
    setTestResult(res);
  }

  function handleSave(e) {
    e.preventDefault();
    localStorage.setItem('loukya_sb_url', url.trim());
    localStorage.setItem('loukya_sb_anon_key', anonKey.trim());
    localStorage.setItem('loukya_sb_bucket', bucket.trim());
    onSaveConfig({ url: url.trim(), anonKey: anonKey.trim(), bucket: bucket.trim() });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl p-5 sm:p-7 max-w-lg w-full shadow-2xl border-2 border-emerald-300 text-left my-6 sm:my-8 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl shadow-inner">
              <i className="fa-solid fa-cloud"></i>
            </div>
            <div>
              <h3 className="font-display font-bold text-base sm:text-lg text-slate-800">
                Supabase Cloud Storage
              </h3>
              <p className="text-xs text-slate-500">
                Sync photos & custom text universally across all devices
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

        {/* Sync Action Callout */}
        <div className="mb-5 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-pink-50 border border-emerald-200">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div>
              <h4 className="font-display font-bold text-xs sm:text-sm text-emerald-900">
                Sync Everything to Cloud Now 🚀
              </h4>
              <p className="text-[11px] sm:text-xs text-emerald-700">
                Uploads all your photos & custom captions so everyone sees them!
              </p>
            </div>
            <button
              type="button"
              onClick={onSyncAllPhotos}
              disabled={isSyncing}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-display font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition cursor-pointer disabled:opacity-50"
            >
              {isSyncing ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin mr-1"></i>Syncing...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-cloud-arrow-up mr-1"></i>Sync Photos Now
                </>
              )}
            </button>
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSave} className="space-y-3.5 text-xs sm:text-sm">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Supabase Project URL:
            </label>
            <input
              type="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://your-project.supabase.co"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-none transition font-mono text-xs"
            />
            <p className="text-[10px] text-slate-400 mt-0.5">
              Available from Supabase Project Settings ➔ API ➔ Project URL
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Supabase Public Anon Key:
            </label>
            <input
              type="password"
              value={anonKey}
              onChange={e => setAnonKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-none transition font-mono text-xs"
            />
            <p className="text-[10px] text-slate-400 mt-0.5">
              Available from Project Settings ➔ API ➔ Project API keys ➔ anon public
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Storage Bucket Name:
            </label>
            <input
              type="text"
              value={bucket}
              onChange={e => setBucket(e.target.value)}
              placeholder="birthday-photos"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:outline-none transition font-mono text-xs"
            />
            <p className="text-[10px] text-slate-400 mt-0.5">
              Make sure this bucket is toggled to <strong>Public</strong> in Supabase Storage!
            </p>
          </div>

          {testResult && (
            <div
              className={`p-2.5 rounded-xl text-xs font-medium ${
                testResult.ok
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}
            >
              {testResult.message}
            </div>
          )}

          {/* Footer Buttons */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleTest}
              disabled={isTesting}
              className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-display font-semibold text-xs transition cursor-pointer flex items-center gap-1.5"
            >
              <i className="fa-solid fa-plug"></i>
              <span>{isTesting ? 'Testing...' : 'Test Connection'}</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-display font-semibold text-xs transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-display font-bold text-xs shadow-md transition cursor-pointer"
              >
                Save & Connect
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
