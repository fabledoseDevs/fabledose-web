import type { EbookDownload } from './ebooks.types';

/** Returns only explicitly published files; no locale fallback or arbitrary paths. */
export const getEbookDownload = (
  fableId: string,
  locale: string,
  format: string,
): EbookDownload | null => {
  if (
    fableId !== 'goldilocks' ||
    (locale !== 'pl' && locale !== 'en') ||
    (format !== 'pdf' && format !== 'epub')
  )
    return null;
  const title =
    locale === 'pl'
      ? 'zlotowlosa-i-trzy-misie'
      : 'goldilocks-and-the-three-bears';
  return {
    url: `/api/ebooks/${fableId}/${locale}/${format}`,
    filename: `${title}-${locale}.${format}`,
    contentType: format === 'pdf' ? 'application/pdf' : 'application/epub+zip',
  };
};
