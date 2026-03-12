import {
  FOREGROUND_COLOR,
  HEADLINE_TYPE,
} from '@/atoms/Headline/Headline.types';
import Paragraph from '@/atoms/Paragraph';
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
import { FIELD_VARIANT } from '@/components/molecules/SettingsInputField/SettingsInputField.types';
import SettingsProfiles from '@/components/molecules/SettingsProfiles';
import SettingsRadio from '@/components/molecules/SettingsRadio';
import SettingsRangeField from '@/components/molecules/SettingsRangeField';
import SettingsSwitch from '@/components/molecules/SettingsSwitch';
import { useDictionary } from '@/lang/DictionaryProvider';
import ModalWindow from '@/molecules/ModalWindow';
import SettingsStaticInfo from '@/molecules/SettingsStaticInfo';

import { Headline } from '../../atoms/Headline/Headline';
import { useSettingsPage } from './SettingsPage.hook';
import {
  Content,
  LegalLinksList,
  PasswordFieldInput,
  PasswordFieldLabel,
  PasswordFormField,
  PasswordModalActions,
  PasswordModalContent,
  PasswordModalError,
  PlanActions,
  SettingsContentColumn,
  SettingsMenuColumn,
  SettingsPageBody,
  SupportSection,
  TabButton,
} from './SettingsPage.styled';
import type { SettingsPage as SettingsPageType } from './SettingsPage.types';
import { SETTINGS_TAB } from './SettingsPage.types';

