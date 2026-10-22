const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const ts = require('typescript');

const load = (file, mocks, env = { NEXT_PUBLIC_ACCOUNT_DELETION_ENABLED: 'true' }) => {
  const source = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  const { outputText } = ts.transpileModule(source, { fileName: file, compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX } });
  const exports = {};
  vm.runInNewContext(outputText, { exports, process: { env }, require: name => { if (!(name in mocks)) throw new Error(`Unexpected import: ${name}`); return mocks[name]; } });
  return exports;
};

const setup = (enabled = true) => {
  const calls = [];
  const user = { uid: 'owner', email: 'old@example.test', providerData: [{ providerId: 'password' }], getIdToken: async force => { calls.push(['token', force]); } };
  const auth = { currentUser: user, app: {} };
  const behavior = { reauth: async () => {}, remove: async () => ({ data: { deleted: true } }) };
  class FirebaseError extends Error { constructor(code, message) { super(message); this.code = code; } }
  const service = load('src/config/account.ts', {
    'firebase/app': { FirebaseError },
    'firebase/auth': {
      EmailAuthProvider: { credential: (email, password) => ({ email, password }) }, GoogleAuthProvider: class {},
      reauthenticateWithCredential: async (user, credential) => { calls.push(['password', user.uid, credential]); await behavior.reauth(); },
      reauthenticateWithPopup: async user => { calls.push(['google', user.uid]); await behavior.reauth(); },
      verifyBeforeUpdateEmail: async (user, email) => { calls.push(['verify', user.uid, email]); },
      updatePassword: async (user, password) => { calls.push(['update-password', user.uid, password]); },
      signOut: async () => { calls.push(['signout']); auth.currentUser = null; },
    },
    'firebase/functions': { getFunctions: (_, region) => { calls.push(['region', region]); return {}; }, httpsCallable: (_, name) => async data => { calls.push(['callable', name, data]); return behavior.remove(); } },
    './firebase': { auth },
  }, { NEXT_PUBLIC_ACCOUNT_DELETION_ENABLED: String(enabled) });
  return { calls, user, auth, behavior, service };
};

test('email change reauthenticates and verifies trimmed address without replacing the confirmed email', async () => {
  const { service, user, calls } = setup(); await service.requestEmailChange(user, '  new@example.test  ', 'old-password');
  assert.equal(calls[0][0], 'password'); assert.deepEqual(calls[1], ['verify', 'owner', 'new@example.test']); assert.equal(user.email, 'old@example.test');
});
test('Google-only account uses popup without requiring an invented password', async () => {
  const { service, user, calls } = setup(); user.providerData = [{ providerId: 'google.com' }]; await service.changeAccountPassword(user, '', 'next-password');
  assert.deepEqual(calls.map(call => call[0]), ['google', 'update-password']);
});
test('missing password or unsupported provider never reaches mutation', async () => {
  const { service, user, calls } = setup(); await assert.rejects(service.requestEmailChange(user, 'new@example.test', ''), { code: 'auth/missing-password' });
  user.providerData = [{ providerId: 'custom' }]; await assert.rejects(service.changeAccountPassword(user, '', 'new'), { code: 'auth/operation-not-allowed' }); assert.deepEqual(calls, []);
});
test('account change during reauthentication prevents mutation', async () => {
  const { service, user, auth, behavior, calls } = setup(); behavior.reauth = async () => { auth.currentUser = { uid: 'other' }; };
  await assert.rejects(service.requestEmailChange(user, 'new@example.test', 'current'), { code: 'auth/user-mismatch' }); assert.equal(calls.some(call => call[0] === 'verify'), false);
});
test('deletion sends only confirmation and signs out after confirmed backend success', async () => {
  const { service, user, calls } = setup(); await service.deleteAccountWithFirebase(user, 'current');
  assert.equal(calls.find(call => call[0] === 'token')[1], true);
  const payload = calls.find(call => call[0] === 'callable'); assert.equal(payload[1], 'deleteAccount'); assert.equal(payload[2].confirm, true); assert.deepEqual(Object.keys(payload[2]), ['confirm']); assert.equal(calls.at(-1)[0], 'signout');
});
test('unavailable backend or invalid response never signs out or reports deletion success', async () => {
  for (const result of [async () => { throw new Error('unavailable'); }, async () => ({ data: { deleted: false } })]) {
    const { service, user, behavior, calls } = setup(); behavior.remove = result; await assert.rejects(service.deleteAccountWithFirebase(user, 'current')); assert.equal(calls.some(call => call[0] === 'signout'), false);
  }
});
test('late deletion response never signs out a different active account', async () => {
  const { service, user, behavior, auth, calls } = setup(); behavior.remove = async () => { auth.currentUser = { uid: 'other' }; return { data: { deleted: true } }; };
  await service.deleteAccountWithFirebase(user, 'current'); assert.equal(calls.some(call => call[0] === 'signout'), false);
});

