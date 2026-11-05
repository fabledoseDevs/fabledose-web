/**
 * Downloadable reader formats. PDF preserves the illustrated page layout;
 * EPUB contains reflowable text with a portrait cover.
 * @remarks Files are encrypted deployment assets in the public repository,
 * never public static URLs. The server-only key is not part of this descriptor.
 */
export type EbookFormat = 'pdf' | 'epub';

/**
 * Public descriptor for one published, localized ebook.
 * @remarks The URL identifies an authenticated API request, not a reusable access
 * token. Every request must carry the current Firebase ID token in its header.
 * @example
 * ```ts
 * const ebook = getEbookDownload('goldilocks', 'pl', 'pdf');
 * if (ebook) await downloadEbook(ebook.url);
 * ```
 */
export interface EbookDownload {
  /** Same-origin protected endpoint; never append credentials to this URL. */
  url: string;
  /** Fixed ASCII filename for attachment delivery and the browser save dialog. */
  filename: string;
  /** Response MIME type matching the selected format. */
  contentType: 'application/pdf' | 'application/epub+zip';
}
