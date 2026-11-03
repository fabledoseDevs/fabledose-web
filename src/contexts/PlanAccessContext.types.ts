import type { ReactNode } from 'react';

import type { PlanFeature } from '@/config/plans.types';

/**
 * Shared explanations for unavailable plan features.
 * @remarks Uses existing ModalWindow, Paragraph and Button components. Upgrade
 * navigation preserves the interface locale; missing ebook files are explained
 * separately and never presented as something another plan would magically supply.
 * @example
 * ```tsx
 * const { requestUpgrade } = usePlanAccess();
 * requestUpgrade('ebooks');
 * ```
 */
export interface PlanAccessContextValue {
  /** Opens a feature-specific dialog with a link to all plans. */
  requestUpgrade: (feature: PlanFeature) => void;
  /** Explains that the entitled PDF/EPUB file has not been supplied yet. */
  showEbookUnavailable: () => void;
}

/** Provider mounted inside SettingsProvider and DictionaryProvider. */
export interface PlanAccessProviderProps {
  /** Application using plan-aware actions. */
  children: ReactNode;
}

/** Localized explanations shared by all upgrade triggers. */
export interface PlanAccessText {
  title: string;
  allPlans: string;
  close: string;
  story: string;
  ebooks: string;
  parental: string;
  profiles: string;
  ebookPendingTitle: string;
  ebookPending: string;
  manageProfiles: string;
}
