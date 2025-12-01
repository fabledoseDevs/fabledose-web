import styled from '@emotion/styled';

export const RegisterFormBody = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 560px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const FormCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
  width: 100%;
  max-width: 464px;
  padding: 48px 24px;
  border-radius: 40px;
  gap: 12px;
  background-color: ${({ theme }) => theme.palette.byElement.background.white};
`;

export const RedText = styled.span`
  color: ${({ theme }) => theme.palette.byColor.red.regular};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 4px;
`;

export const Label = styled.label`
  width: 100%;
  margin-top: 12px;
`;

export const LabelText = styled.p`
  font-size: ${({ theme }) => theme.typography.inputs.default.fontSize};
  font-family: ${({ theme }) => theme.typography.inputs.default.fontFamily};
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.palette.byElement.text.purple};
`;

export const NewAccount = styled.div`
  width: 100%;
  text-align: center;
  margin: 34px auto 0 auto;
  font-size: ${({ theme }) => theme.typography.inputs.default.fontSize};
  color: ${({ theme }) => theme.palette.byElement.text.purple};

  a {
    font-size: ${({ theme }) => theme.typography.inputs.default.fontSize};
    font-family: ${({ theme }) => theme.typography.inputs.default.fontFamily};
    font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
    color: ${({ theme }) => theme.palette.byColor.red.regular};
    text-decoration: none;
  }
`;
