import type { ReactElement } from 'react';

import type { FableData, FableLocale } from '@/fables/fables.types';

/**
 * Supported story view modes controlled by query params.
 */
export type StoryPageMode = 'intro' | 'slideshow' | 'audiobook';

/**
 * Props for StoryPage template.
 */
export interface StoryPageProps {
  fable: FableData;
  mode: StoryPageMode;
  lang: FableLocale;
}

/**
 * StoryPage template component type.
 */
export type StoryPage = (props: StoryPageProps) => ReactElement;
