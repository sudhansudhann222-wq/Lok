export const DEFAULT_PHOTO_URLS = {
  'candleImg-0': '/9ad4bbc7-304f-481e-90a5-f0a5fab52fac.jpg',
  'candleImg-1': '/Screenshot%202026-10-17%20213023.jpg',
  'candleImg-2': '/eb80199a-45d1-4fb2-b221-cca4e370bf5b.jpg',

  'frameImg-1': '/sho.jpg',
  'frameImg-2': '/lokthank.jpg',
  'frameImg-3': '/div.jpg',
  'frameImg-4': '/poo%20and%20lok.jpg',
  'frameImg-5': '/fha%20nd%20lok.jpg',
  'frameImg-6': '/hassan%20and%20lok.jpg',
  'frameImg-7': '/jyo.jpg',
  'frameImg-8': '/nerd%20and%20lok.jpg',
  'frameImg-9': '/sudhan%20and%20lok.jpg',

  'sisterPhoto': '/sho.jpg',
  'anupriyaliPhoto': '/lokthank.jpg',
  'guest2Photo': '/div.jpg',
  'guest3Photo': '/poo%20and%20lok.jpg',
  'guest4Photo': '/fha%20nd%20lok.jpg',
  'guest5Photo': '/hassan%20and%20lok.jpg',
  'guest6Photo': '/jyo.jpg',
  'guest7Photo': '/nerd%20and%20lok.jpg',
  'guest8Photo': '/sudhan%20and%20lok.jpg'
};

export const PHOTO_SLOTS = {
  'slot-loukya-main': {
    elementIds: ['sisterPhoto', 'frameImg-1'],
    label: 'From Shobhitha'
  },
  'slot-candle-0': {
    elementIds: ['candleImg-0'],
    label: 'Candle 1 Photo'
  },
  'slot-candle-1': {
    elementIds: ['candleImg-1'],
    label: 'Candle 2 Photo'
  },
  'slot-candle-2': {
    elementIds: ['candleImg-2'],
    label: 'Candle 3 Photo'
  },
  'slot-anupriyali': {
    elementIds: ['anupriyaliPhoto', 'frameImg-2'],
    label: 'From Laasya'
  },
  'slot-guest2': {
    elementIds: ['guest2Photo', 'frameImg-3'],
    label: 'From Divakar'
  },
  'slot-guest3': {
    elementIds: ['guest3Photo', 'frameImg-4'],
    label: 'From Pooja'
  },
  'slot-guest4': {
    elementIds: ['guest4Photo', 'frameImg-5'],
    label: 'From Fouzul'
  },
  'slot-guest5': {
    elementIds: ['guest5Photo', 'frameImg-6'],
    label: 'From Muhammed Hassan'
  },
  'slot-guest6': {
    elementIds: ['guest6Photo', 'frameImg-7'],
    label: 'From Jyoshitha'
  },
  'slot-guest7': {
    elementIds: ['guest7Photo', 'frameImg-8'],
    label: 'From Atchayashiri'
  },
  'slot-guest8': {
    elementIds: ['guest8Photo', 'frameImg-9'],
    label: 'From Sudhan'
  }
};

export function getSlotKeyForElementId(id) {
  for (const [key, slot] of Object.entries(PHOTO_SLOTS)) {
    if (slot.elementIds.includes(id)) return key;
  }
  return id;
}

export function expandPhotoMap(inputMap) {
  const result = { ...inputMap };
  for (const [key, url] of Object.entries(inputMap)) {
    if (!url) continue;
    if (PHOTO_SLOTS[key]) {
      PHOTO_SLOTS[key].elementIds.forEach((elId) => {
        result[elId] = url;
      });
    }
    for (const [slotKey, slot] of Object.entries(PHOTO_SLOTS)) {
      if (slot.elementIds && slot.elementIds.includes(key)) {
        result[slotKey] = url;
      }
    }
  }
  return result;
}

