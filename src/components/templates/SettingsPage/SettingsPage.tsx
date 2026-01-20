import {
  FOREGROUND_COLOR,
  HEADLINE_TYPE,
} from '@/atoms/Headline/Headline.types';
import Separator from '@/atoms/Separator';
import { SEPARATOR_COLOR } from '@/atoms/Separator/Separator.types';
import { useDictionary } from '@/lang/DictionaryProvider';
import SettingsInputField from '@/molecules/SettingsInputField';
import { FIELD_VARIANT } from '@/molecules/SettingsInputField/SettingsInputField.types';
import SettingsRadio from '@/molecules/SettingsRadio';
import SettingsRangeField from '@/molecules/SettingsRangeField';
import SettingsSwitch from '@/molecules/SettingsSwitch';

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
        </Content>
      </SettingsContentColumn>
    </SettingsPageBody>
  );
};
