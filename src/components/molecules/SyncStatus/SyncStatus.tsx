import Button from '@/atoms/Button';
import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/atoms/Button/Button.types';
import Paragraph from '@/atoms/Paragraph';
import { FOREGROUND_COLOR } from '@/atoms/Paragraph/Paragraph.types';

import { StatusBody } from './SyncStatus.styled';
import type { SyncStatus as SyncStatusType } from './SyncStatus.types';
export const SyncStatus: SyncStatusType = ({
  message,
  isError = false,
  floating = false,
  onRetry,
  retryLabel,
}) => (
  <StatusBody $floating={floating} role={isError ? 'alert' : 'status'}>
    <Paragraph color={FOREGROUND_COLOR.WHITE}>{message}</Paragraph>
    {onRetry && (
      <Button
        actionType={ACTION_TYPE.FUNCTION_TRIGGER}
        variant={BUTTON_VARIANT.WHITE}
        width={{ widthType: WIDTH_TYPE.AUTO }}
        text={retryLabel || ''}
        payload={onRetry}
      />
    )}
  </StatusBody>
);
