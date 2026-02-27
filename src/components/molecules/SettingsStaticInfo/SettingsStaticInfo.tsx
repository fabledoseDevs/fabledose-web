import InfoTooltip from '@/atoms/InfoTooltip';

import useSettingsStaticInfo from './SettingsStaticInfo.hook';
import {
  ActionsWrapper,
  ContentWrapper,
  InfoWrapper,
  Label,
  SettingsStaticInfoBody,
  StatusLabel,
} from './SettingsStaticInfo.styled';
import type { SettingsStaticInfo as SettingsStaticInfoType } from './SettingsStaticInfo.types';

export const SettingsStaticInfo: SettingsStaticInfoType = ({ label, info }) => {
  const { status } = useSettingsStaticInfo();

  return (
    <SettingsStaticInfoBody>
      <Label>{label}</Label>
      <ContentWrapper>
        <InfoWrapper>
          <StatusLabel>{status}</StatusLabel>
        </InfoWrapper>
        <ActionsWrapper>
          <InfoTooltip content={info} />
        </ActionsWrapper>
      </ContentWrapper>
    </SettingsStaticInfoBody>
  );
};
