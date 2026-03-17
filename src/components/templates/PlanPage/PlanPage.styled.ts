import styled from '@emotion/styled';
import Image from 'next/image';

export const PlanPageBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const BackgroundImage = styled(Image)`
  position: fixed !important;
`;

export const Gradient = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background: ${({ theme }) =>
    theme.palette.byElement.background.gradientPurpleFade};
`;
