import { useParams, usePathname, useRouter } from 'next/navigation';

import {
  FOREGROUND_COLOR,
  HEADLINE_TYPE,
} from '@/atoms/Headline/Headline.types';
import Separator from '@/atoms/Separator';
import { SEPARATOR_COLOR } from '@/atoms/Separator/Separator.types';
import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/components/atoms/Button/Button.types';
import SettingsButton from '@/components/molecules/SettingsButton';
import SettingsDropdown from '@/components/molecules/SettingsDropdown';
import SettingsInputField from '@/components/molecules/SettingsInputField';
import { FIELD_VARIANT } from '@/components/molecules/SettingsInputField/SettingsInputField.types';
import { useDictionary } from '@/lang/DictionaryProvider';
import { handleLanguageChange } from '@/lang/lang.helpers';

import { Headline } from '../../atoms/Headline/Headline';
import { useSettingsPage } from './SettingsPage.hook';
import {
  Content,
  SettingsContentColumn,
  SettingsMenuColumn,
  SettingsPageBody,
  TabButton,
} from './SettingsPage.styled';
import type { SettingsPage as SettingsPageType } from './SettingsPage.types';
import { SETTINGS_TAB } from './SettingsPage.types';

export const SettingsPage: SettingsPageType = () => {
  const { settingsPage } = useDictionary();
  const { activeTab, setActiveTab } = useSettingsPage();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const currentLang = (params?.lang as string) || 'en';

  const getDisplayLanguage = (lang: string) => {
    switch (lang) {
      case 'pl':
        return 'Polski';
      case 'en':
        return 'English';
      default:
        return 'Language';
    }
  };

  const tabs = Object.values(SETTINGS_TAB);

  const renderTabContent = () => {
    switch (activeTab) {
      case SETTINGS_TAB.PROFILE_N_ACCOUNT:
        return (
          <>
            <SettingsInputField
              label={settingsPage.profile_n_account.displayName.label}
              info={{
                title: settingsPage.profile_n_account.displayName.infoTitle,
                description:
                  settingsPage.profile_n_account.displayName.infoDescription,
              }}
            />
            <SettingsInputField
              label={settingsPage.profile_n_account.email.label}
              variant={FIELD_VARIANT.EMAIL}
              info={{
                title: settingsPage.profile_n_account.email.infoTitle,
                description:
                  settingsPage.profile_n_account.email.infoDescription,
              }}
            />
            <SettingsInputField
              label={settingsPage.profile_n_account.password.label}
              variant={FIELD_VARIANT.PASSWORD}
              info={{
                title: settingsPage.profile_n_account.password.infoTitle,
                description:
                  settingsPage.profile_n_account.password.infoDescription,
              }}
            />
            <SettingsButton
              label={settingsPage.profile_n_account.plan.label}
              info={{
                title: settingsPage.profile_n_account.plan.infoTitle,
                description:
                  settingsPage.profile_n_account.plan.infoDescription,
              }}
              customButtonText={settingsPage.profile_n_account.plan.tier0}
              customButtonRightText="0 PLN/mc"
            />
            <SettingsInputField
              label={settingsPage.profile_n_account.creditCard.label}
              variant={FIELD_VARIANT.CREDIT_CARD}
              info={{
                title: settingsPage.profile_n_account.creditCard.infoTitle,
                description:
                  settingsPage.profile_n_account.creditCard.infoDescription,
              }}
            />
            <SettingsDropdown
              label={settingsPage.profile_n_account.language.label}
              options={['Polski', 'English']}
              defaultValue={getDisplayLanguage(currentLang)}
              info={{
                title: settingsPage.profile_n_account.language.infoTitle,
                description:
                  settingsPage.profile_n_account.language.infoDescription,
              }}
              onChange={selectedOption =>
                handleLanguageChange(
                  selectedOption,
                  currentLang,
                  pathname,
                  router,
                )
              }
            />
            <SettingsButton
              label={settingsPage.profile_n_account.deleteAccount.label}
              info={{
                title: settingsPage.profile_n_account.deleteAccount.infoTitle,
                description:
                  settingsPage.profile_n_account.deleteAccount.infoDescription,
              }}
              buttonProps={{
                variant: BUTTON_VARIANT.RED,
                text: settingsPage.profile_n_account.deleteAccount.buttonText,
                width: { widthType: WIDTH_TYPE.PERCENT, widthValue: 100 },
                actionType: ACTION_TYPE.FUNCTION_TRIGGER,
                payload: () => console.info('Boo!'),
              }}
            />
          </>
        );
      case SETTINGS_TAB.PARENTAL_CONTROL:
        return <p>2</p>;
      case SETTINGS_TAB.DISPLAY_N_AUDIO:
        return <p>3</p>;
      case SETTINGS_TAB.NOTIFICATIONS:
        return <p>4</p>;
      case SETTINGS_TAB.PRIVACY_N_DATA:
        return <p>5</p>;
      case SETTINGS_TAB.SUPPORT_N_FEEDBACK:
        return <p>6</p>;
      case SETTINGS_TAB.INFO:
        return <p>7</p>;
      default:
        return null;
    }
  };

  return (
    <SettingsPageBody>
      <SettingsMenuColumn>
        {tabs.map(tab => (
          <TabButton
            key={tab}
            isActive={activeTab === tab}
            onClick={() => setActiveTab(tab)}
          >
            {settingsPage.tabs[tab]}
          </TabButton>
        ))}
      </SettingsMenuColumn>
      <SettingsContentColumn>
        <Headline weight={HEADLINE_TYPE.BIG} color={FOREGROUND_COLOR.WHITE}>
          {settingsPage.title}
        </Headline>
        <Headline weight={HEADLINE_TYPE.SMALL} color={FOREGROUND_COLOR.WHITE}>
          {settingsPage.tabs[activeTab]}
        </Headline>
        <Separator color={SEPARATOR_COLOR.WHITE} margin={false} />
        <Content>{renderTabContent()}</Content>
      </SettingsContentColumn>
    </SettingsPageBody>
  );
};
