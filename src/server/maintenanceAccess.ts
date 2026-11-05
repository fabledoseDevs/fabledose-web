import 'server-only';

import { createHmac, timingSafeEqual } from 'node:crypto';

export const MAINTENANCE_COOKIE = 'fabledose_preview';
export const MAINTENANCE_TTL_SECONDS = 48 * 60 * 60;

const sign = (expires: string): string => {
  const key = process.env.EBOOK_ENCRYPTION_KEY;
  if (!key || !/^[a-f0-9]{64}$/i.test(key))
    throw new Error('Preview signing unavailable');
  return createHmac('sha256', Buffer.from(key, 'hex'))
    .update(`maintenance-preview:${expires}`)
    .digest('hex');
};

/** Issues a signed expiry token; the shared password is never stored in the cookie. */
export const createMaintenanceToken = (now = Date.now()): string => {
  const expires = String(now + MAINTENANCE_TTL_SECONDS * 1000);
  return `${expires}.${sign(expires)}`;
};

/** Rejects expired, modified and implausibly future-dated preview cookies. */
export const hasMaintenanceAccess = (
  cookie: string | null,
  now = Date.now(),
): boolean => {
  const token = cookie
    ?.split(';')
    .map(value => value.trim())
    .find(value => value.startsWith(`${MAINTENANCE_COOKIE}=`))
    ?.slice(MAINTENANCE_COOKIE.length + 1);
  const parts = token?.match(/^(\d{13})\.([a-f0-9]{64})$/);
  if (!parts) return false;
  const expires = Number(parts[1]);
  if (expires <= now || expires > now + MAINTENANCE_TTL_SECONDS * 1000)
    return false;
  try {
    return timingSafeEqual(
      Buffer.from(parts[2], 'hex'),
      Buffer.from(sign(parts[1]), 'hex'),
    );
  } catch {
    return false;
  }
};
