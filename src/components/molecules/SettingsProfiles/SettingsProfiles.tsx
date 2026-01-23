import { useEffect, useState } from 'react';

import Avatar, { AVATAR_SIZE } from '@/atoms/Avatar';
import Button from '@/atoms/Button';
import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/atoms/Button/Button.types';
import ModalWindow from '@/molecules/ModalWindow';

import {
  AddIconWrapper,
  AddProfileButton,
  FormField,
  GalleryItem,
  GalleryWrapper,
  Input,
  Label,
  ModalFooter,
  ProfileItem,
  ProfileName,
  ProfilesList,
  ProfilesTitle,
  SettingsProfilesWrapper,
} from './SettingsProfiles.styled';
import type {
  Profile,
  SettingsProfiles as SettingsProfilesType,
} from './SettingsProfiles.types';

const MOCK_PROFILES: Profile[] = [
  { id: '1', name: 'Antoś', imageUrl: '/avatars/av1.jpg' },
  { id: '2', name: 'Zuza', imageUrl: '/avatars/av2.jpg' },
];

const AVAILABLE_AVATARS = [
  '/avatars/av1.jpg',
  '/avatars/av2.jpg',
  '/avatars/av3.jpg',
  '/avatars/av4.jpg',
  '/avatars/av5.jpg',
  '/avatars/av6.jpg',
  '/avatars/av7.jpg',
  '/avatars/av8.jpg',
  '/avatars/av9.jpg',
  '/avatars/av10.jpg',
  '/avatars/av11.jpg',
  '/avatars/av12.jpg',
];

const ACTIVE_PROFILE_COOKIE = 'active_profile_id';

export const SettingsProfiles: SettingsProfilesType = () => {
  const [profiles, setProfiles] = useState<Profile[]>(MOCK_PROFILES);
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVAILABLE_AVATARS[0]);

  useEffect(() => {
    const match = document.cookie.match(
      new RegExp('(^| )' + ACTIVE_PROFILE_COOKIE + '=([^;]+)'),
    );
    if (match) {
      setActiveProfileId(match[2]);
    } else if (profiles.length > 0) {
      setActiveProfileId(profiles[0].id);
    }
  }, [profiles]);

  const handleProfileClick = (id: string) => {
    setActiveProfileId(id);
    document.cookie = `${ACTIVE_PROFILE_COOKIE}=${id}; path=/; max-age=31536000; SameSite=Lax`;
  };

  const handleAddProfile = () => {
    if (newProfileName.trim()) {
      const newProfile: Profile = {
        id: Math.random().toString(36).substr(2, 9),
        name: newProfileName,
        imageUrl: selectedAvatar,
      };
      setProfiles(prev => [...prev, newProfile]);
      setIsModalOpen(false);
      setNewProfileName('');
    }
  };

  return (
    <SettingsProfilesWrapper>
      <ProfilesTitle>Profile dzieci:</ProfilesTitle>
      <ProfilesList>
        {profiles.map(profile => (
          <ProfileItem
            key={profile.id}
            onClick={() => handleProfileClick(profile.id)}
          >
            <Avatar
              imageUrl={profile.imageUrl}
              altText={profile.name}
              isActive={activeProfileId === profile.id}
            />
            <ProfileName isActive={activeProfileId === profile.id}>
              {profile.name}
            </ProfileName>
          </ProfileItem>
        ))}
        <AddProfileButton onClick={() => setIsModalOpen(true)}>
          <AddIconWrapper>+</AddIconWrapper>
          <ProfileName>...</ProfileName>
        </AddProfileButton>
      </ProfilesList>

      <ModalWindow
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Stwórz nowy profil"
      >
        <FormField>
          <Label>Imię</Label>
          <Input
            value={newProfileName}
            onChange={e => setNewProfileName(e.target.value)}
            placeholder="Wpisz imię..."
          />
        </FormField>

        <Label>Wybierz awatar</Label>
        <GalleryWrapper>
          {AVAILABLE_AVATARS.map(avatar => (
            <GalleryItem
              key={avatar}
              isSelected={selectedAvatar === avatar}
              onClick={() => setSelectedAvatar(avatar)}
            >
              <Avatar
                imageUrl={avatar}
                altText="Avatar option"
                size={AVATAR_SIZE.LARGE}
              />
            </GalleryItem>
          ))}
        </GalleryWrapper>

        <ModalFooter>
          <Button
            actionType={ACTION_TYPE.FUNCTION_TRIGGER}
            variant={BUTTON_VARIANT.TRANSPARENT}
            text="Anuluj"
            payload={() => setIsModalOpen(false)}
            width={{ widthType: WIDTH_TYPE.AUTO }}
          />
          <Button
            actionType={ACTION_TYPE.FUNCTION_TRIGGER}
            variant={BUTTON_VARIANT.RED}
            text="Dodaj profil"
            payload={handleAddProfile}
            width={{ widthType: WIDTH_TYPE.AUTO }}
            isDisabled={!newProfileName.trim()}
          />
        </ModalFooter>
      </ModalWindow>
    </SettingsProfilesWrapper>
  );
};
