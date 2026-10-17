export const DEFAULT_PHOTO_URLS = {
  'candleImg-0': '/sudhan%20and%20lok.jpg',
  'candleImg-1': '/eb80199a-45d1-4fb2-b221-cca4e370bf5b.jpg',
  'candleImg-2': '/9ad4bbc7-304f-481e-90a5-f0a5fab52fac.jpg',

  'frameImg-1': '/sudhan%20and%20lok.jpg',
  'frameImg-2': '/disc.jpg',
  'frameImg-3': '/sho.jpg',
  'frameImg-4': '/poo%20and%20lok.jpg',
  'frameImg-5': '/fha%20nd%20lok.jpg',
  'frameImg-6': '/hassan%20and%20lok.jpg',
  'frameImg-7': '/jyo.jpg',
  'frameImg-8': '/nerd%20and%20lok.jpg',
  'frameImg-9': '/div.jpg',

  'sisterPhoto': '/sudhan%20and%20lok.jpg',
  'anupriyaliPhoto': '/disc.jpg',
  'guest2Photo': '/sho.jpg',
  'guest3Photo': '/poo%20and%20lok.jpg',
  'guest4Photo': '/fha%20nd%20lok.jpg',
  'guest5Photo': '/hassan%20and%20lok.jpg',
  'guest6Photo': '/jyo.jpg',
  'guest7Photo': '/nerd%20and%20lok.jpg',
  'guest8Photo': '/div.jpg'
};

export const PHOTO_SLOTS = {
  'slot-loukya-main': {
    elementIds: ['sisterPhoto', 'frameImg-1'],
    label: 'Loukya Birthday Queen'
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
    label: 'Special Guest: Anupriyali'
  },
  'slot-guest2': {
    elementIds: ['guest2Photo', 'frameImg-3'],
    label: 'Sunshine Soul'
  },
  'slot-guest3': {
    elementIds: ['guest3Photo', 'frameImg-4'],
    label: 'Partner in Fun'
  },
  'slot-guest4': {
    elementIds: ['guest4Photo', 'frameImg-5'],
    label: 'Soul Sister'
  },
  'slot-guest5': {
    elementIds: ['guest5Photo', 'frameImg-6'],
    label: 'Chief Chaos Officer'
  },
  'slot-guest6': {
    elementIds: ['guest6Photo', 'frameImg-7'],
    label: 'Forever Cheerleader'
  },
  'slot-guest7': {
    elementIds: ['guest7Photo', 'frameImg-8'],
    label: 'Adventure Partner'
  },
  'slot-guest8': {
    elementIds: ['guest8Photo', 'frameImg-9'],
    label: 'Partner in Crime'
  }
};

export function getSlotKeyForElementId(id) {
  for (const [key, slot] of Object.entries(PHOTO_SLOTS)) {
    if (slot.elementIds.includes(id)) return key;
  }
  return id;
}

