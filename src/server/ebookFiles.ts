import 'server-only';

import { createDecipheriv } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

import type { EbookDownload } from '@/config/ebooks.types';

/**
 * Decrypts a deployment asset only after the route has authorized the caller.
 * The repository is public: plaintext ebooks and this server-only key must never
 * be committed. Envelope: FDEB1, 12-byte IV, 16-byte GCM tag, then ciphertext.
 */
export const readPrivateEbook = async (
  ebook: EbookDownload,
): Promise<Uint8Array> => {
  const key = process.env.EBOOK_ENCRYPTION_KEY;
  if (!key || !/^[a-f0-9]{64}$/i.test(key))
    throw new Error('Ebook key unavailable');
  const encrypted = await readFile(
    path.join(process.cwd(), 'private', 'ebooks', `${ebook.filename}.enc`),
  );
  if (encrypted.length < 34 || encrypted.subarray(0, 5).toString() !== 'FDEB1')
    throw new Error('Invalid ebook envelope');
  const decipher = createDecipheriv(
    'aes-256-gcm',
    Buffer.from(key, 'hex'),
    encrypted.subarray(5, 17),
  );
  decipher.setAuthTag(encrypted.subarray(17, 33));
  return new Uint8Array(
    Buffer.concat([decipher.update(encrypted.subarray(33)), decipher.final()]),
  );
};
