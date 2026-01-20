import { InformationCircleIcon } from '@heroicons/react/24/outline';

import useInfoTooltip from './InfoTooltip.hook';
import {
  IconButton,
  InfoWrapper,
  Tooltip,
  TooltipDesc,
  TooltipTitle,
} from './InfoTooltip.styled';
import type { InfoTooltip as InfoTooltipType } from './InfoTooltip.types';

export const InfoTooltip: InfoTooltipType = ({ content }) => {
  const { isTooltipVisible, showTooltip, hideTooltip, toggleTooltip } =
    useInfoTooltip();

  return (
    <InfoWrapper>
      <IconButton
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        onClick={toggleTooltip}
        aria-label="Info"
      >
        <InformationCircleIcon />
      </IconButton>
      {isTooltipVisible && (
        <Tooltip role="tooltip">
          <TooltipTitle>{content.title}</TooltipTitle>
          <TooltipDesc>{content.description}</TooltipDesc>
        </Tooltip>
      )}
    </InfoWrapper>
  );
};