export const DEFAULT_CAPTIONS = {
  cards: {
    sister: {
      badge: '<i class="fa-solid fa-heart text-rose-500"></i> From Shobhitha 💖',
      photoCaption: 'Lou is my biggest yapping partner 💖',
      title: 'Wishes From Shobhitha 🌸',
      paragraphs: [
        'Lou is my biggest yapping partner and she is one of few people who actually understands me.',
        "The one who genuinely put efforts during other's bdays and post soo many pictures of them.",
        "The one who remembers everyone's bdays and other small things."
      ],
      tags: ['💖 Purest Heart', '🗣️ Yapping Partner', '✨ Shobhitha']
    },
    anupriyali: {
      badge: '<i class="fa-solid fa-star text-purple-500 animate-pulse"></i> From Laasya 🌟',
      photoCaption: 'Special moments with Laasya! ✨',
      title: 'Wishes From Laasya 👑💜',
      paragraphs: [
        "Loukya's birthday celebration is so special with Laasya! 🥰",
        "Whenever we are together, the smile gets 100x bigger and the vibe is immediately 10/10! Thank you for being such an incredible soul!"
      ],
      tags: ['💜 Unbreakable Bond', '✨ Endless Joy', '💖 Laasya']
    },
    guest2: {
      badge: '<i class="fa-solid fa-sun text-amber-500 animate-spin" style="animation-duration: 8s;"></i> From Divakar ☀️',
      photoCaption: 'Always spreading warmth & smiles! ✨',
      title: 'Wishes From Divakar 🌸💖',
      paragraphs: [
        'Happy Birthday Loukya! Having you around always turns an ordinary day into an unforgettable adventure full of uncontrollable giggles.',
        'Thank you for bringing your authentic light, non-stop humor, and sweetest energy everywhere you go. Keep shining brighter than ever!'
      ],
      tags: ['✨ Endless Smiles', '🌸 Sweet Energy', '💖 Divakar']
    },
    guest3: {
      badge: '<i class="fa-solid fa-sparkles text-amber-500"></i> From Pooja 🌟',
      photoCaption: 'Thalaivaaa you are great! 🌟',
      title: 'Wishes From Pooja 🥳🌟',
      paragraphs: [
        'Thalaivaaa you are great',
        'Enna aasirvadham panunga'
      ],
      tags: ['🌟 Thalaivaaa', '🙏 Aasirvadham', '💖 Pooja']
    },
    guest4: {
      badge: '<i class="fa-solid fa-seedling text-teal-600"></i> From Fouzul 🌸',
      photoCaption: 'Sweetest memories & celebrations! 💕',
      title: 'Heartfelt Wishes From Fouzul 🌷✨',
      paragraphs: [
        'Happy Birthday to the most caring, genuine, and incredible soul! Having a friend like Loukya makes life feel so much softer, safer, and happier.',
        'May this milestone year grant every single wish your heart whispers, because honestly no one deserves beautiful things more than you do!'
      ],
      tags: ['🌷 Purest Heart', '🫶 Comfort Person', '💖 Fouzul']
    },
    guest5: {
      badge: '<i class="fa-solid fa-masks-theater text-indigo-600"></i> From Muhammed Hassan 😂',
      photoCaption: 'Mastermind of inside jokes & laughs! 😜',
      title: 'Birthday Cheers From Muhammed Hassan 👑🎭',
      paragraphs: [
        'Happy Birthday Loukya! Here is your official reminder that life would be 100x more boring without your signature dramatic expressions and random bursts of laughter.',
        'Stay iconic, stay hilarious, and never stop being the absolute queen of entertainment wherever you go!'
      ],
      tags: ['🎭 Iconic Drama', '😂 10/10 Laughs', '💖 Muhammed Hassan']
    },
    guest6: {
      badge: '<i class="fa-solid fa-guitar text-rose-500"></i> From Jyoshitha 🎸',
      photoCaption: 'With her guitar & sparkling poems ✨',
      title: 'A Magic Melody From Jyoshitha 🎸✨',
      paragraphs: [
        'With her guitar, she plays a tune,',
        'Her poems sparkle like Stars and The Moon.',
        'She speaks with passion, strong and clear,',
        'And spreads her magic, far and near'
      ],
      tags: ['🎸 Guitar Tunes', '🌙 Stars & Moon', '💖 Jyoshitha']
    },
    guest7: {
      badge: '<i class="fa-solid fa-compass text-sky-600"></i> From Atchayashiri 🌟',
      photoCaption: 'Ready for every crazy journey together! 🗺️✨',
      title: 'Adventure Cheers From Atchayashiri 🌟🗺️',
      paragraphs: [
        "Happy Birthday Loukya! Having you as a companion on life's adventures makes every single moment ten times more exciting and full of laughter.",
        'From spontaneous plans to creating unforgettable stories, you bring so much courage, joy, and warmth. May this new year lead you to wonderful new heights and magical journeys!'
      ],
      tags: ['🌟 Pure Energy', '🗺️ Journey Companion', '💖 Atchayashiri']
    },
    guest8: {
      badge: '<i class="fa-solid fa-wand-magic-sparkles text-fuchsia-600"></i> From Sudhan 💖',
      photoCaption: 'Lokiyaaaaaaaaaaaaaaaaaaaa Ka Happy Birthday Treat Mukiyam 😋🎂',
      title: 'Lokiyaaaaaaaaaaaaaaaaaaaa Ka Happy Birthday Treat Mukiyam 🎉',
      paragraphs: [
        'Lokiyaaaaaaaaaaaaaaaaaaaa Ka Happy Birthday Treat Mukiyam',
        'Cake crumbs and nonstop laughter with the Queen — celebration and treat is definitely mukiyam! 💖🎉'
      ],
      tags: ['🎉 Treat Mukiyam', '💖 Sudhan', '🎂 Birthday Royalty']
    }
  },
  frames: {
    1: { title: 'Shobhitha 💖', subtitle: '✨ Biggest Yapping Partner', quote: '"Lou is my biggest yapping partner & understands me like no one else! 💖🎂"' },
    2: { title: 'Laasya 🌟', subtitle: '🎉 Cheering Loudly', quote: '"Yum! Sweetest birthday celebration for Loukya ever! 💖🍰"' },
    3: { title: 'Divakar ☀️', subtitle: '✨ Sweetest Smiles', quote: '"So sweet & delicious! Sweet cake for the brightest celebration! ✨🥰"' },
    4: { title: 'Pooja 🌟', subtitle: 'Thalaivaaa you are great', quote: '"Thalaivaaa you are great! Enna aasirvadham panunga! 🙏✨🎂"' },
    5: { title: 'Fouzul 🌸', subtitle: '💖 Best Memories', quote: '"Full of sweetness, love and forever wonderful memories! 💕✨"' },
    6: { title: 'Muhammed Hassan 😂', subtitle: '✨ Always Laughing Together', quote: "\"Don't worry, Loukya, only half the frosting ended up on my nose! 😂🎂\"" },
    7: { title: 'Jyoshitha 🎸', subtitle: '🎸 Her poems sparkle like Stars & The Moon ✨', quote: '"With her guitar, she plays a tune, spreading her magic far and near! 🎸🌟🎂"' },
    8: { title: 'Atchayashiri 🌟', subtitle: '✨ Endless Fun & Smiles', quote: '"The sweetest cake for the sweetest birthday girl! Cheers to many more adventures! 🌟🥳🍰"' },
    9: { title: 'Sudhan 💖', subtitle: 'Lokiyaaaaaaaaaaaaaaaaaaaa Ka Happy Birthday Treat Mukiyam', quote: '"Lokiyaaaaaaaaaaaaaaaaaaaa Ka Happy Birthday Treat Mukiyam! 😋🎂🎉"' }
  }
};

