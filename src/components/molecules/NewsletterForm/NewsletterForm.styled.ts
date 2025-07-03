import styled from '@emotion/styled';

export const NewsletterFormBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  border-radius: 8px;
  gap: 1rem;

  @media ${({ theme }) => theme.media.laptop} {
    align-items: flex-start;
  }

  p {
    text-align: center;

    @media ${({ theme }) => theme.media.laptop} {
      text-align: left;
    }
  }
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
  text-align: center;
  opacity: 0.8;

  @media ${({ theme }) => theme.media.laptop} {
    text-align: left;
  }
`;
