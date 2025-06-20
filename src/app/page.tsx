'use client';
import type { ReactElement } from 'react';

import AccordionRib from '@/atoms/AccordionRib';
import BasicDescription from '@/atoms/BasicDescription';
import Button from '@/atoms/Button';
import { ACTION_TYPE, BUTTON_VARIANT } from '@/atoms/Button/Button.types';
import Dropdown from '@/atoms/Dropdown';
import { COLOR_SCHEME } from '@/atoms/Dropdown/Dropdown.types';
import FableTile from '@/molecules/FableTile';
import TopBar from '@/molecules/TopBar';
import mockImageOne from '@/public/mockImages/mockTile-01.jpg';
import mockImageTwo from '@/public/mockImages/mockTile-02.jpg';
import mockImageThree from '@/public/mockImages/mockTile-03.jpg';

const Home = (): ReactElement => (
  <>
    <TopBar />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <Button
      variant={BUTTON_VARIANT.RED}
      actionType={ACTION_TYPE.FUNCTION_TRIGGER}
      text="Hello world"
      payload={() => alert('Hello World')}
    />
    <Button
      variant={BUTTON_VARIANT.RED}
      actionType={ACTION_TYPE.FUNCTION_TRIGGER}
      text="Hello world"
      payload={() => alert('Hello World')}
      isDisabled={true}
    />
    <br />
    <Button
      variant={BUTTON_VARIANT.TRANSPARENT}
      actionType={ACTION_TYPE.FUNCTION_TRIGGER}
      text="Hello world"
      payload={() => alert('Hello World')}
    />
    <Button
      variant={BUTTON_VARIANT.TRANSPARENT}
      actionType={ACTION_TYPE.FUNCTION_TRIGGER}
      text="Hello world"
      payload={() => alert('Hello World')}
      isDisabled={true}
    />
    <br />
    <br />

    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
      <FableTile
        imageUrl={mockImageOne.src}
        fableTitle={'Złotowłosa'}
        fableId={'zlotowlosa-i-trzy-misie'}
      />
      <FableTile
        imageUrl={mockImageTwo.src}
        fableTitle={'Trzy małe świnki'}
        fableId={'trzy-male-swinki'}
      />
      <FableTile
        imageUrl={mockImageThree.src}
        fableTitle={'O rybaku i złotej rybce'}
        fableId={'o-rybaku-i-zlotej-rybce'}
      />
    </div>

    <br />
    <br />
    <Dropdown
      options={[
        { value: 'red', label: 'Red Color' },
        { value: 'blue', label: 'Blue Color' },
        { value: 'green', label: 'Green Color' },
      ]}
      defaultValue="red"
      title="Select Color"
      colorScheme={COLOR_SCHEME.PURPLE}
      onChange={value => console.info(value)}
    />

    <div style={{ background: 'white' }}>
      <AccordionRib
        mainText={'Click me and expand'}
        isOpen={true}
        isSelfControlled={true}
      >
        <BasicDescription
          superText={'Lorem Ipsum'}
          headline={'Sit amet sentensula falgahta'}
          paragraph={
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id eros a odio hendrerit ultrices ac sed urna. Vivamus sit amet massa sit amet ante dignissim consectetur ac eu mauris. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris sit amet fermentum elit. '
          }
        />
      </AccordionRib>
    </div>
  </>
);

export default Home;
