import styled from '@emotion/styled';

export const SettingsRangeFieldBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 98%;
  padding: 16px 0;

  @media ${({ theme }) => theme.media.tablet} {
    flex-direction: row;
    align-items: center;
  }
`;

export const Label = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.default};
  font-size: ${({ theme }) => theme.typography.paragraphs.default.fontSize};
  color: ${({ theme }) => theme.palette.byElement.text.white};
  margin-bottom: 8px;
  min-width: 200px;

  @media ${({ theme }) => theme.media.tablet} {
    margin-bottom: 0;
    margin-right: 24px;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  width: 100%;
`;

export const RangeWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 16px;
`;

export const Slider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 2px;
  background: ${({ theme }) =>
    theme.palette.byElement.background.transparentWhite['30']};
  outline: none;
  border-radius: 2px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: #c4c4c4;
    cursor: pointer;
    border-radius: 50%;
  }

  &::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: #c4c4c4;
    cursor: pointer;
    border-radius: 50%;
    border: none;
  }
`;

export const ValueDisplay = styled.div`
  font-family: ${({ theme }) => theme.typography.fonts.default};
  font-size: ${({ theme }) => theme.typography.paragraphs.default.fontSize};
  color: ${({ theme }) => theme.palette.byElement.text.white};
  min-width: 40px;
  text-align: right;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 16px;
`;