const setupForm = action => {
  let cursor = 0;
  const slots = [], effects = [], calls = [];
  const user = { uid: 'owner', email: 'old@example.test' };
  const auth = { currentUser: user };
  const text = new Proxy({ email: { success: 'email-sent' }, password: { success: 'password-changed' }, delete: { success: 'deleted' } }, { get: (target, key) => target[key] || key });
  const context = {
    settings: { email: user.email }, hasPasswordProvider: true,
    updateUserEmail: async (...args) => { calls.push(['email', ...args]); },
    updateUserPassword: async (...args) => { calls.push(['password', ...args]); },
    deleteAccount: async (...args) => { calls.push(['delete', ...args]); },
    refreshAccountEmail: async () => false,
  };
  const react = {
    useState: initial => { const i = cursor++; if (!(i in slots)) slots[i] = initial; return [slots[i], value => { slots[i] = value; }]; },
    useRef: initial => { const i = cursor++; return slots[i] || (slots[i] = { current: initial }); },
    useEffect: effect => { const i = cursor++; if (!slots[i]) { slots[i] = true; effects.push(effect); } },
  };
  const { useAccountSecurity } = load('src/components/molecules/AccountSecurity/AccountSecurity.hook.ts', {
    react,
    'next/navigation': { useParams: () => ({ lang: 'pl' }), useRouter: () => ({ replace: value => { calls.push(['route', value]); } }) },
    '@/config/firebase': { auth }, '@/contexts/SettingsContext': { useSettings: () => context },
    '@/lang/DictionaryProvider': { useDictionary: () => ({ settingsPage: { accountSecurity: text } }) },
  });
  const render = () => { cursor = 0; const state = useAccountSecurity(action); effects.splice(0).forEach(effect => effect()); return state; };
  return { render, calls, context, auth };
};
test('password form validates confirmation before calling Auth and clears secrets after success', async () => {
  const h = setupForm('password'); let s = h.render(); s.setPassword('current'); s.setValue('new-password'); s.setConfirmation('different');
  await h.render().submit(); assert.equal(h.render().error, 'mismatch'); assert.equal(h.calls.length, 0);
  h.render().setConfirmation('new-password'); await h.render().submit(); s = h.render(); assert.equal(s.success, 'password-changed'); assert.equal(s.password, ''); assert.equal(s.value, ''); assert.equal(s.confirmation, '');
});
test('synchronous duplicate submissions result in only one mutation', async () => {
  const h = setupForm('password'); let resolve; h.context.updateUserPassword = () => { h.calls.push(['password']); return new Promise(done => { resolve = done; }); };
  let s = h.render(); s.setPassword('current'); s.setValue('new'); s.setConfirmation('new'); s = h.render(); const first = s.submit(); await s.submit(); assert.equal(h.calls.length, 1); assert.equal(h.render().pending, true); resolve(); await first; assert.equal(h.render().pending, false);
});
test('delete form requires acknowledgement and maps unavailable service to a retryable error', async () => {
  const h = setupForm('delete'); h.render().setPassword('current'); await h.render().submit(); assert.equal(h.render().error, 'confirmDeletion'); assert.equal(h.calls.length, 0);
  h.render().setAcknowledged(true); h.context.deleteAccount = async () => { throw { code: 'functions/not-found' }; };
  await h.render().submit(); assert.equal(h.render().error, 'serviceUnavailable'); assert.equal(h.render().success, ''); assert.equal(h.render().pending, false);
});
test('Google form accepts no password; stale account cannot submit', async () => {
  const h = setupForm('email'); h.context.hasPasswordProvider = false; h.render().setValue('new@example.test'); await h.render().submit(); assert.equal(h.render().success, 'email-sent');
  const stale = setupForm('email'); stale.render(); stale.auth.currentUser = { uid: 'other' }; await stale.render().submit(); assert.equal(stale.render().error, 'accountChanged'); assert.equal(stale.calls.length, 0);
});

