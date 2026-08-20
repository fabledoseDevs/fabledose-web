import type { FableMeta, FableIndexItem } from '@/fables/fables.types';

export interface FableWithMeta {
  meta: FableMeta;
  url: string;
  currentSlide?: number | undefined;
  totalSlides?: number | undefined;
}

const PLACEHOLDER_IMAGE = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="310" height="400"%3E%3Crect fill="%23333" width="310" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-family="Arial" font-size="16"%3EBook Cover%3C/text%3E%3C/svg%3E';

export const normalizeLocale = (value: string): 'pl' | 'en' =>
  value === 'pl' ? 'pl' : 'en';

export const getFablesIndexClient = async (): Promise<FableIndexItem[]> => {
  try {
    const data = await fetch('/fable-database/index.json', { cache: 'force-cache' });
    if (!data.ok) throw new Error('Failed to load fable index');
    const json = await data.json();

    return (json.tales || []).map((item: any) => {
      const storyPath = item.meta.contentPointers.story;
      const basePath = storyPath?.replace(/\/story\.json$/, '') || `tales/${item.meta.id}`;

      const getCoverUrl = (cover: string | undefined, defaultFile: string) => {
        if (!cover) {
          return `/fable-database/${basePath}/img/${defaultFile}`;
        }
        if (cover.startsWith('/')) {
          return cover;
        }
        return `/fable-database/${cover}`;
      };

      return {
        ...item,
        meta: {
          ...item.meta,
          covers: {
            tileCover: getCoverUrl(item.meta.covers?.tileCover, 'tileCover.jpg'),
            mainCover: getCoverUrl(item.meta.covers?.mainCover, 'cover_1920x1080.webm'),
            fullCover: getCoverUrl(item.meta.covers?.fullCover, 'fullCover.jpg'),
            audioCover: getCoverUrl(item.meta.covers?.audioCover, 'audioCover.jpg'),
          },
        },
      };
    });
  } catch (error) {
    console.error('Error loading fable index:', error);
    return [];
  }
};

export const getTotalSlides = async (storyPath: string | undefined): Promise<number | undefined> => {
  try {
    if (!storyPath) return undefined;

    const fullPath = `/fable-database/${storyPath}`;
    const response = await fetch(fullPath, { cache: 'force-cache' });
    if (!response.ok) return undefined;

    const data = await response.json();
    return data.story?.slides?.length || undefined;
  } catch (error) {
    console.error(`Error loading total slides from ${storyPath}:`, error);
    return undefined;
  }
};

export const getPlaceholderImage = (): string => PLACEHOLDER_IMAGE;

export const getImageUrl = (
  tileCover: string | undefined,
  fullCover: string | undefined,
  mainCover: string | undefined,
): string => {
  return tileCover || fullCover || mainCover || getPlaceholderImage();
};
