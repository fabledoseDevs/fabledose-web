import type { ReactElement } from 'react';

/** Registration page with resumable account setup and persisted free-plan selection.
 * Authentication and account settings determine the visible step after reload.
 * Existing accounts without an onboarding marker retain their library access.
 * @group Component
 */
export type LoginPage = () => ReactElement;

/** Derived registration state. Steps follow authentication and persisted settings, not local navigation.
 * Saving is serialized; failures retain the plan selector for a retry.
 */
export interface RegisterPageState {
  showForm: boolean;
  showPlans: boolean;
  isLoading: boolean;
  settingsLoadError: boolean;
  retrySettingsLoad: () => void;
  isSaving: boolean;
  saveError: boolean;
  selectPlan: () => Promise<void>;
}
