import Image from 'next/image';

import Button from '@/atoms/Button';
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

import { Gradient, JumbotronBody, JumbotronContent } from './Jumbotron.styled';
import type { Jumbotron as JumbotronType } from './Jumbotron.types';

export const Jumbotron: JumbotronType = ({
  logo = false,
  headline,
  paragraph,
  button,
}) => (
  <JumbotronBody>
    <Image
      src="/jumbo-static.jpg"
      alt="Jumbotron background"
      fill
      style={{ objectFit: 'cover', objectPosition: 'center' }}
      priority
    />
    <Gradient />
    <JumbotronContent>
      {logo && (
        <Image src="logo-white.svg" alt="Fabledose" width={298} height={58} />
      )}
      <Headline weight={HEADLINE_TYPE.JUMBO} color={HEADLINE_COLOR.WHITE}>
        {headline}
      </Headline>
      <Paragraph
        color={PARAGRAPH_COLOR.WHITE}
        alignment={TEXT_ALIGNMENT.CENTER}
      >
        {paragraph}
      </Paragraph>
      <Button {...button} />
    </JumbotronContent>
  </JumbotronBody>
);