export const SettingsPage: SettingsPageType = () => {
  const { settingsPage } = useDictionary();
  const {
    activeTab,
    setActiveTab,
    tabs,
    settings,
    displayName,
    email,
    isPlanModalOpen,
    isPasswordModalOpen,
    currentPassword,
    newPassword,
    confirmNewPassword,
    passwordModalFeedback,
    isPasswordUpdatePending,
    planLabel,
    displayLanguage,
    handleLanguageSelection,
    handleDisplayNameChange,
    handleDisplayNameBlur,
    handleEmailChange,
    handleEmailBlur,
    openPlanModal,
    closePlanModal,
    handlePlanChange,
    openPasswordModal,
    closePasswordModal,
    handleCurrentPasswordChange,
    handleNewPasswordChange,
    handleConfirmNewPasswordChange,
    handlePasswordUpdate,
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
            <SettingsInputField
              label={settingsPage.profile_n_account.email.label}
              variant={FIELD_VARIANT.EMAIL}
              value={email}
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              info={{
                title: settingsPage.profile_n_account.email.infoTitle,
                description:
                  settingsPage.profile_n_account.email.infoDescription,
              }}
            />
            <SettingsButton
              label={settingsPage.profile_n_account.password.label}
              info={{
                title: settingsPage.profile_n_account.password.infoTitle,
                description:
                  settingsPage.profile_n_account.password.infoDescription,
              }}
              customButtonText={settings?.password || '********'}
              customButtonRightText={
                settingsPage.profile_n_account.password.changeButton
              }
              onCustomButtonClick={openPasswordModal}
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
              onCustomButtonClick={openPlanModal}
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
                payload: () => console.info('Boo!'),
              }}
            />
          </>
        );
      case SETTINGS_TAB.PARENTAL_CONTROL:
        return (
          <>
            <SettingsSwitch
              label={settingsPage.parental_control.status.label}
              info={{
                title: settingsPage.parental_control.status.infoTitle,
                description:
                  settingsPage.parental_control.status.infoDescription,
              }}
            />
            <SettingsInputField
              label={settingsPage.parental_control.pin.label}
              variant={FIELD_VARIANT.PASSWORD}
              info={{
                title: settingsPage.parental_control.pin.infoTitle,
                description: settingsPage.parental_control.pin.infoDescription,
              }}
            />
            <SettingsInputField
              label={settingsPage.parental_control.screenLimit.label}
              info={{
                title: settingsPage.parental_control.screenLimit.infoTitle,
                description:
                  settingsPage.parental_control.screenLimit.infoDescription,
              }}
            />
            <SettingsInputField
              label={settingsPage.parental_control.excludeHours.label}
              info={{
                title: settingsPage.parental_control.excludeHours.infoTitle,
                description:
                  settingsPage.parental_control.excludeHours.infoDescription,
              }}
            />
            <SettingsSwitch
              label={settingsPage.parental_control.ads.label}
              info={{
                title: settingsPage.parental_control.ads.infoTitle,
                description: settingsPage.parental_control.ads.infoDescription,
              }}
            />
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
                { label: 'Sans', value: 'sans' },
                { label: 'Serif', value: 'serif' },
                { label: 'Dyslexia', value: 'dyslexia' },
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
              options={[
                { label: 'AUTO', value: 'auto' },
                { label: 'SD', value: 'sd' },
                { label: 'HD', value: 'hd' },
                { label: '2K', value: '2k', isDisabled: true },
                { label: '4K', value: '4k', isDisabled: true },
              ]}
              value={settings?.animationQuality || 'high'}
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
            <SettingsInputField
              label={settingsPage.privacy_n_data.personalData.name.label}
              info={{
                title: settingsPage.privacy_n_data.personalData.name.infoTitle,
                description:
                  settingsPage.privacy_n_data.personalData.name.infoDescription,
              }}
            />
            <SettingsInputField
              label={settingsPage.privacy_n_data.personalData.email.label}
              info={{
                title: settingsPage.privacy_n_data.personalData.email.infoTitle,
                description:
                  settingsPage.privacy_n_data.personalData.email
                    .infoDescription,
              }}
            />
            <SettingsInputField
              label={settingsPage.privacy_n_data.personalData.address.label}
              info={{
                title:
                  settingsPage.privacy_n_data.personalData.address.infoTitle,
                description:
                  settingsPage.privacy_n_data.personalData.address
                    .infoDescription,
              }}
            />
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
                <ArticleLink>
                  {settingsPage.privacy_n_data.legal.links.dataAdmin}
                </ArticleLink>
              </li>
              <li>
                <ArticleLink>
                  {settingsPage.privacy_n_data.legal.links.privacyPolicy}
                </ArticleLink>
              </li>
              <li>
                <ArticleLink>
                  {settingsPage.privacy_n_data.legal.links.cookies}
                </ArticleLink>
              </li>
              <li>
                <ArticleLink>
                  {settingsPage.privacy_n_data.legal.links.partners}
                </ArticleLink>
              </li>
              <li>
                <ArticleLink>
                  {settingsPage.privacy_n_data.legal.links.howToEdit}
                </ArticleLink>
              </li>
            </LegalLinksList>
          </>
        );
      case SETTINGS_TAB.SUPPORT_N_FEEDBACK:
        return (
          <>
            <Paragraph color={FOREGROUND_COLOR.WHITE}>
              {settingsPage.support_n_feedback.description}
            </Paragraph>
            <Button
              actionType={ACTION_TYPE.FUNCTION_TRIGGER}
              variant={BUTTON_VARIANT.RED}
              text={settingsPage.support_n_feedback.contactButton}
              width={{ widthType: WIDTH_TYPE.PX, widthValue: 120 }}
              payload={() => console.info('Contact clicked!')}
            />
            <SupportSection>
              <Headline
                weight={HEADLINE_TYPE.SMALL}
                color={FOREGROUND_COLOR.WHITE}
              >
                {settingsPage.support_n_feedback.helpArticles.headline}
              </Headline>
              <LegalLinksList>
                <li>
                  <ArticleLink>
                    {settingsPage.support_n_feedback.helpArticles.links.faq}
                  </ArticleLink>
                </li>
                <li>
                  <ArticleLink>
                    {
                      settingsPage.support_n_feedback.helpArticles.links
                        .howToReadAnimated
                    }
                  </ArticleLink>
                </li>
                <li>
                  <ArticleLink>
                    {
                      settingsPage.support_n_feedback.helpArticles.links
                        .displayAudioSettings
                    }
                  </ArticleLink>
                </li>
                <li>
                  <ArticleLink>
                    {settingsPage.support_n_feedback.helpArticles.links.account}
                  </ArticleLink>
                </li>
                <li>
                  <ArticleLink>
                    {
                      settingsPage.support_n_feedback.helpArticles.links
                        .paymentsRefunds
                    }
                  </ArticleLink>
                </li>
                <li>
                  <ArticleLink>
                    {
                      settingsPage.support_n_feedback.helpArticles.links
                        .techSupport
                    }
                  </ArticleLink>
                </li>
                <li>
                  <ArticleLink>
                    {
                      settingsPage.support_n_feedback.helpArticles.links
                        .loremIpsum
                    }
                  </ArticleLink>
                </li>
                <li>
                  <ArticleLink>
                    {settingsPage.support_n_feedback.helpArticles.links.sitAmet}
                  </ArticleLink>
                </li>
              </LegalLinksList>
            </SupportSection>
            <SupportSection>
              <Headline
                weight={HEADLINE_TYPE.SMALL}
                color={FOREGROUND_COLOR.WHITE}
              >
                {settingsPage.support_n_feedback.legalInfo.headline}
              </Headline>
              <LegalLinksList>
                <li>
                  <ArticleLink>
                    {settingsPage.support_n_feedback.legalInfo.links.termsOfUse}
                  </ArticleLink>
                </li>
                <li>
                  <ArticleLink>
                    {
                      settingsPage.support_n_feedback.legalInfo.links
                        .privacyPolicy
                    }
                  </ArticleLink>
                </li>
                <li>
                  <ArticleLink>
                    {settingsPage.support_n_feedback.legalInfo.links.cookies}
                  </ArticleLink>
                </li>
              </LegalLinksList>
            </SupportSection>
            <SupportSection>
              <Headline
                weight={HEADLINE_TYPE.SMALL}
                color={FOREGROUND_COLOR.WHITE}
              >
                {settingsPage.support_n_feedback.feedback.headline}
              </Headline>
              <LegalLinksList>
                <li>
                  <ArticleLink>
                    {
                      settingsPage.support_n_feedback.feedback.links
                        .sendDirectFeedback
                    }
                  </ArticleLink>
                </li>
                <li>
                  <ArticleLink>
                    {settingsPage.support_n_feedback.feedback.links.rateApp}
                  </ArticleLink>
                </li>
              </LegalLinksList>
            </SupportSection>
          </>
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
      <ModalWindow
        isOpen={isPlanModalOpen}
        onClose={closePlanModal}
        closeOnOverlayClick
        title={settingsPage.profile_n_account.plan.modalTitle}
      >
        <Paragraph>
          {settingsPage.profile_n_account.plan.modalDescription}
          <br />
          <br />
        </Paragraph>
        <PlanActions>
          <Button
            actionType={ACTION_TYPE.FUNCTION_TRIGGER}
            variant={
              settings?.plan === 'free'
                ? BUTTON_VARIANT.RED
                : BUTTON_VARIANT.WHITE
            }
            text={settingsPage.profile_n_account.plan.free}
            payload={() => handlePlanChange('free')}
            width={{ widthType: WIDTH_TYPE.PERCENT, widthValue: 100 }}
          />
          <Button
            actionType={ACTION_TYPE.FUNCTION_TRIGGER}
            variant={
              settings?.plan === 'family'
                ? BUTTON_VARIANT.RED
                : BUTTON_VARIANT.WHITE
            }
            text={settingsPage.profile_n_account.plan.family}
            payload={() => handlePlanChange('family')}
            width={{ widthType: WIDTH_TYPE.PERCENT, widthValue: 100 }}
          />
          <Button
            actionType={ACTION_TYPE.FUNCTION_TRIGGER}
            variant={
              settings?.plan === 'ultimate'
                ? BUTTON_VARIANT.RED
                : BUTTON_VARIANT.WHITE
            }
            text={settingsPage.profile_n_account.plan.ultimate}
            payload={() => handlePlanChange('ultimate')}
            width={{ widthType: WIDTH_TYPE.PERCENT, widthValue: 100 }}
          />
        </PlanActions>
      </ModalWindow>
      <ModalWindow
        isOpen={isPasswordModalOpen}
        onClose={closePasswordModal}
        closeOnOverlayClick={!isPasswordUpdatePending}
        title={settingsPage.profile_n_account.password.modalTitle}
      >
        <PasswordModalContent>
          <Paragraph>
            {settingsPage.profile_n_account.password.modalDescription}
          </Paragraph>
          <PasswordFormField>
            <PasswordFieldLabel htmlFor="settings-current-password">
              {settingsPage.profile_n_account.password.currentPasswordLabel}
            </PasswordFieldLabel>
            <PasswordFieldInput
              id="settings-current-password"
              type="password"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
              disabled={isPasswordUpdatePending}
              autoComplete="current-password"
            />
          </PasswordFormField>
          <PasswordFormField>
            <PasswordFieldLabel htmlFor="settings-new-password">
              {settingsPage.profile_n_account.password.newPasswordLabel}
            </PasswordFieldLabel>
            <PasswordFieldInput
              id="settings-new-password"
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
              disabled={isPasswordUpdatePending}
              autoComplete="new-password"
            />
          </PasswordFormField>
          <PasswordFormField>
            <PasswordFieldLabel htmlFor="settings-confirm-new-password">
              {settingsPage.profile_n_account.password.confirmPasswordLabel}
            </PasswordFieldLabel>
            <PasswordFieldInput
              id="settings-confirm-new-password"
              type="password"
              value={confirmNewPassword}
              onChange={handleConfirmNewPasswordChange}
              disabled={isPasswordUpdatePending}
              autoComplete="new-password"
              onKeyDown={event => {
                if (event.key === 'Enter') {
                  void handlePasswordUpdate();
                }
              }}
            />
          </PasswordFormField>
          {passwordModalFeedback && (
            <PasswordModalError>{passwordModalFeedback}</PasswordModalError>
          )}
          <PasswordModalActions>
            <Button
              actionType={ACTION_TYPE.FUNCTION_TRIGGER}
              variant={BUTTON_VARIANT.TRANSPARENT}
              text={settingsPage.profile_n_account.password.cancelButton}
              payload={closePasswordModal}
              isDisabled={isPasswordUpdatePending}
              width={{ widthType: WIDTH_TYPE.AUTO }}
            />
            <Button
              actionType={ACTION_TYPE.FUNCTION_TRIGGER}
              variant={BUTTON_VARIANT.RED}
              text={settingsPage.profile_n_account.password.okButton}
              payload={handlePasswordUpdate}
              isDisabled={isPasswordUpdatePending}
              width={{ widthType: WIDTH_TYPE.AUTO }}
            />
          </PasswordModalActions>
        </PasswordModalContent>
      </ModalWindow>
    </SettingsPageBody>
  );
};