export const DEFAULT_CAPTIONS = {
  cards: {
    sister: {
      badge: '<i class="fa-solid fa-crown text-amber-500"></i> Birthday Girl: Loukya ✨',
      photoCaption: 'Happy Birthday, Loukya! 💖',
      title: 'Birthday Wishes For Loukya 🌸',
      paragraphs: [
        'Happy Birthday, Loukya! Having you as a sister is honestly the greatest gift life could ever give. From our endless silly arguments to laughing until our stomachs hurt, you make every day brighter!',
        'You have the kindest heart and a smile that lights up the whole room. May this year bring you nonstop happiness and all the cake you can eat!'
      ],
      tags: ['💖 Purest Heart', '😂 Drama Queen', '🌟 Unstoppable Energy']
    },
    anupriyali: {
      badge: '<i class="fa-solid fa-heart text-rose-500 animate-pulse"></i> Favorite Person: Anupriyali 🌟',
      photoCaption: 'Featuring the iconic Anupriyali! ✨',
      title: 'VIP Spotlight: Anupriyali 👑💜',
      paragraphs: [
        "Loukya's birthday page wouldn't be complete without dedicating this side to her absolute favorite person in the whole world — Anupriyali! 🥰",
        "Whenever Anupriyali is around, Loukya's smile gets 100x bigger and the vibe is immediately 10/10! Thank you for being Loukya's constant comfort, partner-in-crime, and favorite soul!"
      ],
      tags: ["💜 Loukya's #1", '👯‍♀️ Unbreakable Bond', '♾️ VIP Status']
    },
    guest2: {
      badge: '<i class="fa-solid fa-sun text-amber-500 animate-spin" style="animation-duration: 8s;"></i> Special Friend: Sunshine Soul ☀️',
      photoCaption: 'Always spreading warmth & smiles! ✨',
      title: 'Birthday Love From Sunshine Soul 🌸💖',
      paragraphs: [
        'Happy Birthday Loukya! Having you around always turns an ordinary day into an unforgettable adventure full of uncontrollable giggles.',
        'Thank you for bringing your authentic light, non-stop humor, and sweetest energy everywhere you go. Keep shining brighter than ever!'
      ],
      tags: ['✨ Endless Smiles', '🌸 Sweet Energy', '💖 Forever Friendship']
    },
    guest3: {
      badge: '<i class="fa-solid fa-sparkles text-amber-500"></i> Special Friend: Partner in Fun 🌟',
      photoCaption: 'The ultimate partner in laughter! 🥳',
      title: 'Celebration Cheers For Loukya 🥳🌟',
      paragraphs: [
        'To the one and only Loukya! Every single hangout with you is guaranteed to be hilarious, lively, and full of drama in the absolute best way.',
        'Cheers to another year of crazy memories, spontaneous plans, endless giggles, and all the sweet moments we get to celebrate together!'
      ],
      tags: ['🥳 Maximum Fun', '🔥 High Energy', '⭐ Unmatched Humor']
    },
    guest4: {
      badge: '<i class="fa-solid fa-seedling text-teal-600"></i> Special Friend: Soul Sister 🌸',
      photoCaption: 'The calm to the chaos & sweetest friend! 💕',
      title: 'Heartfelt Note For Loukya 🌷✨',
      paragraphs: [
        'Happy Birthday to the most caring, genuine, and incredible soul! Having a friend like Loukya makes life feel so much softer, safer, and happier.',
        'May this milestone year grant every single wish your heart whispers, because honestly no one deserves beautiful things more than you do!'
      ],
      tags: ['🌷 Purest Heart', '🫶 Comfort Person', '🕊️ Peaceful Vibes']
    },
    guest5: {
      badge: '<i class="fa-solid fa-masks-theater text-indigo-600"></i> Special Friend: Chief Chaos Officer 😂',
      photoCaption: 'Mastermind of inside jokes & mischief! 😜',
      title: 'Vibe Check For Queen Loukya 👑🎭',
      paragraphs: [
        'Happy Birthday Loukya! Here is your official reminder that life would be 100x more boring without your signature dramatic expressions, gossip breakdowns, and random bursts of laughter.',
        'Stay iconic, stay hilarious, and never stop being the absolute queen of entertainment wherever you go!'
      ],
      tags: ['🎭 Iconic Drama', '😂 10/10 Laughs', '🚀 Never Boring']
    },
    guest6: {
      badge: '<i class="fa-solid fa-champagne-glasses text-rose-500"></i> Special Friend: Forever Cheerleader 🥂',
      photoCaption: "Loukya's biggest fan & lifetime supporter! 🥳",
      title: 'A Toast to Birthday Queen Loukya 🥂✨',
      paragraphs: [
        'Raising a giant toast to Loukya on her big day! You deserve all the confetti, cake, love, adventures, and dream-come-true moments in the universe.',
        "Whatever adventures and surprises this new year brings, you've got an entire squad cheering loudly in your corner forever and always!"
      ],
      tags: ['🥂 Biggest Cheerleader', '♾️ Ride or Die', '🎂 Birthday Magic']
    },
    guest7: {
      badge: '<i class="fa-solid fa-compass text-sky-600"></i> Special Friend: Adventure Partner 🌟',
      photoCaption: 'Ready for every crazy journey together! 🗺️✨',
      title: 'Adventure Cheers For Loukya 🌟🗺️',
      paragraphs: [
        "Happy Birthday Loukya! Having you as a companion on life's adventures makes every single moment ten times more exciting and full of laughter.",
        'From spontaneous plans to creating unforgettable stories, you bring so much courage, joy, and warmth. May this new year lead you to wonderful new heights and magical journeys!'
      ],
      tags: ['🌟 Pure Energy', '🗺️ Journey Companion', '💖 Nonstop Fun']
    },
    guest8: {
      badge: '<i class="fa-solid fa-wand-magic-sparkles text-fuchsia-600"></i> Special Friend: Partner in Crime 💖',
      photoCaption: 'Sharing every laugh, secret & treat! 🥳',
      title: 'Heartfelt Love For Birthday Queen Loukya 👑💖',
      paragraphs: [
        'To the sweetest, most wonderful Loukya on her special birthday! Life is so much brighter, happier, and softer with your unconditional friendship.',
        'Thank you for always listening, always caring, and bringing pure warmth into every room you step into. You deserve all the love, surprises, and cake in the world today!'
      ],
      tags: ['💖 Sweetest Soul', '👯‍♀️ Partner in Crime', '🎂 Birthday Royalty']
    }
  },
  frames: {
    1: { title: '👑 Birthday Queen Loukya', subtitle: '✨ Making the Birthday Wish', quote: '"Mmm! Best birthday cake ever! Sweetest bite for the Queen! 👑😋🎂"' },
    2: { title: '🫶 Special Guest: Anupriyali', subtitle: '🎉 Cheering Loudly', quote: '"Yum! Best sister & sweetest birthday celebration ever! 💖🍰"' },
    3: { title: '💖 Special Guest: Sunshine Soul', subtitle: '✨ Sweetest Smiles', quote: '"So sweet & delicious! Sweet cake for the brightest sunshine! ✨🥰"' },
    4: { title: '🌟 Special Guest: Partner in Fun', subtitle: '🥳 Party Vibes', quote: '"Grabbing extra frosting! Ready to party with Loukya all night! 🥳🍰"' },
    5: { title: '🌸 Special Guest: Soul Sister', subtitle: '💖 Best Memories', quote: '"Full of sweetness, love and forever sisterhood memories! 💕✨"' },
    6: { title: '🎉 Special Guest: Chaos Officer', subtitle: '✨ Always Together', quote: "\"Don't worry, Loukya, only half the frosting ended up on my nose! 😂🎂\"" },
    7: { title: '🎂 Special Guest: Forever Cheerleader', subtitle: '🥂 Cheers to Loukya!', quote: '"Three cheers for Queen Loukya! Hip hip hooray to the birthday girl! 🥂🎉👑"' },
    8: { title: '🌟 Special Guest: Adventure Partner', subtitle: '✨ Endless Fun & Smiles', quote: '"The sweetest cake for the sweetest birthday girl! Cheers to many more adventures! 🌟🥳🍰"' },
    9: { title: '💖 Special Guest: Partner in Crime', subtitle: '🎉 Celebrating Queen Loukya', quote: '"Cake crumbs and unstoppable laughs with Loukya! Best celebration ever! 💖🎉🎂"' }
  }
};

