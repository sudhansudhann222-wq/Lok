import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

// Config & Data
import { DEFAULT_PHOTO_URLS, DEFAULT_CAPTIONS, FRAMES_LIST } from './config/defaultData';
import { getSupabaseConfig } from './config/supabase';

// Services
import { getAllPhotosFromDB, savePhotoToDB } from './services/photoDB';
import {
  uploadPhotoToSupabase,
  downloadManifestFromSupabase,
  syncCaptionsToSupabase,
  downloadCaptionsFromSupabase,
  syncAllPhotosToSupabase
} from './services/supabaseService';
import { playCakeBiteSound, playCakeSliceSound } from './services/audioService';

// Components
import BackgroundCanvas from './components/BackgroundCanvas';
import TopAudioControls from './components/TopAudioControls';
import ToastContainer from './components/ToastContainer';
import Screen1Prompt from './components/Screen1Prompt';
import Screen2Tease from './components/Screen2Tease';
import Screen3GiftBox from './components/Screen3GiftBox';
import BirthdayCake from './components/BirthdayCake';
import CakeServingDashboard from './components/CakeServingDashboard';
import CakeFeedingGallery from './components/CakeFeedingGallery';
import ScratchCardsSection from './components/ScratchCardsSection';
import CreatorToolbar from './components/CreatorToolbar';
import CreatorPinModal from './components/CreatorPinModal';
import SupabaseModal from './components/SupabaseModal';
import CaptionEditorModal from './components/CaptionEditorModal';

