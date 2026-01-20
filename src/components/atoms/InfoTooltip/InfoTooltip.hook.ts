import { useState } from 'react';

import type { UseInfoTooltip } from './InfoTooltip.types';

const useInfoTooltip: UseInfoTooltip = () => {
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);

  const showTooltip = () => setIsTooltipVisible(true);
  const hideTooltip = () => setIsTooltipVisible(false);
  const toggleTooltip = () => setIsTooltipVisible(prev => !prev);

  return {
    isTooltipVisible,
    showTooltip,
    hideTooltip,
    toggleTooltip,
  };
};

export default useInfoTooltip;
