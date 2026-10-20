import styled from '@emotion/styled';

export const SettingsProfilesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem 0;
`;

export const ProfilesTitle = styled.h3`
  color: ${({ theme }) => theme.palette.byElement.text.white};
  font-family: ${({ theme }) => theme.typography.fonts.default};
  font-size: ${({ theme }) => theme.typography.paragraphs.default.fontSize};
  margin: 0;
  min-width: 200px;
`;

export const ProfilesList = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  flex-wrap: wrap;
`;

export const ProfileItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  width: 100px;
`;

export const ProfileSelect = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
  border-radius: 12px;
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.palette.byColor.purple.pale};
    outline-offset: 4px;
  }
`;

export const RemoveProfileButton = styled.button`
  min-height: 44px;
  width: 100%;
  border: 0;
  border-radius: 10px;
  padding: 8px 4px;
  background: transparent;
  color: ${({ theme }) => theme.palette.byColor.red.light};
  font: inherit;
  font-size: 14px;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) =>
      theme.palette.byElement.background.transparentWhite['10']};
  }
  &:focus-visible {
    outline: 2px solid currentColor;
    outline-offset: 2px;
  }
`;

export const ProfileName = styled.span<{ isActive?: boolean }>`
  color: ${({ theme, isActive }) =>
    isActive
      ? theme.palette.byElement.text.white
      : theme.palette.byElement.text.ecru};
  font-family: ${({ theme }) => theme.typography.fonts.default};
  font-size: ${({ theme }) => theme.typography.paragraphs.default.fontSize};
  font-weight: ${({ theme, isActive }) =>
    isActive
      ? theme.typography.fontWeights.semibold
      : theme.typography.fontWeights.regular};
  text-align: center;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const AddProfileButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  width: 100px;
`;

export const AddIconWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid
    ${({ theme }) => theme.palette.byElement.background.transparentWhite['30']};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: ${({ theme }) => theme.palette.byElement.text.white};
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${({ theme }) => theme.palette.byColor.white.full};
    transform: scale(1.05);
  }
`;

export const GalleryWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  margin: 0;
  padding: 4px;
  @media (min-width: 480px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
`;

export const GalleryItem = styled.button<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  aspect-ratio: 1;
  min-width: 44px;
  padding: 3px;
  border-radius: 50%;
  cursor: pointer;
  background: ${({ theme, isSelected }) =>
    isSelected
      ? theme.palette.byColor.purple.pale
      : theme.palette.byColor.purple.pale + '33'};
  border: 2px solid
    ${({ theme, isSelected }) =>
      isSelected ? theme.palette.byColor.purple.regular : 'transparent'};
  transition: border-color 0.2s ease, background-color 0.2s ease;
  > div {
    width: 100%;
    height: 100%;
    border: 0;
  }
  &:focus-visible {
    outline: 3px solid ${({ theme }) => theme.palette.byColor.red.regular};
    outline-offset: 2px;
  }
  &:hover {
    border-color: ${({ theme }) => theme.palette.byColor.purple.regular};
  }
`;

export const ProfileForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  min-width: 0;
`;

export const AvatarField = styled.fieldset`
  border: 0;
  padding: 0;
  margin: 0;
  min-width: 0;
  legend {
    padding: 0;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: 600;
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.palette.byElement.text.purple};
  font-family: ${({ theme }) => theme.typography.fonts.default};
  font-size: 16px;
  font-weight: 600;
`;

export const Input = styled.input`
  width: 100%;
  min-width: 0;
  min-height: 48px;
  padding: 12px 16px;
  border: 1px solid ${({ theme }) => theme.palette.byColor.purple.pale};
  border-radius: 12px;
  background: ${({ theme }) => theme.palette.byElement.highlights.palePurple};
  color: ${({ theme }) => theme.palette.byElement.text.purple};
  font-family: ${({ theme }) => theme.typography.fonts.default};
  font-size: 16px;
  &::placeholder {
    color: ${({ theme }) => theme.palette.byColor.purple.regular};
    opacity: 0.55;
  }
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.palette.byColor.purple.regular};
    outline-offset: 2px;
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 12px;
  > div {
    flex: 1 1 120px;
  }
  button {
    min-height: 44px;
  }
`;
