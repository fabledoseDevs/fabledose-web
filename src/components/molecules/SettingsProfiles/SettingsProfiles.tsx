import { useEffect, useId, useState } from 'react';

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
  AvatarField,
  FormField,
  GalleryItem,
  GalleryWrapper,
  Input,
  Label,
  ModalFooter,
  ProfileForm,
  ProfileItem,
  ProfileName,
  ProfileSelect,
  ProfilesList,
  ProfilesTitle,
  RemoveProfileButton,
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
  const nameId = useId();
  const [profiles, setProfiles] = useState<Profile[]>(MOCK_PROFILES);
  const [activeProfileId, setActiveProfileId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProfileName, setNewProfileName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVAILABLE_AVATARS[0]);

  useEffect(() => {
    const match = document.cookie.match(
      new RegExp('(^| )' + ACTIVE_PROFILE_COOKIE + '=([^;]+)'),
    );
    const nextId =
      profiles.find(profile => profile.id === match?.[2])?.id ||
      profiles[0]?.id ||
      null;
    setActiveProfileId(nextId);
    document.cookie = nextId
      ? `${ACTIVE_PROFILE_COOKIE}=${nextId}; path=/; max-age=31536000; SameSite=Lax`
      : `${ACTIVE_PROFILE_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
  }, [profiles]);

  const handleProfileClick = (id: string) => {
    setActiveProfileId(id);
    document.cookie = `${ACTIVE_PROFILE_COOKIE}=${id}; path=/; max-age=31536000; SameSite=Lax`;
  };

  const handleRemoveProfile = (profile: Profile): void => {
    if (!window.confirm(`Usunąć profil „${profile.name}”?`)) return;
    setProfiles(previous => previous.filter(item => item.id !== profile.id));
  };

  const handleAddProfile = () => {
    if (newProfileName.trim()) {
      const newProfile: Profile = {
        id: Math.random().toString(36).substr(2, 9),
        name: newProfileName.trim(),
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
          <ProfileItem key={profile.id}>
            <ProfileSelect
              type="button"
              aria-label={`Wybierz profil: ${profile.name}`}
              aria-pressed={activeProfileId === profile.id}
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
            </ProfileSelect>
            <RemoveProfileButton
              type="button"
              aria-label={`Usuń profil: ${profile.name}`}
              onClick={() => handleRemoveProfile(profile)}
            >
              Usuń profil
            </RemoveProfileButton>
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
        width={520}
      >
        <ProfileForm>
          <FormField>
            <Label htmlFor={nameId}>Imię dziecka</Label>
            <Input
              id={nameId}
              autoComplete="off"
              maxLength={40}
              value={newProfileName}
              onChange={e => setNewProfileName(e.target.value)}
              placeholder="Wpisz imię..."
            />
          </FormField>

          <AvatarField>
            <legend>Wybierz awatar</legend>
            <GalleryWrapper>
              {AVAILABLE_AVATARS.map((avatar, index) => (
                <GalleryItem
                  key={avatar}
                  type="button"
                  aria-label={`Awatar ${index + 1}`}
                  aria-pressed={selectedAvatar === avatar}
                  isSelected={selectedAvatar === avatar}
                  onClick={() => setSelectedAvatar(avatar)}
                >
                  <Avatar
                    imageUrl={avatar}
                    altText="Avatar option"
                    size={AVATAR_SIZE.SMALL}
                  />
                </GalleryItem>
              ))}
            </GalleryWrapper>
          </AvatarField>

          <ModalFooter>
            <Button
              actionType={ACTION_TYPE.FUNCTION_TRIGGER}
              variant={BUTTON_VARIANT.WHITE}
              text="Anuluj"
              payload={() => setIsModalOpen(false)}
              width={{ widthType: WIDTH_TYPE.PERCENT, widthValue: 100 }}
            />
            <Button
              actionType={ACTION_TYPE.FUNCTION_TRIGGER}
              variant={BUTTON_VARIANT.RED}
              text="Dodaj profil"
              payload={handleAddProfile}
              width={{ widthType: WIDTH_TYPE.PERCENT, widthValue: 100 }}
              isDisabled={!newProfileName.trim()}
            />
          </ModalFooter>
        </ProfileForm>
      </ModalWindow>
    </SettingsProfilesWrapper>
  );
};
