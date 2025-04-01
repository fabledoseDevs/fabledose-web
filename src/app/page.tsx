'use client';
import type { ReactElement } from 'react';

import Button from '@/atoms/Button';
import {
  ACTION_TYPE,
  BUTTON_COLOR,
  BUTTON_SIZE,
} from '@/atoms/Button/Button.types';

const Home = (): ReactElement => (
  <>
    <h1>Poltawski Test</h1>
    <p>Lato regular test</p>
    <Button
      actionType={ACTION_TYPE.FUNCTION_TRIGGER}
      variant={BUTTON_SIZE.DEFAULT}
      color={BUTTON_COLOR.CORAL}
      text="Hello World"
      payload={() => console.info('Hello World')}
    />
  </>
);

export default Home;
