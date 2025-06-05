'use client';
import type { ReactElement } from 'react';

import Button from '@/atoms/Button';
import { ACTION_TYPE } from '@/atoms/Button/Button.types';
import Headline from '@/atoms/Headline';
import { HEADLINE_TYPE } from '@/atoms/Headline/Headline.types';
import Paragraph from '@/atoms/Paragraph';
import {
  FOREGROUND_COLOR,
  TEXT_ALIGNMENT,
} from '@/atoms/Paragraph/Paragraph.types';

const Home = (): ReactElement => (
  <>
    <Button
      actionType={ACTION_TYPE.FUNCTION_TRIGGER}
      text="Hello world"
      payload={() => alert('Hello World')}
    />
    <Button
      actionType={ACTION_TYPE.FUNCTION_TRIGGER}
      text="Hello world"
      payload={() => alert('Hello World')}
      isDisabled={true}
    />
    <br />
    <Headline weight={HEADLINE_TYPE.JUMBO}>Hello world</Headline>
    <Headline weight={HEADLINE_TYPE.BIG}>Hello world</Headline>
    <Headline weight={HEADLINE_TYPE.SMALL}>Hello world</Headline>
    <Headline weight={HEADLINE_TYPE.SUPERTEXT}>Hello world</Headline>
    <Paragraph
      color={FOREGROUND_COLOR.PURPLE}
      alignment={TEXT_ALIGNMENT.JUSTIFY}
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </Paragraph>
  </>
);

export default Home;
