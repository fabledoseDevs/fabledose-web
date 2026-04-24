import { useSlideshowButtons } from './SlideshowButtons.hook';
import { SlideshowButtonsBody } from './SlideshowButtons.styled';
import type { SlideshowButtons as SlideshowButtonsType } from './SlideshowButtons.types';

export const SlideshowButtons: SlideshowButtonsType = ({
  variant,
  onClick,
  isVisible = false,
  disabled = false,
  isFullscreen = false,
  ariaLabel,
}) => {
  const { resolvedAriaLabel, Icon } = useSlideshowButtons({
    variant,
    isFullscreen,
    ariaLabel,
  });

  return (
    <SlideshowButtonsBody
      type="button"
      onClick={onClick}
      isVisible={isVisible}
      disabled={disabled}
      aria-label={resolvedAriaLabel}
    >
      <Icon />
    </SlideshowButtonsBody>
  );
};
