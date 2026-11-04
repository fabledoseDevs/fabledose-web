import { useParams } from 'next/navigation';
import { useState } from 'react';

import Container from '@/atoms/Container';
import {
  CONTAINER_ELEMENT,
  FLEX_ALIGNMENT,
  PADDING,
} from '@/atoms/Container/Container.types';
import {
  FOREGROUND_COLOR,
  HEADLINE_TYPE,
} from '@/atoms/Headline/Headline.types';
import Paragraph from '@/atoms/Paragraph';
import { FOREGROUND_COLOR as PARAGRAPH_COLOR } from '@/atoms/Paragraph/Paragraph.types';
import Separator from '@/atoms/Separator';
import { SEPARATOR_COLOR } from '@/atoms/Separator/Separator.types';
import ArticleLink from '@/components/atoms/ArticleLink';
import Button from '@/components/atoms/Button';
import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/components/atoms/Button/Button.types';
import SettingsButton from '@/components/molecules/SettingsButton';
import SettingsDropdown from '@/components/molecules/SettingsDropdown';
import SettingsInputField from '@/components/molecules/SettingsInputField';
import SettingsProfiles from '@/components/molecules/SettingsProfiles';
import SettingsRadio from '@/components/molecules/SettingsRadio';
import SettingsRangeField from '@/components/molecules/SettingsRangeField';
import SettingsSwitch from '@/components/molecules/SettingsSwitch';
import { ACCOUNT_DELETION_ENABLED } from '@/config/account';
import {
  getAnimationQuality,
  getAnimationQualityOptions,
} from '@/config/plans';
import { useDictionary } from '@/lang/DictionaryProvider';
import { AccountSecurity } from '@/molecules/AccountSecurity/AccountSecurity';
import type { AccountAction } from '@/molecules/AccountSecurity/AccountSecurity.types';
import SettingsStaticInfo from '@/molecules/SettingsStaticInfo';

import { Headline } from '../../atoms/Headline/Headline';
import { useSettingsPage } from './SettingsPage.hook';
import {
  Content,
  LegalLinksList,
  SettingsContentColumn,
  SettingsMenuColumn,
  SettingsPageBody,
  SupportSection,
  TabButton,
} from './SettingsPage.styled';
import type { SettingsPage as SettingsPageType } from './SettingsPage.types';
import { SETTINGS_TAB } from './SettingsPage.types';

