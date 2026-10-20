import styled from '@emotion/styled';

import {
  Label as SettingsRadioLabel,
  RadioOptionBox,
} from '@/molecules/SettingsRadio/SettingsRadio.styled';
import {
  Label as SettingsRangeLabel,
  Slider as SettingsRangeSlider,
  ValueDisplay as SettingsRangeValueDisplay,
} from '@/molecules/SettingsRangeField/SettingsRangeField.styled';
import {
  Label as SettingsSwitchLabel,
  StateLabel as SettingsSwitchStateLabel,
  ToggleTrack,
} from '@/molecules/SettingsSwitch/SettingsSwitch.styled';

export const SlideshowBody = styled.section`
  width: 100%;
  height: 100vh;
  height: 100dvh;
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.palette.byColor.purple.extraDark};
  cursor: default;
`;

export const EmblaViewport = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const EmblaContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const EmblaSlide = styled.div`
  position: relative;
  flex: 0 0 100%;
  min-width: 0;
  height: 100%;
`;

export const SlideStub = styled.div`
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle at 50% 55%,
    ${({ theme }) => theme.palette.byColor.purple.regular} 0%,
    ${({ theme }) => theme.palette.byColor.purple.extraDark} 100%
  );
`;

export const TopLeftControls = styled.div`
  position: absolute;
  top: max(16px, env(safe-area-inset-top, 0px));
  left: max(16px, env(safe-area-inset-left, 0px));
  z-index: ${({ theme }) => theme.zIndex.veryTop};
  display: flex;
  gap: 10px;
`;

export const BottomCenterControls = styled.div`
  position: absolute;
  left: 50%;
  bottom: calc(70px + env(safe-area-inset-bottom, 0px));
  @media ${({ theme }) => theme.media.tablet} {
    bottom: max(20px, env(safe-area-inset-bottom, 0px));
  }
  transform: translateX(-50%);
  z-index: ${({ theme }) => theme.zIndex.veryTop};
  display: flex;
  gap: 12px;
`;

export const SlideshowSettingsModalBody = styled.div`
  width: 100%;
  min-width: 0;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  ${SettingsRangeLabel},
  ${SettingsRangeValueDisplay},
  ${SettingsRadioLabel},
  ${SettingsSwitchLabel},
  ${SettingsSwitchStateLabel} {
    color: ${({ theme }) => theme.palette.byElement.text.purple};
  }

  ${SettingsRangeSlider} {
    background: ${({ theme }) => theme.palette.byColor.grey.light};
  }

  ${RadioOptionBox} {
    border-color: ${({ theme }) => theme.palette.byElement.text.purple};
    color: ${({ theme }) => theme.palette.byElement.text.purple};
    background: ${({ theme }) => theme.palette.byElement.background.white};
  }

  ${RadioOptionBox}[data-selected='true'] {
    border-color: ${({ theme }) => theme.palette.byElement.background.purple};
    background: ${({ theme }) => theme.palette.byElement.background.purple};
    color: ${({ theme }) => theme.palette.byElement.text.white};
  }

  ${RadioOptionBox}[data-disabled='true'] {
    opacity: 0.45;
    color: ${({ theme }) => theme.palette.byColor.grey.light};
  }

  ${ToggleTrack} {
    border-color: ${({ theme }) => theme.palette.byElement.text.purple};
  }
`;
