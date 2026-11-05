const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const ts = require('typescript');
const root = path.join(__dirname, '..');
const load = (file, mocks = {}, env = {}) => {
  const exports = {};
  const code = ts.transpileModule(
    fs.readFileSync(path.join(root, file), 'utf8'),
    {
      fileName: file,
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        esModuleInterop: true,
        jsx: ts.JsxEmit.ReactJSX,
      },
    },
  ).outputText;
  vm.runInNewContext(code, {
    exports,
    require: name => {
      if (name === 'server-only') return {};
      if (name in mocks) return mocks[name];
      throw Error(name);
    },
    process: { env },
    Buffer,
    Request,
    Response,
    URL,
    Date,
    Event,
    console,
  });
  return exports;
};
const access = load('src/server/maintenanceAccess.ts');
test('preview cookie: valid for 48 hours without any environment configuration', () => {
  const now = Date.now();
  const token = access.createMaintenanceToken(now);
  const cookie = `other=1; fabledose_preview=${token}`;
  assert.equal(access.hasMaintenanceAccess(cookie, now), true);
  assert.equal(
    access.hasMaintenanceAccess(cookie, now + 48 * 3600000 - 1),
    true,
  );
  assert.equal(access.hasMaintenanceAccess(cookie, now + 48 * 3600000), false);
  for (const invalid of [
    null,
    'fabledose_preview=1',
    'fabledose_preview=garbage',
    `fabledose_preview=${now + 49 * 3600000}`,
  ]) {
    assert.equal(access.hasMaintenanceAccess(invalid, now), false);
  }
  const unrelatedKey = load(
    'src/server/maintenanceAccess.ts',
    {},
    { EBOOK_ENCRYPTION_KEY: 'not-an-ebook-key' },
  );
  assert.equal(unrelatedKey.hasMaintenanceAccess(cookie, now), true);
  assert.equal(unrelatedKey.createMaintenanceToken(now), token);
});
test('password API: wrong password sets no cookie; correct password issues HttpOnly cookie and GET restores it', async () => {
  const api = load('src/app/api/maintenance-access/route.ts', {
    '@/server/maintenanceAccess': access,
  });
  const request = (
    password,
    url = 'https://example.test/api/maintenance-access',
  ) => new Request(url, { method: 'POST', body: JSON.stringify({ password }) });
  const denied = await api.POST(request('wrong'));
  assert.equal(denied.status, 401);
  assert.equal(denied.headers.get('set-cookie'), null);
  const allowed = await api.POST(request('TestAccess'));
  assert.equal(allowed.status, 200);
  const cookie = allowed.headers.get('set-cookie');
  for (const flag of [
    'Max-Age=172800',
    'HttpOnly',
    'SameSite=Lax',
    'Secure',
    'Path=/',
  ])
    assert.ok(cookie.includes(flag));
  assert.ok(!cookie.includes('TestAccess'));
  const restored = await api.GET(
    new Request('https://example.test/api/maintenance-access', {
      headers: { cookie: cookie.split(';')[0] },
    }),
  );
  assert.equal((await restored.json()).unlocked, true);
  assert.ok(restored.headers.get('cache-control').includes('no-store'));
  const anonymous = await api.GET(
    new Request('https://example.test/api/maintenance-access'),
  );
  assert.equal((await anonymous.json()).unlocked, false);
  const local = await api.POST(
    request('TestAccess', 'http://localhost:3000/api/maintenance-access'),
  );
  assert.ok(!local.headers.get('set-cookie').includes('Secure'));
});
test('maintenance copy: Q1 2027 in both locales, demo button removed', () => {
  for (const lang of ['pl', 'en']) {
    const dict = Object.values(load(`src/lang/dictionaries/${lang}.ts`))[0];
    assert.ok(dict.maintenance.headline.includes('2027'));
    assert.ok(!dict.maintenance.paragraph.toLowerCase().includes('demo'));
    assert.equal(dict.maintenance.button, undefined);
  }
  const source = fs.readFileSync(
    path.join(root, 'src/components/templates/Maintenance/Maintenance.tsx'),
    'utf8',
  );
  assert.ok(!source.includes('demo.fabledose.com'));
  assert.ok(!source.includes('button={{'));
});
const setupSettings = async () => {
  let cursor = 0,
    context;
  const slots = [],
    effects = [],
    events = [];
  const user = { uid: 'owner', email: 'test@example.test', providerData: [] },
    auth = { currentUser: user };
  const stored = {
    email: user.email,
    displayName: 'Test',
    plan: 'family',
    password: '',
    fontFamily: 'sans',
    illustrationAnimation: true,
    notificationsNews: true,
    notificationsPayments: true,
    cookiesAnalytical: true,
    cookiesMarketing: true,
  };
  const behavior = { write: async (_, patch) => Object.assign(stored, patch) };
  const react = {
    createContext: () => ({ Provider: 'provider' }),
    useContext: () => context,
    useState: initial => {
      const i = cursor++;
      if (!(i in slots)) slots[i] = initial;
      return [
        slots[i],
        value => {
          slots[i] = typeof value === 'function' ? value(slots[i]) : value;
        },
      ];
    },
    useRef: initial => {
      const i = cursor++;
      return slots[i] || (slots[i] = { current: initial });
    },
    useCallback: fn => fn,
    useEffect: (effect, deps) => {
      const i = cursor++;
      if (!slots[i] || deps.some((dep, j) => dep !== slots[i][j])) {
        slots[i] = deps;
        effects.push(effect);
      }
    },
  };
  const exports = {};
  const source = fs.readFileSync(
    path.join(root, 'src/contexts/SettingsContext.tsx'),
    'utf8',
  );
  const code = ts.transpileModule(source, {
    fileName: 'SettingsContext.tsx',
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      jsx: ts.JsxEmit.ReactJSX,
    },
  }).outputText;
  const mocks = {
    react,
    'react/jsx-runtime': {
      jsx: (_, props) => {
        context = props.value;
        return props;
      },
    },
    'next/navigation': { useParams: () => ({ lang: 'pl' }) },
    'firebase/auth': {
      onAuthStateChanged: (_, fn) => {
        fn(user);
        return () => {};
      },
      reload: async () => {},
    },
    '@/config/firebase': { auth },
    '@/config/firestore': {
      getUserSettings: async () => ({ ...stored }),
      updateUserSettings: (...args) => behavior.write(...args),
    },
    '@/config/account': {},
  };
  vm.runInNewContext(code, {
    exports,
    require: name => mocks[name],
    window: {
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: e => events.push(e.type),
    },
    Event,
    Date,
    console,
  });
  const render = () => {
    cursor = 0;
    exports.SettingsProvider({ children: null });
    effects.splice(0).forEach(effect => effect());
    return context;
  };
  render();
  await new Promise(resolve => setImmediate(resolve));
  render();
  render();
  return { render, behavior, stored, auth, events };
};
test('plan change: permissions update only after confirmed save, Free/Family/Ultimate all remain selectable', async () => {
  const h = await setupSettings();
  let finish;
  h.behavior.write = async (_, patch) => {
    await new Promise(resolve => {
      finish = resolve;
    });
    Object.assign(h.stored, patch);
  };
  const saving = h.render().updateSettings({ plan: 'free' });
  assert.equal(h.render().settings.plan, 'family');
  assert.equal(h.events.length, 0);
  finish();
  assert.equal(await saving, true);
  assert.equal(h.render().settings.plan, 'free');
  assert.equal(h.stored.plan, 'free');
  assert.deepEqual(h.events, ['fabledose:profile-changing']);
  h.behavior.write = async (_, patch) => Object.assign(h.stored, patch);
  for (const plan of ['ultimate', 'family', 'free']) {
    assert.equal(await h.render().updateSettings({ plan }), true);
    assert.equal(h.render().settings.plan, plan);
    assert.equal(h.stored.plan, plan);
  }
});
test('plan change: rejected write never displays a fake plan; response for an old account is ignored', async () => {
  const h = await setupSettings();
  h.behavior.write = async () => {
    throw Error('permission-denied');
  };
  assert.equal(await h.render().updateSettings({ plan: 'free' }), false);
  assert.equal(h.render().settings.plan, 'family');
  assert.equal(h.stored.plan, 'family');
  assert.equal(h.events.length, 0);
  let finish;
  h.behavior.write = () =>
    new Promise(resolve => {
      finish = resolve;
    });
  const saving = h.render().updateSettings({ plan: 'ultimate' });
  h.auth.currentUser = { uid: 'other' };
  finish();
  assert.equal(await saving, false);
  assert.equal(h.render().settings.plan, 'family');
  assert.equal(h.events.length, 0);
});
