import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/atoms/Button/Button.types';
import {
  FOREGROUND_COLOR,
  HEADLINE_TYPE,
} from '@/atoms/Headline/Headline.types';
import Separator from '@/atoms/Separator';
import { SEPARATOR_COLOR } from '@/atoms/Separator/Separator.types';
import { useDictionary } from '@/lang/DictionaryProvider';
import ModalWindow from '@/molecules/ModalWindow';
import SettingsButton from '@/molecules/SettingsButton';
import SettingsDropdown from '@/molecules/SettingsDropdown';
import SettingsInputField from '@/molecules/SettingsInputField';
import { FIELD_VARIANT } from '@/molecules/SettingsInputField/SettingsInputField.types';
import SettingsRadio from '@/molecules/SettingsRadio';
import SettingsRangeField from '@/molecules/SettingsRangeField';
import SettingsSwitch from '@/molecules/SettingsSwitch';
import PlanSelector from '@/organisms/PlanSelector';

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
  const { activeTab, setActiveTab, isModalOpen, openModal, closeModal } =
    useSettingsPage();

  const tabs = Object.values(SETTINGS_TAB);

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
        <Content>
          <SettingsInputField
            label={'Nazwa wyświetlana:'}
            info={{
              title: 'Nazwa wyświetlana',
              description: 'Jak powinniśmy się do Ciebie zwracać?',
            }}
            variant={FIELD_VARIANT.TEXT}
          />
          <SettingsInputField
            label={'Hasło:'}
            info={{
              title: 'Hasło',
              description: 'Zmmień hasło do konta.',
            }}
            variant={FIELD_VARIANT.PASSWORD}
          />
          <SettingsInputField
            label={'Karta płatnicza:'}
            info={{
              title: 'Karta płatnicza',
              description: 'Zmień informacje dot. karty płatniczej.',
            }}
            variant={FIELD_VARIANT.CREDIT_CARD}
          />

          <SettingsRangeField
            label={'Rozmiar czcionki'}
            info={{
              title: 'Rozmiar czcionki',
              description: 'Dostosuj wielkość czcionki czytanych bajek.',
            }}
            min={10}
            max={36}
            unit="px"
          />
          <SettingsSwitch
            label={'Lorem ispum'}
            info={{
              title: 'Lorem ispum',
              description: 'Lorem ipsum dolor sit amet.',
            }}
          />
          <SettingsRadio
            label={'Jakość animacji'}
            options={[
              { label: 'AUTO', value: 'auto' },
              { label: 'SD', value: 'sd' },
              { label: 'HD', value: 'hd' },
              { label: '2K', value: '2k', isDisabled: true },
              { label: '4K', value: '4k', isDisabled: true },
            ]}
            info={{
              title: 'Jakość animacji',
              description: 'Wybierz jakość animacji.',
            }}
          />
          <SettingsButton
            label="Plan:"
            info={{
              title: 'Plan',
              description: 'Twój obecny plan subskrypcji.',
            }}
            customButtonText="Family"
            customButtonRightText="14,99 PLN/mc"
            onCustomButtonClick={openModal}
          />
          <SettingsButton
            label="Usuwanie konta:"
            info={{
              title: 'Usuwanie konta',
              description: 'Usuń swoje konto na stałe.',
            }}
            buttonProps={{
              text: 'Usuń konto',
              actionType: ACTION_TYPE.FUNCTION_TRIGGER,
              variant: BUTTON_VARIANT.RED,
              width: { widthType: WIDTH_TYPE.PERCENT, widthValue: 100 },
              payload: () => console.info('Delete account'),
            }}
          />
          <SettingsDropdown
            label={'Język bajek'}
            options={[
              { label: 'Polski', value: 'pl' },
              { label: 'Angielski', value: 'en' },
            ]}
            info={{ title: 'Język bajek', description: 'Wybierz język bajek.' }}
          />
        </Content>
      </SettingsContentColumn>
      <ModalWindow
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Wybierz plan"
        closeOnOverlayClick
      >
        <PlanSelector />
      </ModalWindow>
    </SettingsPageBody>
  );
};
