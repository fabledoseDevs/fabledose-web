import styled from '@emotion/styled';

export const StandaloneStoryCardBody = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  background-color: white;
  border-radius: 40px;
  padding: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 24px;
  }
`;

export const DescriptionContainer = styled.div`
  width: 40%;
  padding-right: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 24px;

  @media (max-width: 768px) {
    width: 100%;
    padding-right: 0;
    padding-bottom: 24px;
  }
`;

export const ImageContainer = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 24px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
