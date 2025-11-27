import type { ReactElement } from 'react';

/**
 * @module
 * This file defines the types and interfaces for the Paragraph component.
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
  boldText?: boolean;
  children: string;
}

/**
 * Paragraph component renders a paragraph with proper styling.
 * The paragraph can have different font color (foreground color).
 *
 * @param props - The component properties:
 *  - `color`: The color of the text. If not specified, defaults to `PURPLE`. Needs to be part of an enumeration {@link FOREGROUND_COLOR}.
 *  - `alignment`: The alignment of the text. If not specified, defaults to `LEFT`. Needs to be part of an enumeration {@link TEXT_ALIGNMENT}.
 *  - `children`: The text content of the paragraph.
 *
 * @group Components
 *
 * @example
 * ```tsx
 * <Paragraph
 *   color={FOREGROUND_COLOR.WHITE}
 *   alignment={TEXT_ALIGNMENT.JUSTIFY}
 * >
 *   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * </Paragraph>
 * ```
 */
export type Paragraph = (props: ParagraphProps) => ReactElement;
