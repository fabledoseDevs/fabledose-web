import styled from '@emotion/styled';
import Link from 'next/link';

export const FooterBody = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }) =>
    theme.palette.byElement.background.darkPurple};
`;

export const BottomRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3.6rem 2rem;
  width: 100%;
  max-width: 1440px;
  gap: 1.6rem;
`;

export const Legal = styled.div`
  font-size: 1.4rem;
  text-align: center;

  @media ${({ theme }) => theme.media.laptop} {
    text-align: left;
  }
`;

export const LegalLinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1.6rem;
`;

export const LegalLink = styled(Link)`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.palette.byElement.text.white};
  text-decoration: underline;
`;
