import styled from '@emotion/styled';
import Link from 'next/link';

import type { LINK_VARIANT, LIST_LAYOUT } from './LinksList.types';

export const LinksListWrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.byElement.background.purple};
  padding: 16px;
  border-radius: 8px;
`;

export const LinksListTitle = styled.h3`
  font-family: ${({ theme }) => theme.typography.fonts.default};
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.typography.fontWeights.semibold};
  color: ${({ theme }) => theme.palette.byElement.text.white};
  margin: 0 0 16px 0;
`;

export const LinksListBody = styled.div<{
  layout: LIST_LAYOUT;
}>`
  display: flex;
  flex-direction: ${({ layout }) =>
    layout === 'horizontal' ? 'row' : 'column'};
  gap: ${({ layout }) => (layout === 'horizontal' ? '24px' : '16px')};
`;

export const LinkItem = styled(Link)<{
  variant: LINK_VARIANT;
}>`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }) => theme.palette.byElement.text.white};
  font-family: ${({ theme }) => theme.typography.fonts.default};
  font-size: 1.6rem;
  font-weight: ${({ theme }) => theme.typography.fontWeights.regular};

  &:hover {
    text-decoration: underline;
  }
`;

export const LinkIcon = styled.img`
  width: 32px;
  height: 32px;
  object-fit: contain;
`;
