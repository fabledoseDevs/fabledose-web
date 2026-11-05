'use client';

import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import {
  type FormEvent,
  type ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';

import Button from '@/atoms/Button';
import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/atoms/Button/Button.types';
import InputField from '@/atoms/InputField';
import { INPUT_TYPE } from '@/atoms/InputField/InputField.types';
import LandingPage from '@/components/templates/LandingPage';
import Maintenance from '@/components/templates/Maintenance';
import { auth } from '@/config/firebase';
import { useDictionary } from '@/lang/DictionaryProvider';
import ModalWindow from '@/molecules/ModalWindow';

const Home = (): ReactElement => {
  const router = useRouter();
  const { maintenance, common } = useDictionary();
  const [showMaintenance, setShowMaintenance] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  const closeDialog = useCallback(() => {
    setDialogOpen(false);
    setPassword('');
    setFailed(false);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    void fetch('/api/maintenance-access', {
      cache: 'no-store',
      signal: controller.signal,
    })
      .then(response => (response.ok ? response.json() : null))
      .then(data => {
        if (data?.unlocked && !controller.signal.aborted)
          setShowMaintenance(false);
      })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  useEffect(() => onAuthStateChanged(auth, user => setIsLoggedIn(!!user)), []);
  useEffect(() => {
    if (isLoggedIn) router.replace('/library');
  }, [isLoggedIn, router]);

  const unlock = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;
    setPending(true);
    setFailed(false);
    try {
      const response = await fetch('/api/maintenance-access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
        cache: 'no-store',
      });
      const data = await response.json();
      if (!response.ok || data.unlocked !== true)
        throw new Error('Not unlocked');
      setShowMaintenance(false);
      closeDialog();
    } catch {
      setFailed(true);
    } finally {
      setPending(false);
    }
  };

  return (
    <>
      {showMaintenance ? <Maintenance /> : <LandingPage />}
      {showMaintenance && (
        <button
          type="button"
          aria-label={maintenance.accessTitle}
          style={{
            position: 'fixed',
            bottom: '10px',
            left: '10px',
            width: '20px',
            height: '20px',
            cursor: 'pointer',
            opacity: '0.1',
            zIndex: 9999,
            border: 0,
            background: 'transparent',
          }}
          onClick={() => setDialogOpen(true)}
        />
      )}
      <ModalWindow
        isOpen={dialogOpen}
        onClose={closeDialog}
        title={maintenance.accessTitle}
        closeLabel={common.cancel}
        width={440}
      >
        <form
          onSubmit={event => void unlock(event)}
          style={{ display: 'flex', flexDirection: 'column', gap: 24 }}
        >
          <label>
            {maintenance.accessPassword}
            <InputField
              name="preview-password"
              type={INPUT_TYPE.PASSWORD}
              value={password}
              onChange={event => setPassword(event.target.value)}
              errorMessage={failed ? maintenance.accessError : undefined}
            />
          </label>
          <Button
            actionType={ACTION_TYPE.SUBMIT}
            variant={BUTTON_VARIANT.RED}
            text={maintenance.accessSubmit}
            isDisabled={pending || !password}
            width={{ widthType: WIDTH_TYPE.AUTO }}
          />
        </form>
      </ModalWindow>
    </>
  );
};

export default Home;