export const SCRATCH_CARDS_LIST = [
  {
    key: 'sister',
    titleText: '✨ SCRATCH HERE! ✨',
    subText: "Reveal Loukya's Photo & Words",
    unlockedBadgeText: "🎉 Loukya's Photo & Words Unlocked! 💖",
    gradientColors: ['#f43f5e', '#fb7185', '#f59e0b'],
    borderColor: 'border-t-rose-500',
    colorTheme: 'rose'
  },
  {
    key: 'anupriyali',
    titleText: '💜 SCRATCH HERE! 💜',
    subText: 'Reveal Anupriyali & Spotlight',
    unlockedBadgeText: '🎉 Anupriyali Spotlight Unlocked! 🫶',
    gradientColors: ['#9333ea', '#a855f7', '#ec4899'],
    borderColor: 'border-t-purple-500',
    colorTheme: 'purple'
  },
  {
    key: 'guest2',
    titleText: '💖 SCRATCH HERE! 💖',
    subText: 'Reveal Sunshine Soul & Wishes',
    unlockedBadgeText: '🎉 Sunshine Soul Unlocked! 💖',
    gradientColors: ['#ec4899', '#f43f5e', '#f59e0b'],
    borderColor: 'border-t-pink-500',
    colorTheme: 'pink'
  },
  {
    key: 'guest3',
    titleText: '🌟 SCRATCH HERE! 🌟',
    subText: 'Reveal Partner in Fun & Wishes',
    unlockedBadgeText: '🎉 Partner in Fun Unlocked! 🌟',
    gradientColors: ['#f59e0b', '#fb923c', '#e11d48'],
    borderColor: 'border-t-amber-500',
    colorTheme: 'amber'
  },
  {
    key: 'guest4',
    titleText: '🌸 SCRATCH HERE! 🌸',
    subText: 'Reveal Soul Sister & Wishes',
    unlockedBadgeText: '🎉 Soul Sister Unlocked! 🌸',
    gradientColors: ['#0d9488', '#14b8a6', '#06b6d4'],
    borderColor: 'border-t-teal-500',
    colorTheme: 'teal'
  },
  {
    key: 'guest5',
    titleText: '🎉 SCRATCH HERE! 🎉',
    subText: 'Reveal Chaos Officer & Wishes',
    unlockedBadgeText: '🎉 Chief Chaos Officer Unlocked! 😂',
    gradientColors: ['#4f46e5', '#6366f1', '#a855f7'],
    borderColor: 'border-t-indigo-500',
    colorTheme: 'indigo'
  },
  {
    key: 'guest6',
    titleText: '🎂 SCRATCH HERE! 🎂',
    subText: 'Reveal Cheerleader & Wishes',
    unlockedBadgeText: '🎉 Forever Cheerleader Unlocked! 🥂',
    gradientColors: ['#e11d48', '#f43f5e', '#7c3aed'],
    borderColor: 'border-t-rose-500',
    colorTheme: 'rose'
  },
  {
    key: 'guest7',
    titleText: '🌟 SCRATCH HERE! 🌟',
    subText: 'Reveal Adventure Partner & Wishes',
    unlockedBadgeText: '🎉 Adventure Partner Unlocked! 🌟',
    gradientColors: ['#0284c7', '#38bdf8', '#06b6d4'],
    borderColor: 'border-t-sky-500',
    colorTheme: 'sky'
  },
  {
    key: 'guest8',
    titleText: '💖 SCRATCH HERE! 💖',
    subText: 'Reveal Partner in Crime & Wishes',
    unlockedBadgeText: '🎉 Partner in Crime Unlocked! 💖',
    gradientColors: ['#8b5cf6', '#d946ef', '#f43f5e'],
    borderColor: 'border-t-fuchsia-500',
    colorTheme: 'fuchsia'
  }
];

