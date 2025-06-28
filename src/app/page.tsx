'use client';
import type { ReactElement } from 'react';

import Button from '@/atoms/Button';
import { ACTION_TYPE, BUTTON_VARIANT } from '@/atoms/Button/Button.types';
import Dropdown from '@/atoms/Dropdown';
import { COLOR_SCHEME } from '@/atoms/Dropdown/Dropdown.types';
import InputField from '@/atoms/InputField';
import { INPUT_TYPE } from '@/atoms/InputField/InputField.types';
import LinksList from '@/atoms/LinksList';
import { LINK_VARIANT, LIST_LAYOUT } from '@/atoms/LinksList/LinksList.types';
import Accordion from '@/molecules/Accordion';
import InfoBox from '@/molecules/InfoBox';
import RegisterBanner from '@/molecules/RegisterBanner';
import StandaloneStoryCard from '@/molecules/StandaloneStoryCard';
import TopBar from '@/molecules/TopBar';
import Jumbotron from '@/organisms/Jumbotron';
import mockCover from '@/public/mockImages/mockCover.jpg';
import mockImageOne from '@/public/mockImages/mockTile-01.jpg';
import mockImageTwo from '@/public/mockImages/mockTile-02.jpg';
import mockImageThree from '@/public/mockImages/mockTile-03.jpg';
import mockImageFour from '@/public/mockImages/mockTile-04.jpg';
import mockImageFive from '@/public/mockImages/mockTile-05.jpg';
import mockImageSix from '@/public/mockImages/mockTile-06.jpg';
import mockImageSeven from '@/public/mockImages/mockTile-07.jpg';

import { Paragraph } from '../components/atoms/Paragraph/Paragraph';

const Home = (): ReactElement => (
  <>
    <TopBar />
    <Jumbotron />
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
      <Accordion
        ribsList={[
          {
            mainText: 'Lorem ipsum',
            children: (
              <Paragraph>
                Ut lacinia a turpis eget hendrerit. Ut velit quam, pharetra non
                dapibus et, commodo tincidunt turpis. Etiam eget cursus leo.
                Integer suscipit arcu est, sed porttitor diam cursus eu. Nunc
                consequat vel lorem nec auctor. Etiam rhoncus pharetra
                facilisis. Sed porta, elit fermentum placerat mollis, odio enim
                gravida nulla, elementum finibus augue nunc nec lacus.
              </Paragraph>
            ),
            isOpen: false,
            isSelfControlled: false,
          },
          {
            mainText: 'Lorem ipsum',
            children: (
              <Paragraph>
                Morbi nunc lorem, convallis eget cursus et, auctor eget est. Sed
                nec lectus vitae arcu tincidunt euismod. Praesent porttitor
                ipsum nec justo pellentesque, non sodales dui fermentum. Proin
                tristique dolor nec gravida suscipit. In placerat enim lectus,
                eu tempor lorem sagittis id. Maecenas in mattis lacus, vel
                condimentum massa.
              </Paragraph>
            ),
            isOpen: false,
            isSelfControlled: false,
          },
          {
            mainText: 'Lorem ipsum',
            children: (
              <Paragraph>
                Mauris sagittis, felis quis viverra elementum, enim sapien
                elementum mauris, id feugiat nibh mauris eget magna. Integer
                nisl nunc, congue nec quam a, tincidunt dignissim massa.
                Pellentesque lacinia, magna quis euismod sollicitudin, lorem
                quam suscipit tortor, consectetur eleifend ex erat id lectus.
                Morbi porttitor eget ipsum eget tincidunt. Nam nec pulvinar
                risus. Ut vitae dapibus orci. Sed sed vehicula elit, in
                tincidunt lacus. Quisque et metus et nulla consectetur posuere.
                Nulla convallis leo quis nulla cursus finibus. Quisque id enim
                tellus. Phasellus non posuere arcu, a tincidunt leo. Etiam quis
                nisl eu orci pretium suscipit vitae ac tellus.
              </Paragraph>
            ),
            isOpen: false,
            isSelfControlled: false,
          },
        ]}
      />
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

    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '24px',
        background: 'white',
      }}
    >
      <InputField
        type={INPUT_TYPE.TEXT}
        placeholder={'Lorem...'}
        fixedWidth={360}
        errorMessage={'Lorem'}
      />
      <InputField
        type={INPUT_TYPE.PASSWORD}
        placeholder={'Lorem...'}
        fixedWidth={560}
      />
      <InputField type={INPUT_TYPE.SEARCH} placeholder={'Lorem...'} />
    </div>

    <br />
    <br />
    <div style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
      <LinksList
        variant={LINK_VARIANT.ICON}
        layout={LIST_LAYOUT.VERTICAL}
        title="Obserwuj nas na SM"
        links={[
          {
            href: 'https://facebook.com',
            label: 'Facebook',
            icon: '/socialIcons/Facebook.svg',
          },
          {
            href: 'https://instagram.com',
            label: 'Instagram',
            icon: '/socialIcons/Instagram.svg',
          },
          {
            href: 'https://x.com',
            label: 'X',
            icon: '/socialIcons/X.svg',
          },
          {
            href: 'https://linkedin.com',
            label: 'Linked In',
            icon: '/socialIcons/LinkedIn.svg',
          },
          {
            href: 'https://youtube.com',
            label: 'Youtube',
            icon: '/socialIcons/Youtube.svg',
          },
        ]}
      />

      <LinksList
        variant={LINK_VARIANT.TEXT}
        layout={LIST_LAYOUT.VERTICAL}
        title="Przydatne linki"
        links={[
          {
            href: 'https://facebook.com',
            label: 'Facebook',
          },
          {
            href: 'https://instagram.com',
            label: 'Instagram',
          },
          {
            href: 'https://x.com',
            label: 'X',
          },
          {
            href: 'https://linkedin.com',
            label: 'Linked In',
          },
          {
            href: 'https://youtube.com',
            label: 'Youtube',
          },
        ]}
      />
    </div>

    <br />
    <br />
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <LinksList
        variant={LINK_VARIANT.ICON}
        layout={LIST_LAYOUT.HORIZONTAL}
        title="Obserwuj nas na SM"
        links={[
          {
            href: 'https://facebook.com',
            label: 'Facebook',
            icon: '/socialIcons/Facebook.svg',
          },
          {
            href: 'https://instagram.com',
            label: 'Instagram',
            icon: '/socialIcons/Instagram.svg',
          },
          {
            href: 'https://x.com',
            label: 'X',
            icon: '/socialIcons/X.svg',
          },
          {
            href: 'https://linkedin.com',
            label: 'Linked In',
            icon: '/socialIcons/LinkedIn.svg',
          },
          {
            href: 'https://youtube.com',
            label: 'Youtube',
            icon: '/socialIcons/Youtube.svg',
          },
        ]}
      />

      <LinksList
        variant={LINK_VARIANT.TEXT}
        layout={LIST_LAYOUT.HORIZONTAL}
        links={[
          {
            href: '/about',
            label: 'O nas',
          },
          {
            href: '/contact',
            label: 'Kontakt',
          },
          {
            href: '/faq',
            label: 'FAQ',
          },
        ]}
      />
    </div>
  </>
);

export default Home;
