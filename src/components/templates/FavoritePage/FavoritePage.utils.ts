import { libraryFables } from '@/fables/fables.library';
export { normalizeLocale } from '@/fables/fables.library';
import type { FableIndexItem } from '@/fables/fables.types';

export type { FableWithMeta } from './FavoritePage.types';

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="310" height="400"%3E%3Crect fill="%23333" width="310" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23999" font-family="Arial" font-size="16"%3EBook Cover%3C/text%3E%3C/svg%3E';

export const getFablesIndexClient = async (): Promise<FableIndexItem[]> =>
  libraryFables.map(meta => ({ meta }));

export const getTotalSlides = async (
  storyPath: string | undefined,
): Promise<number | undefined> => {
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
): string => tileCover || fullCover || mainCover || getPlaceholderImage();
