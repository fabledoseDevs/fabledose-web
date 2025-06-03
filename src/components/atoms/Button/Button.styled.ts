import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Link from 'next/link';

const buttonStyle = css`
  margin: 5px auto;
  display: block;
  box-sizing: border-box;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  letter-spacing: 1px;
  line-height: 1;
  padding: 12px 24px;
  border-radius: 24px;
  font-size: 1.8rem;
  font-weight: 600;
`;

export const ButtonWrapper = styled.div`
  width: fit-content;
`;

export const ButtonBody = styled.button`
  ${buttonStyle};
  font-family: ${({ theme }) => theme.typography.fonts.default}, sans-serif;
  color: ${({ theme }) => theme.palette.byElement.text.white};
  background: ${({ theme }) => theme.palette.byElement.background.gradientRed};
  border: 1px solid ${({ theme }) => theme.palette.byColor.red.regular};
  box-shadow: 0 8px 8px rgba(29, 10, 50, 0.1),
    inset 0 3px 4px ${({ theme }) => theme.palette.byColor.red.light};

  &:active {
    background: ${({ theme }) =>
      theme.palette.byElement.background.gradientRedReverse};
    box-shadow: 0 4px 8px rgba(29, 10, 50, 0.2),
      inset 0 2px 3px ${({ theme }) => theme.palette.byColor.red.light};
  }

  &:disabled {
    background: ${({ theme }) =>
      theme.palette.byElement.background.gradientRedReverse};
    box-shadow: inset 0 3px 4px
      ${({ theme }) => theme.palette.byColor.red.light};
    cursor: not-allowed;
    opacity: 0.5;
    filter: grayscale(100%);
  }
`;

export const LinkButtonBody = styled(Link)`
  ${buttonStyle};
  font-family: ${({ theme }) => theme.typography.fonts.default}, sans-serif;
  color: ${({ theme }) => theme.palette.byElement.text.white};
  background: ${({ theme }) => theme.palette.byElement.background.gradientRed};
  border: 1px solid ${({ theme }) => theme.palette.byColor.red.regular};
  box-shadow: 0 8px 8px rgba(29, 10, 50, 0.1),
    inset 0 3px 4px ${({ theme }) => theme.palette.byColor.red.light};

  &:active {
    background: ${({ theme }) =>
      theme.palette.byElement.background.gradientRedReverse};
    box-shadow: 0 4px 8px rgba(29, 10, 50, 0.2),
      inset 0 2px 3px ${({ theme }) => theme.palette.byColor.red.light};
  }

  &:disabled {
    background: ${({ theme }) =>
      theme.palette.byElement.background.gradientRedReverse};
    box-shadow: inset 0 3px 4px
      ${({ theme }) => theme.palette.byColor.red.light};
    cursor: not-allowed;
    opacity: 0.5;
    filter: grayscale(100%);
  }
`;
