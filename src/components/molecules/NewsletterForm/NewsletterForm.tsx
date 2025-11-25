import { Button } from '@/components/atoms/Button/Button';
import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/components/atoms/Button/Button.types';
import Paragraph from '@/components/atoms/Paragraph';
import {
  FOREGROUND_COLOR,
  TEXT_ALIGNMENT,
} from '@/components/atoms/Paragraph/Paragraph.types';

import { Disclaimer, Logo, NewsletterFormBody } from './NewsletterForm.styled';
import type { NewsletterForm as NewsletterFormType } from './NewsletterForm.types';

export const NewsletterForm: NewsletterFormType = () => (
  <NewsletterFormBody>
    <Logo src="/logo-white.svg" alt="Fabledose" />

    <Paragraph color={FOREGROUND_COLOR.WHITE} alignment={TEXT_ALIGNMENT.LEFT}>
      Dołącz do nas na Substack aby otrzymywać newsletter lub śledzić nasz blog
      z informacjami o nowościach.
    </Paragraph>

    <Button
      actionType={ACTION_TYPE.NAVIGATION}
      variant={BUTTON_VARIANT.WHITE}
      width={{
        widthType: WIDTH_TYPE.AUTO,
      }}
      text="Substack"
      payload="#"
      iconUrl="/icons/substack.png"
    />

    <Disclaimer>
      Zapisujac się akceptujesza zasady naszej Polityki Prywatności oraz
      wyrażasz zgodę na otrzymywanie informacji marketingowych drogą mailową.
    </Disclaimer>
  </NewsletterFormBody>
);
