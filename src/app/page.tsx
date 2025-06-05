'use client';
import type { ReactElement } from 'react';

import Button from '@/atoms/Button';
import { ACTION_TYPE } from '@/atoms/Button/Button.types';
import BasicDescription from "@/atoms/BasicDescription";

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
    <BasicDescription
      superText={'Lorem Ipsum'}
      headline={'Sit amet sentensula falgahta'}
      paragraph={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id eros a odio hendrerit ultrices ac sed urna. Vivamus sit amet massa sit amet ante dignissim consectetur ac eu mauris. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris sit amet fermentum elit. '}
    />
  </>
);

export default Home;
