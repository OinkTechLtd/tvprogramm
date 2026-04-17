// ============================================================
// TV-CHECKPROGRAMM — Data & Engine
// ============================================================

const CHANNELS = [
  // ====== ФЕДЕРАЛЬНЫЕ ТВ ======
  { id: 'perviy', name: 'Первый канал', type: 'tv', category: 'federal', icon: '1', color: '#1565C0' },
  { id: 'russia1', name: 'Россия 1', type: 'tv', category: 'federal', icon: 'Р1', color: '#C62828' },
  { id: 'ntv', name: 'НТВ', type: 'tv', category: 'federal', icon: 'НТВ', color: '#00897B' },
  { id: 'russia24', name: 'Россия 24', type: 'tv', category: 'news', icon: 'Р24', color: '#0D47A1' },
  { id: 'match', name: 'Матч ТВ', type: 'tv', category: 'sport', icon: '⚽', color: '#E65100' },
  { id: 'pyaty', name: 'Пятый канал', type: 'tv', category: 'federal', icon: '5', color: '#6A1B9A' },
  { id: 'kultura', name: 'Культура', type: 'tv', category: 'culture', icon: 'К', color: '#558B2F' },
  { id: 'tbk', name: 'ТВК', type: 'tv', category: 'regional', icon: 'ТВК', color: '#37474F' },
  { id: 'tnt', name: 'ТНТ', type: 'tv', category: 'entertainment', icon: 'ТНТ', color: '#E53935' },
  { id: 'sts', name: 'СТС', type: 'tv', category: 'entertainment', icon: 'СТС', color: '#F57C00' },
  { id: 'ren', name: 'РЕН ТВ', type: 'tv', category: 'federal', icon: 'РЕН', color: '#D81B60' },
  { id: 'tv3', name: 'ТВ-3', type: 'tv', category: 'entertainment', icon: 'ТВ3', color: '#7B1FA2' },
  { id: 'muz', name: 'Муз-ТВ', type: 'tv', category: 'music', icon: '🎵', color: '#E91E63' },
  { id: 'friday', name: 'Пятница!', type: 'tv', category: 'entertainment', icon: 'Пт!', color: '#FF6F00' },
  { id: 'russia2', name: 'Россия-К', type: 'tv', category: 'culture', icon: 'РК', color: '#2E7D32' },
  { id: 'tvc', name: 'ТВ Центр', type: 'tv', category: 'news', icon: 'ТВЦ', color: '#1565C0' },
  { id: 'domashny', name: 'Домашний', type: 'tv', category: 'entertainment', icon: '🏠', color: '#F48FB1' },
  { id: 'tv1000', name: 'TV 1000', type: 'tv', category: 'movies', icon: '🎬', color: '#BF360C' },
  { id: 'kinopoisk', name: 'Кинопоиск HD', type: 'tv', category: 'movies', icon: '🎞', color: '#FF6D00' },
  { id: 'nauka', name: 'Наука', type: 'tv', category: 'culture', icon: '🔬', color: '#0277BD' },
  { id: 'disney', name: 'Disney Channel', type: 'tv', category: 'kids', icon: '✨', color: '#0052CC' },
  { id: 'nickelodeon', name: 'Nickelodeon', type: 'tv', category: 'kids', icon: '🟠', color: '#FF5722' },
  { id: 'carousel', name: 'Карусель', type: 'tv', category: 'kids', icon: '🎠', color: '#F9A825' },
  { id: 'mult', name: 'Мульт', type: 'tv', category: 'kids', icon: '🐱', color: '#7E57C2' },
  { id: 'eurosport1', name: 'Eurosport 1', type: 'tv', category: 'sport', icon: 'ES1', color: '#1976D2' },
  { id: 'eurosport2', name: 'Eurosport 2', type: 'tv', category: 'sport', icon: 'ES2', color: '#0D47A1' },
  { id: 'matchfootball1', name: 'Матч! Футбол 1', type: 'tv', category: 'sport', icon: 'МФ1', color: '#2E7D32' },
  { id: 'matchfootball2', name: 'Матч! Футбол 2', type: 'tv', category: 'sport', icon: 'МФ2', color: '#1B5E20' },
  { id: 'matchfootball3', name: 'Матч! Футбол 3', type: 'tv', category: 'sport', icon: 'МФ3', color: '#33691E' },
  { id: 'matchboxing', name: 'Матч! Боец', type: 'tv', category: 'sport', icon: 'МБ', color: '#B71C1C' },
  { id: 'cnn', name: 'CNN International', type: 'tv', category: 'news', icon: 'CNN', color: '#CC0000' },
  { id: 'bbcworld', name: 'BBC World News', type: 'tv', category: 'news', icon: 'BBC', color: '#BB0000' },
  { id: 'deutschewelle', name: 'Deutsche Welle', type: 'tv', category: 'news', icon: 'DW', color: '#003399' },
  { id: 'euronews', name: 'Euronews', type: 'tv', category: 'news', icon: 'EN', color: '#003399' },
  { id: 'zvezda', name: 'Звезда', type: 'tv', category: 'federal', icon: '⭐', color: '#1A237E' },
  { id: 'ort-prim', name: 'ОРТ Прима', type: 'tv', category: 'regional', icon: 'ОРТ', color: '#4A148C' },
  { id: 'spas', name: 'Спас', type: 'tv', category: 'culture', icon: '✝', color: '#795548' },
  { id: 'tbg', name: 'ТВ Губерния', type: 'tv', category: 'regional', icon: 'ТВГ', color: '#546E7A' },
  { id: 'ctb', name: 'СТБ', type: 'tv', category: 'entertainment', icon: 'СТБ', color: '#1E88E5' },
  { id: 'u', name: 'Канал U', type: 'tv', category: 'entertainment', icon: 'U', color: '#00ACC1' },
  // ====== РАДИО ======
  { id: 'radiorus', name: 'Радио России', type: 'radio', category: 'radio-talk', icon: '📻', color: '#1565C0' },
  { id: 'maiak', name: 'Радио Маяк', type: 'radio', category: 'radio-talk', icon: '🗼', color: '#C62828' },
  { id: 'vesti-fm', name: 'Вести FM', type: 'radio', category: 'radio-news', icon: '📡', color: '#283593' },
  { id: 'euroradi', name: 'Европа Плюс', type: 'radio', category: 'radio-music', icon: '🎶', color: '#E91E63' },
  { id: 'avtoradio', name: 'Авторадио', type: 'radio', category: 'radio-music', icon: '🚗', color: '#E53935' },
  { id: 'russkoe', name: 'Русское Радио', type: 'radio', category: 'radio-music', icon: '🎵', color: '#F57F17' },
  { id: 'nashe', name: 'Наше Радио', type: 'radio', category: 'radio-music', icon: '🎸', color: '#2E7D32' },
  { id: 'love-radio', name: 'Love Radio', type: 'radio', category: 'radio-music', icon: '❤', color: '#E91E63' },
  { id: 'hitfm', name: 'HIT FM', type: 'radio', category: 'radio-music', icon: '🔥', color: '#BF360C' },
  { id: 'dfm', name: 'DFM', type: 'radio', category: 'radio-music', icon: '🎧', color: '#7B1FA2' },
  { id: 'humor-fm', name: 'Юмор FM', type: 'radio', category: 'radio-talk', icon: '😂', color: '#F9A825' },
  { id: 'kommersant-fm', name: 'Коммерсантъ FM', type: 'radio', category: 'radio-news', icon: '📰', color: '#212121' },
  { id: 'business-fm', name: 'Business FM', type: 'radio', category: 'radio-news', icon: '💼', color: '#37474F' },
  { id: 'sport-fm', name: 'Спорт FM', type: 'radio', category: 'radio-sport', icon: '🏆', color: '#E65100' },
  { id: 'jazz', name: 'Jazz Radio', type: 'radio', category: 'radio-music', icon: '🎷', color: '#4E342E' },
  { id: 'retro-fm', name: 'Ретро FM', type: 'radio', category: 'radio-music', icon: '🎙', color: '#6D4C41' },
  { id: 'tochka', name: 'Точка FM', type: 'radio', category: 'radio-music', icon: '📍', color: '#00695C' },
  { id: 'classic', name: 'Радио Классика', type: 'radio', category: 'radio-music', icon: '🎻', color: '#4527A0' },
  { id: 'echo', name: 'Эхо Москвы', type: 'radio', category: 'radio-news', icon: '🔊', color: '#455A64' },
  { id: 'montecarlo', name: 'Monte Carlo', type: 'radio', category: 'radio-music', icon: '🌴', color: '#00838F' },
];