export const SCRATCH_CARDS_LIST = [
  {
    key: 'sister',
    titleText: '✨ SCRATCH HERE! ✨',
    subText: "Reveal Shobhitha's Photo & Words",
    unlockedBadgeText: "🎉 Shobhitha's Photo & Words Unlocked! 💖",
    gradientColors: ['#f43f5e', '#fb7185', '#f59e0b'],
    borderColor: 'border-t-rose-500',
    colorTheme: 'rose'
  },
  {
    key: 'anupriyali',
    titleText: '💜 SCRATCH HERE! 💜',
    subText: "Reveal Laasya's Photo & Words",
    unlockedBadgeText: "🎉 Laasya's Photo & Words Unlocked! 🌟",
    gradientColors: ['#9333ea', '#a855f7', '#ec4899'],
    borderColor: 'border-t-purple-500',
    colorTheme: 'purple'
  },
  {
    key: 'guest2',
    titleText: '💖 SCRATCH HERE! 💖',
    subText: "Reveal Divakar's Photo & Words",
    unlockedBadgeText: "🎉 Divakar's Photo & Words Unlocked! 💖",
    gradientColors: ['#ec4899', '#f43f5e', '#f59e0b'],
    borderColor: 'border-t-pink-500',
    colorTheme: 'pink'
  },
  {
    key: 'guest3',
    titleText: '🌟 SCRATCH HERE! 🌟',
    subText: "Reveal Pooja's Photo & Words",
    unlockedBadgeText: "🎉 Pooja's Photo & Words Unlocked! 🌟",
    gradientColors: ['#f59e0b', '#fb923c', '#e11d48'],
    borderColor: 'border-t-amber-500',
    colorTheme: 'amber'
  },
  {
    key: 'guest4',
    titleText: '🌸 SCRATCH HERE! 🌸',
    subText: "Reveal Fouzul's Photo & Words",
    unlockedBadgeText: "🎉 Fouzul's Photo & Words Unlocked! 🌸",
    gradientColors: ['#0d9488', '#14b8a6', '#06b6d4'],
    borderColor: 'border-t-teal-500',
    colorTheme: 'teal'
  },
  {
    key: 'guest5',
    titleText: '🎉 SCRATCH HERE! 🎉',
    subText: "Reveal Muhammed Hassan's Photo & Words",
    unlockedBadgeText: "🎉 Muhammed Hassan's Photo & Words Unlocked! 😂",
    gradientColors: ['#4f46e5', '#6366f1', '#a855f7'],
    borderColor: 'border-t-indigo-500',
    colorTheme: 'indigo'
  },
  {
    key: 'guest6',
    titleText: '🎂 SCRATCH HERE! 🎂',
    subText: "Reveal Jyoshitha's Photo & Words",
    unlockedBadgeText: "🎉 Jyoshitha's Photo & Words Unlocked! 🎸",
    gradientColors: ['#e11d48', '#f43f5e', '#7c3aed'],
    borderColor: 'border-t-rose-500',
    colorTheme: 'rose'
  },
  {
    key: 'guest7',
    titleText: '🌟 SCRATCH HERE! 🌟',
    subText: "Reveal Atchayashiri's Photo & Words",
    unlockedBadgeText: "🎉 Atchayashiri's Photo & Words Unlocked! 🌟",
    gradientColors: ['#0284c7', '#38bdf8', '#06b6d4'],
    borderColor: 'border-t-sky-500',
    colorTheme: 'sky'
  },
  {
    key: 'guest8',
    titleText: '💖 SCRATCH HERE! 💖',
    subText: "Reveal Sudhan's Photo & Words",
    unlockedBadgeText: "🎉 Sudhan's Photo & Words Unlocked! 💖",
    gradientColors: ['#8b5cf6', '#d946ef', '#f43f5e'],
    borderColor: 'border-t-fuchsia-500',
    colorTheme: 'fuchsia'
  }
];

