import { StyledArticleLink } from './ArticleLink.styled';
import type { ArticleLink as ArticleLinkType } from './ArticleLink.types';

export const ArticleLink: ArticleLinkType = ({
  children,
  href = '#',
  onClick,
  className,
  ...linkAttributes
}) => (
  <StyledArticleLink
    href={href}
    onClick={onClick}
    className={className}
    {...linkAttributes}
  >
    {children}
  </StyledArticleLink>
);

export default ArticleLink;
