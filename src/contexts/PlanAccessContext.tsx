'use client';
import { useParams, useRouter } from 'next/navigation';
import {
  type ReactElement,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import Button from '@/atoms/Button';
import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/atoms/Button/Button.types';
import Paragraph from '@/atoms/Paragraph';
import {
  FOREGROUND_COLOR,
  TEXT_ALIGNMENT,
} from '@/atoms/Paragraph/Paragraph.types';
import { getPlanEntitlements } from '@/config/plans';
import type { PlanFeature } from '@/config/plans.types';
import { useDictionary } from '@/lang/DictionaryProvider';
import ModalWindow from '@/molecules/ModalWindow';

import type {
  PlanAccessContextValue,
  PlanAccessProviderProps,
} from './PlanAccessContext.types';
import { useSettings } from './SettingsContext';

const Context = createContext<PlanAccessContextValue | null>(null);
export const PlanAccessProvider = ({
  children,
}: PlanAccessProviderProps): ReactElement => {
  const { lang } = useParams<{ lang: string }>();
  const router = useRouter();
  const text = useDictionary().planAccess;
  const { settings } = useSettings();
  const [feature, setFeature] = useState<PlanFeature | 'ebookPending' | null>(
    null,
  );
  useEffect(() => {
    const access = getPlanEntitlements(settings?.plan);
    if (
      (feature === 'profiles' && access.childProfileLimit === null) ||
      ((feature === 'ebooks' ||
        feature === 'parental' ||
        feature === 'story') &&
        access.ebooks) ||
      (feature === 'ebookPending' && !access.ebooks)
    )
      setFeature(null);
  }, [settings?.plan, feature]);
  const close = () => setFeature(null);
  return (
    <Context.Provider
      value={{
        requestUpgrade: setFeature,
        showEbookUnavailable: () => setFeature('ebookPending'),
      }}
    >
      {children}
      <ModalWindow
        isOpen={Boolean(feature)}
        onClose={close}
        title={feature === 'ebookPending' ? text.ebookPendingTitle : text.title}
        closeLabel={text.close}
        width={560}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
          }}
        >
          <Paragraph
            color={FOREGROUND_COLOR.PURPLE}
            alignment={TEXT_ALIGNMENT.CENTER}
          >
            {feature ? text[feature] : ''}
          </Paragraph>
          {feature !== 'ebookPending' && (
            <Button
              text={text.allPlans}
              variant={BUTTON_VARIANT.RED}
              actionType={ACTION_TYPE.FUNCTION_TRIGGER}
              payload={() => {
                close();
                router.push(`/${lang === 'pl' ? 'pl' : 'en'}/plan`);
              }}
              width={{ widthType: WIDTH_TYPE.PX, widthValue: 240 }}
            />
          )}
        </div>
      </ModalWindow>
    </Context.Provider>
  );
};
export const usePlanAccess = (): PlanAccessContextValue => {
  const context = useContext(Context);
  if (!context) throw new Error('PlanAccessProvider is required');
  return context;
};
