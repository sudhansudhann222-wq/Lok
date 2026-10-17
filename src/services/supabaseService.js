import { getSupabaseClient, getSupabaseConfig } from '../config/supabase';

// Helper to convert data URL or URL to Blob
async function urlToBlob(url) {
  if (url.startsWith('data:')) {
    const arr = url.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = (mimeMatch && mimeMatch[1]) || 'image/jpeg';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  } else {
    const res = await fetch(url);
    return await res.blob();
  }
}

export async function uploadPhotoToSupabase(arg1, arg2) {
  // Gracefully handle either (slotKey, fileOrBlob) or (fileOrBlob, slotKey)
  let slotKey, fileOrBlob;
  if (typeof arg1 === 'string') {
    slotKey = arg1;
    fileOrBlob = arg2;
  } else {
    fileOrBlob = arg1;
    slotKey = arg2;
  }

  const client = getSupabaseClient();
  if (!client) return { ok: false, error: 'Supabase client not configured' };
  const cfg = getSupabaseConfig();

  try {
    // If it's a data URL string or regular URL, convert to Blob
    let blobToUpload = fileOrBlob;
    if (typeof fileOrBlob === 'string') {
      blobToUpload = await urlToBlob(fileOrBlob);
    }

    const fileExt = (blobToUpload.type && blobToUpload.type.split('/')[1]) || 'jpg';
    const fileName = `photos/${slotKey}.${fileExt}`;

    let uploadRes = await client.storage
      .from(cfg.bucket)
      .upload(fileName, blobToUpload, {
        upsert: true,
        contentType: blobToUpload.type || 'image/jpeg',
        cacheControl: '3600'
      });

    // Auto-recovery if bucket doesn't exist yet
    if (
      uploadRes.error &&
      (uploadRes.error.message.includes('Bucket not found') || uploadRes.error.statusCode === 404)
    ) {
      try {
        await client.storage.createBucket(cfg.bucket, { public: true });
        uploadRes = await client.storage
          .from(cfg.bucket)
          .upload(fileName, blobToUpload, {
            upsert: true,
            contentType: blobToUpload.type || 'image/jpeg',
            cacheControl: '3600'
          });
      } catch (e) {
        console.warn('Bucket create attempt note:', e);
      }
    }

    if (uploadRes.error) {
      console.warn('Supabase upload notice:', uploadRes.error.message);
      return { ok: false, error: uploadRes.error.message };
    }

    const { data: pubData } = client.storage.from(cfg.bucket).getPublicUrl(fileName);
    const publicUrl = pubData ? `${pubData.publicUrl}?t=${Date.now()}` : null;

    if (publicUrl) {
      try {
        let manifest = {};
        const { data: manifestData } = await client.storage
          .from(cfg.bucket)
          .download('photos_manifest.json');
        if (manifestData) {
          const text = await manifestData.text();
          manifest = JSON.parse(text) || {};
        }
        manifest[slotKey] = publicUrl;
        const manifestBlob = new Blob([JSON.stringify(manifest, null, 2)], {
          type: 'application/json'
        });
        await client.storage.from(cfg.bucket).upload('photos_manifest.json', manifestBlob, {
          upsert: true,
          contentType: 'application/json'
        });
      } catch (mErr) {
        console.warn('Supabase manifest update notice:', mErr);
      }
    }

    return { ok: true, url: publicUrl };
  } catch (err) {
    console.error('uploadPhotoToSupabase error:', err);
    return { ok: false, error: err.message };
  }
}

export async function fetchPhotosManifest() {
  const client = getSupabaseClient();
  if (!client) return null;
  const cfg = getSupabaseConfig();

  try {
    const { data: pubData } = client.storage.from(cfg.bucket).getPublicUrl('photos_manifest.json');
    if (pubData && pubData.publicUrl) {
      const res = await fetch(`${pubData.publicUrl}?t=${Date.now()}`);
      if (res.ok) {
        return await res.json();
      }
    }
    const { data: manifestData } = await client.storage
      .from(cfg.bucket)
      .download('photos_manifest.json');
    if (manifestData) {
      const text = await manifestData.text();
      return JSON.parse(text);
    }
  } catch (err) {
    // normal if not yet uploaded
  }
  return null;
}

export const downloadManifestFromSupabase = fetchPhotosManifest;

export async function syncCaptionsToSupabase(captions) {
  const client = getSupabaseClient();
  if (!client) return { ok: false, error: 'Not configured' };
  const cfg = getSupabaseConfig();

  try {
    const blob = new Blob([JSON.stringify(captions, null, 2)], { type: 'application/json' });
    const res = await client.storage.from(cfg.bucket).upload('captions_manifest.json', blob, {
      upsert: true,
      contentType: 'application/json',
      cacheControl: '0'
    });
    if (res.error) return { ok: false, error: res.error.message };
    return { ok: true };
  } catch (err) {
    console.warn('Could not sync captions to Supabase:', err);
    return { ok: false, error: err.message };
  }
}

export async function fetchCaptionsFromSupabase() {
  const client = getSupabaseClient();
  if (!client) return null;
  const cfg = getSupabaseConfig();

  try {
    const { data: pubData } = client.storage.from(cfg.bucket).getPublicUrl('captions_manifest.json');
    if (pubData && pubData.publicUrl) {
      const res = await fetch(`${pubData.publicUrl}?t=${Date.now()}`);
      if (res.ok) {
        return await res.json();
      }
    }
    const { data } = await client.storage.from(cfg.bucket).download('captions_manifest.json');
    if (data) {
      const text = await data.text();
      return JSON.parse(text);
    }
  } catch (err) {}
  return null;
}

export const downloadCaptionsFromSupabase = fetchCaptionsFromSupabase;

export async function syncAllPhotosToSupabase(photosMap) {
  const client = getSupabaseClient();
  if (!client) return { ok: false, error: 'Supabase client not configured' };

  let count = 0;
  const manifest = {};

  for (const [slotKey, urlOrData] of Object.entries(photosMap)) {
    if (!urlOrData) continue;
    try {
      const res = await uploadPhotoToSupabase(slotKey, urlOrData);
      if (res.ok && res.url) {
        manifest[slotKey] = res.url;
        count++;
      }
    } catch (e) {
      console.warn(`Error syncing photo for ${slotKey}:`, e);
    }
  }

  return { ok: true, count, manifest };
}

export async function testSupabaseConnection() {
  const client = getSupabaseClient();
  if (!client) return { ok: false, message: 'Please enter Supabase URL and Anon Key!' };
  const cfg = getSupabaseConfig();

  try {
    const { data, error } = await client.storage.from(cfg.bucket).list('', { limit: 1 });
    if (error) {
      if (error.message && error.message.includes('Bucket not found')) {
        return {
          ok: true,
          bucketMissing: true,
          message: `Connected to Supabase! Bucket "${cfg.bucket}" will be created on first upload.`
        };
      }
      return { ok: false, message: error.message };
    }
    return { ok: true, message: `Connected to Supabase! Bucket "${cfg.bucket}" is accessible.` };
  } catch (err) {
    return { ok: false, message: err.message || 'Connection error' };
  }
}