test('settings persist a new email only after Auth reload confirms it; password changes never write settings', async () => {
  let cursor = 0, context, listener, nextEmail;
  const slots = [], effects = [], writes = [];
  const user = { uid: 'owner', email: 'old@example.test', providerData: [{ providerId: 'password' }] };
  const stored = { email: user.email, displayName: 'Test', plan: 'free', password: '', fontFamily: 'sans', illustrationAnimation: true, notificationsNews: true, notificationsPayments: true, cookiesAnalytical: true, cookiesMarketing: true };
  const auth = { currentUser: user };
  const react = {
    createContext: () => ({ Provider: 'provider' }), useContext: () => context,
    useState: initial => { const i = cursor++; if (!(i in slots)) slots[i] = initial; return [slots[i], value => { slots[i] = typeof value === 'function' ? value(slots[i]) : value; }]; },
    useRef: initial => { const i = cursor++; return slots[i] || (slots[i] = { current: initial }); },
    useCallback: fn => fn,
    useEffect: (effect, deps) => { const i = cursor++; if (!slots[i] || deps.some((dep, j) => dep !== slots[i][j])) { slots[i] = deps; effects.push(effect); } },
  };
  const source = fs.readFileSync(path.join(__dirname, '../src/contexts/SettingsContext.tsx'), 'utf8');
  const outputText = ts.transpileModule(source, { fileName: 'SettingsContext.tsx', compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const exports = {};
  const mocks = { react, 'react/jsx-runtime': { jsx: (_, props) => { context = props.value; return props; } },
    'next/navigation': { useParams: () => ({ lang: 'pl' }) },
    'firebase/auth': { onAuthStateChanged: (_, fn) => { listener = fn; fn(user); return () => {}; }, reload: async () => { if (nextEmail) user.email = nextEmail; } },
    '@/config/firebase': { auth }, '@/config/firestore': { getUserSettings: async () => stored, updateUserSettings: async (_, patch) => { writes.push(patch); } },
    '@/config/account': { assertCurrentAccount: () => {}, requestEmailChange: async () => {}, changeAccountPassword: async () => {}, deleteAccountWithFirebase: async () => {} },
  };
  vm.runInNewContext(outputText, { exports, require: name => mocks[name], window: { addEventListener: () => {}, removeEventListener: () => {} } });
  const render = () => { cursor = 0; exports.SettingsProvider({ children: null }); effects.splice(0).forEach(effect => effect()); };
  render(); await new Promise(resolve => setImmediate(resolve)); render(); render();
  await context.updateUserEmail('new@example.test', 'current'); assert.equal(context.settings.email, 'old@example.test'); assert.equal(writes.length, 0);
  await context.updateUserPassword('current', 'new-password'); render(); assert.equal(writes.length, 0);
  assert.equal(await context.refreshAccountEmail(), false); assert.equal(writes.length, 0);
  nextEmail = 'new@example.test'; assert.equal(await context.refreshAccountEmail(), true); render(); assert.equal(writes.length, 1); assert.equal(writes[0].email, 'new@example.test'); assert.equal(context.settings.email, 'new@example.test'); assert.equal(typeof listener, 'function');
});

test('deletion is disabled until deployment is explicitly enabled, before reauthentication', async () => {
  const { service, user, calls } = setup(false); await assert.rejects(service.deleteAccountWithFirebase(user, 'current'), { code: 'functions/unavailable' }); assert.deepEqual(calls, []);
});
