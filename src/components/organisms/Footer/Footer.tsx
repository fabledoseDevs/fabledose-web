import LinksList from '@/atoms/LinksList';
import { LINK_VARIANT, LIST_LAYOUT } from '@/atoms/LinksList/LinksList.types';
import NewsletterForm from '@/molecules/NewsletterForm';

import {
  BottomRow,
  FooterBody,
  Legal,
  LegalLink,
  LegalLinksContainer,
  LinksContainer,
  TopRow,
} from './Footer.styled';
import type { Footer as FooterType } from './Footer.types';

export const Footer: FooterType = ({ dict }) => (
  <FooterBody>
    <TopRow>
      <NewsletterForm />
      <LinksContainer>
        <LinksList
          title={dict.linkList[0].title}
          variant={LINK_VARIANT.TEXT}
          layout={LIST_LAYOUT.VERTICAL}
          links={[
            {
              href: '#',
              label: dict.linkList[0].links[0].title,
            },
            {
              href: '#',
              label: dict.linkList[0].links[1].title,
            },
            {
              href: '#',
              label: dict.linkList[0].links[2].title,
            },
          ]}
        />
        <LinksList
          title={dict.linkList[1].title}
          variant={LINK_VARIANT.TEXT}
          layout={LIST_LAYOUT.VERTICAL}
          links={[
            {
              href: '#',
              label: dict.linkList[1].links[0].title,
            },
            {
              href: '#',
              label: dict.linkList[1].links[1].title,
            },
            {
              href: '#',
              label: dict.linkList[1].links[2].title,
            },
          ]}
        />
        <LinksList
          title={dict.linkList[2].title}
          variant={LINK_VARIANT.ICON}
          layout={LIST_LAYOUT.HORIZONTAL}
          links={[
            {
              href: 'https://facebook.com',
              label: 'Facebook',
              icon: '/socialIcons/Facebook.svg',
            },
            {
              href: 'https://instagram.com',
              label: 'Instagram',
              icon: '/socialIcons/Instagram.svg',
            },
            {
              href: 'https://x.com',
              label: 'X',
              icon: '/socialIcons/X.svg',
            },
            {
              href: 'https://linkedin.com',
              label: 'Linked In',
              icon: '/socialIcons/LinkedIn.svg',
            },
            {
              href: 'https://youtube.com',
              label: 'Youtube',
              icon: '/socialIcons/Youtube.svg',
            },
          ]}
        />
      </LinksContainer>
    </TopRow>
    <BottomRow>
      <Legal>{dict.legalText}</Legal>
      <LegalLinksContainer>
        {[
          { href: '#', title: dict.legalLinks[0].title },
          { href: '#', title: dict.legalLinks[1].title },
          { href: '#', title: dict.legalLinks[2].title },
        ].map(({ href, title }, idx) => (
          <LegalLink key={`legal-link-${idx}`} href={href}>
            {title}
          </LegalLink>
        ))}
      </LegalLinksContainer>
    </BottomRow>
  </FooterBody>
);
