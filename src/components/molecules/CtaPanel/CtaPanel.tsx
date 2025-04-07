import { Content, CtaPanelBody } from './CtaPanel.styled';
import type { CtaPanel as CtaPanelType } from './CtaPanel.types';

export const CtaPanel: CtaPanelType = ({ colorVariant, children }) => (
  <CtaPanelBody>
    <Content>{children}</Content>
    <svg
      width="901"
      height="129"
      viewBox="0 0 901 129"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0L450.5 72.5L901 0V129H0V0Z" fill={colorVariant} />
    </svg>
  </CtaPanelBody>
);
