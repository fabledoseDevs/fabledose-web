import { useState } from 'react';
import {
  ResetButtonWrapper,
  IconText,
  LabelText,
  ThinkingDot,
} from './ResetButton.styled';
import type { ResetButtonProps } from './ResetButton.types';

const CLICK_ANIMATION_DELAY = 300;
const THINKING_DOT_DELAYS = [0, 0.3, 0.6];

export const ResetButton = ({ onClick, title }: ResetButtonProps) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => {
      onClick();
    }, CLICK_ANIMATION_DELAY);
  };

  if (isClicked) {
    return (
      <ResetButtonWrapper $isClicked disabled type="button">
        {THINKING_DOT_DELAYS.map(delay => (
          <ThinkingDot key={delay} $delay={delay} />
        ))}
      </ResetButtonWrapper>
    );
  }

  return (
    <ResetButtonWrapper onClick={handleClick} title={title} type="button">
      <IconText>×</IconText>
      <LabelText>Czytaj ponownie</LabelText>
    </ResetButtonWrapper>
  );
};
