import type { ReactElement } from 'react';

/**
 * @file
 * This file defines the types and interfaces for the Paragraph component.
 *
 * The paragraph can have different font color (foreground color).
 *
 * Example usage:
 * ```tsx
 * <Paragraph
 *   color={FOREGROUND_COLOR.WHITE}
 *   alignment={TEXT_ALIGNMENT.JUSTIFY}
 * >
 *   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * </Paragraph>
 * ```
 */

/**
 * Possible colors for a paragraph text.
 *
 * @remarks
 * - `WHITE` is used for dark backgrounds.
 * - `PURPLE` is used for light backgrounds.
 * - `BLACK` universal fallback.
 */
export enum FOREGROUND_COLOR {
  WHITE = 'white',
  ECRU = 'ecru',
  PURPLE = 'purple',
  LIGHT_RED = 'lightRed',
}

/**
 * Possible text alignments for a paragraph.
 *
 * @remarks
 * - `LEFT` aligns text to the left.
 * - `CENTER` centers the text.
 * - `RIGHT` aligns text to the right.
 * - `JUSTIFY` justifies the text.
 */
export enum TEXT_ALIGNMENT {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
  JUSTIFY = 'justify',
}

/**
 * Interface for paragraph component props.
 *
 * @property color - The color of the text. If not specified, defaults to `PURPLE`.
 * @property alignment - The alignment of the text. If not specified, defaults to `LEFT`.
 * @property children - The text content of the paragraph.
 */
export interface ParagraphProps {
  color?: FOREGROUND_COLOR;
  alignment?: TEXT_ALIGNMENT;
  children: string;
}

/**
 * @group Components
 */
export type ParagraphType = (props: ParagraphProps) => ReactElement;
