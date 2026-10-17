export const PhotoDB = {
  db: null,
  async init() {
    if (this.db) return this.db;
    return new Promise((resolve) => {
      if (typeof window === 'undefined' || !window.indexedDB) return resolve(null);
      const req = indexedDB.open('LoukyaBirthdayPhotosDB', 1);
      req.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('photos')) {
          db.createObjectStore('photos', { keyPath: 'id' });
        }
      };
      req.onsuccess = (e) => {
        this.db = e.target.result;
        resolve(this.db);
      };
      req.onerror = () => resolve(null);
    });
  },

  async savePhoto(slotKey, dataUrl) {
    try {
      const db = await this.init();
      if (db) {
        return new Promise((resolve) => {
          const tx = db.transaction('photos', 'readwrite');
          const store = tx.objectStore('photos');
          store.put({ id: slotKey, dataUrl, timestamp: Date.now() });
          tx.oncomplete = () => resolve(true);
          tx.onerror = () => {
            try { localStorage.setItem('cached_photo_' + slotKey, dataUrl); } catch (e) {}
            resolve(false);
          };
        });
      }
    } catch (e) {}
    try { localStorage.setItem('cached_photo_' + slotKey, dataUrl); } catch (e) {}
    return true;
  },

  async getPhoto(slotKey) {
    try {
      const db = await this.init();
      if (db) {
        return new Promise((resolve) => {
          const tx = db.transaction('photos', 'readonly');
          const store = tx.objectStore('photos');
          const req = store.get(slotKey);
          req.onsuccess = () => resolve(req.result ? req.result.dataUrl : null);
          req.onerror = () => resolve(localStorage.getItem('cached_photo_' + slotKey));
        });
      }
    } catch (e) {}
    return localStorage.getItem('cached_photo_' + slotKey);
  },

  async getAllPhotos() {
    const map = {};
    try {
      const db = await this.init();
      if (db) {
        await new Promise((resolve) => {
          const tx = db.transaction('photos', 'readonly');
          const store = tx.objectStore('photos');
          const req = store.openCursor();
          req.onsuccess = (e) => {
            const cursor = e.target.result;
            if (cursor) {
              map[cursor.value.id] = cursor.value.dataUrl;
              cursor.continue();
            } else {
              resolve();
            }
          };
          req.onerror = () => resolve();
        });
      }
    } catch (e) {}

    // Fallback check in localStorage
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('cached_photo_')) {
          const slot = key.replace('cached_photo_', '');
          if (!map[slot]) {
            map[slot] = localStorage.getItem(key);
          }
        }
      }
    } catch (e) {}

    return map;
  }
};

export const getAllPhotosFromDB = () => PhotoDB.getAllPhotos();
export const savePhotoToDB = (slotKey, dataUrl) => PhotoDB.savePhoto(slotKey, dataUrl);
export const getPhotoFromDB = (slotKey) => PhotoDB.getPhoto(slotKey);
