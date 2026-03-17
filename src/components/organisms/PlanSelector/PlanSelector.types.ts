import type { ReactElement } from 'react';

import type { UserPlan } from '@/contexts/SettingsContext.types';
import type { InfoCardExtendedProps } from '@/molecules/InfoCardExtended';
import type { InfoCardSimpleProps } from '@/molecules/InfoCardSimple';

/**
 * @module
 * Types and interfaces for the PlanSelector component and its related hook.
 */

/**
 * Return values of the PlanSelector hook.
 *
 * @remarks
 * The hook encapsulates the UI state for showing/hiding the extended
 * plan comparison section inside the PlanSelector component.
 *
 * @property isDetailViewVisible - Indicates whether the extended plan comparison
 *  section is currently visible.
 *  @property simpleCards - Array of InfoCardSimpleProps for the simple comparison.
 *  @property extendedCards - Array of InfoCardExtendedProps for the extended comparison.
 * @property handleDetailViewToggle - Toggles the visibility state of the
 *  extended plan comparison section.
 */

export interface UsePlanSelectorReturnValues {
  isDetailViewVisible: boolean;
  simpleCards: [InfoCardSimpleProps, InfoCardSimpleProps, InfoCardSimpleProps];
  extendedCards: [
    InfoCardExtendedProps,
    InfoCardExtendedProps,
    InfoCardExtendedProps,
  ];
  handleDetailViewToggle: () => void;
}

export interface UsePlanSelectorOptions {
  onPlanSelected?: (plan: UserPlan) => void;
}

/**
 * Hook type used by the PlanSelector component.
 *
 * @returns An object with the current visibility state and a toggle handler.
 *  - `isDetailViewVisible`: boolean flag indicating visibility of the extended view.
 *  - `handleDetailViewToggle()`: function to toggle the extended view.
 */
export type UsePlanSelector = (
  options?: UsePlanSelectorOptions,
) => UsePlanSelectorReturnValues;

/**
 * Renders the PlanSelector organism.
 *
 * @remarks
 * The component guides the user through selecting a plan. It always renders a
 * simple comparison and optionally an extended comparison, which can be toggled
 * via an internal button that flips the hook-controlled visibility state.
 *
 * @returns A ReactElement containing the selector UI.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * import { PlanSelector } from '@/organisms/PlanSelector/PlanSelector';
 *
 * export default function RegisterPage() {
 *   return <PlanSelector />;
 * }
 * ```
 */
export type PlanSelector = () => ReactElement;
