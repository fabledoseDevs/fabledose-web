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
          title={'Portal'}
          variant={LINK_VARIANT.TEXT}
          layout={LIST_LAYOUT.VERTICAL}
          links={[
            {
              href: '#',
              label: 'Konto',
            },
            {
              href: '#',
              label: 'Płatności',
            },
            {
              href: '#',
              label: 'Centrum pomocy',
            },
          ]}
        />
        <LinksList
          title={'Firma'}
          variant={LINK_VARIANT.TEXT}
          layout={LIST_LAYOUT.VERTICAL}
          links={[
            {
              href: '#',
              label: 'O nas',
            },
            {
              href: '#',
              label: 'Współpraca',
            },
            {
              href: '#',
              label: 'Kontakt',
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
        <LegalLink href={'#'}>Polityka Prywatności</LegalLink>
        <LegalLink href={'#'}>Warunki Korzystania</LegalLink>
        <LegalLink href={'#'}>Ustawienia Ciasteczek</LegalLink>
      </LegalLinksContainer>
    </BottomRow>
  </FooterBody>
);
