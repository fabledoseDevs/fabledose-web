import type { WriteQueue } from './writeQueue.types';

/** Serializes writes per document; read barriers prevent navigation from observing an unacknowledged position. */
export const createWriteQueue = (): WriteQueue => {
  const pending = new Map<string, Promise<unknown>>();
  const enqueue = <T>(key: string, write: () => Promise<T>): Promise<T> => {
    const previous = pending.get(key) || Promise.resolve();
    const next = previous.catch(() => undefined).then(write);
    pending.set(key, next);
    void next
      .finally(() => {
        if (pending.get(key) === next) pending.delete(key);
      })
      .catch(() => undefined);
    return next;
  };
  enqueue.waitFor = async (key: string): Promise<void> => {
    while (pending.has(key)) await pending.get(key);
  };
  enqueue.waitForPrefix = async (prefix: string): Promise<void> => {
    while (true) {
      const writes = [...pending.entries()]
        .filter(([key]) => key.startsWith(prefix))
        .map(([, value]) => value);
      if (!writes.length) return;
      await Promise.all(writes);
    }
  };
  return enqueue;
};
