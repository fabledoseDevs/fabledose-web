import type { ReactElement } from 'react';

import type { ButtonProps } from '@/atoms/Button/Button.types';
import type { InfoTooltipContent } from '@/atoms/InfoTooltip';

/**
 * @module
 * This file defines the types and interfaces for the SettingsButton component.
 */

/**
 * Interface for SettingsButton component props.
 *
 * @property label - The label of the settings row.
 * @property info - The content for the info tooltip.
 * @property buttonProps - Optional props for the Atom Button component. If provided, Atom Button is rendered.
 * @property customButtonText - Text for the custom button (rendered if buttonProps is not provided).
 * @property customButtonRightText - Optional text for the right side of the custom button.
 * @property onCustomButtonClick - Optional click handler for the custom button.
 */
export interface SettingsButtonProps {
  label: string;
  info: InfoTooltipContent;
  buttonProps?: ButtonProps;
  customButtonText?: string;
  customButtonRightText?: string;
  onCustomButtonClick?: () => void;
}

/**
 * Component renders a settings row with a button.
 * It can display either a custom styled button or the Atom Button component.
 *
 * @param props - The component properties.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <SettingsButton
 *   label="Plan:"
 *   info={{
 *     title: 'Plan',
 *     description: 'Your current subscription plan.'
 *   }}
 *   customButtonText="Family"
 *   customButtonRightText="14,99 PLN/mc"
 * />
 * ```
 */
export type SettingsButton = (props: SettingsButtonProps) => ReactElement;
