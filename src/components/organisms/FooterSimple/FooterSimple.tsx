import { useParams } from 'next/navigation';

import { useDictionary } from '@/lang/DictionaryProvider';

import {
  BottomRow,
  FooterBody,
  Legal,
  LegalLink,
  LegalLinksContainer,
} from './FooterSimple.styled';
import type { FooterSimple as FooterSimpleType } from './FooterSimple.types';

export const FooterSimple: FooterSimpleType = () => {
  const { footer, helpCenter } = useDictionary();
  const { lang } = useParams<{ lang: string }>();
  const locale = lang === 'pl' ? 'pl' : 'en';

  return (
    <FooterBody>
      <BottomRow>
        <LegalLinksContainer>
          {[
            { href: `/${locale}/help`, title: helpCenter.title },
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
        <Legal>{footer.legalText}</Legal>
      </BottomRow>
    </FooterBody>
  );
};
