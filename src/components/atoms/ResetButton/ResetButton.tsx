import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { type ReactElement, useEffect, useId, useRef, useState } from 'react';

import {
  ResetButtonContainer,
  ResetButtonWrapper,
  ResetTooltip,
} from './ResetButton.styled';
import type { ResetButtonProps } from './ResetButton.types';

export const ResetButton = ({
  onClick,
  title,
  label = 'Czytaj od nowa',
}: ResetButtonProps): ReactElement => {
  const mounted = useRef(true);
  const pending = useRef(false);
  const tooltipId = useId();
  const [isPending, setIsPending] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const actionLabel = title || label;

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (!showTooltip) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setShowTooltip(false);
    };
    document.addEventListener('keydown', dismiss);
    return () => document.removeEventListener('keydown', dismiss);
  }, [showTooltip]);

  const handleClick = async () => {
    if (pending.current) return;
    pending.current = true;
    setIsPending(true);
    try {
      await onClick();
    } finally {
      pending.current = false;
      if (mounted.current) setIsPending(false);
    }
  };

  return (
    <ResetButtonContainer
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
    >
      <ResetButtonWrapper
        onClick={handleClick}
        aria-label={actionLabel}
        aria-describedby={showTooltip ? tooltipId : undefined}
        aria-busy={isPending}
        disabled={isPending}
        type="button"
      >
        <ArrowPathIcon aria-hidden="true" />
      </ResetButtonWrapper>
      {showTooltip && (
        <ResetTooltip id={tooltipId} role="tooltip">
          {actionLabel}
        </ResetTooltip>
      )}
    </ResetButtonContainer>
  );
};
