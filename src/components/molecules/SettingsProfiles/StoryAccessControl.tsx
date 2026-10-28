'use client';
import styled from '@emotion/styled';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useEffect, useRef } from 'react';

import { useChildProfiles } from '@/contexts/ChildProfilesContext';
import { useDictionary } from '@/lang/DictionaryProvider';
import SettingsSwitch from '@/molecules/SettingsSwitch';

import type { StoryAccessControl as StoryAccessControlType } from './StoryAccessControl.types';

const Menu = styled.details`
  position: fixed;
  top: 24px;
  right: 90px;
  z-index: 11;
  > summary {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 54px;
    height: 54px;
    border: 2px solid #8e7db0;
    border-radius: 50%;
    color: white;
    background: #291d4d;
    cursor: pointer;
    list-style: none;
  }
  > summary::-webkit-details-marker {
    display: none;
  }
  > summary:focus-visible {
    outline: 2px solid white;
    outline-offset: 3px;
  }
  section {
    position: absolute;
    top: 66px;
    right: -66px;
    width: min(360px, calc(100vw - 32px));
    max-height: min(65dvh, 560px);
    overflow-y: auto;
    padding: 20px;
    border-radius: 18px;
    background: white;
    color: #291d4d;
    box-shadow: 0 12px 40px #0005;
  }
  section h3 {
    margin: 0 0 12px;
  }
  section > div {
    width: 100%;
    flex-direction: row;
    align-items: center;
    gap: 12px;
  }
  section > div > div {
    color: #291d4d;
    min-width: 0;
    margin: 0;
  }
  section small {
    display: block;
    margin-top: 12px;
  }
`;

export const StoryAccessControl: StoryAccessControlType = ({ storyId }) => {
  const text = useDictionary().childProfiles;
  const {
    profiles,
    activeProfileId,
    userId,
    loading,
    saving,
    error,
    setStoryAvailable,
  } = useChildProfiles();
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const dismiss = (event: PointerEvent) => {
      if (
        ref.current &&
        event.target instanceof Node &&
        !ref.current.contains(event.target)
      )
        ref.current.open = false;
    };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, []);
  if (!userId || activeProfileId || loading) return null;
  return (
    <Menu
      ref={ref}
      onKeyDown={event => {
        if (event.key === 'Escape' && ref.current) {
          ref.current.open = false;
          ref.current.querySelector('summary')?.focus();
        }
      }}
    >
      <summary aria-label={text.availability}>
        <ChevronDownIcon width={24} height={24} aria-hidden="true" />
      </summary>
      <section aria-label={text.availability}>
        <h3>{text.availability}</h3>
        {profiles
          .filter(item => !item.deleting)
          .map(profile => (
            <SettingsSwitch
              surface="light"
              key={profile.id}
              label={profile.name}
              value={!profile.policy?.excludedStories.includes(storyId)}
              isDisabled={saving}
              useStatusColors
              stateLabels={{ enabled: text.available, disabled: text.excluded }}
              onChange={available => {
                void setStoryAvailable(profile.id, storyId, available);
              }}
            />
          ))}
        {!profiles.some(item => !item.deleting) && <p>{text.empty}</p>}
        {error && <p role="alert">{text.policyError}</p>}
        <small>{text.unprotected}</small>
      </section>
    </Menu>
  );
};
