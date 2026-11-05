const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const ts = require('typescript');
const repo = path.join(__dirname, '..');
const load = (file, mocks = {}, env = {}) => {
  const exports = {};
  const code = ts.transpileModule(
    fs.readFileSync(path.join(repo, file), 'utf8'),
    {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        esModuleInterop: true,
      },
    },
  ).outputText;
  vm.runInNewContext(code, {
    exports,
    process: { env, cwd: () => repo },
    Response,
    Request,
    Uint8Array,
    AbortSignal,
    fetch,
    URL,
    Error,
    console,
    Buffer,
    require: name => {
      if (name === 'server-only') return {};
      if (name in mocks) return mocks[name];
      throw new Error(`Unexpected import ${name}`);
    },
  });
  return exports;
};
const ebooks = load('src/config/ebooks.ts');
const env = {
  NEXT_PUBLIC_FIREBASE_API_KEY: 'test-key',
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: 'test-project',
};
const setup = (plan = 'family', accountStatus = 200, documentStatus = 200) => {
  const calls = [];
  const api = load('src/server/ebookAccess.ts', {}, env);
  const fakeFetch = async (url, options) => {
    calls.push({ url, options });
    if (calls.length === 1)
      return Response.json(
        { users: [{ localId: 'verified-owner' }] },
        { status: accountStatus },
      );
    return Response.json(
      {
        fields: {
          settings: { mapValue: { fields: { plan: { stringValue: plan } } } },
        },
      },
      { status: documentStatus },
    );
  };
  return { api, calls, fakeFetch };
};
test('catalogue: four exact locale/format combinations; unknown and traversal paths rejected', () => {
  for (const locale of ['pl', 'en'])
    for (const format of ['pdf', 'epub']) {
      const item = ebooks.getEbookDownload('goldilocks', locale, format);
      assert.equal(item.url, `/api/ebooks/goldilocks/${locale}/${format}`);
      assert.ok(
        fs.statSync(path.join(repo, 'private/ebooks', item.filename + '.enc'))
          .size > 0,
      );
      assert.equal(
        fs.existsSync(path.join(repo, 'public', item.filename)),
        false,
      );
    }
  for (const id of [
    'unknown',
    '..',
    '__proto__',
    'constructor',
    '../../private',
  ])
    assert.equal(ebooks.getEbookDownload(id, 'pl', 'pdf'), null);
  for (const locale of ['de', '../pl'])
    assert.equal(ebooks.getEbookDownload('goldilocks', locale, 'pdf'), null);
  assert.equal(ebooks.getEbookDownload('goldilocks', 'pl', 'zip'), null);
});
test('authentication: missing, malformed and rejected tokens never read a user document', async () => {
  for (const header of [null, 'Bearer', 'Basic abc', 'Bearer a b']) {
    const h = setup();
    await assert.rejects(
      h.api.authorizeEbookDownload(header, h.fakeFetch),
      e => e.status === 401,
    );
    assert.equal(h.calls.length, 0);
  }
  for (const status of [400, 401, 403]) {
    const h = setup('family', status);
    await assert.rejects(
      h.api.authorizeEbookDownload('Bearer forged', h.fakeFetch),
      e => e.status === 401,
    );
    assert.equal(h.calls.length, 1);
  }
});
test('authorization: only current Family/Ultimate passes; missing and forged plans fail closed', async () => {
  for (const plan of ['family', 'ultimate', 'free', 'premium', '', null]) {
    const h = setup(plan);
    const promise = h.api.authorizeEbookDownload(
      'Bearer valid-token',
      h.fakeFetch,
    );
    if (plan === 'family' || plan === 'ultimate') await promise;
    else await assert.rejects(promise, e => e.status === 403);
    assert.ok(h.calls[1].url.endsWith('/users/verified-owner'));
    assert.equal(
      h.calls[1].options.headers.Authorization,
      'Bearer valid-token',
    );
    assert.ok(!h.calls[1].url.includes('valid-token'));
    assert.ok(h.calls.every(c => c.options.cache === 'no-store'));
  }
});
test('downgrade: previous downloads grant no cached entitlement', async () => {
  const h = setup('family');
  await h.api.authorizeEbookDownload('Bearer token', h.fakeFetch);
  const free = setup('free');
  await assert.rejects(
    h.api.authorizeEbookDownload('Bearer token', free.fakeFetch),
    e => e.status === 403,
  );
});
test('Firebase outage, denied document and missing account never grant download access', async () => {
  for (const [accountStatus, documentStatus, expected] of [
    [500, 200, 503],
    [429, 200, 503],
    [200, 403, 403],
    [200, 404, 403],
    [200, 500, 503],
  ]) {
    const h = setup('family', accountStatus, documentStatus);
    await assert.rejects(
      h.api.authorizeEbookDownload('Bearer token', h.fakeFetch),
      e => e.status === expected,
    );
  }
  const h = setup();
  await assert.rejects(
    h.api.authorizeEbookDownload('Bearer token', async () =>
      Response.json({ users: [] }),
    ),
    e => e.status === 401,
  );
  const missingConfig = load('src/server/ebookAccess.ts');
  await assert.rejects(
    missingConfig.authorizeEbookDownload('Bearer token', h.fakeFetch),
    e => e.status === 503,
  );
  assert.equal(h.calls.length, 0);
});
const route = (status = null, enabled = true) => {
  let reads = 0,
    checks = 0;
  class AccessError extends Error {
    constructor(status) {
      super('denied');
      this.status = status;
    }
  }
  const api = load(
    'src/app/api/ebooks/[fableId]/[locale]/[format]/route.ts',
    {
      '@/server/ebookFiles': {
        readPrivateEbook: async () => {
          reads++;
          return new Uint8Array(Buffer.from('authorized attachment fixture'));
        },
      },
      '@/config/ebooks': ebooks,
      '@/server/ebookAccess': {
        EbookAccessError: AccessError,
        authorizeEbookDownload: async () => {
          checks++;
          if (status) throw new AccessError(status);
        },
      },
    },
    { EBOOK_DOWNLOADS_ENABLED: String(enabled) },
  );
  const get = (
    locale = 'pl',
    format = 'pdf',
    header = 'Bearer token',
    fableId = 'goldilocks',
  ) =>
    api.GET(
      new Request('https://example.test/api/ebooks/goldilocks/pl/pdf', {
        headers: header ? { Authorization: header } : {},
      }),
      { params: Promise.resolve({ fableId, locale, format }) },
    );
  return { get, reads: () => reads, checks: () => checks };
};
test('API: pasted URL, disabled rollout, denied plan and failed authentication never read private bytes', async () => {
  const anonymous = route();
  assert.equal((await anonymous.get('pl', 'pdf', null)).status, 401);
  assert.equal(anonymous.reads(), 0);
  assert.equal(anonymous.checks(), 0);
  const disabled = route(null, false);
  assert.equal((await disabled.get()).status, 503);
  assert.equal(disabled.reads(), 0);
  assert.equal(disabled.checks(), 0);
  for (const status of [401, 403, 503]) {
    const h = route(status);
    const res = await h.get();
    assert.equal(res.status, status);
    assert.equal(h.reads(), 0);
    assert.ok(res.headers.get('cache-control').includes('no-store'));
  }
  const invalid = route();
  assert.equal(
    (await invalid.get('pl', 'pdf', 'Bearer token', '../private')).status,
    404,
  );
  assert.equal(invalid.reads(), 0);
});
test('API: all four authorized attachments use the selected language/format and never cache', async () => {
  const h = route();
  for (const locale of ['pl', 'en'])
    for (const format of ['pdf', 'epub']) {
      const item = ebooks.getEbookDownload('goldilocks', locale, format);
      const response = await h.get(locale, format);
      assert.equal(response.status, 200);
      assert.equal(response.headers.get('content-type'), item.contentType);
      assert.equal(
        response.headers.get('content-disposition'),
        `attachment; filename="${item.filename}"`,
      );
      assert.ok(response.headers.get('cache-control').includes('no-store'));
      assert.equal(response.headers.get('vary'), 'Authorization');
      const bytes = Buffer.from(await response.arrayBuffer());
      assert.deepEqual(bytes, Buffer.from('authorized attachment fixture'));
      assert.equal(
        Number(response.headers.get('content-length')),
        bytes.length,
      );
    }
  assert.equal(h.checks(), 4);
  assert.equal(h.reads(), 4);
});

