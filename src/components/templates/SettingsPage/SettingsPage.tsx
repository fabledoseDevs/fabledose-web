import { useParams, usePathname, useRouter } from 'next/navigation';

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
import { handleLanguageChange } from '@/lang/lang.helpers';
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
              info={{
                title: settingsPage.display_n_audio.fontFamily.infoTitle,
                description:
                  settingsPage.display_n_audio.fontFamily.infoDescription,
              }}
            />
            <SettingsRadio
              label={settingsPage.display_n_audio.textBackground.label}
              options={[
                { label: 'brak', value: 'none' },
                { label: 'jasne', value: 'light' },
                { label: 'ciemne', value: 'dark' },
              ]}
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
              defaultValue="Auto"
              info={{
                title: settingsPage.display_n_audio.storyLanguage.infoTitle,
                description:
                  settingsPage.display_n_audio.storyLanguage.infoDescription,
              }}
            />
            <SettingsSwitch
              label={settingsPage.display_n_audio.illustrationAnimation.label}
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
              info={{
                title: settingsPage.display_n_audio.animationQuality.infoTitle,
                description:
                  settingsPage.display_n_audio.animationQuality.infoDescription,
              }}
            />
            <SettingsSwitch
              label={settingsPage.display_n_audio.narration.label}
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
              info={{
                title: settingsPage.display_n_audio.narrationVolume.infoTitle,
                description:
                  settingsPage.display_n_audio.narrationVolume.infoDescription,
              }}
            />
            <SettingsSwitch
              label={settingsPage.display_n_audio.backgroundMusic.label}
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
              info={{
                title: settingsPage.notifications.news.infoTitle,
                description: settingsPage.notifications.news.infoDescription,
              }}
            />
            <SettingsSwitch
              label={settingsPage.notifications.payments.label}
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
              info={{
                title: settingsPage.privacy_n_data.cookies.analytical.infoTitle,
                description:
                  settingsPage.privacy_n_data.cookies.analytical
                    .infoDescription,
              }}
            />
            <SettingsSwitch
              label={settingsPage.privacy_n_data.cookies.marketing.label}
              info={{
                title: settingsPage.privacy_n_data.cookies.marketing.infoTitle,
                description:
                  settingsPage.privacy_n_data.cookies.marketing.infoDescription,
              }}
            />
            <SettingsSwitch
              label={settingsPage.privacy_n_data.cookies.partnerA.label}
              info={{
                title: settingsPage.privacy_n_data.cookies.partnerA.infoTitle,
                description:
                  settingsPage.privacy_n_data.cookies.partnerA.infoDescription,
              }}
            />
            <SettingsSwitch
              label={settingsPage.privacy_n_data.cookies.partnerB.label}
              info={{
                title: settingsPage.privacy_n_data.cookies.partnerB.infoTitle,
                description:
                  settingsPage.privacy_n_data.cookies.partnerB.infoDescription,
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
    </SettingsPageBody>
  );
};