export const SettingsPage: SettingsPageType = () => {
  const { settingsPage, childProfiles, helpCenter } = useDictionary();
  const { lang } = useParams<{ lang: string }>();
  const locale = lang === 'pl' ? 'pl' : 'en';
  const [accountAction, setAccountAction] = useState<AccountAction | null>(
    null,
  );
  const {
    activeTab,
    setActiveTab,
    tabs,
    settings,
    displayName,
    planLabel,
    displayLanguage,
    handleLanguageSelection,
    handleDisplayNameChange,
    handleDisplayNameBlur,
    navigateToPlanPage,
    handleFontSizeChange,
    handleFontFamilyChange,
    handleTextBackgroundChange,
    handleBackgroundIntensityChange,
    handleStoryLanguageChange,
    handleIllustrationAnimationChange,
    handleAnimationQualityChange,
    handleNarrationChange,
    handleNarrationVolumeChange,
    handleBackgroundMusicChange,
    handleMusicVolumeChange,
    handleNewsChange,
    handlePaymentsChange,
    handleAnalyticalChange,
    handleMarketingChange,
  } = useSettingsPage();

  const renderTabContent = () => {
    switch (activeTab) {
      case SETTINGS_TAB.PROFILE_N_ACCOUNT:
        return (
          <>
            <SettingsInputField
              label={settingsPage.profile_n_account.displayName.label}
              value={displayName}
              onChange={handleDisplayNameChange}
              onBlur={handleDisplayNameBlur}
              info={{
                title: settingsPage.profile_n_account.displayName.infoTitle,
                description:
                  settingsPage.profile_n_account.displayName.infoDescription,
              }}
            />
            <SettingsButton
              label={settingsPage.profile_n_account.email.label}
              info={{
                title: settingsPage.profile_n_account.email.infoTitle,
                description:
                  settingsPage.profile_n_account.email.infoDescription,
              }}
              customButtonText={settings?.email || ''}
              customButtonRightText={settingsPage.accountSecurity.email.submit}
              onCustomButtonClick={() => setAccountAction('email')}
            />
            <SettingsButton
              label={settingsPage.profile_n_account.password.label}
              info={{
                title: settingsPage.profile_n_account.password.infoTitle,
                description:
                  settingsPage.profile_n_account.password.infoDescription,
              }}
              customButtonText="••••••••"
              customButtonRightText={
                settingsPage.profile_n_account.password.changeButton
              }
              onCustomButtonClick={() => setAccountAction('password')}
            />
            <SettingsButton
              label={settingsPage.profile_n_account.plan.label}
              info={{
                title: settingsPage.profile_n_account.plan.infoTitle,
                description:
                  settingsPage.profile_n_account.plan.infoDescription,
              }}
              customButtonText={planLabel}
              customButtonRightText={
                settingsPage.profile_n_account.plan.changeButton
              }
              onCustomButtonClick={navigateToPlanPage}
            />
            <SettingsButton
              label={settingsPage.profile_n_account.creditCard.label}
              info={{
                title: settingsPage.profile_n_account.creditCard.infoTitle,
                description:
                  settingsPage.profile_n_account.creditCard.infoDescription,
              }}
              buttonProps={{
                variant: BUTTON_VARIANT.WHITE,
                text: '',
                iconUrl: '/icons/stripe-blurple.svg',
                iconSizeOverride: 44,
                width: { widthType: WIDTH_TYPE.PERCENT, widthValue: 100 },
                actionType: ACTION_TYPE.NAVIGATION,
                payload: '#',
              }}
            />
            <SettingsDropdown
              label={settingsPage.profile_n_account.language.label}
              options={['Polski', 'English']}
              defaultValue={displayLanguage}
              info={{
                title: settingsPage.profile_n_account.language.infoTitle,
                description:
                  settingsPage.profile_n_account.language.infoDescription,
              }}
              onChange={handleLanguageSelection}
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
                // Deferred on Spark: backend deployment and explicit opt-in are required.
                isDisabled: !ACCOUNT_DELETION_ENABLED,
                payload: () => setAccountAction('delete'),
              }}
            />
            {!ACCOUNT_DELETION_ENABLED && (
              <Paragraph color={PARAGRAPH_COLOR.WHITE}>
                {settingsPage.profile_n_account.deleteAccount.deferredNotice}
              </Paragraph>
            )}
          </>
        );
      case SETTINGS_TAB.PARENTAL_CONTROL:
        return (
          <>
            {settings && settings.plan !== 'free' && (
              <Paragraph color={PARAGRAPH_COLOR.WHITE}>
                {childProfiles.parentalDeferred}
              </Paragraph>
            )}
            <SettingsProfiles />
          </>
        );
      case SETTINGS_TAB.DISPLAY_N_AUDIO:
        return (
          <>
            <SettingsRangeField
              label={settingsPage.display_n_audio.fontSize.label}
              min={12}
              max={24}
              unit="px"
              value={settings?.fontSize || 16}
              onChange={handleFontSizeChange}
              info={{
                title: settingsPage.display_n_audio.fontSize.infoTitle,
                description:
                  settingsPage.display_n_audio.fontSize.infoDescription,
              }}
            />
            <SettingsRadio
              label={settingsPage.display_n_audio.fontFamily.label}
              options={[
                {
                  label: 'Sans',
                  value: 'sans',
                  fontFamily: 'PlusJakartaSans, sans-serif',
                },
                {
                  label: 'Serif',
                  value: 'serif',
                  fontFamily: 'Literata, serif',
                },
                {
                  label: 'Dyslexic',
                  value: 'dyslexic',
                  fontFamily: '"OpenDyslexic", "Comic Sans MS", sans-serif',
                },
              ]}
              value={settings?.fontFamily || 'sans'}
              onChange={handleFontFamilyChange}
              info={{
                title: settingsPage.display_n_audio.fontFamily.infoTitle,
                description:
                  settingsPage.display_n_audio.fontFamily.infoDescription,
              }}
            />
            <SettingsRadio
              label={settingsPage.display_n_audio.textBackground.label}
              options={[
                {
                  label:
                    settingsPage.display_n_audio.textBackground.options.none,
                  value: 'none',
                },
                {
                  label:
                    settingsPage.display_n_audio.textBackground.options.light,
                  value: 'light',
                },
                {
                  label:
                    settingsPage.display_n_audio.textBackground.options.dark,
                  value: 'dark',
                },
              ]}
              value={settings?.textBackground || 'none'}
              onChange={handleTextBackgroundChange}
              info={{
                title: settingsPage.display_n_audio.textBackground.infoTitle,
                description:
                  settingsPage.display_n_audio.textBackground.infoDescription,
              }}
            />
            <SettingsRangeField
              label={settingsPage.display_n_audio.backgroundIntensity.label}
              min={0}
              max={100}
              unit="%"
              value={settings?.backgroundIntensity || 50}
              onChange={handleBackgroundIntensityChange}
              info={{
                title:
                  settingsPage.display_n_audio.backgroundIntensity.infoTitle,
                description:
                  settingsPage.display_n_audio.backgroundIntensity
                    .infoDescription,
              }}
            />
            <SettingsDropdown
              label={settingsPage.display_n_audio.storyLanguage.label}
              options={['Auto', 'Polski', 'English']}
              defaultValue={settings?.storyLanguage || 'auto'}
              onChange={handleStoryLanguageChange}
              info={{
                title: settingsPage.display_n_audio.storyLanguage.infoTitle,
                description:
                  settingsPage.display_n_audio.storyLanguage.infoDescription,
              }}
            />
            <SettingsSwitch
              label={settingsPage.display_n_audio.illustrationAnimation.label}
              value={settings?.illustrationAnimation ?? true}
              onChange={handleIllustrationAnimationChange}
              info={{
                title:
                  settingsPage.display_n_audio.illustrationAnimation.infoTitle,
                description:
                  settingsPage.display_n_audio.illustrationAnimation
                    .infoDescription,
              }}
            />
            <SettingsRadio
              label={settingsPage.display_n_audio.animationQuality.label}
              options={getAnimationQualityOptions(settings?.plan)}
              value={getAnimationQuality(
                settings?.plan,
                settings?.animationQuality,
              )}
              onChange={handleAnimationQualityChange}
              info={{
                title: settingsPage.display_n_audio.animationQuality.infoTitle,
                description:
                  settingsPage.display_n_audio.animationQuality.infoDescription,
              }}
            />
            <SettingsSwitch
              label={settingsPage.display_n_audio.narration.label}
              value={settings?.narration ?? true}
              onChange={handleNarrationChange}
              info={{
                title: settingsPage.display_n_audio.narration.infoTitle,
                description:
                  settingsPage.display_n_audio.narration.infoDescription,
              }}
            />
            <SettingsRangeField
              label={settingsPage.display_n_audio.narrationVolume.label}
              min={0}
              max={100}
              unit="%"
              value={settings?.narrationVolume ?? 80}
              onChange={handleNarrationVolumeChange}
              info={{
                title: settingsPage.display_n_audio.narrationVolume.infoTitle,
                description:
                  settingsPage.display_n_audio.narrationVolume.infoDescription,
              }}
            />
            <SettingsSwitch
              label={settingsPage.display_n_audio.backgroundMusic.label}
              value={settings?.backgroundMusic ?? true}
              onChange={handleBackgroundMusicChange}
              info={{
                title: settingsPage.display_n_audio.backgroundMusic.infoTitle,
                description:
                  settingsPage.display_n_audio.backgroundMusic.infoDescription,
              }}
            />
            <SettingsRangeField
              label={settingsPage.display_n_audio.musicVolume.label}
              min={0}
              max={100}
              unit="%"
              value={settings?.musicVolume ?? 60}
              onChange={handleMusicVolumeChange}
              info={{
                title: settingsPage.display_n_audio.musicVolume.infoTitle,
                description:
                  settingsPage.display_n_audio.musicVolume.infoDescription,
              }}
            />
          </>
        );
      case SETTINGS_TAB.NOTIFICATIONS:
        return (
          <>
            <SettingsSwitch
              label={settingsPage.notifications.news.label}
              value={settings?.notificationsNews ?? true}
              onChange={handleNewsChange}
              info={{
                title: settingsPage.notifications.news.infoTitle,
                description: settingsPage.notifications.news.infoDescription,
              }}
            />
            <SettingsSwitch
              label={settingsPage.notifications.payments.label}
              value={settings?.notificationsPayments ?? true}
              onChange={handlePaymentsChange}
              info={{
                title: settingsPage.notifications.payments.infoTitle,
                description:
                  settingsPage.notifications.payments.infoDescription,
              }}
            />
            <SettingsButton
              label={settingsPage.notifications.newsletter.label}
              customButtonText={
                settingsPage.notifications.newsletter.buttonText
              }
              info={{
                title: settingsPage.notifications.newsletter.infoTitle,
                description:
                  settingsPage.notifications.newsletter.infoDescription,
              }}
              onCustomButtonClick={() =>
                window.open('https://substack.com', '_blank')
              }
              buttonProps={{
                actionType: ACTION_TYPE.NAVIGATION,
                variant: BUTTON_VARIANT.WHITE,
                text: 'Substack',
                isDisabled: false,
                width: { widthType: WIDTH_TYPE.PERCENT, widthValue: 100 },
                iconUrl: '/icons/substack.png',
              }}
            />
          </>
        );
      case SETTINGS_TAB.PRIVACY_N_DATA:
        return (
          <>
            <Paragraph color={FOREGROUND_COLOR.WHITE}>
              {settingsPage.privacy_n_data.description}
            </Paragraph>
            <Headline
              weight={HEADLINE_TYPE.SMALL}
              color={FOREGROUND_COLOR.WHITE}
            >
              {settingsPage.privacy_n_data.cookies.label}
            </Headline>
            <SettingsStaticInfo
              label={settingsPage.privacy_n_data.cookies.functional.label}
              info={{
                title: settingsPage.privacy_n_data.cookies.functional.infoTitle,
                description:
                  settingsPage.privacy_n_data.cookies.functional
                    .infoDescription,
              }}
            />
            <SettingsSwitch
              label={settingsPage.privacy_n_data.cookies.analytical.label}
              value={settings?.cookiesAnalytical ?? true}
              onChange={handleAnalyticalChange}
              info={{
                title: settingsPage.privacy_n_data.cookies.analytical.infoTitle,
                description:
                  settingsPage.privacy_n_data.cookies.analytical
                    .infoDescription,
              }}
            />
            <SettingsSwitch
              label={settingsPage.privacy_n_data.cookies.marketing.label}
              value={settings?.cookiesMarketing ?? true}
              onChange={handleMarketingChange}
              info={{
                title: settingsPage.privacy_n_data.cookies.marketing.infoTitle,
                description:
                  settingsPage.privacy_n_data.cookies.marketing.infoDescription,
              }}
            />

            <Headline
              weight={HEADLINE_TYPE.SMALL}
              color={FOREGROUND_COLOR.WHITE}
            >
              {settingsPage.privacy_n_data.legal.headline}
            </Headline>
            <LegalLinksList>
              <li>
                <ArticleLink href={`/${locale}/article/privacy-policy`}>
                  {settingsPage.privacy_n_data.legal.links.dataAdmin}
                </ArticleLink>
              </li>
              <li>
                <ArticleLink href={`/${locale}/article/privacy-policy`}>
                  {settingsPage.privacy_n_data.legal.links.privacyPolicy}
                </ArticleLink>
              </li>
              <li>
                <ArticleLink href={`/${locale}/article/cookies`}>
                  {settingsPage.privacy_n_data.legal.links.cookies}
                </ArticleLink>
              </li>
              <li>
                <ArticleLink href={`/${locale}/article/privacy-policy`}>
                  {settingsPage.privacy_n_data.legal.links.partners}
                </ArticleLink>
              </li>
              <li>
                <ArticleLink href={`/${locale}/article/privacy-policy`}>
                  {settingsPage.privacy_n_data.legal.links.howToEdit}
                </ArticleLink>
              </li>
            </LegalLinksList>
          </>
        );
      case SETTINGS_TAB.SUPPORT_N_FEEDBACK:
        return (
          <Container
            containerType={CONTAINER_ELEMENT.SECTION}
            verticalPadding={PADDING.STANDARD}
            alignItems={FLEX_ALIGNMENT.START}
            gap
          >
            <Paragraph color={FOREGROUND_COLOR.WHITE}>
              {helpCenter.intro}
            </Paragraph>
            <Container
              containerType={CONTAINER_ELEMENT.DIV}
              alignItems={FLEX_ALIGNMENT.START}
            >
              <Button
                text={helpCenter.open}
                actionType={ACTION_TYPE.NAVIGATION}
                variant={BUTTON_VARIANT.RED}
                payload={`/${locale}/help`}
                width={{ widthType: WIDTH_TYPE.PERCENT, widthValue: 100 }}
              />
              <Button
                text={helpCenter.contactButton}
                actionType={ACTION_TYPE.NAVIGATION}
                variant={BUTTON_VARIANT.WHITE}
                payload={`/${locale}/article/contact`}
                width={{ widthType: WIDTH_TYPE.PERCENT, widthValue: 100 }}
              />
            </Container>
          </Container>
        );
      case SETTINGS_TAB.INFO:
        return (
          <>
            <Paragraph color={FOREGROUND_COLOR.WHITE}>
              {settingsPage.info.description}
            </Paragraph>
            <SupportSection>
              <Paragraph color={FOREGROUND_COLOR.WHITE} boldText>
                {settingsPage.info.companyDetails.headline}
              </Paragraph>
              <Paragraph color={FOREGROUND_COLOR.WHITE}>
                {settingsPage.info.companyDetails.name}
              </Paragraph>
              <Paragraph color={FOREGROUND_COLOR.WHITE}>
                {settingsPage.info.companyDetails.address}
              </Paragraph>
              <Paragraph color={FOREGROUND_COLOR.WHITE}>
                {settingsPage.info.companyDetails.nip}
              </Paragraph>
              <Paragraph color={FOREGROUND_COLOR.WHITE}>
                {settingsPage.info.companyDetails.regon}
              </Paragraph>
              <Paragraph color={FOREGROUND_COLOR.WHITE}>
                {settingsPage.info.companyDetails.tel}
              </Paragraph>
            </SupportSection>
            <SupportSection>
              <Paragraph color={FOREGROUND_COLOR.WHITE} boldText>
                {settingsPage.info.appUsage.headline}
              </Paragraph>
              <Paragraph color={FOREGROUND_COLOR.WHITE}>
                {settingsPage.info.appUsage.version}
              </Paragraph>
            </SupportSection>
            <SupportSection>
              <Paragraph color={FOREGROUND_COLOR.WHITE} boldText>
                {settingsPage.info.license.headline}
              </Paragraph>
              <Paragraph color={FOREGROUND_COLOR.WHITE}>
                {settingsPage.info.license.copyright}
              </Paragraph>
              <Paragraph color={FOREGROUND_COLOR.WHITE}>
                {settingsPage.info.license.allRightsReserved}
              </Paragraph>
            </SupportSection>
            <SupportSection>
              <Paragraph color={FOREGROUND_COLOR.WHITE} boldText>
                {settingsPage.info.openSource.headline}
              </Paragraph>
              <Paragraph color={FOREGROUND_COLOR.WHITE}>
                {settingsPage.info.openSource.contributors}
              </Paragraph>
            </SupportSection>
          </>
        );
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
      {accountAction && (
        <AccountSecurity
          key={accountAction}
          action={accountAction}
          onClose={() => setAccountAction(null)}
        />
      )}
    </SettingsPageBody>
  );
};
