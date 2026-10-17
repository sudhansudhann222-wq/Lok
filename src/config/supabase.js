import { createClient } from '@supabase/supabase-js';

export function getSupabaseConfig() {
  const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  const envBucket = import.meta.env.VITE_SUPABASE_BUCKET || 'birthday-photos';
  const envPin = import.meta.env.VITE_CREATOR_PIN || '1234';

  return {
    url: localStorage.getItem('loukya_sb_url') || envUrl,
    anonKey: localStorage.getItem('loukya_sb_anon_key') || envKey,
    bucket: localStorage.getItem('loukya_sb_bucket') || envBucket,
    creatorPin: localStorage.getItem('loukya_creator_pin') || envPin
  };
}

let cachedClient = null;
let lastUrl = null;
let lastKey = null;

export function getSupabaseClient() {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey) return null;

  if (!cachedClient || lastUrl !== url || lastKey !== anonKey) {
    try {
      cachedClient = createClient(url, anonKey);
      lastUrl = url;
      lastKey = anonKey;
    } catch (err) {
      console.warn('Failed to create Supabase client:', err);
      return null;
    }
  }

  return cachedClient;
}
