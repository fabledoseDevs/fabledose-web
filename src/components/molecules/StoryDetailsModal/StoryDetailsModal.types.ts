import type { ReactElement } from 'react';

import type { TAG_NAME } from '@/atoms/TagIcon/TagIcon.types';
import type { FableFullDescription } from '@/fables/fables.types';

/**
 * @module
 * Localized story guidance for parents before choosing a fable.
 */

/**
 * Content and visibility of the parent-facing story details dialog.
 *
 * @remarks
 * Supply the title and description already resolved in the page language. Tags use
 * the existing dictionary and TagIcon component with persistent explanations. The
 * synopsis contains spoilers, including the ending; separate paragraphs with blank lines.
 *
 * @example
 * ```tsx
 * <StoryDetailsModal isOpen={open} onClose={close} title={title}
 *   tags={tags} description={meta.fullDescription.pl} />
 * ```
 */
export interface StoryDetailsModalProps {
  /** Whether the shared modal is visible. */
  isOpen: boolean;
  /** Closes the dialog and restores focus to the opening button. */
  onClose: () => void;
  /** Localized story title used as the accessible dialog heading. */
  title: string;
  /** Existing story tags with explicit warning presentation where appropriate. */
  tags: { name: TAG_NAME; warning: boolean }[];
  /** Parent commentary and a complete plot summary in the selected language. */
  description: FableFullDescription;
}

/**
 * Displays title, explained tags, parent commentary and a spoiler-inclusive synopsis.
 *
 * @param props - Visibility, localized content and close handler.
 * @returns The responsive dialog, or null while closed.
 * @group Component
 * @example
 * ```tsx
 * <StoryDetailsModal isOpen onClose={close} title="The Three Little Pigs"
 *   tags={tags} description={description} />
 * ```
 */
export type StoryDetailsModal = (props: StoryDetailsModalProps) => ReactElement;
