import Image from 'next/image';

import Button from '@/atoms/Button';
import { ACTION_TYPE, BUTTON_VARIANT } from '@/atoms/Button/Button.types';
import Headline from '@/atoms/Headline';
import {
  FOREGROUND_COLOR as HEADLINE_COLOR,
  HEADLINE_TYPE,
} from '@/atoms/Headline/Headline.types';
import Paragraph from '@/atoms/Paragraph';
import {
  FOREGROUND_COLOR as PARAGRAPH_COLOR,
  TEXT_ALIGNMENT,
} from '@/atoms/Paragraph/Paragraph.types';

import { JumbotronBody, JumbotronContent } from './Jumbotron.styled';
import type { Jumbotron as JumbotronType } from './Jumbotron.types';

export const Jumbotron: JumbotronType = () => (
  <JumbotronBody>
    <Image
      src="/jumbo-static.jpg"
      alt="Jumbotron background"
      fill
      style={{ objectFit: 'cover', objectPosition: 'center' }}
      priority
    />
    <JumbotronContent>
      <Headline weight={HEADLINE_TYPE.JUMBO} color={HEADLINE_COLOR.WHITE}>
        Miejsce, w którym baśnie ożywają podczas czytania
      </Headline>
      <Paragraph
        color={PARAGRAPH_COLOR.WHITE}
        alignment={TEXT_ALIGNMENT.CENTER}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </Paragraph>
      <Button
        actionType={ACTION_TYPE.NAVIGATION}
        variant={BUTTON_VARIANT.RED}
        text="Wejdź do świata bajek"
        payload="#"
      />
    </JumbotronContent>
  </JumbotronBody>
);
