'use client';
import { useId, useState } from 'react';

import Button from '@/atoms/Button';
import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/atoms/Button/Button.types';
import { defaultChildPolicy } from '@/config/childPolicy';
import { useChildProfiles } from '@/contexts/ChildProfilesContext';
import { useDictionary } from '@/lang/DictionaryProvider';
import ModalWindow from '@/molecules/ModalWindow';
import SettingsSwitch from '@/molecules/SettingsSwitch';

import type { ProfileHours as ProfileHoursType } from './ProfileHours.types';
import {
  FormField,
  Input,
  Label,
  ModalFooter,
  ProfileForm,
} from './SettingsProfiles.styled';

export const ProfileHours: ProfileHoursType = ({ profile, onClose }) => {
  const text = useDictionary().childProfiles;
  const { saving, saveSchedule } = useChildProfiles();
  const [draft, setDraft] = useState(profile.policy || defaultChildPolicy());
  const [error, setError] = useState(false);
  const id = useId();
  return (
    <ModalWindow
      isOpen
      onClose={() => {
        if (!saving) onClose();
      }}
      title={`${text.hours}: ${profile.name}`}
      closeLabel={text.close}
      width={600}
    >
      <ProfileForm>
        <SettingsSwitch
          surface="light"
          label={text.scheduleEnabled}
          value={draft.scheduleEnabled}
          onChange={value => setDraft({ ...draft, scheduleEnabled: value })}
          isDisabled={saving}
        />
        {draft.scheduleEnabled && (
          <>
            <FormField>
              <Label htmlFor={`${id}-zone`}>{text.timeZone}</Label>
              <Input
                id={`${id}-zone`}
                value={draft.timeZone}
                onChange={event =>
                  setDraft({ ...draft, timeZone: event.target.value })
                }
                disabled={saving}
              />
            </FormField>
            {(['weekdays', 'weekends'] as const).map(day => (
              <fieldset
                key={day}
                style={{
                  border: '1px solid #c9bfdc',
                  borderRadius: 12,
                  padding: 12,
                  minWidth: 0,
                }}
              >
                <legend>{text[day]}</legend>
                <SettingsSwitch
                  surface="light"
                  label={text.allowedDay}
                  value={draft[day].enabled}
                  onChange={value =>
                    setDraft({
                      ...draft,
                      [day]: { ...draft[day], enabled: value },
                    })
                  }
                  isDisabled={saving}
                />
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
                    gap: 12,
                  }}
                >
                  {(['start', 'end'] as const).map(edge => (
                    <FormField key={edge}>
                      <Label htmlFor={`${id}-${day}-${edge}`}>
                        {text[edge]}
                      </Label>
                      <Input
                        id={`${id}-${day}-${edge}`}
                        type="time"
                        value={draft[day][edge]}
                        disabled={saving || !draft[day].enabled}
                        onChange={event =>
                          setDraft({
                            ...draft,
                            [day]: {
                              ...draft[day],
                              [edge]: event.target.value,
                            },
                          })
                        }
                      />
                    </FormField>
                  ))}
                </div>
              </fieldset>
            ))}
            <small>{text.scheduleHint}</small>
          </>
        )}
        <small>{text.unprotected}</small>
        {error && <p role="alert">{text.policyError}</p>}
        <ModalFooter>
          <Button
            text={text.save}
            actionType={ACTION_TYPE.FUNCTION_TRIGGER}
            variant={BUTTON_VARIANT.RED}
            width={{ widthType: WIDTH_TYPE.PX, widthValue: 160 }}
            isDisabled={saving}
            payload={() => {
              const schedule = {
                scheduleEnabled: draft.scheduleEnabled,
                timeZone: draft.timeZone,
                weekdays: draft.weekdays,
                weekends: draft.weekends,
              };
              void saveSchedule(profile.id, schedule).then(saved => {
                if (saved) onClose();
                else setError(true);
              });
            }}
          />
        </ModalFooter>
      </ProfileForm>
    </ModalWindow>
  );
};
