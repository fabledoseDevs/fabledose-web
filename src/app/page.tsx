'use client';
import type { ReactElement } from 'react';

import AccordionRib from '@/atoms/AccordionRib';
import BasicDescription from '@/atoms/BasicDescription';
import Button from '@/atoms/Button';
import { ACTION_TYPE, BUTTON_VARIANT } from '@/atoms/Button/Button.types';
import Dropdown from '@/atoms/Dropdown';
import { COLOR_SCHEME } from '@/atoms/Dropdown/Dropdown.types';
import InfoBox from '@/molecules/InfoBox';
import RegisterBanner from '@/molecules/RegisterBanner';
import StandaloneStoryCard from '@/molecules/StandaloneStoryCard';
import TopBar from '@/molecules/TopBar';
import mockCover from '@/public/mockImages/mockCover.jpg';
import mockImageOne from '@/public/mockImages/mockTile-01.jpg';
import mockImageTwo from '@/public/mockImages/mockTile-02.jpg';
import mockImageThree from '@/public/mockImages/mockTile-03.jpg';
import mockImageFour from '@/public/mockImages/mockTile-04.jpg';
import mockImageFive from '@/public/mockImages/mockTile-05.jpg';
import mockImageSix from '@/public/mockImages/mockTile-06.jpg';
import mockImageSeven from '@/public/mockImages/mockTile-07.jpg';

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
    <RegisterBanner
      title={`Zyskaj dostęp do bajek<br/>za darmo, już teraz`}
      covers={[
        {
          imageUrl: mockImageOne.src,
          fableTitle: 'Złotowłosa',
          fableId: 'zlotowlosa-i-trzy-misie',
        },
        {
          imageUrl: mockImageTwo.src,
          fableTitle: 'Trzy małe świnki',
          fableId: 'trzy-male-swinki',
        },
        {
          imageUrl: mockImageThree.src,
          fableTitle: 'O rybaku i złotej rybce',
          fableId: 'o-rybaku-i-zlotej-rybce',
        },
        {
          imageUrl: mockImageFour.src,
          fableTitle: 'Złotowłosa',
          fableId: 'zlotowlosa-i-trzy-misie',
        },
        {
          imageUrl: mockImageFive.src,
          fableTitle: 'Trzy małe świnki',
          fableId: 'trzy-male-swinki',
        },
        {
          imageUrl: mockImageSix.src,
          fableTitle: 'O rybaku i złotej rybce',
          fableId: 'o-rybaku-i-zlotej-rybce',
        },
        {
          imageUrl: mockImageSeven.src,
          fableTitle: 'Trzy małe świnki',
          fableId: 'trzy-male-swinki',
        },
      ]}
    />

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

    <StandaloneStoryCard
      descriptionData={{
        superText: 'Przeczytaj bez zakładania konta',
        headline: 'O Rybaku i Złotej Rybce',
        paragraph:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id eros a odio hendrerit ultrices ac sed urna. Mauris sit amet fermentum elit.',
      }}
      buttonData={{
        actionType: ACTION_TYPE.NAVIGATION,
        variant: BUTTON_VARIANT.RED,
        text: 'Czytaj bajkę',
        payload: '/',
        fixedWidth: 175,
      }}
      imageData={{
        src: mockCover.src,
        alt: 'Story image description',
      }}
    />
    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
      <InfoBox
        imageData={{
          src: mockCover.src,
          alt: 'Story image description',
        }}
        title={'Czym jest Fabledose?'}
        description={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id eros a odio.'
        }
      />
    </div>
  </>
);

export default Home;
