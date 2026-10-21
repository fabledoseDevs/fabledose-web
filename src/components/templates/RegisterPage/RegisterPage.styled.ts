import styled from '@emotion/styled';
import Image from 'next/image';

export const RegisterPageBody = styled.div`
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

export const RegistrationStatus = styled.p`
  position: relative;
  color: ${({ theme }) => theme.palette.byElement.text.white};
  padding: 1.2rem 2.4rem;
  text-align: center;
`;
