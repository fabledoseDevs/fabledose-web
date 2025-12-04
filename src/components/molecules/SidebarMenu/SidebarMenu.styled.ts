import styled from '@emotion/styled';

export const SidebarMenuBody = styled.div<{ direction?: 'row' | 'column' }>`
  display: flex;
  flex-direction: ${({ direction }) => direction || 'column'};
  align-items: center;
  justify-content: center;
  gap: 8px;
`;
