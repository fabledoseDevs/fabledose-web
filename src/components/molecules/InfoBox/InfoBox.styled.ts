import styled from '@emotion/styled';

export const InfoBoxBody = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.byColor.purple.regular};
  padding: 24px;
  border-radius: 16px;
  align-items: center;
  text-align: center;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  gap: 12px;
`;

export const ImageContainer = styled.div`
  width: 100%;
  max-width: 464px;
  aspect-ratio: 1/1;
  position: relative;

  &::before {
    content: '';
    display: block;
    padding-top: 100%;
    @supports (aspect-ratio: 1/1) {
      display: none;
    }
  }
  border-radius: 40px;
  border: 16px solid ${({ theme }) => theme.palette.byColor.purple.dark};
  overflow: hidden;
  margin: 0 auto;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  max-width: 432px;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 24px;
  display: block;
  margin: 0 auto;

  @supports not (aspect-ratio: 1/1) {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

export const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography.fonts.default};
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.byElement.text.white};
  margin: 16px 0 8px;
`;

export const Description = styled.p`
  font-family: ${({ theme }) => theme.typography.fonts.default};
  font-size: 18px;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.byElement.text.white};
  margin: 0;
`;
