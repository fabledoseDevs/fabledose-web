import type { ReactElement } from 'react';

import type { UserPlan } from '@/contexts/SettingsContext.types';

/**
 * @module
 * This file defines the types and interfaces for the PlanPage component.
 */

/**
 * Props for the PlanPage component.
 *
 * @property onPlanSelected - Optional callback triggered after the user selects
 * a plan on the standalone plan selection page.
 */
export interface PlanPageProps {
  onPlanSelected?: (plan: UserPlan) => void;
}

/**
 * This component renders a standalone plan selection page.
 * It can optionally notify the parent context when a plan is selected.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <PlanPage />
 * ```
 */
export type PlanPage = (props: PlanPageProps) => ReactElement;
