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

export const Footer: FooterType = () => (
  <FooterBody>
    <TopRow>
      <NewsletterForm />
      <LinksContainer>
        <LinksList
          title={'Group One'}
          variant={LINK_VARIANT.TEXT}
          layout={LIST_LAYOUT.VERTICAL}
          links={[
            {
              href: '#',
              label: 'Link ',
            },
            {
              href: '#',
              label: 'Link long name',
            },
            {
              href: '#',
              label: 'Link super long name',
            },
          ]}
        />
        <LinksList
          title={'Group Two'}
          variant={LINK_VARIANT.TEXT}
          layout={LIST_LAYOUT.VERTICAL}
          links={[
            {
              href: '#',
              label: 'Link ',
            },
            {
              href: '#',
              label: 'Link long name',
            },
            {
              href: '#',
              label: 'Link super long name',
            },
          ]}
        />
        <LinksList
          title="Obserwuj nas"
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
      <Legal>© 2025 Zespół Fabledose. Wszelkie prawa zastrzeżone.</Legal>
      <LegalLinksContainer>
        <LegalLink href={'#'}>Privacy Policy</LegalLink>
        <LegalLink href={'#'}>Terms of Service</LegalLink>
        <LegalLink href={'#'}>Cookies Settings</LegalLink>
      </LegalLinksContainer>
    </BottomRow>
  </FooterBody>
);
