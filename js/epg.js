// ================================================================
// TV-CHECKPROGRAMM — EPG Engine
// Fetches REAL schedule data from epg.pw (free, no API key)
// CORS proxy: allorigins.win (free)
// ================================================================

'use strict';

(function() {

// ===== CONFIG =====
const EPG_BASE = 'https://epg.pw/api/epg.json';
const PROXY = 'https://secure-272717.vercel.app/';
const PROXY2 = 'https://secure-272717.tatnet.app/';
const PROXY3 = 'https://proxyvideo.vercel.app/';
const TZ = 'Europe/Moscow';
const CACHE_TTL = 30 * 60 * 1000; // 30 min

// ===== CACHE =====
const _cache = {};

function cacheKey(channelId, dateStr) {
  return `epg_${channelId}_${dateStr}`;
}

function fromCache(key) {
  const entry = _cache[key];
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL) { delete _cache[key]; return null; }
  return entry.data;
}

function toCache(key, data) {
  _cache[key] = { data, ts: Date.now() };
}

// ===== DATE HELPERS =====
function toDateStr(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

function parseEpgTime(t) {
  // epg.pw returns UTC timestamps or time strings
  if (!t) return null;
  if (typeof t === 'number') return new Date(t * 1000);
  return new Date(t);
}

function moscowTime(date) {
  // Convert to Moscow time (UTC+3)
  return new Date(date.getTime() + 3 * 3600 * 1000);
}

function formatHHMM(date) {
  const msk = moscowTime(date);
  return `${String(msk.getUTCHours()).padStart(2,'0')}:${String(msk.getUTCMinutes()).padStart(2,'0')}`;
}

// ===== FETCH SCHEDULE =====
async function fetchSchedule(channel, date) {
  const dateStr = toDateStr(date);
  const key = cacheKey(channel.id, dateStr);

  const cached = fromCache(key);
  if (cached) return cached;

  const url = `${EPG_BASE}?channel_id=${channel.id}&timezone=${TZ}`;
  const proxyUrl = PROXY + encodeURIComponent(url);

  try {
    const resp = await fetch(proxyUrl, { signal: AbortSignal.timeout(8000) });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const wrapper = await resp.json();
    const raw = JSON.parse(wrapper.contents);

    const items = parseEpgData(raw, date);
    toCache(key, items);
    return items;
  } catch (e) {
    console.warn(`EPG fetch failed for channel ${channel.id}:`, e.message);
    return null; // null = error, caller will show fallback
  }
}

function parseEpgData(raw, targetDate) {
  // epg.pw JSON format:
  // { epg_data: [ { name, start, stop, start_timestamp, stop_timestamp }, ... ] }
  const dateStr = toDateStr(targetDate);
  const dayStart = new Date(dateStr + 'T00:00:00+03:00').getTime();
  const dayEnd   = new Date(dateStr + 'T23:59:59+03:00').getTime();

  let arr = [];
  if (raw && raw.epg_data) {
    arr = raw.epg_data;
  } else if (Array.isArray(raw)) {
    arr = raw;
  }

  const items = arr
    .map(ev => {
      const startTs = ev.start_timestamp ? ev.start_timestamp * 1000 : (ev.start ? new Date(ev.start).getTime() : null);
      const stopTs  = ev.stop_timestamp  ? ev.stop_timestamp  * 1000 : (ev.stop  ? new Date(ev.stop).getTime()  : null);
      if (!startTs) return null;

      return {
        title: ev.name || ev.title || 'Передача',
        desc: ev.description || ev.desc || '',
        genre: ev.category || ev.genre || '',
        start: startTs,
        stop: stopTs,
        time: formatHHMM(new Date(startTs)),
        duration: stopTs ? Math.round((stopTs - startTs) / 60000) : 60,
      };
    })
    .filter(Boolean)
    .filter(ev => {
      // keep events that overlap with target day in Moscow time
      const startMsk = ev.start + 3 * 3600 * 1000;
      const stopMsk  = ev.stop ? ev.stop + 3 * 3600 * 1000 : startMsk + 3600000;
      return startMsk < dayEnd && stopMsk > dayStart;
    })
    .sort((a, b) => a.start - b.start);

  return items;
}

// ===== LIVE DETECTION =====
function getLiveIndex(items) {
  const now = Date.now();
  for (let i = items.length - 1; i >= 0; i--) {
    if (items[i].start <= now) return i;
  }
  return 0;
}

function isLive(item, items, idx) {
  const now = Date.now();
  const stop = item.stop || (idx + 1 < items.length ? items[idx+1].start : item.start + 3600000);
  return item.start <= now && now < stop;
}

function getProgress(item, items, idx) {
  const now = Date.now();
  const stop = item.stop || (idx + 1 < items.length ? items[idx+1].start : item.start + 3600000);
  if (now < item.start) return 0;
  if (now >= stop) return 100;
  return Math.round((now - item.start) / (stop - item.start) * 100);
}

function getCurrentShow(items) {
  if (!items || !items.length) return null;
  const idx = getLiveIndex(items);
  return items[idx];
}

// ===== EXPORT =====
window.EPG = {
  fetchSchedule,
  getLiveIndex,
  isLive,
  getProgress,
  getCurrentShow,
  toDateStr,
  formatHHMM,
};

})();
