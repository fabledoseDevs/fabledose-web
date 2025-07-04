import type { ReactElement } from 'react';

/**
 * @module
 * This file defines the types and interfaces for the Container component.
 */

/**
 * Possible HTML elements that the Container can render as.
 *
 * @remarks
 * - `DIV`: Standard div element, default container.
 * - `SECTION`: Semantic section element for content grouping.
 * - `HEADER`: Semantic header element for page or section headers.
 * - `FOOTER`: Semantic footer element for page or section footers.
 * - `ASIDE`: Semantic aside element for sidebar or complementary content.
 */
export enum CONTAINER_ELEMENT {
  DIV = 'div',
  SECTION = 'section',
  HEADER = 'header',
  FOOTER = 'footer',
  ASIDE = 'aside',
}

/**
 * Possible flex direction values for the container.
 *
 * @remarks
 * - `ROW`: Items are placed horizontally from left to right.
 * - `COLUMN`: Items are placed vertically from top to bottom.
 */
export enum FLEX_DIRECTION {
  ROW = 'row',
  COLUMN = 'column',
}

/**
 * Possible alignment values for flex items.
 *
 * @remarks
 * - `START`: Items are aligned at the start of the container.
 * - `CENTER`: Items are aligned at the center of the container.
 * - `END`: Items are aligned at the end of the container.
 * - `STRETCH`: Items are stretched to fill the container.
 */
export enum FLEX_ALIGNMENT {
  START = 'flex-start',
  CENTER = 'center',
  END = 'flex-end',
  STRETCH = 'stretch',
}

/**
 * Possible vertical padding values for the container.
 *
 * @remarks
 * - `NONE`: No vertical padding (0).
 * - `STANDARD`: Standard vertical padding (2.4rem 0).
 * - `DOUBLE`: Double vertical padding (4.8rem 0).
 */
export enum VERTICAL_PADDING {
  NONE = 'none',
  STANDARD = 'standard',
  DOUBLE = 'double',
}

/**
 * Possible background color values for the container.
 *
 * @remarks
 * - `WHITE`: White background color.
 * - `PURPLE`: Purple background color.
 * - `DARK_PURPLE`: Dark purple background color.
 */
export enum BACKGROUND_COLOR {
  WHITE = 'white',
  PURPLE = 'purple',
  DARK_PURPLE = 'darkPurple',
}

/**
 * Interface for Container component props.
 *
 * @property containerType - The HTML element type to render the container as.
 * @property maxWidth - Optional maximum width of the container in pixels.
 * @property flexDirection - Optional flex direction for the container's children.
 * @property justifyContent - Optional justification of flex items along the main axis.
 * @property alignItems - Optional alignment of flex items along the cross-axis.
 * @property verticalPadding - Optional vertical padding size.
 * @property gap - If true, adds a standard gap (2.4rem) between flex items.
 * @property backgroundColor - Optional background color of the container.
 * @property children - The content to be rendered inside the container.
 */
export type ContainerProps = {
  containerType: CONTAINER_ELEMENT;
  maxWidth?: number;
  flexDirection?: FLEX_DIRECTION;
  justifyContent?: FLEX_ALIGNMENT;
  alignItems?: FLEX_ALIGNMENT;
  verticalPadding?: VERTICAL_PADDING;
  gap?: boolean;
  backgroundColor?: BACKGROUND_COLOR;
  children: ReactElement | ReactElement[] | string;
};

/**
 * Props for styled container components, excluding the containerType property.
 */
export type StyledContainerProps = Omit<ContainerProps, 'containerType'>;

/**
 * This function selects the appropriate container element based on containerType.
 *
 * @param props - The container properties used to determine the container's behavior and styling.
 * @returns A ReactElement showing the rendered container with the specified element type.
 */
export type ContainerSelector = (props: ContainerProps) => ReactElement;

/**
 * Component renders a flexible container with various styling options.
 * The container can be rendered as different HTML elements and supports various layout configurations.
 *
 * @param props - The component properties:
 *  - `containerType`: The HTML element type to render the container as. Needs to follow a pattern of {@link CONTAINER_ELEMENT}.
 *  - `maxWidth`: Optional maximum width of the container in pixels.
 *  - `flexDirection`: Optional flex direction for the container's children. Follows {@link FLEX_DIRECTION}.
 *  - `justifyContent`: Optional justification of flex items along the main axis. Follows {@link FLEX_ALIGNMENT}.
 *  - `alignItems`: Optional alignment of flex items along the cross-axis. Follows {@link FLEX_ALIGNMENT}.
 *  - `verticalPadding`: Optional vertical padding size. Follows {@link VERTICAL_PADDING}.
 *  - `gap`: If true, adds a standard gap (2.4rem) between flex items.
 *  - `backgroundColor`: Optional background color of the container. Follows {@link BACKGROUND_COLOR}.
 *  - `children`: The content to be rendered inside the container.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <Container
 *   containerType={CONTAINER_ELEMENT.SECTION}
 *   maxWidth={1200}
 *   flexDirection={FLEX_DIRECTION.ROW}
 *   justifyContent={FLEX_ALIGNMENT.CENTER}
 *   alignItems={FLEX_ALIGNMENT.CENTER}
 *   verticalPadding={VERTICAL_PADDING.STANDARD}
 *   gap={true}
 *   backgroundColor={BACKGROUND_COLOR.WHITE}
 * >
 *   <p>Container content</p>
 * </Container>
 * ```
 */
export type Container = (props: ContainerProps) => ReactElement;
