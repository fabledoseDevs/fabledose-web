import { useParams } from 'next/navigation';

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
  const { lang } = useParams<{ lang: string }>();
  const locale = lang === 'pl' ? 'pl' : 'en';

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
                href: `/${locale}/article/account-and-plans`,
                label: footer.linkList[0].links[0].title,
              },
              {
                href: `/${locale}/article/payments`,
                label: footer.linkList[0].links[1].title,
              },
              {
                href: `/${locale}/help`,
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
                href: `/${locale}/article/about`,
                label: footer.linkList[1].links[0].title,
              },
              {
                href: `/${locale}/article/collaboration`,
                label: footer.linkList[1].links[1].title,
              },
              {
                href: `/${locale}/article/contact`,
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
            {
              href: `/${locale}/article/privacy-policy`,
              title: footer.legalLinks[0].title,
            },
            {
              href: `/${locale}/article/terms-of-use`,
              title: footer.legalLinks[1].title,
            },
            {
              href: `/${locale}/article/cookies`,
              title: footer.legalLinks[2].title,
            },
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
