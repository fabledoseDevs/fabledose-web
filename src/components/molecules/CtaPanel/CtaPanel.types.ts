/**
 * This component renders any react components as a part of cta panel.
 *
 * Example usage:
 * ```tsx
 * <CtaPanel colorVariant={PANEL_COLOR.DENIM}>
 *   <ReactComponent />
 *   <OtherReactComponent />
 *   <MoreReactComponents />
 * </CtaPanel>
 * ```
 */
import type { ReactElement } from 'react';

export enum PANEL_COLOR {
  DENIM = '#316372',
  WASABI = '#7F8A27',
  CORAL = '#D1504E',
}

export interface CtaPanelProps {
  /**
   * Color variant for the panel decorators.
   */
  colorVariant: PANEL_COLOR;
  /**
   * Children elements to be rendered inside the panel.
   */
  children: ReactElement | ReactElement[];
}

/**
 * @group Components
 */
export type CtaPanel = (props: CtaPanelProps) => ReactElement;