test('encrypted assets: a public repository contains no plaintext ebooks', () => {
  const files = fs.readdirSync(path.join(repo, 'private/ebooks'));
  assert.equal(files.length, 4);
  for (const file of files) {
    assert.ok(file.endsWith('.enc'));
    const bytes = fs.readFileSync(path.join(repo, 'private/ebooks', file));
    assert.equal(bytes.subarray(0, 5).toString(), 'FDEB1');
    assert.ok(bytes.length > 33);
  }
});
test('decryption: correct key restores bytes; wrong/missing keys and tampering fail closed', async () => {
  const crypto = require('node:crypto');
  const key = Buffer.alloc(32, 42),
    iv = Buffer.alloc(12, 7),
    plain = Buffer.from('private ebook content');
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  const ciphertext = Buffer.concat([cipher.update(plain), cipher.final()]);
  const envelope = Buffer.concat([
    Buffer.from('FDEB1'),
    iv,
    cipher.getAuthTag(),
    ciphertext,
  ]);
  const setupFile = (data, secret) =>
    load(
      'src/server/ebookFiles.ts',
      {
        'node:crypto': crypto,
        'node:path': path,
        'node:fs/promises': { readFile: async () => data },
      },
      { EBOOK_ENCRYPTION_KEY: secret },
    );
  const descriptor = ebooks.getEbookDownload('goldilocks', 'pl', 'pdf');
  assert.deepEqual(
    Buffer.from(
      await setupFile(envelope, key.toString('hex')).readPrivateEbook(
        descriptor,
      ),
    ),
    plain,
  );
  for (const secret of [
    undefined,
    'invalid',
    Buffer.alloc(32, 21).toString('hex'),
  ])
    await assert.rejects(
      setupFile(envelope, secret).readPrivateEbook(descriptor),
    );
  const tampered = Buffer.from(envelope);
  tampered[tampered.length - 1] ^= 1;
  await assert.rejects(
    setupFile(tampered, key.toString('hex')).readPrivateEbook(descriptor),
  );
});
