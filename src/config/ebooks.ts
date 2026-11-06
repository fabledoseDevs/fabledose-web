import type { EbookDownload } from './ebooks.types';

/** Returns only explicitly published files; no locale fallback or arbitrary paths. */
export const getEbookDownload = (
  fableId: string,
  locale: string,
  format: string,
): EbookDownload | null => {
  if (
    (fableId !== 'goldilocks' &&
      fableId !== 'three-little-pigs' &&
      fableId !== 'fisherman-and-his-wife' &&
      fableId !== 'fifi-is-planting-a-garden') ||
    (locale !== 'pl' && locale !== 'en') ||
    (format !== 'pdf' && format !== 'epub')
  )
    return null;
  const title =
    fableId === 'fisherman-and-his-wife'
      ? locale === 'pl'
        ? 'o-rybaku-i-zlotej-rybce'
        : 'the-fisherman-and-his-wife'
      : fableId === 'fifi-is-planting-a-garden'
      ? locale === 'pl'
        ? 'fifi-zaklada-ogrodek'
        : 'fifi-is-planting-a-garden'
      : fableId === 'three-little-pigs'
      ? locale === 'pl'
        ? 'trzy-male-swinki'
        : 'the-three-little-pigs'
      : locale === 'pl'
      ? 'zlotowlosa-i-trzy-misie'
      : 'goldilocks-and-the-three-bears';
  return {
    url: `/api/ebooks/${fableId}/${locale}/${format}`,
    filename: `${title}-${locale}.${format}`,
    contentType: format === 'pdf' ? 'application/pdf' : 'application/epub+zip',
  };
};
