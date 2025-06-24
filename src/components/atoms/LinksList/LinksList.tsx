import {
  LinkIcon,
  LinkItem,
  LinksListBody,
  LinksListTitle,
  LinksListWrapper,
} from './LinksList.styled';
import type { LinksList as LinksListType } from './LinksList.types';
import { LINK_VARIANT } from './LinksList.types';

export const LinksList: LinksListType = ({ variant, layout, title, links }) => (
  <LinksListWrapper>
    {title && <LinksListTitle>{title}</LinksListTitle>}
    <LinksListBody layout={layout}>
      {links.map((link, index) => (
        <LinkItem
          key={`${link.href}-${index}`}
          href={link.href}
          variant={variant}
        >
          {variant === LINK_VARIANT.ICON && link.icon && (
            <LinkIcon src={link.icon} alt={link.label} />
          )}
          {variant === LINK_VARIANT.TEXT && link.label}
        </LinkItem>
      ))}
    </LinksListBody>
  </LinksListWrapper>
);
