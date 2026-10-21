import type { ReactNode } from 'react';

/** Props for the application theme and per-render Emotion style registry. */
export interface ThemeProviderProps {
  /** All styled content must share the same cache throughout the client session. */
  children: ReactNode;
}

/** Tracks a rule pending server insertion; flushed rules are not emitted again. */
export interface EmittedStyle {
  /** Emotion serialization name used for client-side hydration. */
  name: string;
  /** Global rules require the separate Emotion global-style hydration marker. */
  global: boolean;
}
