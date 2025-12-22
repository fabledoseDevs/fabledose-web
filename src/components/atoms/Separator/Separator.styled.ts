import styled from '@emotion/styled';

import type { Theme } from '@/styles/types';

import type { SEPARATOR_COLOR } from './Separator.types';

export const SeparatorBody = styled.div<{ $margin: boolean }>`
  display: flex;
  align-items: center;
  width: 98%;
  margin: ${({ $margin }) => ($margin ? '0 12px' : '0')};
`;

const mapColor = (theme: Theme, variant: SEPARATOR_COLOR): string => {
  switch (variant) {
    case 'white':
      return theme.palette.byColor.white.full;
    case 'purple':
      return theme.palette.byColor.purple.regular;
    case 'gray':
    default:
      // closest neutral/gray token present in theme
      return '#cccccc';
  }
};

export const Line = styled.span<{ $variant: SEPARATOR_COLOR }>`
  flex: 1 1 auto;
  height: 1px;
  background-color: ${({ theme, $variant }) => mapColor(theme, $variant)};
`;

export const Label = styled.span<{ $variant: SEPARATOR_COLOR }>`
  margin: 0 12px;
  color: ${({ theme, $variant }) => mapColor(theme, $variant)};
  white-space: nowrap;
  text-align: center;
  font-size: ${({ theme }) => theme.typography.paragraphs.default.fontSize};
  font-family: ${({ theme }) => theme.typography.paragraphs.default.fontFamily};
`;
