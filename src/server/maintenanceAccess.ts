import 'server-only';

export const MAINTENANCE_COOKIE = 'fabledose_preview';
export const MAINTENANCE_TTL_SECONDS = 48 * 60 * 60;

/**
 * Remembers the shared-password preview for 48 hours, using only a cookie expiry.
 * This convenience gate is independent of ebook encryption and account access.
 */
export const createMaintenanceToken = (now = Date.now()): string =>
  String(now + MAINTENANCE_TTL_SECONDS * 1000);

/** Checks the preview cookie expiry; no environment variables or encryption keys. */
export const hasMaintenanceAccess = (
  cookie: string | null,
  now = Date.now(),
): boolean => {
  const token = cookie
    ?.split(';')
    .map(value => value.trim())
    .find(value => value.startsWith(`${MAINTENANCE_COOKIE}=`))
    ?.slice(MAINTENANCE_COOKIE.length + 1);
  if (!token || !/^\d{13}$/.test(token)) return false;
  const expires = Number(token);
  return expires > now && expires <= now + MAINTENANCE_TTL_SECONDS * 1000;
};
