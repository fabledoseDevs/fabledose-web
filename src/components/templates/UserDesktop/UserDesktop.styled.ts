import styled from '@emotion/styled';

export const UserDesktopBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0;

  @media ${({ theme }) => theme.media.tablet} {
    margin-left: 70px;
  }
`;
