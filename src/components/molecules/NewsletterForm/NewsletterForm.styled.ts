import styled from '@emotion/styled';

export const NewsletterFormBody = styled.footer`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  background-color: ${({ theme }) => theme.palette.byElement.background.purple};
  border-radius: 8px;
  gap: 1rem;
`;

export const Logo = styled.img`
  max-width: 180px;
  width: 100%;
  margin-bottom: 1rem;
`;

export const Disclaimer = styled.div`
  font-size: 1.2rem;
  font-family: ${({ theme }) => theme.typography.paragraphs.default.fontFamily};
  color: ${({ theme }) => theme.palette.byElement.text.white};
  text-align: left;
  opacity: 0.8;
`;