export const FRAMES_LIST = [
  { id: 1, gradient: 'from-rose-500 to-pink-500', friendKey: 'sister', label: 'Feed Queen Loukya!' },
  { id: 2, gradient: 'from-purple-600 to-pink-500', friendKey: 'anupriyali', label: 'Feed Anupriyali!' },
  { id: 3, gradient: 'from-pink-500 to-rose-400', friendKey: 'guest2', label: 'Feed Sunshine!' },
  { id: 4, gradient: 'from-amber-500 to-orange-500', friendKey: 'guest3', label: 'Feed Partner in Fun!' },
  { id: 5, gradient: 'from-teal-600 to-emerald-500', friendKey: 'guest4', label: 'Feed Soul Sister!' },
  { id: 6, gradient: 'from-indigo-600 to-purple-600', friendKey: 'guest5', label: 'Feed Chaos Officer!' },
  { id: 7, gradient: 'from-rose-600 to-purple-600', friendKey: 'guest6', label: 'Feed Cheerleader!' },
  { id: 8, gradient: 'from-sky-500 to-teal-500', friendKey: 'guest7', label: 'Feed Adventure Partner!' },
  { id: 9, gradient: 'from-fuchsia-600 via-pink-600 to-rose-600', friendKey: 'guest8', label: 'Feed Partner in Crime!' }
];
