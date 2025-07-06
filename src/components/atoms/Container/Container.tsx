import {
  StyledAside,
  StyledDiv,
  StyledFooter,
  StyledHeader,
  StyledSection,
} from './Container.styled';
import type {
  Container as ContainerType,
  ContainerSelector as ContainerSelectorType,
} from './Container.types';
import { CONTAINER_ELEMENT } from './Container.types';

export const containerSelector: ContainerSelectorType = ({
  containerType,
  maxWidth,
  flexDirection,
  justifyContent,
  alignItems,
  verticalPadding,
  mobilePadding,
  gap,
  backgroundColor,
  children,
}) => {
  const commonProps = {
    maxWidth,
    flexDirection,
    justifyContent,
    alignItems,
    verticalPadding,
    mobilePadding,
    gap,
    backgroundColor,
    children,
  };

  switch (containerType) {
    case CONTAINER_ELEMENT.DIV:
      return <StyledDiv {...commonProps}>{children}</StyledDiv>;
    case CONTAINER_ELEMENT.SECTION:
      return <StyledSection {...commonProps}>{children}</StyledSection>;
    case CONTAINER_ELEMENT.ASIDE:
      return <StyledAside {...commonProps}>{children}</StyledAside>;
    case CONTAINER_ELEMENT.HEADER:
      return <StyledHeader {...commonProps}>{children}</StyledHeader>;
    case CONTAINER_ELEMENT.FOOTER:
      return <StyledFooter {...commonProps}>{children}</StyledFooter>;
    default:
      return <StyledDiv {...commonProps}>{children}</StyledDiv>;
  }
};

export const Container: ContainerType = props => containerSelector(props);
