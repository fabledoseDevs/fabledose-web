'use client';
import type { ReactElement } from 'react';

import Button from '@/atoms/Button';
import { ACTION_TYPE } from '@/atoms/Button/Button.types';

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
  </>
);

export default Home;
