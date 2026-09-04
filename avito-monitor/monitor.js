const fs = require('fs');
const path = require('path');

const CFG = require('./config.json');
const SEEN_FILE = path.join(__dirname, 'seen.json');
const STATUS_FILE = path.join(__dirname, 'status.json');

const TOKEN = process.env.AVITO_BOT_TOKEN || CFG.botToken;
const CHAT = process.env.AVITO_CHAT_ID || CFG.chatId;
const CITY = CFG.city || 'belgorod';
const QUERY = CFG.query || 'айфон';
const MIN_PRICE = CFG.minPrice || 5000;
const MAX_RESULTS = CFG.maxResults || 60;

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

const sleep = ms => new Promise(r => setTimeout(r, ms));

function loadSeen() {
  try { return JSON.parse(fs.readFileSync(SEEN_FILE, 'utf8')); }
  catch (e) { return {}; }
}
function saveSeen(s) {
  fs.writeFileSync(SEEN_FILE, JSON.stringify(s));
}
function saveStatus(obj) {
  fs.writeFileSync(STATUS_FILE, JSON.stringify(obj, null, 2));
}

async function fetchPage(url, attempt) {
  attempt = attempt || 0;
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': UA,
        'Accept-Language': 'ru-RU,ru;q=0.9',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      },
      redirect: 'follow'
    });
    if (res.status === 429 || res.status === 403 || res.status === 401) {
      if (attempt < 3) { await sleep(6000 * (attempt + 1)); return fetchPage(url, attempt + 1); }
      return { status: res.status, html: '' };
    }
    if (res.status !== 200) return { status: res.status, html: '' };
    return { status: 200, html: await res.text() };
  } catch (e) {
    if (attempt < 3) { await sleep(6000 * (attempt + 1)); return fetchPage(url, attempt + 1); }
    return { status: 0, html: '' };
  }
}

function cleanPrice(raw) {
  const n = parseInt(String(raw).replace(/[^\d]/g, ''), 10);
  return isNaN(n) ? 0 : n;
}

function parseItems(html) {
  const items = [];
  const idSet = new Set();

  // Strategy 1: __PRERENDER_STATE__ JSON
  const m = html.match(/<script type="application\/json" id="__PRERENDER_STATE__">([\s\S]*?)<\/script>/);
  if (m) {
    try {
      const state = JSON.parse(m[1]);
      const catalog = (state && state.state && state.state.catalog && state.state.catalog.items)
        || (state && state.catalog && state.catalog.items)
        || [];
      for (const it of catalog) {
        const title = (it.title || (it.item && it.item.title) || '').trim();
        const price = cleanPrice(it.priceDetailed && it.priceDetailed.value)
          || cleanPrice(it.priceDetailed && it.priceDetailed.string)
          || cleanPrice(it.price)
          || cleanPrice(it.item && it.item.priceDetailed && it.item.priceDetailed.value);
        const uri = it.uriPath || (it.item && it.item.uriPath) || '';
        const id = String(it.id || (it.item && it.item.id) || uri.split('-').pop() || '');
        if (title && price && !idSet.has(id)) {
          idSet.add(id);
          items.push({ id, title, price, url: 'https://www.avito.ru' + uri });
        }
      }
    } catch (e) {}
  }

  // Strategy 2: HTML item blocks
  if (items.length === 0) {
    const blocks = html.split(/<div data-marker="item"/g).slice(1);
    for (const b of blocks) {
      const titleMatch = b.match(/data-marker="item-title"[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/)
        || b.match(/href="([^"]+)"[^>]*data-marker="item-title"[^>]*>([\s\S]*?)<\/a>/);
      const priceMatch = b.match(/itemprop="price" content="(\d+)"/)
        || b.match(/data-marker="item-price"[^>]*>([\d\s]+)\s*₽/);
      if (titleMatch && priceMatch) {
        const href = titleMatch[1];
        const title = titleMatch[2].replace(/<[^>]+>/g, '').trim();
        const price = parseInt(priceMatch[1], 10) || cleanPrice(priceMatch[1] || priceMatch[2]);
        const id = String(href.split('-').pop() || '');
        if (title && price && !idSet.has(id)) {
          idSet.add(id);
          items.push({ id, title, price, url: 'https://www.avito.ru' + href });
        }
      }
    }
  }

  return items.slice(0, MAX_RESULTS);
}

function median(nums) {
  if (!nums.length) return 0;
  const s = [...nums].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : Math.round((s[mid - 1] + s[mid]) / 2);
}

async function sendTg(text) {
  if (!TOKEN || !CHAT) return;
  try {
    await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT, text, parse_mode: 'HTML' })
    });
  } catch (e) {}
}

async function main() {
  if (!fs.existsSync(SEEN_FILE)) saveSeen({});
  const url = `https://www.avito.ru/${CITY}?q=${encodeURIComponent(QUERY)}`;
  const { status, html } = await fetchPage(url);
  const statusObj = { ts: new Date().toISOString(), url, httpStatus: status };

  if (status !== 200 || !html) {
    statusObj.error = 'Avito blocked or no response (HTTP ' + status + ')';
    saveStatus(statusObj);
    console.error(statusObj.error);
    return;
  }

  if (html.includes('Доступ ограничен') || html.includes('проблема с IP')) {
    statusObj.error = 'Avito block page detected';
    saveStatus(statusObj);
    console.error(statusObj.error);
    return;
  }

  const listings = parseItems(html);
  statusObj.found = listings.length;

  if (listings.length === 0) {
    statusObj.error = 'No listings parsed (structure changed?)';
    saveStatus(statusObj);
    console.error(statusObj.error);
    return;
  }

  const filtered = listings.filter(it => it.price >= MIN_PRICE);
  const market = median(filtered.map(it => it.price));
  statusObj.filtered = filtered.length;
  statusObj.marketMedian = market;

  const seen = loadSeen();
  let notified = 0;
  for (const it of filtered) {
    if (seen[it.id]) continue;
    seen[it.id] = { price: it.price, seen: Date.now() };
    if (market > 0 && it.price < market) {
      notified++;
      await sendTg(
        '📱 <b>' + it.title + '</b>\n' +
        '💰 ' + it.price + ' ₽ — <b>ниже рынка</b> (~' + market + ' ₽)\n' +
        '🔗 ' + it.url
      );
      await sleep(400);
    }
  }
  saveSeen(seen);
  statusObj.notified = notified;
  saveStatus(statusObj);
  console.log('found:', listings.length, 'filtered:', filtered.length, 'market:', market, 'notified:', notified);
}

main().catch(e => {
  console.error(e);
  saveStatus({ ts: new Date().toISOString(), error: String(e && e.message || e) });
});