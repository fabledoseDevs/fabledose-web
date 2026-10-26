/**
 * @module
 * Ordered persistence queue.
 *
 * Defines contracts shared by the library UI and its session-aware persistence layer.
 */

/**
 * Callable queue that serializes writes to each document independently.
 *
 * @remarks
 * Use the same stable document key for writes and read barriers. A rejected write does not block subsequent writes; a barrier rejects when a write it awaits fails. Prefix barriers wait for a group of documents.
 *
 * @example
 * ```ts
 * const queue = createWriteQueue();
 * await queue("users/alice/progress/story", () => persist());
 * await queue.waitForPrefix("users/alice/progress/");
 * ```
 */
export interface WriteQueue {
  /**
   * Enqueues a document write after the previous write settles.
   * @typeParam T - Result produced by the persistence operation.
   * @param key - Stable document identifier shared with read barriers.
   * @param write - Deferred persistence operation.
   * @returns The original result or rejection of this write.
   */
  <T>(key: string, write: () => Promise<T>): Promise<T>;
  /** Waits for all pending writes to one exact key, including writes queued while waiting. */
  waitFor: (key: string) => Promise<void>;
  /** Waits for queued writes whose keys begin with the supplied account or collection prefix. */
  waitForPrefix: (prefix: string) => Promise<void>;
}
