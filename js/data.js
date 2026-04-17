// ============================================================
// TV-CHECKPROGRAMM — Data & Engine
// ============================================================

const CHANNELS = [
  // ====== ФЕДЕРАЛЬНЫЕ ТВ ======
  { id: 'perviy', name: 'Первый канал', type: 'tv', category: 'federal', icon: '1', color: '#1565C0', epgPath: '1tv.ru.xml' },
  { id: 'russia1', name: 'Россия 1', type: 'tv', category: 'federal', icon: 'Р1', color: '#C62828', epgPath: 'russia1.ru.xml' },
  { id: 'ntv', name: 'НТВ', type: 'tv', category: 'federal', icon: 'НТВ', color: '#00897B', epgPath: 'ntv.ru.xml' },
  { id: 'russia24', name: 'Россия 24', type: 'tv', category: 'news', icon: 'Р24', color: '#0D47A1', epgPath: 'vesti.ru.xml' },
  { id: 'match', name: 'Матч ТВ', type: 'tv', category: 'sport', icon: '⚽', color: '#E65100', epgPath: 'matchtv.ru.xml' },
  { id: 'pyaty', name: 'Пятый канал', type: 'tv', category: 'federal', icon: '5', color: '#6A1B9A', epgPath: '5-tv.ru.xml' },
  { id: 'kultura', name: 'Культура', type: 'tv', category: 'culture', icon: 'К', color: '#558B2F', epgPath: 'smotrim.ru.xml' },
  { id: 'tbk', name: 'ТВК', type: 'tv', category: 'regional', icon: 'ТВК', color: '#37474F' },
  { id: 'tnt', name: 'ТНТ', type: 'tv', category: 'entertainment', icon: 'ТНТ', color: '#E53935', epgPath: 'tnt-online.ru.xml' },
  { id: 'sts', name: 'СТС', type: 'tv', category: 'entertainment', icon: 'СТС', color: '#F57C00', epgPath: 'ctc.ru.xml' },
  { id: 'ren', name: 'РЕН ТВ', type: 'tv', category: 'federal', icon: 'РЕН', color: '#D81B60', epgPath: 'ren.tv.xml' },
  { id: 'tv3', name: 'ТВ-3', type: 'tv', category: 'entertainment', icon: 'ТВ3', color: '#7B1FA2', epgPath: 'tv3.ru.xml' },
  { id: 'muz', name: 'Муз-ТВ', type: 'tv', category: 'music', icon: '🎵', color: '#E91E63', epgPath: 'muz-tv.ru.xml' },
  { id: 'friday', name: 'Пятница!', type: 'tv', category: 'entertainment', icon: 'Пт!', color: '#FF6F00', epgPath: 'friday.ru.xml' },
  { id: 'russia2', name: 'Россия-К', type: 'tv', category: 'culture', icon: 'РК', color: '#2E7D32' },
  { id: 'tvc', name: 'ТВ Центр', type: 'tv', category: 'news', icon: 'ТВЦ', color: '#1565C0', epgPath: 'tvc.ru.xml' },
  { id: 'domashny', name: 'Домашний', type: 'tv', category: 'entertainment', icon: '🏠', color: '#F48FB1', epgPath: 'domashniy.ru.xml' },
  { id: 'tv1000', name: 'TV 1000', type: 'tv', category: 'movies', icon: '🎬', color: '#BF360C' },
  { id: 'kinopoisk', name: 'Кинопоиск HD', type: 'tv', category: 'movies', icon: '🎞', color: '#FF6D00' },
  { id: 'nauka', name: 'Наука', type: 'tv', category: 'culture', icon: '🔬', color: '#0277BD' },
  { id: 'disney', name: 'Disney Channel', type: 'tv', category: 'kids', icon: '✨', color: '#0052CC' },
  { id: 'nickelodeon', name: 'Nickelodeon', type: 'tv', category: 'kids', icon: '🟠', color: '#FF5722' },
  { id: 'carousel', name: 'Карусель', type: 'tv', category: 'kids', icon: '🎠', color: '#F9A825', epgPath: 'karusel-tv.ru.xml' },
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
  { id: 'zvezda', name: 'Звезда', type: 'tv', category: 'federal', icon: '⭐', color: '#1A237E', epgPath: 'tvzvezda.ru.xml' },
  { id: 'ort-prim', name: 'ОРТ Прима', type: 'tv', category: 'regional', icon: 'ОРТ', color: '#4A148C' },
  { id: 'spas', name: 'Спас', type: 'tv', category: 'culture', icon: '✝', color: '#795548', epgPath: 'spastv.ru.xml' },
  { id: 'tbg', name: 'ТВ Губерния', type: 'tv', category: 'regional', icon: 'ТВГ', color: '#546E7A' },
  { id: 'ctb', name: 'СТБ', type: 'tv', category: 'entertainment', icon: 'СТБ', color: '#1E88E5' },
  { id: 'u', name: 'Канал U', type: 'tv', category: 'entertainment', icon: 'U', color: '#00ACC1' },
  { id: 'mir', name: 'МИР', type: 'tv', category: 'federal', icon: 'МИР', color: '#00897B', epgPath: 'mirtv.ru.xml' },
  { id: 'otr', name: 'ОТР', type: 'tv', category: 'federal', icon: 'ОТР', color: '#3949AB', epgPath: 'otr-online.ru.xml' },
  { id: 'che', name: 'ЧЕ!', type: 'tv', category: 'entertainment', icon: 'ЧЕ', color: '#F4511E', epgPath: 'chetv.ru.xml' },
  { id: 'u-tv', name: 'Ю', type: 'tv', category: 'entertainment', icon: 'Ю', color: '#8E24AA', epgPath: 'u-tv.ru.xml' },
  { id: '2x2', name: '2x2', type: 'tv', category: 'kids', icon: '2x2', color: '#FDD835', epgPath: '2x2tv.ru.xml' },
  { id: 'tnt4', name: 'ТНТ4', type: 'tv', category: 'entertainment', icon: 'ТНТ4', color: '#D81B60', epgPath: 'tnt4.ru.xml' },
  { id: 'saturday', name: 'Суббота!', type: 'tv', category: 'entertainment', icon: 'СБ!', color: '#FF7043', epgPath: 'subbota.tv.xml' },
  { id: 'mir24', name: 'МИР 24', type: 'tv', category: 'news', icon: 'МИР24', color: '#00695C', epgPath: 'mir24.tv.xml' },
  { id: 'rbc', name: 'РБК', type: 'tv', category: 'news', icon: 'РБК', color: '#263238', epgPath: 'tv.rbc.ru.xml' },
  { id: 'dom-kino', name: 'Дом Кино', type: 'tv', category: 'movies', icon: 'ДК', color: '#6D4C41', epgPath: 'domkino.tv.xml' },
  { id: 'dom-kino-premium', name: 'Дом Кино Премиум', type: 'tv', category: 'movies', icon: 'ДК+', color: '#4E342E', epgPath: 'domkino-premium.tv.xml' },
  { id: 'telecafe', name: 'Телекафе', type: 'tv', category: 'entertainment', icon: '☕', color: '#8D6E63', epgPath: 'telecafe.ru.xml' },
  { id: 'bobyor', name: 'Бобёр', type: 'tv', category: 'culture', icon: '🪵', color: '#5D4037', epgPath: 'bobyor.ru.xml' },
  { id: 'poehali', name: 'Поехали!', type: 'tv', category: 'culture', icon: '🚗', color: '#43A047', epgPath: 'poehali.tv.xml' },
  { id: 'detsky', name: 'Детский', type: 'tv', category: 'kids', icon: '👶', color: '#7CB342', epgPath: 'detskiy.tv.xml' },
  { id: 'ohota', name: 'Охота и Рыбалка', type: 'tv', category: 'culture', icon: '🎣', color: '#33691E', epgPath: 'ohota-i-rybalka.tv.xml' },
  { id: 'history', name: 'History', type: 'tv', category: 'culture', icon: 'H', color: '#5D4037', epgPath: 'history.com.xml' },
  { id: 'nat-geo', name: 'National Geographic', type: 'tv', category: 'culture', icon: 'NG', color: '#F9A825', epgPath: 'natgeotv.com.xml' },
  { id: 'discovery', name: 'Discovery Channel', type: 'tv', category: 'culture', icon: 'D', color: '#1E88E5', epgPath: 'discoverychannel.ru.xml' },
  { id: 'animal-planet', name: 'Animal Planet', type: 'tv', category: 'culture', icon: '🐾', color: '#2E7D32', epgPath: 'animalplanet.com.xml' },
  { id: 'cartoon-network', name: 'Cartoon Network', type: 'tv', category: 'kids', icon: 'CN', color: '#212121', epgPath: 'cartoonnetwork.ru.xml' },
  { id: 'nickjr', name: 'Nick Jr.', type: 'tv', category: 'kids', icon: 'NJ', color: '#FF7043', epgPath: 'nickjr.tv.xml' },
  { id: 'nicktoons', name: 'NickToons', type: 'tv', category: 'kids', icon: 'NT', color: '#FF8F00', epgPath: 'nicktoons.co.uk.xml' },
  { id: 'fashion-tv', name: 'Fashion TV', type: 'tv', category: 'music', icon: 'F', color: '#AD1457', epgPath: 'ftv.com.xml' },
  { id: 'euromusic', name: 'Europa Plus TV', type: 'tv', category: 'music', icon: 'EPTV', color: '#EC407A', epgPath: 'europaplustv.com.xml' },
  { id: 'bridge-tv', name: 'BRIDGE TV', type: 'tv', category: 'music', icon: 'BR', color: '#8E24AA', epgPath: 'bridgetv.ru.xml' },
  { id: 'ru-tv', name: 'RU TV', type: 'tv', category: 'music', icon: 'RU', color: '#C2185B', epgPath: 'ru.tv.xml' },
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

const EPG_MIRRORS = [
  'https://iptv-org.github.io/epg/guides/ru/',
  'https://raw.githubusercontent.com/iptv-org/epg/master/guides/ru/',
  'https://cdn.jsdelivr.net/gh/iptv-org/epg/guides/ru/',
];

const scheduleCache = new Map();
const pendingLoads = new Map();

function getSchedule(channelId, date) {
  const channel = CHANNELS.find(c => c.id === channelId);
  if (!channel) return [];

  const cacheKey = `${channelId}|${toDateKey(date)}`;
  if (scheduleCache.has(cacheKey)) return scheduleCache.get(cacheKey);

  const seed = hashCode(channelId + date.toDateString());
  const fallback = channel.type === 'radio'
    ? generateRadioSchedule(channel, seed)
    : generateTVSchedule(channel, seed);

  scheduleCache.set(cacheKey, fallback);
  loadRealSchedule(channel, date, cacheKey, fallback);
  return fallback;
}

function toDateKey(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

async function loadRealSchedule(channel, date, cacheKey, fallbackSchedule) {
  if (!channel.epgPath || pendingLoads.has(cacheKey)) return;
  pendingLoads.set(cacheKey, true);

  try {
    const xml = await fetchEpgXml(channel.epgPath);
    if (!xml) return;
    const parsedSchedule = parseXmltvForDate(xml, date);
    if (!parsedSchedule.length) return;

    scheduleCache.set(cacheKey, parsedSchedule);
    window.dispatchEvent(new CustomEvent('app:schedule-updated', {
      detail: { channelId: channel.id, dateKey: toDateKey(date), from: 'xmltv' },
    }));
  } catch (err) {
    scheduleCache.set(cacheKey, fallbackSchedule);
  } finally {
    pendingLoads.delete(cacheKey);
  }
}

async function fetchEpgXml(epgPath) {
  for (const base of EPG_MIRRORS) {
    try {
      const response = await fetch(`${base}${epgPath}`, { cache: 'no-store' });
      if (response.ok) return await response.text();
    } catch (_) {
      // continue
    }
  }
  return null;
}

function parseXmltvForDate(xmlText, date) {
  const doc = new DOMParser().parseFromString(xmlText, 'text/xml');
  const rows = Array.from(doc.querySelectorAll('programme'));
  if (!rows.length) return [];

  const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
  const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);

  const items = rows
    .map(row => {
      const startRaw = row.getAttribute('start') || '';
      const stopRaw = row.getAttribute('stop') || '';
      const titleNode = row.querySelector('title');
      const categoryNode = row.querySelector('category');
      const descNode = row.querySelector('desc');

      const startDate = parseXmltvDate(startRaw);
      const stopDate = parseXmltvDate(stopRaw);
      if (!startDate) return null;
      if (startDate < dayStart || startDate >= dayEnd) return null;

      const duration = stopDate && stopDate > startDate
        ? Math.max(15, Math.round((stopDate - startDate) / 60000))
        : 30;

      return {
        time: `${String(startDate.getHours()).padStart(2, '0')}:${String(startDate.getMinutes()).padStart(2, '0')}`,
        title: (titleNode?.textContent || 'Без названия').trim(),
        genre: (categoryNode?.textContent || descNode?.textContent || 'Передача').trim().slice(0, 80),
        duration,
        isReal: true,
      };
    })
    .filter(Boolean)
    .sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time));

  return items;
}

function parseXmltvDate(raw) {
  if (!raw) return null;
  const clean = raw.trim();
  const m = clean.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})(?:\s*([+-]\d{4}))?/);
  if (!m) return null;

  const [, y, mo, d, h, mi, s, tz] = m;
  const year = Number(y);
  const month = Number(mo);
  const day = Number(d);
  const hour = Number(h);
  const minute = Number(mi);
  const second = Number(s);

  if (!tz) return new Date(year, month - 1, day, hour, minute, second);

  const sign = tz[0] === '-' ? -1 : 1;
  const tzHours = Number(tz.slice(1, 3));
  const tzMins = Number(tz.slice(3, 5));
  const totalOffsetMinutes = sign * (tzHours * 60 + tzMins);

  const utcMillis = Date.UTC(year, month - 1, day, hour, minute, second) - totalOffsetMinutes * 60000;
  return new Date(utcMillis);
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
