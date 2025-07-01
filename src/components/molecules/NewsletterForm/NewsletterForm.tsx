import { Button } from '@/components/atoms/Button/Button';
import {
  ACTION_TYPE,
  BUTTON_VARIANT,
} from '@/components/atoms/Button/Button.types';
import Paragraph from '@/components/atoms/Paragraph';
import {
  FOREGROUND_COLOR,
  TEXT_ALIGNMENT,
} from '@/components/atoms/Paragraph/Paragraph.types';

import { Disclaimer, Logo, NewsletterFormBody } from './NewsletterForm.styled';
import type { NewsletterForm as NewsletterFormType } from './NewsletterForm.types';

export const NewsletterForm: NewsletterFormType = ({ className }) => (
  <NewsletterFormBody className={className}>
    <Logo src="/logo-white.svg" alt="Fabledose" />

    <Paragraph color={FOREGROUND_COLOR.WHITE} alignment={TEXT_ALIGNMENT.LEFT}>
      Join us on Substack to receive newsletter and update on features and
      releases.
    </Paragraph>

    <Button
      actionType={ACTION_TYPE.NAVIGATION}
      variant={BUTTON_VARIANT.WHITE}
      text="Substack"
      payload="#"
      iconUrl="/icons/substack.png"
    />

    <Disclaimer>
      By subscribing you agree to our Privacy Policy and provide consent to
      receive updates from our company.
    </Disclaimer>
  </NewsletterFormBody>
);
