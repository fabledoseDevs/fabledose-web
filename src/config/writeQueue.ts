/**
 * Serializes writes to the same document while allowing different documents to proceed independently.
 * A failed write rejects its own promise without preventing later writes.
 */
export const createWriteQueue = (): (<T>(
  key: string,
  write: () => Promise<T>,
) => Promise<T>) => {
  const pending = new Map<string, Promise<unknown>>();
  return <T>(key: string, write: () => Promise<T>): Promise<T> => {
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
};
