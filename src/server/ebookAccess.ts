import 'server-only';

/** HTTP denial without Firebase payloads, tokens, or private paths in logs. */
export class EbookAccessError extends Error {
  constructor(public readonly status: 401 | 403 | 503) {
    super('Ebook download unavailable');
  }
}

/**
 * Firebase validates the ID token; Firestore evaluates the caller's own rules.
 * No service-account credentials, client-supplied plan or cached entitlement.
 */
export const authorizeEbookDownload = async (
  authorization: string | null,
  fetcher: typeof fetch = fetch,
): Promise<void> => {
  const token = authorization?.match(/^Bearer ([^\s]+)$/i)?.[1];
  if (!token) throw new EbookAccessError(401);
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  if (!apiKey || !projectId) throw new EbookAccessError(503);

  const account = await fetcher(
    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${encodeURIComponent(
      apiKey,
    )}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: token }),
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    },
  );
  if (!account.ok)
    throw new EbookAccessError(
      account.status >= 500 || account.status === 429 ? 503 : 401,
    );
  const identity = await account.json();
  const user = identity.users?.[0];
  if (typeof user?.localId !== 'string' || !user.localId || user.disabled)
    throw new EbookAccessError(401);
  const document = await fetcher(
    `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(
      projectId,
    )}/databases/(default)/documents/users/${encodeURIComponent(user.localId)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
      signal: AbortSignal.timeout(8000),
    },
  );
  if (!document.ok)
    throw new EbookAccessError(
      document.status >= 500 || document.status === 429
        ? 503
        : document.status === 401
        ? 401
        : 403,
    );
  const data = await document.json();
  const plan = data.fields?.settings?.mapValue?.fields?.plan?.stringValue;
  if (plan !== 'family' && plan !== 'ultimate') throw new EbookAccessError(403);
};
