import { useCallback, useState } from 'react';

import type {
  UseFableTileInteraction,
  UseFableTileInteractionResult,
} from './FableTile.types';

export const useFableTileInteraction: UseFableTileInteraction =
  (): UseFableTileInteractionResult => {
    const [isActive, setIsActive] = useState(false);

    const onMouseEnter = useCallback(() => setIsActive(true), []);
    const onMouseLeave = useCallback(() => setIsActive(false), []);
    const onTouchStart = useCallback(() => setIsActive(true), []);
    const onTouchEnd = useCallback(() => setIsActive(false), []);

    return { isActive, onMouseEnter, onMouseLeave, onTouchStart, onTouchEnd };
  };
