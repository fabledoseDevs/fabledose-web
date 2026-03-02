import { StyledArticleLink } from './ArticleLink.styled';
import type { ArticleLink as ArticleLinkType } from './ArticleLink.types';

export const ArticleLink: ArticleLinkType = ({
  children,
  href = '#',
  onClick,
  className,
}) => (
  <StyledArticleLink href={href} onClick={onClick} className={className}>
    {children}
  </StyledArticleLink>
);

export default ArticleLink;
