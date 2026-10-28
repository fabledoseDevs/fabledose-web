'use client';
import styled from '@emotion/styled';
import { useState } from 'react';

import Avatar, { AVATAR_SIZE } from '@/atoms/Avatar';
import { useChildProfiles } from '@/contexts/ChildProfilesContext';
import { useSettings } from '@/contexts/SettingsContext';
import { useDictionary } from '@/lang/DictionaryProvider';
import ModalWindow from '@/molecules/ModalWindow';

import type { ProfilePicker as ProfilePickerType } from './ProfilePicker.types';
import { SettingsProfiles } from './SettingsProfiles';

const PickerContent = styled.div`
  h3,
  span,
  p {
    color: #291d4d;
  }
  button > div {
    color: #291d4d;
    border-color: #8e7db0;
  }
`;

const Trigger = styled.button`
  position: absolute;
  bottom: calc(100% + 12px);
  right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: 2px solid #a79ac8;
  border-radius: 50%;
  background: #291d4d;
  color: white;
  font: inherit;
  font-size: 20px;
  font-weight: 600;
  line-height: 1;
  overflow: hidden;
  > div {
    width: 100%;
    height: 100%;
    border: 0;
    cursor: inherit;
  }
  cursor: pointer;
  &:focus-visible {
    outline: 2px solid white;
    outline-offset: 3px;
  }
  @media (min-width: 768px) {
    top: 76px;
    bottom: auto;
    left: 13px;
    right: auto;
  }
`;

export const ProfilePicker: ProfilePickerType = () => {
  const text = useDictionary().childProfiles;
  const { settings } = useSettings();
  const { profiles, userId, activeProfileId, loading } = useChildProfiles();
  const [open, setOpen] = useState(false);
  if (!userId || loading) return null;
  const profile = profiles.find(item => item.id === activeProfileId);
  const label = profile?.name || settings?.displayName?.trim() || text.parent;
  const initial = Array.from(label.trim())[0]?.toLocaleUpperCase() || '?';
  return (
    <>
      <Trigger
        type="button"
        aria-label={`${text.pick}: ${label}`}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        {profile?.imageUrl ? (
          <Avatar
            imageUrl={profile.imageUrl}
            altText=""
            size={AVATAR_SIZE.SMALL}
          />
        ) : (
          <span aria-hidden="true">{initial}</span>
        )}
      </Trigger>
      <ModalWindow
        isOpen={open}
        onClose={() => setOpen(false)}
        title={text.pick}
        closeLabel={text.close}
        width={520}
      >
        <PickerContent>
          <SettingsProfiles selectionOnly onSelect={() => setOpen(false)} />
        </PickerContent>
      </ModalWindow>
    </>
  );
};
