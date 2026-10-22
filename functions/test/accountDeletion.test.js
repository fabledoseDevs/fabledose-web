import assert from 'node:assert/strict';
import test from 'node:test';
import { cleanDeletedAccount, createDeleteAccountHandler } from '../src/accountDeletion.js';

const error = (code, message) => Object.assign(new Error(message), { code });
const request = { auth: { uid: 'caller', token: { auth_time: 1000 } }, data: { confirm: true, uid: 'victim' } };
const setup = overrides => {
  const events = [];
  return { events, handler: createDeleteAccountHandler({ now: () => 1100000, error, lockUser: async uid => { events.push(['lock', uid]); }, removeUser: async uid => { events.push(['delete', uid]); }, ...overrides }) };
};
test('deletes authenticated caller, ignoring arbitrary client UIDs', async () => {
  const { handler, events } = setup(); assert.deepEqual(await handler(request), { deleted: true }); assert.deepEqual(events, [['lock', 'caller'], ['delete', 'caller']]);
});
test('rejects missing identity, stale/future/invalid auth time and missing confirmation before mutations', async () => {
  for (const invalid of [{}, { ...request, auth: { ...request.auth, token: {} } }, { ...request, auth: { ...request.auth, token: { auth_time: 1 } } }, { ...request, auth: { ...request.auth, token: { auth_time: 2000 } } }, { ...request, data: {} }]) {
    const { handler, events } = setup(); await assert.rejects(handler(invalid)); assert.deepEqual(events, []);
  }
});
test('lock failure prevents Auth deletion', async () => {
  const { handler, events } = setup({ lockUser: async () => { throw new Error('offline'); } }); await assert.rejects(handler(request)); assert.deepEqual(events, []);
});
test('already removed Auth account is idempotent', async () => {
  const { handler } = setup({ removeUser: async () => { throw error('auth/user-not-found', 'gone'); } }); assert.deepEqual(await handler(request), { deleted: true });
});
test('Auth failure is reported, never claimed as success', async () => {
  const { handler } = setup({ removeUser: async () => { throw new Error('offline'); } }); await assert.rejects(handler(request), { code: 'aborted' });
});
test('cleanup locks first and can retry after a failed recursive deletion', async () => {
  const events = []; let fails = true;
  const dependencies = { lockUser: async uid => { events.push(['lock', uid]); }, removeData: async uid => { events.push(['cleanup', uid]); if (fails) throw new Error('offline'); } };
  await assert.rejects(cleanDeletedAccount('caller', dependencies)); fails = false; await cleanDeletedAccount('caller', dependencies);
  assert.deepEqual(events, [['lock', 'caller'], ['cleanup', 'caller'], ['lock', 'caller'], ['cleanup', 'caller']]);
});