// Category labels
const CATEGORY_LABELS = {
  'federal': 'Федеральное',
  'news': 'Новости',
  'sport': 'Спорт',
  'entertainment': 'Развлечения',
  'kids': 'Детские',
  'music': 'Музыкальные',
  'culture': 'Культура',
  'movies': 'Кино',
  'regional': 'Региональные',
  'radio-talk': 'Разговорное',
  'radio-news': 'Новостное',
  'radio-music': 'Музыкальное',
  'radio-sport': 'Спортивное',
};

// ============================================================
// SCHEDULE GENERATOR
// ============================================================

function getSchedule(channelId, date) {
  const seed = hashCode(channelId + date.toDateString());
  const channel = CHANNELS.find(c => c.id === channelId);
  if (!channel) return [];

  if (channel.type === 'radio') return generateRadioSchedule(channel, seed);
  return generateTVSchedule(channel, seed);
}

function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function seededRand(seed, idx) {
  const x = Math.sin(seed + idx * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function pick(arr, seed, idx) {
  return arr[Math.floor(seededRand(seed, idx) * arr.length)];
}

function generateTVSchedule(channel, seed) {
  const shows = getTVShowPool(channel);
  const schedule = [];
  let hour = 6, min = 0;
  let idx = 0;

  while (hour < 30) { // until 6am next day
    const duration = Math.floor(seededRand(seed, idx++) * 3 + 1) * 30; // 30,60,90 min
    const show = pick(shows, seed, idx++);
    const episode = Math.floor(seededRand(seed, idx++) * 20) + 1;
    schedule.push({
      time: `${String(hour % 24).padStart(2,'0')}:${String(min).padStart(2,'0')}`,
      title: show.title + (show.hasEp ? `: ${episode} серия` : ''),
      genre: show.genre,
      duration,
    });
    min += duration;
    while (min >= 60) { min -= 60; hour++; }
    if (hour >= 30) break;
  }
  return schedule;
}

function generateRadioSchedule(channel, seed) {
  const shows = getRadioShowPool(channel);
  const schedule = [];
  let hour = 0, min = 0;
  let idx = 0;

  while (hour < 24) {
    const duration = Math.floor(seededRand(seed, idx++) * 4 + 1) * 30;
    const show = pick(shows, seed, idx++);
    schedule.push({
      time: `${String(hour).padStart(2,'0')}:${String(min).padStart(2,'0')}`,
      title: show,
      genre: 'Радиопередача',
      duration,
    });
    min += duration;
    while (min >= 60) { min -= 60; hour++; }
  }
  return schedule;
}

function getTVShowPool(channel) {
  const pools = {
    federal: [
      { title: 'Утреннее шоу', genre: 'Ток-шоу', hasEp: false },
      { title: 'Новости', genre: 'Новости', hasEp: false },
      { title: 'Вечерний выпуск', genre: 'Новости', hasEp: false },
      { title: 'Документальный фильм', genre: 'Документальный', hasEp: false },
      { title: 'Детектив', genre: 'Сериал', hasEp: true },
      { title: 'Ток-шоу «Один на один»', genre: 'Ток-шоу', hasEp: false },
      { title: 'Художественный фильм', genre: 'Кино', hasEp: false },
      { title: 'Криминальная хроника', genre: 'Документальный', hasEp: false },
      { title: 'Вечернее шоу', genre: 'Развлечение', hasEp: false },
    ],
    news: [
      { title: 'Главные новости', genre: 'Новости', hasEp: false },
      { title: 'Специальный репортаж', genre: 'Репортаж', hasEp: false },
      { title: 'Аналитика дня', genre: 'Аналитика', hasEp: false },
      { title: 'Бизнес-новости', genre: 'Бизнес', hasEp: false },
      { title: 'Международное обозрение', genre: 'Новости', hasEp: false },
      { title: 'Пресс-конференция', genre: 'Политика', hasEp: false },
      { title: 'Финансовый вестник', genre: 'Бизнес', hasEp: false },
      { title: 'Прямой эфир', genre: 'Новости', hasEp: false },
    ],
    sport: [
      { title: 'Футбол. Премьер-лига', genre: 'Спорт', hasEp: false },
      { title: 'Хоккей. КХЛ', genre: 'Спорт', hasEp: false },
      { title: 'Теннис. Открытый чемпионат', genre: 'Спорт', hasEp: false },
      { title: 'Баскетбол. Еврочемпионат', genre: 'Спорт', hasEp: false },
      { title: 'Спортивные итоги', genre: 'Аналитика', hasEp: false },
      { title: 'Формула 1. Гран-при', genre: 'Автоспорт', hasEp: false },
      { title: 'Бокс. Чемпионский бой', genre: 'Спорт', hasEp: false },
      { title: 'Все на Матч!', genre: 'Ток-шоу', hasEp: false },
    ],
    entertainment: [
      { title: 'Реалити-шоу «Дом-2»', genre: 'Реалити', hasEp: true },
      { title: 'Комедийный сериал', genre: 'Комедия', hasEp: true },
      { title: 'Голос. Сезон', genre: 'Шоу', hasEp: false },
      { title: 'КВН', genre: 'Юмор', hasEp: false },
      { title: 'Вечерний Ургант', genre: 'Ток-шоу', hasEp: false },
      { title: 'Comedy Club', genre: 'Юмор', hasEp: true },
      { title: 'Импровизация', genre: 'Юмор', hasEp: false },
      { title: 'Наша Russia', genre: 'Комедия', hasEp: true },
    ],
    kids: [
      { title: 'Смешарики', genre: 'Мультфильм', hasEp: true },
      { title: 'Маша и Медведь', genre: 'Мультфильм', hasEp: true },
      { title: 'Фиксики', genre: 'Мультфильм', hasEp: true },
      { title: 'Лунтик', genre: 'Мультфильм', hasEp: true },
      { title: 'Детская энциклопедия', genre: 'Познавательное', hasEp: false },
      { title: 'Спокойной ночи, малыши!', genre: 'Детское', hasEp: false },
      { title: 'Барбоскины', genre: 'Мультфильм', hasEp: true },
    ],
    music: [
      { title: 'Хит-парад', genre: 'Музыка', hasEp: false },
      { title: 'Клип-сессия', genre: 'Клипы', hasEp: false },
      { title: 'Живой концерт', genre: 'Концерт', hasEp: false },
      { title: 'Ночная волна', genre: 'Дискотека', hasEp: false },
      { title: 'Топ-10 недели', genre: 'Музыка', hasEp: false },
      { title: 'Рок-классика', genre: 'Музыка', hasEp: false },
    ],
    culture: [
      { title: 'Театральный вечер', genre: 'Театр', hasEp: false },
      { title: 'Документальный цикл', genre: 'Документальный', hasEp: true },
      { title: 'Киноклассика', genre: 'Кино', hasEp: false },
      { title: 'Арт-обзор', genre: 'Искусство', hasEp: false },
      { title: 'Философский час', genre: 'Публицистика', hasEp: false },
    ],
    movies: [
      { title: 'Кинопремьера', genre: 'Кино', hasEp: false },
      { title: 'Триллер', genre: 'Боевик', hasEp: false },
      { title: 'Романтическая комедия', genre: 'Комедия', hasEp: false },
      { title: 'Боевик', genre: 'Боевик', hasEp: false },
      { title: 'Фантастика', genre: 'Фантастика', hasEp: false },
      { title: 'Мелодрама', genre: 'Мелодрама', hasEp: false },
      { title: 'Исторический фильм', genre: 'Исторический', hasEp: false },
    ],
  };

  return pools[channel.category] || pools.federal;
}

function getRadioShowPool(channel) {
  const music = [
    'Утренний эфир', 'Час лучших хитов', 'Топ-20', 'Ночная программа', 'Дискотека 80-х',
    'Новинки недели', 'Живой концерт в студии', 'Просьбы слушателей', 'Клубный час',
    'Русские хиты', 'Зарубежные хиты', 'Ретро-парад', 'Утренняя разминка',
  ];
  const talk = [
    'Утренние новости', 'Гость студии', 'Тема дня', 'Прямой эфир', 'Звонки слушателей',
    'Спортивный обзор', 'Культурный дневник', 'Вечерние итоги', 'Ночной разговор',
  ];
  const news = [
    'Новости каждый час', 'Рынки и финансы', 'Политический обзор', 'Интервью дня',
    'Международные события', 'Экономика', 'Репортаж с места событий',
  ];
  const cat = channel.category;
  if (cat === 'radio-news') return news;
  if (cat === 'radio-talk') return talk;
  return music;
}

// ============================================================
// TIME HELPERS
// ============================================================

function getCurrentTimeStr() {
  const now = new Date();
  return `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
}

function timeToMinutes(t) {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
}

function isLive(item, items, idx) {
  const now = timeToMinutes(getCurrentTimeStr());
  const start = timeToMinutes(item.time);
  const end = idx + 1 < items.length ? timeToMinutes(items[idx+1].time) : start + item.duration;
  // handle overnight
  if (start > 20 * 60 && now < 6 * 60) return true;
  return now >= start && now < end;
}

function getProgress(item, items, idx) {
  const now = timeToMinutes(getCurrentTimeStr());
  const start = timeToMinutes(item.time);
  const end = idx + 1 < items.length ? timeToMinutes(items[idx+1].time) : start + item.duration;
  if (now < start) return 0;
  if (now >= end) return 100;
  return Math.round((now - start) / (end - start) * 100);
}

function getCurrentShow(items) {
  const now = timeToMinutes(getCurrentTimeStr());
  for (let i = items.length - 1; i >= 0; i--) {
    if (timeToMinutes(items[i].time) <= now) return items[i];
  }
  return items[0];
}

// ============================================================
// EXPORT (used by main.js)
// ============================================================
window.AppData = { CHANNELS, CATEGORY_LABELS, getSchedule, getCurrentShow, isLive, getProgress, getCurrentTimeStr, hashCode, seededRand };
