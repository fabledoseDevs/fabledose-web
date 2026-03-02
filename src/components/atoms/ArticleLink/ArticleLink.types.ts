import type { ReactElement, ReactNode } from 'react';

/**
 * Interface for ArticleLink component props.
 *
 * @property children - Content to be displayed inside the link.
 * @property href - Target URL for the link. Defaults to "#".
 * @property onClick - Optional click handler for the link.
 * @property className - Optional CSS class for additional styling.
 */
export interface ArticleLinkProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

/**
 * Component renders ArticleLink.
 * The link can have different targets, and click handlers.
 * @param props - The component properties:
 *  - `children`: Content to be displayed inside the link.
 *  - `href`: Target URL for the link. Defaults to "#".
 *  - `onClick`: Optional click handler for the link.
 *  - `className`: Optional CSS class for additional styling.
 *
 * @group Component
 *
 * @example
 * ```tsx
 * <ArticleLink href="/home" onClick={() => console.log('Link clicked!')}>
 *   Home
 * </ArticleLink>
 * ```
 */
export type ArticleLink = (props: ArticleLinkProps) => ReactElement;
