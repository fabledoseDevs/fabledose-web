import LinksList from '@/atoms/LinksList';
import { LINK_VARIANT, LIST_LAYOUT } from '@/atoms/LinksList/LinksList.types';
import { useDictionary } from '@/lang/DictionaryProvider';
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

export const Footer: FooterType = () => {
  const { footer } = useDictionary();

  return (
    <FooterBody>
      <TopRow>
        <NewsletterForm />
        <LinksContainer>
          <LinksList
            title={footer.linkList[0].title}
            variant={LINK_VARIANT.TEXT}
            layout={LIST_LAYOUT.VERTICAL}
            links={[
              {
                href: '#',
                label: footer.linkList[0].links[0].title,
              },
              {
                href: '#',
                label: footer.linkList[0].links[1].title,
              },
              {
                href: '#',
                label: footer.linkList[0].links[2].title,
              },
            ]}
          />
          <LinksList
            title={footer.linkList[1].title}
            variant={LINK_VARIANT.TEXT}
            layout={LIST_LAYOUT.VERTICAL}
            links={[
              {
                href: '#',
                label: footer.linkList[1].links[0].title,
              },
              {
                href: '#',
                label: footer.linkList[1].links[1].title,
              },
              {
                href: '#',
                label: footer.linkList[1].links[2].title,
              },
            ]}
          />
          <LinksList
            title={footer.linkList[2].title}
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
        <Legal>{footer.legalText}</Legal>
        <LegalLinksContainer>
          {[
            { href: '#', title: footer.legalLinks[0].title },
            { href: '#', title: footer.legalLinks[1].title },
            { href: '#', title: footer.legalLinks[2].title },
          ].map(({ href, title }, idx) => (
            <LegalLink key={`legal-link-${idx}`} href={href}>
              {title}
            </LegalLink>
          ))}
        </LegalLinksContainer>
      </BottomRow>
    </FooterBody>
  );
};