export const FRAMES_LIST = [
  { id: 1, gradient: 'from-rose-500 to-pink-500', friendKey: 'sister', label: 'Feed Shobhitha!' },
  { id: 2, gradient: 'from-purple-600 to-pink-500', friendKey: 'anupriyali', label: 'Feed Laasya!' },
  { id: 3, gradient: 'from-pink-500 to-rose-400', friendKey: 'guest2', label: 'Feed Divakar!' },
  { id: 4, gradient: 'from-amber-500 to-orange-500', friendKey: 'guest3', label: 'Feed Pooja!' },
  { id: 5, gradient: 'from-teal-600 to-emerald-500', friendKey: 'guest4', label: 'Feed Fouzul!' },
  { id: 6, gradient: 'from-indigo-600 to-purple-600', friendKey: 'guest5', label: 'Feed Muhammed Hassan!' },
  { id: 7, gradient: 'from-rose-600 to-purple-600', friendKey: 'guest6', label: 'Feed Jyoshitha!' },
  { id: 8, gradient: 'from-sky-500 to-teal-500', friendKey: 'guest7', label: 'Feed Atchayashiri!' },
  { id: 9, gradient: 'from-fuchsia-600 via-pink-600 to-rose-600', friendKey: 'guest8', label: 'Feed Sudhan!' }
];
