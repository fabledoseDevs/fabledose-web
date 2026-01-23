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
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
  max-height: 300px;
  overflow-y: auto;
  padding: 0.5rem;
`;

export const GalleryItem = styled.div<{ isSelected: boolean }>`
  cursor: pointer;
  border-radius: 50%;
  padding: 4px;
  border: 2px solid
    ${({ theme, isSelected }) =>
      isSelected ? theme.palette.byColor.red.light : 'transparent'};
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.palette.byElement.text.white};
  font-family: ${({ theme }) => theme.typography.fonts.default};
  font-size: ${({ theme }) => theme.typography.paragraphs.default.fontSize};
`;

export const Input = styled.input`
  background: ${({ theme }) =>
    theme.palette.byElement.background.extraDarkPurple};
  border: 1px solid
    ${({ theme }) => theme.palette.byElement.background.transparentWhite['20']};
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: ${({ theme }) => theme.palette.byElement.text.white};
  font-family: ${({ theme }) => theme.typography.fonts.default};
  font-size: ${({ theme }) => theme.typography.inputs.default.fontSize};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.palette.byColor.red.light};
  }
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;
