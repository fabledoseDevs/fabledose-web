import type { ChildPolicy } from './childPolicy.types';

/**
 * @module
 * Persistent child identities belonging to one Firebase account.
 */

/**
 * A child profile; never a separate login or subscription.
 * @remarks
 * Documents live at users/{uid}/childProfiles/{id}. Parent library data remains
 * untouched. A deletion tombstone blocks new child writes while cleanup runs.
 * @example
 * ```ts
 * const profile: ChildProfile = { id: 'child-id', name: 'Asia', imageUrl: '/avatars/av1.jpg', ageGroup: '5-7', createdAt: 1 };
 * ```
 */
export interface ChildProfile {
  /** Firestore-generated stable identifier. */
  id: string;
  /** Trimmed display name or pseudonym, at most 40 characters. */
  name: string;
  /** One of the twelve bundled avatars; arbitrary URLs are rejected. */
  imageUrl: string;
  /** Optional age band for future recommendations; does not filter stories. */
  ageGroup: '' | '0-4' | '5-7' | '8-10' | '11+';
  /** Creation timestamp in milliseconds. */
  createdAt: number;
  /** True while acknowledged data cleanup is pending; such profiles cannot be selected. */
  deleting?: boolean;
  /** Optional Spark content preferences; absent documents use unrestricted defaults. */
  policy?: ChildPolicy;
}

/**
 * Editable child fields, separate from server document identity.
 * @remarks Deletion, identity and creation time cannot be overwritten by the editor.
 * @example
 * ```ts
 * const draft: ChildProfileDraft = { name: 'Asia', imageUrl: '/avatars/av1.jpg', ageGroup: '' };
 * ```
 */
export type ChildProfileDraft = Pick<
  ChildProfile,
  'name' | 'imageUrl' | 'ageGroup'
>;
