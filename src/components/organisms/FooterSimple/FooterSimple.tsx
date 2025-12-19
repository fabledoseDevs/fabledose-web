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
  const { footer } = useDictionary();

  return (
    <FooterBody>
      <BottomRow>
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
        <Legal>{footer.legalText}</Legal>
      </BottomRow>
    </FooterBody>
  );
};
