import { PencilIcon } from '@heroicons/react/24/outline';
import { InformationCircleIcon } from '@heroicons/react/24/outline';

import useSettingsInputField from './SettingsInputField.hook';
import {
  ActionsWrapper,
  ContentWrapper,
  IconButton,
  InfoWrapper,
  InputField,
  Label,
  SettingsInputFieldBody,
  Tooltip,
  TooltipDesc,
  TooltipTitle,
  ValueDisplay,
} from './SettingsInputField.styled';
import type { SettingsInputField as SettingsInputFieldType } from './SettingsInputField.types';

export const SettingsInputField: SettingsInputFieldType = ({ label, info }) => {
  const {
    isEditMode,
    value,
    toggleEditMode,
    handleInputChange,
    isTooltipVisible,
    showTooltip,
    hideTooltip,
    toggleTooltip,
  } = useSettingsInputField();

  return (
    <SettingsInputFieldBody>
      <Label>{label}</Label>
      <ContentWrapper>
        {isEditMode ? (
          <InputField
            value={value}
            onChange={handleInputChange}
            autoFocus
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.currentTarget.blur();
              }
            }}
            onBlur={e => {
              // Only toggle back if we're not clicking the edit button itself
              if (
                e.relatedTarget instanceof HTMLElement &&
                e.relatedTarget.closest('button')
              ) {
                return;
              }
              toggleEditMode();
            }}
          />
        ) : (
          <ValueDisplay>{value}</ValueDisplay>
        )}
        <ActionsWrapper>
          <IconButton onClick={toggleEditMode} aria-label="Edit">
            <PencilIcon />
          </IconButton>
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
                <TooltipTitle>{info.title}</TooltipTitle>
                <TooltipDesc>{info.description}</TooltipDesc>
              </Tooltip>
            )}
          </InfoWrapper>
        </ActionsWrapper>
      </ContentWrapper>
    </SettingsInputFieldBody>
  );
};
