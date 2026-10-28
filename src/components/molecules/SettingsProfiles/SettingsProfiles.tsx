'use client';
import { useEffect, useId, useState } from 'react';

import Avatar, { AVATAR_SIZE } from '@/atoms/Avatar';
import Button from '@/atoms/Button';
import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/atoms/Button/Button.types';
import { PROFILE_AGES, PROFILE_AVATARS } from '@/config/childProfiles';
import type {
  ChildProfile,
  ChildProfileDraft,
} from '@/config/childProfiles.types';
import { useChildProfiles } from '@/contexts/ChildProfilesContext';
import { useDictionary } from '@/lang/DictionaryProvider';
import ModalWindow from '@/molecules/ModalWindow';

import { ProfileHours } from './ProfileHours';
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
import type { SettingsProfiles as SettingsProfilesType } from './SettingsProfiles.types';

const emptyDraft = (): ChildProfileDraft => ({
  name: '',
  imageUrl: PROFILE_AVATARS[0],
  ageGroup: '',
});
const buttonWidth = { widthType: WIDTH_TYPE.PX, widthValue: 160 };

export const SettingsProfiles: SettingsProfilesType = ({
  selectionOnly = false,
  onSelect,
}) => {
  const text = useDictionary().childProfiles;
  const {
    profiles,
    userId,
    activeProfileId,
    loading,
    saving,
    error,
    retry,
    selectProfile,
    saveProfile,
    removeProfile,
  } = useChildProfiles();
  const nameId = useId();
  const ageId = useId();
  const [editor, setEditor] = useState<{
    id?: string;
    draft: ChildProfileDraft;
  } | null>(null);
  const [hours, setHours] = useState<ChildProfile | null>(null);
  const [removing, setRemoving] = useState<ChildProfile | null>(null);
  useEffect(() => {
    setEditor(null);
    setHours(null);
    setRemoving(null);
  }, [userId]);
  const choose = (id: string | null) => {
    selectProfile(id);
    onSelect?.();
  };
  const closeEditor = () => {
    if (!saving) setEditor(null);
  };
  if (loading) return <p role="status">{text.loading}</p>;
  if (!userId) return <p>{text.signIn}</p>;
  return (
    <SettingsProfilesWrapper>
      <ProfilesTitle>{text.title}</ProfilesTitle>
      {error && (
        <div role="alert">
          {text.error}{' '}
          <button type="button" onClick={retry} disabled={saving}>
            {text.retry}
          </button>
        </div>
      )}
      {!selectionOnly && <p>{text.legacy}</p>}
      {!profiles.length && !selectionOnly && <p>{text.empty}</p>}
      <ProfilesList>
        <ProfileItem>
          <ProfileSelect
            type="button"
            aria-pressed={activeProfileId === null}
            onClick={() => choose(null)}
            disabled={saving}
          >
            <AddIconWrapper aria-hidden="true">P</AddIconWrapper>
            <ProfileName isActive={activeProfileId === null}>
              {text.parent}
            </ProfileName>
          </ProfileSelect>
        </ProfileItem>
        {profiles.map(profile => (
          <ProfileItem key={profile.id}>
            <ProfileSelect
              type="button"
              aria-label={`${text.pick}: ${profile.name}`}
              aria-pressed={activeProfileId === profile.id}
              disabled={saving || profile.deleting}
              onClick={() => choose(profile.id)}
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
            {!selectionOnly && (
              <>
                {!profile.deleting && (
                  <RemoveProfileButton
                    type="button"
                    disabled={saving}
                    onClick={() =>
                      setEditor({
                        id: profile.id,
                        draft: {
                          name: profile.name,
                          imageUrl: profile.imageUrl,
                          ageGroup: profile.ageGroup,
                        },
                      })
                    }
                  >
                    {text.edit}
                  </RemoveProfileButton>
                )}
                {!profile.deleting && (
                  <RemoveProfileButton
                    type="button"
                    disabled={saving}
                    onClick={() => setHours(profile)}
                  >
                    {text.hours}
                  </RemoveProfileButton>
                )}
                <RemoveProfileButton
                  type="button"
                  disabled={saving}
                  onClick={() => setRemoving(profile)}
                >
                  {profile.deleting ? text.deleting : text.remove}
                </RemoveProfileButton>
              </>
            )}
          </ProfileItem>
        ))}
        {!selectionOnly && (
          <AddProfileButton
            type="button"
            disabled={saving}
            onClick={() => setEditor({ draft: emptyDraft() })}
            aria-label={text.add}
          >
            <AddIconWrapper aria-hidden="true">+</AddIconWrapper>
            <ProfileName>{text.add}</ProfileName>
          </AddProfileButton>
        )}
      </ProfilesList>
      {hours && (
        <ProfileHours
          key={hours.id}
          profile={hours}
          onClose={() => setHours(null)}
        />
      )}
      {saving && <p role="status">{text.saving}</p>}
      <ModalWindow
        isOpen={Boolean(editor)}
        onClose={closeEditor}
        title={editor?.id ? text.editTitle : text.createTitle}
        closeLabel={text.close}
        width={520}
      >
        {editor && (
          <ProfileForm>
            {error && <p role="alert">{text.error}</p>}
            <FormField>
              <Label htmlFor={nameId}>{text.name}</Label>
              <Input
                id={nameId}
                autoComplete="off"
                maxLength={40}
                value={editor.draft.name}
                disabled={saving}
                placeholder={text.placeholder}
                onChange={event =>
                  setEditor({
                    ...editor,
                    draft: { ...editor.draft, name: event.target.value },
                  })
                }
              />
            </FormField>
            <FormField>
              <Label htmlFor={ageId}>{text.age}</Label>
              <select
                id={ageId}
                disabled={saving}
                value={editor.draft.ageGroup}
                onChange={event =>
                  setEditor({
                    ...editor,
                    draft: {
                      ...editor.draft,
                      ageGroup: event.target.value as ChildProfile['ageGroup'],
                    },
                  })
                }
              >
                {PROFILE_AGES.map(age => (
                  <option key={age} value={age}>
                    {age || text.unspecified}
                  </option>
                ))}
              </select>
            </FormField>
            <AvatarField>
              <legend>{text.avatar}</legend>
              <GalleryWrapper>
                {PROFILE_AVATARS.map((avatar, index) => (
                  <GalleryItem
                    key={avatar}
                    type="button"
                    aria-label={`${text.avatar} ${index + 1}`}
                    disabled={saving}
                    aria-pressed={editor.draft.imageUrl === avatar}
                    isSelected={editor.draft.imageUrl === avatar}
                    onClick={() =>
                      setEditor({
                        ...editor,
                        draft: { ...editor.draft, imageUrl: avatar },
                      })
                    }
                  >
                    <Avatar
                      imageUrl={avatar}
                      altText=""
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
                text={text.cancel}
                payload={closeEditor}
                isDisabled={saving}
                width={buttonWidth}
              />
              <Button
                actionType={ACTION_TYPE.FUNCTION_TRIGGER}
                variant={BUTTON_VARIANT.RED}
                text={saving ? text.saving : text.save}
                payload={() => {
                  void saveProfile(editor.draft, editor.id).then(saved => {
                    if (saved) setEditor(null);
                  });
                }}
                isDisabled={saving || !editor.draft.name.trim()}
                width={buttonWidth}
              />
            </ModalFooter>
          </ProfileForm>
        )}
      </ModalWindow>
      <ModalWindow
        isOpen={Boolean(removing)}
        onClose={() => {
          if (!saving) setRemoving(null);
        }}
        title={text.confirmTitle}
        closeLabel={text.close}
        width={520}
      >
        <p>
          <strong>{removing?.name}</strong>
        </p>
        <p>{text.confirmBody}</p>
        {error && <p role="alert">{text.error}</p>}
        <ModalFooter>
          <Button
            actionType={ACTION_TYPE.FUNCTION_TRIGGER}
            variant={BUTTON_VARIANT.WHITE}
            text={text.cancel}
            payload={() => setRemoving(null)}
            isDisabled={saving}
            width={buttonWidth}
          />
          <Button
            actionType={ACTION_TYPE.FUNCTION_TRIGGER}
            variant={BUTTON_VARIANT.RED}
            text={saving ? text.saving : text.remove}
            payload={() => {
              if (removing)
                void removeProfile(removing.id).then(saved => {
                  if (saved) setRemoving(null);
                });
            }}
            isDisabled={saving}
            width={buttonWidth}
          />
        </ModalFooter>
      </ModalWindow>
    </SettingsProfilesWrapper>
  );
};
