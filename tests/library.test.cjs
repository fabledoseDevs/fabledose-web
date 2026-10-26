const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');

const deferred = () => { let resolve, reject; const promise = new Promise((ok, fail) => { resolve = ok; reject = fail; }); return { promise, resolve, reject }; };
const settle = () => new Promise(resolve => setImmediate(resolve));
const runtime = hook => {
  let cursor = 0;
  const slots = [], effects = [], authListeners = new Set(), modules = new Map(), cache = new Map();
  const auth = { currentUser: { uid: 'A' } };
  const api = { getFavorites: async () => [], getContinueReading: async () => [], addFavorite: async () => {}, removeFavorite: async () => {}, getReadingProgress: async () => null, waitForReadingProgressWrites: async () => {}, updateReadingProgress: async () => {} };
  const events = new Map();
  const browser = { location: { href: 'https://example.test/pl/fable/story?mode=slideshow&lang=pl#read' }, history: { replaceState: (...args) => { browser.history.last = args; browser.location.href = String(args[2]); } }, addEventListener: (name, callback) => events.set(name, callback), removeEventListener: name => events.delete(name) };
  const equal = (a, b) => a && b && a.length === b.length && a.every((item, index) => Object.is(item, b[index]));
  const react = {
    useState: initial => { const i = cursor++; if (!(i in slots)) slots[i] = typeof initial === 'function' ? initial() : initial; return [slots[i], value => { slots[i] = typeof value === 'function' ? value(slots[i]) : value; }]; },
    useRef: initial => { const i = cursor++; return slots[i] || (slots[i] = { current: initial }); },
    useCallback: (fn, deps) => { const i = cursor++; if (!slots[i] || !equal(slots[i].deps, deps)) slots[i] = { fn, deps }; return slots[i].fn; },
    useEffect: (fn, deps) => { const i = cursor++; const previous = slots[i]; if (!previous || !equal(previous.deps, deps)) { slots[i] = { deps, cleanup: previous?.cleanup }; effects.push(() => { previous?.cleanup?.(); slots[i].cleanup = fn(); }); } },
  };
  const progressCache = {
    getProgress: (uid, id) => uid === auth.currentUser?.uid ? cache.get(id) || null : null,
    setProgress: (uid, id, value) => { if (uid !== auth.currentUser?.uid) return false; cache.set(id, value); return true; },
    clearProgress: (uid, id) => { if (uid === auth.currentUser?.uid) cache.delete(id); },
  };
  const load = file => {
    if (modules.has(file)) return modules.get(file);
    const source = fs.readFileSync(path.join(__dirname, file === 'useFavoritesData' ? '../src/components/templates/FavoritePage/hooks/useFavoritesData.ts' : '../src/hooks/' + file + '.ts'), 'utf8');
    const code = ts.transpileModule(source, { fileName: file + '.ts', compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText;
    const exports = {};
    const mocks = { react, 'firebase/auth': { onAuthStateChanged: (_, callback) => { authListeners.add(callback); callback(auth.currentUser); return () => authListeners.delete(callback); } }, '@/config/firebase': { auth }, '@/config/firestore': api, '@/fables/fables.library': { getFableUrl: (meta, lang) => `/${lang}/fable/${meta.id}` }, '../FavoritePage.utils': { getFablesIndexClient: () => api.getFablesIndexClient(), getTotalSlides: value => api.getTotalSlides(value) }, '@/contexts/ReadingProgressContext': { useReadingProgressContext: () => progressCache }, './useAccountSession': file === 'useAccountSession' ? undefined : load('useAccountSession') };
    vm.runInNewContext(code, { exports, require: name => { if (!(name in mocks)) throw Error(name); return mocks[name]; }, Error, URL, console, document: { visibilityState: 'visible' }, window: browser });
    modules.set(file, exports); return exports;
  };
  const useHook = load(hook)[hook];
  const render = (uid = auth.currentUser?.uid ?? null) => { cursor = 0; const result = useHook(uid); effects.splice(0).forEach(effect => effect()); return result; };
  const switchUser = uid => { auth.currentUser = uid ? { uid } : null; cache.clear(); [...authListeners].forEach(listener => listener(auth.currentUser)); };
  const unmount = () => { slots.forEach(slot => slot?.cleanup?.()); };
  return { api, auth, cache, render, switchUser, unmount, events, browser, exports: modules.get(hook) };
};

test('favorites: delayed A reads cannot overwrite B or a later login to A', async () => {
  for (const backToA of [false, true]) {
    const h = runtime('useFavorites'); const old = deferred(); let reads = 0;
    h.api.getFavorites = () => ++reads === 1 ? old.promise : Promise.resolve([]);
    h.render('A'); await settle(); h.switchUser('B'); if (backToA) h.switchUser('A'); h.render(); await settle();
    old.resolve([{ fableId: 'private-A', addedAt: 1 }]); await settle(); assert.equal(h.render().favorites.length, 0); assert.equal(h.render().loading, false);
  }
});
test('favorites: owner data is hidden before the next load and on logout', async () => {
  const h = runtime('useFavorites'); h.api.getFavorites = async () => [{ fableId: 'private-A', addedAt: 1 }]; h.render(); await settle(); assert.equal(h.render().favorites.length, 1);
  h.switchUser('B'); assert.equal(h.render().favorites.length, 0); h.switchUser(null); assert.equal(h.render(null).favorites.length, 0);
});
test('favorites: failed write keeps the heart unchanged; retry repeats the desired operation', async () => {
  const h = runtime('useFavorites'); h.render(); await settle(); let adds = 0, removes = 0;
  h.api.addFavorite = async () => { if (++adds === 1) throw Error('denied'); }; h.api.removeFavorite = async () => { removes++; };
  assert.equal(await h.render().toggleFavorite('fable'), null); assert.equal(h.render().isFavorited('fable'), false); assert.equal(h.render().canRetryFavorite, true);
  assert.equal(await h.render().retryFavorite(), 'added'); assert.equal(h.render().isFavorited('fable'), true); assert.equal(h.render().error, null); assert.equal(adds, 2); assert.equal(removes, 0);
});
test('favorites: duplicate clicks are locked until server acknowledgement', async () => {
  const h = runtime('useFavorites'); h.render(); await settle(); const write = deferred(); let calls = 0; h.api.addFavorite = () => { calls++; return write.promise; };
  const first = h.render().toggleFavorite('fable'); assert.equal(h.render().isPending('fable'), true); assert.equal(await h.render().toggleFavorite('fable'), null); await settle(); assert.equal(calls, 1); assert.equal(h.render().isFavorited('fable'), false);
  write.resolve(); assert.equal(await first, 'added'); assert.equal(h.render().isPending('fable'), false);
});
test('favorites: late write success/failure never updates the next account or offers its retry', async () => {
  for (const fail of [false, true]) {
    const h = runtime('useFavorites'); h.render(); await settle(); const write = deferred(); h.api.addFavorite = () => write.promise; const saving = h.render().toggleFavorite('fable'); await settle();
    h.switchUser('B'); h.render(); await settle(); if (fail) write.reject(Error('denied')); else write.resolve(); assert.equal(await saving, null); assert.equal(h.render().favorites.length, 0); assert.equal(h.render().error, null); assert.equal(h.render().canRetryFavorite, false);
  }
});
test('favorites: refresh waits for pending writes and newer refresh wins', async () => {
  const h = runtime('useFavorites'); h.render(); await settle(); let stored = []; const write = deferred();
  h.api.addFavorite = async () => { await write.promise; stored = [{ fableId: 'fable', addedAt: 1 }]; };
  h.api.getFavorites = async () => stored; const saving = h.render().toggleFavorite('fable'); const refreshing = h.render().refreshFavorites(); await settle(); write.resolve(); await saving; await refreshing; assert.equal(h.render().isFavorited('fable'), true);
  const old = deferred(); h.api.getFavorites = () => old.promise; const first = h.render().refreshFavorites(); await settle(); h.api.getFavorites = async () => []; await h.render().refreshFavorites(); old.resolve([{ fableId: 'stale', addedAt: 1 }]); await first; assert.equal(h.render().favorites.length, 0);
});
test('favorites: failed read is visible and can be reloaded', async () => {
  const h = runtime('useFavorites'); h.api.getFavorites = async () => { throw Error('offline'); }; h.render(); await settle(); assert.ok(h.render().error); assert.equal(h.render().loading, false);
  h.api.getFavorites = async () => [{ fableId: 'saved', addedAt: 1 }]; await h.render().refreshFavorites(); assert.equal(h.render().error, null); assert.equal(h.render().isFavorited('saved'), true);
});

test('progress: late reads cannot enter the next session, including A → B → A', async () => {
  const h = runtime('useReadingProgress'); h.render(); const read = deferred(); h.api.getReadingProgress = () => read.promise; const first = h.render().getProgress('fable');
  h.switchUser('B'); h.switchUser('A'); h.render(); read.resolve({ fableId: 'fable', currentSlide: 8 }); assert.equal(await first, null); assert.equal(h.cache.size, 0);
});
test('progress: concurrent reads share a request and preserve a newer cached position', async () => {
  const h = runtime('useReadingProgress'); h.render(); const read = deferred(); let calls = 0; h.api.getReadingProgress = () => { calls++; return read.promise; };
  const a = h.render().getProgress('fable'), b = h.render().getProgress('fable'); await settle(); assert.equal(calls, 1); assert.equal(h.render().loading, true);
  h.cache.set('fable', { fableId: 'fable', currentSlide: 9 }); read.resolve({ fableId: 'fable', currentSlide: 1 }); assert.equal((await a).currentSlide, 9); assert.equal((await b).currentSlide, 9); assert.equal(h.render().loading, false);
});
test('progress: an older failed save cannot erase a newer successful position or show a stale error', async () => {
  const h = runtime('useReadingProgress'); h.render(); const old = deferred(); h.api.updateReadingProgress = (_, __, slide) => slide === 2 ? old.promise : Promise.resolve();
  const first = h.render().saveProgress('fable', 2); await h.render().saveProgress('fable', 4); old.reject(Error('old failure')); assert.equal(await first, false); assert.equal(h.cache.get('fable').currentSlide, 4); assert.equal(h.render().error, null); assert.equal(h.render().canRetrySave, false);
});
test('progress: retry restores the exact failed position and completion flag', async () => {
  const h = runtime('useReadingProgress'); h.render(); let calls = 0, saved;
  h.api.updateReadingProgress = async (...args) => { if (++calls === 1) throw Error('offline'); saved = args; };
  assert.equal(await h.render().saveProgress('fable', 12, true), false); assert.equal(h.cache.size, 0); assert.equal(h.render().canRetrySave, true); assert.equal(h.render().saving, false);
  assert.equal(await h.render().retrySave(), true); assert.deepEqual(saved, ['A', 'fable', 12, true]); assert.equal(h.render().error, null);
});
test('progress: reset persists slide zero and rejects invalid positions', async () => {
  const h = runtime('useReadingProgress'); h.render(); const calls = []; h.api.updateReadingProgress = async (...args) => { calls.push(args); };
  assert.equal(await h.render().saveProgress('fable', 0, false), true); assert.deepEqual(calls[0], ['A', 'fable', 0, false]); assert.equal(await h.render().saveProgress('fable', -1), false); assert.equal(calls.length, 1);
});
test('progress: read errors can be retried, late writes cannot report into a different account', async () => {
  const h = runtime('useReadingProgress'); h.render(); h.api.getReadingProgress = async () => { throw Error('offline'); }; await h.render().getProgress('fable'); assert.ok(h.render().readError);
  h.api.getReadingProgress = async () => ({ fableId: 'fable', currentSlide: 3 }); assert.equal((await h.render().getProgress('fable')).currentSlide, 3); assert.equal(h.render().readError, null);
  const write = deferred(); h.api.updateReadingProgress = () => write.promise; const saving = h.render().saveProgress('fable', 5); h.switchUser('B'); h.render(); write.reject(Error('denied')); assert.equal(await saving, false); assert.equal(h.render().error, null); assert.equal(h.render().canRetrySave, false);
});
test('unmounted hooks ignore delayed results', async () => {
  const h = runtime('useFavorites'); const read = deferred(); h.api.getFavorites = () => read.promise; h.render(); await settle(); h.unmount(); read.resolve([{ fableId: 'late', addedAt: 1 }]); await settle();
  const p = runtime('useReadingProgress'); p.render(); const pending = deferred(); p.api.getReadingProgress = () => pending.promise; const result = p.render().getProgress('fable'); p.unmount(); pending.resolve({ fableId: 'fable', currentSlide: 1 }); assert.equal(await result, null);
});

test('progress: navigation waits for pending acknowledgement before trusting cached progress', async () => {
  const h = runtime('useReadingProgress'); h.render(); const barrier = deferred(); h.api.waitForReadingProgressWrites = () => barrier.promise; h.cache.set('fable', { fableId: 'fable', currentSlide: 7 });
  let finished = false; const reading = h.render().getProgress('fable').then(result => { finished = true; return result; }); await settle(); assert.equal(finished, false); barrier.resolve(); assert.equal((await reading).currentSlide, 7);
});
test('progress: failed pending write blocks resume, even when an optimistic value is cached', async () => {
  const h = runtime('useReadingProgress'); h.render(); h.cache.set('fable', { fableId: 'fable', currentSlide: 7 }); h.api.waitForReadingProgressWrites = async () => { throw Error('write rejected'); };
  assert.equal(await h.render().getProgress('fable'), null); assert.ok(h.render().readError);
});
test('progress: failed save after leaving the page removes its unacknowledged cache value', async () => {
  const h = runtime('useReadingProgress'); h.render(); const write = deferred(); h.api.updateReadingProgress = () => write.promise; const saving = h.render().saveProgress('fable', 8); h.unmount(); write.reject(Error('offline')); assert.equal(await saving, false); assert.equal(h.cache.size, 0);
});
test('reader: absent deep link resumes persisted position; completed stories restart at zero', async () => {
  for (const completed of [false, true]) {
    const h = runtime('useReaderStart'); const options = { userId: 'A', authChecked: true, accountRevision: 1, fableId: 'fable', enabled: true, getProgress: async () => ({ currentSlide: 8, isCompleted: completed }) };
    assert.equal(h.render(options).ready, false); await settle(); assert.equal(h.render(options).ready, true); assert.equal(h.render(options).slide, completed ? 0 : 8);
  }
});
test('reader: explicit deep link is honored initially, but never applied to a switched account', async () => {
  const h = runtime('useReaderStart'); const getProgress = async () => ({ currentSlide: 3, isCompleted: false });
  let options = { userId: 'A', authChecked: true, accountRevision: 1, fableId: 'fable', enabled: true, initialSlide: 9, getProgress };
  h.render(options); await settle(); assert.equal(h.render(options).slide, 9);
  options = { ...options, userId: 'B', accountRevision: 2 }; assert.equal(h.render(options).ready, false); await settle(); assert.equal(h.render(options).slide, 3);
  options = { ...options, userId: 'A', accountRevision: 3 }; h.render(options); await settle(); assert.equal(h.render(options).slide, 3);
});
test('reader: stale position load is cancelled and failed loads can be repeated', async () => {
  const h = runtime('useReaderStart'); const old = deferred(); let options = { userId: 'A', authChecked: true, accountRevision: 1, fableId: 'fable', enabled: true, getProgress: () => old.promise };
  h.render(options); options = { ...options, userId: 'B', accountRevision: 2, getProgress: async () => ({ currentSlide: 2 }) }; h.render(options); await settle(); old.resolve({ currentSlide: 10 }); await settle(); assert.equal(h.render(options).slide, 2);
  h.render(options).retry(); assert.equal(h.render(options).ready, false); await settle(); assert.equal(h.render(options).slide, 2);
});
test('reader URL retains locale, mode, other query parameters and fragment', () => {
  const h = runtime('useReaderStart'); h.exports.updateReaderLocation(5); const url = new URL(h.browser.location.href); assert.equal(url.pathname, '/pl/fable/story'); assert.equal(url.searchParams.get('mode'), 'slideshow'); assert.equal(url.searchParams.get('lang'), 'pl'); assert.equal(url.searchParams.get('slide'), '5'); assert.equal(url.hash, '#read'); assert.equal(h.browser.history.last[0], null);
});

const queueFactory = () => {
  const source = fs.readFileSync(path.join(__dirname, '../src/config/writeQueue.ts'), 'utf8'); const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText; const exports = {}; vm.runInNewContext(code, { exports }); return exports.createWriteQueue();
};
test('write queue: account barrier includes later queued writes but does not wait for another account', async () => {
  const queue = queueFactory(); const a = deferred(), b = deferred(); const first = queue('progress/A/one', () => a.promise); const other = queue('progress/B/two', () => b.promise);
  let finished = false; const barrier = queue.waitForPrefix('progress/A/').then(() => { finished = true; }); const second = queue('progress/A/one', async () => 2); await settle(); assert.equal(finished, false); a.resolve(1); await barrier; assert.equal(await first, 1); assert.equal(await second, 2); assert.equal(finished, true); b.resolve(); await other;
});
test('write queue: failed writes reject their barrier without poisoning subsequent saves', async () => {
  const queue = queueFactory(); const write = deferred(); const first = queue('progress/A/one', () => write.promise); const firstCheck = assert.rejects(first); const barrierCheck = assert.rejects(queue.waitFor('progress/A/one')); write.reject(Error('offline')); await firstCheck; await barrierCheck; await queue('progress/A/one', async () => 4); await queue.waitFor('progress/A/one');
});

test('progress: a save started during a remote read must be acknowledged before its cached value is returned', async () => {
  const h = runtime('useReadingProgress'); h.render(); const read = deferred(), write = deferred(); let pendingWrite = false, finished = false;
  h.api.getReadingProgress = () => read.promise; h.api.waitForReadingProgressWrites = () => pendingWrite ? write.promise : Promise.resolve(); h.api.updateReadingProgress = () => write.promise;
  const reading = h.render().getProgress('fable').then(value => { finished = true; return value; }); await settle(); pendingWrite = true; const saving = h.render().saveProgress('fable', 8); read.resolve({ fableId: 'fable', currentSlide: 2 }); await settle(); assert.equal(finished, false); write.resolve(); assert.equal(await saving, true); assert.equal((await reading).currentSlide, 8);
});
test('favorites: signed-out empty collections have stable identities for metadata effects', () => {
  const h = runtime('useFavorites'); const first = h.render(null), second = h.render(null); assert.equal(first.favorites, second.favorites); assert.equal(first.continueReading, second.continueReading);
});
test('metadata: account changes hide old tiles immediately and discard late asynchronous mapping', async () => {
  const h = runtime('useFavoritesData'); const slides = deferred(); h.api.getFablesIndexClient = async () => [{ meta: { id: 'A', contentPointers: { story: 'a/story.json' } } }, { meta: { id: 'B', contentPointers: { story: 'b/story.json' } } }]; h.api.getTotalSlides = () => slides.promise;
  const a = { favorites: [], continueReading: [{ fableId: 'A', currentSlide: 5 }], loading: false, currentLang: 'pl' }; h.render(a); await settle();
  const b = { favorites: [{ fableId: 'B' }], continueReading: [], loading: false, currentLang: 'en' }; assert.equal(h.render(b).favoriteFables.length, 0); await settle(); assert.equal(h.render(b).favoriteFables[0].meta.id, 'B'); slides.resolve(13); await settle(); assert.equal(h.render(b).continueReadingFables.length, 0); assert.equal(h.render({ ...b, loading: true }).favoriteFables.length, 0);
});
test('metadata: catalogue errors are visible and a refreshed source can retry', async () => {
  const h = runtime('useFavoritesData'); h.api.getFablesIndexClient = async () => { throw Error('offline'); }; const input = { favorites: [{ fableId: 'A' }], continueReading: [], loading: false, currentLang: 'pl' }; h.render(input); await settle(); assert.ok(h.render(input).error);
  h.api.getFablesIndexClient = async () => [{ meta: { id: 'A' } }]; const retry = { ...input, favorites: [...input.favorites] }; h.render(retry); await settle(); assert.equal(h.render(retry).error, null); assert.equal(h.render(retry).favoriteFables[0].meta.id, 'A');
});
