import styled from '@emotion/styled';

import { LoginFormBody } from '@/molecules/LoginForm/LoginForm.styled';

export const ResetBody = styled(LoginFormBody)`
  height: auto;
  min-height: 100vh;
  min-height: 100dvh;
  padding: 24px 16px;
  box-sizing: border-box;
  overflow: visible;
`;

export const Fields = styled.fieldset`
  border: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  min-width: 0;
`;

export const Message = styled.p`
  color: ${({ theme }) => theme.palette.byElement.text.purple};
  font-family: ${({ theme }) => theme.typography.inputs.default.fontFamily};
  line-height: 1.5;
  margin: 16px 0;
  overflow-wrap: anywhere;
`;
