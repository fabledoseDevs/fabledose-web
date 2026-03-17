import type { ReactElement } from 'react';

import type { UserPlan } from '@/contexts/SettingsContext.types';
import type { InfoCardExtendedProps } from '@/molecules/InfoCardExtended';
import type { InfoCardSimpleProps } from '@/molecules/InfoCardSimple';

/**
 * @module
 * This file defines the types and interfaces for the StandalonePlanSelector
 * component.
 */

/**
 * Props for the StandalonePlanSelector component.
 *
 * @property onPlanSelected - Optional callback fired after a plan is selected.
 * It can be used by a parent page to react to selection, for example by
 * redirecting the user.
 */
export interface StandalonePlanSelectorProps {
  onPlanSelected?: (plan: UserPlan) => void;
}

/**
 * Return values of the StandalonePlanSelector hook.
 *
 * @property isDetailViewVisible - Indicates whether the extended comparison is
 * currently visible.
 * @property simpleCards - Simple plan comparison cards.
 * @property extendedCards - Extended plan comparison cards.
 * @property handleDetailViewToggle - Toggles extended comparison visibility.
 */
export interface UseStandalonePlanSelectorReturnValues {
  isDetailViewVisible: boolean;
  simpleCards: [InfoCardSimpleProps, InfoCardSimpleProps, InfoCardSimpleProps];
  extendedCards: [
    InfoCardExtendedProps,
    InfoCardExtendedProps,
    InfoCardExtendedProps,
  ];
  handleDetailViewToggle: () => void;
}

/**
 * Options for the StandalonePlanSelector hook.
 *
 * @property onPlanSelected - Optional callback fired after selecting a plan.
 */
export interface UseStandalonePlanSelectorOptions {
  onPlanSelected?: (plan: UserPlan) => void;
}

/**
 * Hook type used by StandalonePlanSelector.
 *
 * @param options - Optional callback options.
 * @returns Standalone selector UI state and handlers.
 */
export type UseStandalonePlanSelector = (
  options?: UseStandalonePlanSelectorOptions,
) => UseStandalonePlanSelectorReturnValues;

/**
 * Renders the standalone plan selector organism.
 *
 * @remarks
 * This variant presents plan comparison UI outside the registration flow, so
 * it omits registration-specific heading and step indicator.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <StandalonePlanSelector />
 * ```
 */
export type StandalonePlanSelector = (
  props: StandalonePlanSelectorProps,
) => ReactElement;