export default function App() {
  // Screen flow: 1 (Prompt), 2 (Tease), 3 (GiftBox), 4 (Main Celebration)
  const [screen, setScreen] = useState(1);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Celebration states
  const [isCakeCut, setIsCakeCut] = useState(false);
  const [blownCandles, setBlownCandles] = useState([false, false, false]);
  const [cakeServedState, setCakeServedState] = useState(new Array(9).fill(false));

  // Dynamic Photos & Captions
  const [photos, setPhotos] = useState(DEFAULT_PHOTO_URLS);
  const [captions, setCaptions] = useState(DEFAULT_CAPTIONS);

  // Creator Studio & Modals
  const [isCreatorMode, setIsCreatorMode] = useState(false);
  const [isPreviewingAsLoukya, setIsPreviewingAsLoukya] = useState(false);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const [isCaptionModalOpen, setIsCaptionModalOpen] = useState(false);
  const [editingCaptionKey, setEditingCaptionKey] = useState('guest4');

  // Toasts
  const [toasts, setToasts] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);

  // Audio Reference
  const audioRef = useRef(null);

  // Helper: Trigger Confetti
  function triggerConfetti() {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f43f5e', '#ec4899', '#a855f7', '#fbbf24', '#38bdf8']
      });
    } catch (e) {
      console.warn('Confetti error:', e);
    }
  }

  // Toast Helper
  function showToast(message, type = 'info', duration = 3500) {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }

  function removeToast(id) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  // Background Audio Toggle
  function toggleMusic() {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play()
        .then(() => setIsMusicPlaying(true))
        .catch((err) => {
          console.warn('Autoplay prevented:', err);
          showToast('Tap anywhere on the screen to allow audio playback 🎵', 'info');
        });
    } else {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    }
  }

  function startMusicIfNeeded() {
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play()
        .then(() => setIsMusicPlaying(true))
        .catch(() => {});
    }
  }

  // Hydrate local data on mount
  useEffect(() => {
    // 1. Check URL parameters
    const params = new URLSearchParams(window.location.search);
    if (params.get('creator') === '1' || params.get('creator') === 'true') {
      setIsCreatorMode(true);
      showToast('👑 Creator Studio Active! You can edit photos and notes.', 'success');
    }
    if (params.get('screen') === '4') {
      setScreen(4);
    }

    // 2. Hydrate photos from IndexedDB
    getAllPhotosFromDB()
      .then((savedPhotos) => {
        if (savedPhotos && Object.keys(savedPhotos).length > 0) {
          setPhotos((prev) => ({ ...prev, ...savedPhotos }));
        }
      })
      .catch((err) => console.warn('IndexedDB load error:', err));

    // 3. Hydrate captions from localStorage
    try {
      const storedCaptions = localStorage.getItem('loukya_custom_captions');
      if (storedCaptions) {
        const parsed = JSON.parse(storedCaptions);
        setCaptions((prev) => ({
          ...prev,
          cards: { ...prev.cards, ...parsed.cards },
          frames: { ...prev.frames, ...parsed.frames }
        }));
      }
    } catch (e) {
      console.warn('Captions parse error:', e);
    }

    // 4. Check Supabase Remote Manifest for universal sync
    const sbConfig = getSupabaseConfig();
    if (sbConfig.isConfigured) {
      downloadManifestFromSupabase()
        .then((remotePhotos) => {
          if (remotePhotos && Object.keys(remotePhotos).length > 0) {
            setPhotos((prev) => ({ ...prev, ...remotePhotos }));
            // Also cache to IndexedDB for offline fast loads
            Object.entries(remotePhotos).forEach(([slot, url]) => {
              savePhotoToDB(slot, url);
            });
          }
        })
        .catch((err) => console.warn('Supabase remote photos error:', err));

      downloadCaptionsFromSupabase()
        .then((remoteCaptions) => {
          if (remoteCaptions && (remoteCaptions.cards || remoteCaptions.frames)) {
            setCaptions((prev) => ({
              ...prev,
              cards: { ...prev.cards, ...remoteCaptions.cards },
              frames: { ...prev.frames, ...remoteCaptions.frames }
            }));
            localStorage.setItem('loukya_custom_captions', JSON.stringify(remoteCaptions));
          }
        })
        .catch((err) => console.warn('Supabase remote captions error:', err));
    }
  }, []);

  // Keyboard shortcut for Creator Mode: Ctrl+Shift+C
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        if (isCreatorMode) {
          setIsCreatorMode(false);
          showToast('Creator Studio Locked 🔒', 'info');
        } else {
          setIsPinModalOpen(true);
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCreatorMode]);

  // Cake Actions
  function handleCutCake() {
    setIsCakeCut(true);
    triggerConfetti();
    showToast('🎂 The Cake is Cut! Serve delicious slices to Loukya & Friends below! 🍰✨', 'success');
  }

  function handleRelight() {
    setIsCakeCut(false);
    setBlownCandles([false, false, false]);
    showToast('Candles relit! Make another birthday wish ✨', 'info');
  }

  // Cake Serving Actions
  function handleServeOne(index) {
    if (cakeServedState[index]) return;
    playCakeBiteSound();
    triggerConfetti();

    setCakeServedState((prev) => {
      const next = [...prev];
      next[index] = true;
      return next;
    });

    const frame = FRAMES_LIST[index];
    const frameData = (captions.frames && captions.frames[frame.id]) || {};
    const title = frameData.title || `Friend #${index + 1}`;
    showToast(`🍰 Fed cake to ${title}! Yum! ✨`, 'success');
  }

  function handleServeAll() {
    playCakeSliceSound();
    setTimeout(playCakeBiteSound, 250);
    triggerConfetti();

    setCakeServedState(new Array(9).fill(true));
    showToast('🎉 All 9 friends & Loukya are served delicious cake! 🥳🎂', 'success');
  }

  function handleResetServing() {
    setCakeServedState(new Array(9).fill(false));
    showToast('Ready to serve cake again! 🍰', 'info');
  }

  // Handle Local Photo Upload
  function handleUploadPhoto(e, slotId) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Url = event.target.result;

      // 1. Update React state immediately
      setPhotos((prev) => ({ ...prev, [slotId]: base64Url }));

      // 2. Persist locally to IndexedDB
      await savePhotoToDB(slotId, base64Url);

      // 3. Upload to Supabase if configured
      const sbConfig = getSupabaseConfig();
      if (sbConfig.isConfigured) {
        showToast('Uploading photo to Supabase cloud...', 'info');
        const uploadRes = await uploadPhotoToSupabase(file, slotId);
        if (uploadRes.ok) {
          showToast(`Photo synced to cloud for ${slotId}! ☁️✨`, 'success');
          // Update slot with public CDN URL
          setPhotos((prev) => ({ ...prev, [slotId]: uploadRes.url }));
          await savePhotoToDB(slotId, uploadRes.url);
        } else {
          showToast(`Cloud upload note: ${uploadRes.error} (Saved locally!)`, 'warning');
        }
      } else {
        showToast(`Photo updated & saved on this device! 💖`, 'success');
      }
    };
    reader.readAsDataURL(file);
  }

  // Handle Captions Save & Reset
  function handleSaveCaption(targetKey, newValues) {
    let nextCaptions;
    if (targetKey.startsWith('frame-')) {
      const idx = targetKey.replace('frame-', '');
      nextCaptions = {
        ...captions,
        frames: {
          ...captions.frames,
          [idx]: { ...(captions.frames && captions.frames[idx]), ...newValues }
        }
      };
    } else {
      nextCaptions = {
        ...captions,
        cards: {
          ...captions.cards,
          [targetKey]: { ...(captions.cards && captions.cards[targetKey]), ...newValues }
        }
      };
    }

    setCaptions(nextCaptions);
    try {
      localStorage.setItem('loukya_custom_captions', JSON.stringify(nextCaptions));
    } catch (e) {
      console.warn('Caption save storage error:', e);
    }

    const sbConfig = getSupabaseConfig();
    if (sbConfig.isConfigured) {
      syncCaptionsToSupabase(nextCaptions)
        .then((res) => {
          if (res.ok) showToast('Captions synced to cloud universally! ☁️✨', 'success');
        })
        .catch(() => {});
    }

    showToast('Birthday caption saved! ✨', 'success');
  }

  function handleResetCaption(targetKey) {
    if (targetKey.startsWith('frame-')) {
      const idx = targetKey.replace('frame-', '');
      const defaultF = DEFAULT_CAPTIONS.frames[idx] || {};
      handleSaveCaption(targetKey, defaultF);
    } else {
      const defaultC = DEFAULT_CAPTIONS.cards[targetKey] || {};
      handleSaveCaption(targetKey, defaultC);
    }
    showToast('Reset to original birthday message!', 'info');
  }

  // Full Cloud Sync Action
  async function handleSyncAllToSupabase() {
    setIsSyncing(true);
    showToast('Starting full photo & caption sync to Supabase...', 'info');

    try {
      // Sync photos
      const photoResult = await syncAllPhotosToSupabase(photos);
      // Sync captions
      const capResult = await syncCaptionsToSupabase(captions);

      if (photoResult.ok && capResult.ok) {
        showToast(`Universal sync complete! ${photoResult.count || 0} photos & notes live on Supabase! 🚀`, 'success', 5000);
      } else {
        showToast('Sync finished with notes. Check Supabase permissions.', 'warning');
      }
    } catch (err) {
      showToast(`Sync error: ${err.message}`, 'error');
    } finally {
      setIsSyncing(false);
    }
  }

  // Active creator editing mode (turns off when creator toggles Loukya preview)
  const effectiveCreatorMode = isCreatorMode && !isPreviewingAsLoukya;

  return (
    <div className="min-h-screen text-slate-800 relative flex flex-col justify-between selection:bg-rose-200 selection:text-rose-900">
      {/* Background Floating Canvas */}
      <BackgroundCanvas />

      {/* Top Floating Controls */}
      <TopAudioControls
        isMusicPlaying={isMusicPlaying}
        toggleMusic={toggleMusic}
        triggerConfetti={triggerConfetti}
      />

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src="/Steps_and_Stanzas.mp3"
        loop
        preload="auto"
      />

      {/* Main Container */}
      <main className="container mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-10 z-10 flex-1 flex flex-col justify-center">
        {/* Screen 1: Prompt */}
        {screen === 1 && (
          <Screen1Prompt
            onYes={() => {
              startMusicIfNeeded();
              triggerConfetti();
              setScreen(3);
            }}
            onNo={() => {
              setScreen(2);
            }}
          />
        )}

        {/* Screen 2: Tease */}
        {screen === 2 && (
          <Screen2Tease
            onYes={() => {
              startMusicIfNeeded();
              triggerConfetti();
              setScreen(3);
            }}
          />
        )}

        {/* Screen 3: Gift Box 3D */}
        {screen === 3 && (
          <Screen3GiftBox
            onOpenGift={() => {
              triggerConfetti();
              setScreen(4);
            }}
          />
        )}

        {/* Screen 4: Full Birthday Celebration */}
        {screen === 4 && (
          <div className="w-full max-w-6xl mx-auto flex flex-col items-center animate-fade-in pb-20">
            {/* Header / Hero Banner */}
            <div className="text-center mb-6 sm:mb-10 w-full">
              <span className="inline-block px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 font-display text-xs sm:text-sm font-bold uppercase tracking-wider mb-2">
                👑 Happy Birthday Queen Loukya 💖
              </span>
              <h1 className="font-display text-2xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Celebrating Beautiful Loukya! ✨🎂
              </h1>
              <p className="text-slate-600 text-xs sm:text-base max-w-xl mx-auto mt-2 leading-relaxed">
                May your birthday be filled with unforgettable laughter, sweet cake, warmth, and the most magical moments with everyone who cherishes you!
              </p>
            </div>

            {/* Interactive Birthday Cake & Candles Centerpiece */}
            <BirthdayCake
              photos={photos}
              blownCandles={blownCandles}
              setBlownCandles={setBlownCandles}
              isCut={isCakeCut}
              onCutCake={handleCutCake}
              onRelight={handleRelight}
              isCreatorMode={effectiveCreatorMode}
              onUploadPhoto={handleUploadPhoto}
            />

            {/* Cake Serving Dashboard (0 / 9 Fed) */}
            <CakeServingDashboard
              cakeServedState={cakeServedState}
              onServeAll={handleServeAll}
              onResetServing={handleResetServing}
            />

            {/* 9 Cake Feeding Gallery Frames */}
            <CakeFeedingGallery
              photos={photos}
              captions={captions}
              cakeServedState={cakeServedState}
              onServeOne={handleServeOne}
              isCreatorMode={effectiveCreatorMode}
              onUploadPhoto={handleUploadPhoto}
              onEditFrame={(frameKey) => {
                setEditingCaptionKey(frameKey);
                setIsCaptionModalOpen(true);
              }}
            />

            {/* 9 Interactive Scratch Foil Cards Section */}
            <ScratchCardsSection
              photos={photos}
              captions={captions}
              isCreatorMode={effectiveCreatorMode}
              onUploadPhoto={handleUploadPhoto}
              onEditNote={(cardKey) => {
                setEditingCaptionKey(cardKey);
                setIsCaptionModalOpen(true);
              }}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-4 text-slate-400 text-xs z-10">
        <p>
          Crafted with 💖 for Loukya •{' '}
          <button
            onClick={() => {
              if (isCreatorMode) {
                setIsCreatorMode(false);
                showToast('Creator Studio Locked 🔒', 'info');
              } else {
                setIsPinModalOpen(true);
              }
            }}
            className="hover:text-rose-500 transition cursor-pointer underline underline-offset-2"
          >
            {isCreatorMode ? 'Lock Creator Studio' : 'Creator Access 👑'}
          </button>
        </p>
      </footer>

      {/* Floating Creator Toolbar (Visible only in Creator Mode) */}
      {isCreatorMode && (
        <CreatorToolbar
          onGoToScreen4={() => setScreen(4)}
          onOpenCaptionEditor={() => setIsCaptionModalOpen(true)}
          onOpenSupabaseModal={() => setIsSupabaseModalOpen(true)}
          isPreviewingAsLoukya={isPreviewingAsLoukya}
          onTogglePreview={() => {
            setIsPreviewingAsLoukya((prev) => !prev);
            showToast(
              !isPreviewingAsLoukya
                ? 'Previewing as Loukya! Editing tools temporarily hidden.'
                : 'Back to Creator Studio! All camera & edit buttons enabled.',
              'info'
            );
          }}
          onLock={() => {
            setIsCreatorMode(false);
            showToast('Creator Studio Locked 🔒', 'info');
          }}
        />
      )}

      {/* Modals */}
      <CreatorPinModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onSuccess={() => {
          setIsPinModalOpen(false);
          setIsCreatorMode(true);
          showToast('👑 Creator Studio Unlocked! You can now customize photos and notes.', 'success');
        }}
      />

      <SupabaseModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
        onSaveConfig={(cfg) => {
          showToast('Supabase storage config saved! ☁️', 'success');
        }}
        onSyncAllPhotos={handleSyncAllToSupabase}
        isSyncing={isSyncing}
      />

      <CaptionEditorModal
        isOpen={isCaptionModalOpen}
        initialKey={editingCaptionKey}
        captions={captions}
        onSave={handleSaveCaption}
        onReset={handleResetCaption}
        onClose={() => setIsCaptionModalOpen(false)}
      />

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
