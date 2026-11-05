import { getEbookDownload } from './ebooks';
import { auth } from './firebase';

/** Fetches an authenticated attachment without putting credentials in URLs. */
export const downloadEbook = async (url: string): Promise<void> => {
  const parts = url.match(/^\/api\/ebooks\/([^/]+)\/(pl|en)\/(pdf|epub)$/);
  const ebook = parts ? getEbookDownload(parts[1], parts[2], parts[3]) : null;
  if (!ebook) throw new Error('ebook/unavailable');
  const user = auth.currentUser;
  if (!user) throw new Error('ebook/unauthenticated');
  const token = await user.getIdToken();
  const response = await fetch(ebook.url, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });
  if (!response.ok)
    throw new Error(
      response.status === 403
        ? 'ebook/forbidden'
        : response.status === 401
        ? 'ebook/unauthenticated'
        : 'ebook/unavailable',
    );
  const blob = await response.blob();
  if (auth.currentUser?.uid !== user.uid)
    throw new Error('ebook/unauthenticated');
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = ebook.filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60000);
};
