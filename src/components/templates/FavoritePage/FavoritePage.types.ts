import type { ReactElement } from 'react';

/**
 * @module
 * This file defines the types and interfaces for the FavoritePage component.
 */

/**
 * Component renders the favorite page with user's favorite stories and continue reading list.
 *
 * The page displays:
 * - A carousel of stories the user has marked as favorites
 * - A carousel of stories the user has started but not completed
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <FavoritePage />
 * ```
 */
export type FavoritePage = () => ReactElement;
