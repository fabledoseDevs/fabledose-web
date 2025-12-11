import BasicDescription from '@/atoms/BasicDescription';
import Button from '@/atoms/Button';
import {
  ACTION_TYPE,
  BUTTON_VARIANT,
  WIDTH_TYPE,
} from '@/atoms/Button/Button.types';
import Container from '@/atoms/Container';
import {
  BACKGROUND_COLOR,
  CONTAINER_ELEMENT,
  FLEX_ALIGNMENT,
  FLEX_DIRECTION,
  PADDING,
} from '@/atoms/Container/Container.types';
import Accordion from '@/molecules/Accordion';
import InfoBox from '@/molecules/InfoBox';
import RegisterBanner from '@/molecules/RegisterBanner';
import StandaloneStoryCard from '@/molecules/StandaloneStoryCard';
import TopBar from '@/molecules/TopBar';
import Footer from '@/organisms/Footer';
import Jumbotron from '@/organisms/Jumbotron';
import infoBoxImgOne from '@/public/infoBox/InfoBox-1.jpg';
import infoBoxImgTwo from '@/public/infoBox/InfoBox-2.jpg';
import infoBoxImgThree from '@/public/infoBox/InfoBox-3.jpg';
import mockCover from '@/public/mockImages/mockCover.jpg';
import mockImageOne from '@/public/mockImages/mockTile-01.jpg';
import mockImageTwo from '@/public/mockImages/mockTile-02.jpg';
import mockImageThree from '@/public/mockImages/mockTile-03.jpg';
import mockImageFour from '@/public/mockImages/mockTile-04.jpg';
import mockImageFive from '@/public/mockImages/mockTile-05.jpg';
import mockImageSix from '@/public/mockImages/mockTile-06.jpg';
import mockImageSeven from '@/public/mockImages/mockTile-07.jpg';

import { Paragraph } from '../../atoms/Paragraph/Paragraph';
import { LandingPageBody } from './LandingPage.styled';
import type { LandingPage as LandingPageType } from './LandingPage.types';

export const LandingPage: LandingPageType = ({
  dict,
  dictCommon,
  dictFooter,
}) => (
  <LandingPageBody>
    <TopBar dict={dictCommon} />

    <Container
      containerType={CONTAINER_ELEMENT.HEADER}
      backgroundColor={BACKGROUND_COLOR.PURPLE}
    >
      <Jumbotron
        logo={false}
        headline={dict.jumbotron.headline}
        paragraph={
          <span
            dangerouslySetInnerHTML={{ __html: dict.jumbotron.paragraph }}
          />
        }
        button={{
          text: dict.jumbotron.button,
          actionType: ACTION_TYPE.NAVIGATION,
          variant: BUTTON_VARIANT.RED,
          payload: '#',
          width: {
            widthType: WIDTH_TYPE.AUTO,
          },
        }}
      />
    </Container>

    <Container
      containerType={CONTAINER_ELEMENT.SECTION}
      backgroundColor={BACKGROUND_COLOR.PURPLE}
      maxWidth={1440}
      verticalPadding={PADDING.DOUBLE}
      mobilePadding={true}
    >
      <StandaloneStoryCard
        descriptionData={{
          superText: dict.freeStory.superText,
          headline: dict.freeStory.title,
          paragraph: dict.freeStory.paragraph,
        }}
        buttonData={{
          actionType: ACTION_TYPE.NAVIGATION,
          variant: BUTTON_VARIANT.RED,
          text: dict.freeStory.button,
          payload: '/',
          width: {
            widthType: WIDTH_TYPE.PX,
            widthValue: 175,
          },
        }}
        imageData={{
          src: mockCover.src,
          alt: 'Free story!',
        }}
      />
    </Container>

    <Container
      containerType={CONTAINER_ELEMENT.SECTION}
      backgroundColor={BACKGROUND_COLOR.PURPLE}
      flexDirection={FLEX_DIRECTION.ROW}
      maxWidth={1440}
      verticalPadding={PADDING.DOUBLE}
    >
      {[
        { img: infoBoxImgOne, data: dict.infoBox.one },
        { img: infoBoxImgTwo, data: dict.infoBox.two },
        { img: infoBoxImgThree, data: dict.infoBox.three },
      ].map(({ img, data }, idx) => (
        <InfoBox
          key={`info-box-${idx}`}
          imageData={{
            src: img.src,
            alt: data.picAlt,
          }}
          title={data.title}
          description={data.description}
        />
      ))}
    </Container>

    <Container
      containerType={CONTAINER_ELEMENT.SECTION}
      backgroundColor={BACKGROUND_COLOR.PURPLE}
    >
      <RegisterBanner
        title={dict.registerBanner.title}
        covers={[
          {
            imageUrl: mockImageOne.src,
            fableTitle: 'Złotowłosa',
            fableId: 'zlotowlosa-i-trzy-misie-1',
          },
          {
            imageUrl: mockImageTwo.src,
            fableTitle: 'Trzy małe świnki',
            fableId: 'trzy-male-swinki-1',
          },
          {
            imageUrl: mockImageThree.src,
            fableTitle: 'O rybaku i złotej rybce',
            fableId: 'o-rybaku-i-zlotej-rybce-1',
          },
          {
            imageUrl: mockImageFour.src,
            fableTitle: 'Złotowłosa',
            fableId: 'zlotowlosa-i-trzy-misie-2',
          },
          {
            imageUrl: mockImageFive.src,
            fableTitle: 'Trzy małe świnki',
            fableId: 'trzy-male-swinki-2',
          },
          {
            imageUrl: mockImageSix.src,
            fableTitle: 'O rybaku i złotej rybce',
            fableId: 'o-rybaku-i-zlotej-rybce-2',
          },
          {
            imageUrl: mockImageSeven.src,
            fableTitle: 'Trzy małe świnki',
            fableId: 'trzy-male-swinki-3',
          },
        ]}
      />
    </Container>

    <Container
      containerType={CONTAINER_ELEMENT.SECTION}
      backgroundColor={BACKGROUND_COLOR.WHITE}
      flexDirection={FLEX_DIRECTION.ROW}
      mobilePadding={true}
    >
      <Container
        containerType={CONTAINER_ELEMENT.DIV}
        maxWidth={1440}
        flexDirection={FLEX_DIRECTION.ROW}
        verticalPadding={PADDING.DOUBLE}
        justifyContent={FLEX_ALIGNMENT.START}
      >
        <Container
          containerType={CONTAINER_ELEMENT.DIV}
          gap={true}
          justifyContent={FLEX_ALIGNMENT.START}
        >
          <BasicDescription
            superText={dict.faqSection.superText}
            headline={dict.faqSection.headline}
            paragraph={[
              dict.faqSection.paragraph[0],
              dict.faqSection.paragraph[1],
            ]}
          />
          <Button
            actionType={ACTION_TYPE.NAVIGATION}
            variant={BUTTON_VARIANT.RED}
            text={dict.faqSection.button}
            width={{
              widthType: WIDTH_TYPE.AUTO,
            }}
          />
        </Container>
        <Accordion
          ribsList={[
            {
              mainText: dict.faq[0].question,
              children: <Paragraph>{dict.faq[1].answer}</Paragraph>,
              isOpen: false,
              isSelfControlled: false,
            },
            {
              mainText: dict.faq[1].question,
              children: <Paragraph>{dict.faq[1].answer}</Paragraph>,
              isOpen: false,
              isSelfControlled: false,
            },
            {
              mainText: dict.faq[2].question,
              children: <Paragraph>{dict.faq[2].answer}</Paragraph>,
              isOpen: false,
              isSelfControlled: false,
            },
            {
              mainText: dict.faq[3].question,
              children: <Paragraph>{dict.faq[3].answer}</Paragraph>,
              isOpen: false,
              isSelfControlled: false,
            },
            {
              mainText: dict.faq[4].question,
              children: <Paragraph>{dict.faq[4].answer}</Paragraph>,
              isOpen: false,
              isSelfControlled: false,
            },
            {
              mainText: dict.faq[5].question,
              children: <Paragraph>{dict.faq[5].answer}</Paragraph>,
              isOpen: false,
              isSelfControlled: false,
            },
          ]}
        />
      </Container>
    </Container>

    <Container
      containerType={CONTAINER_ELEMENT.FOOTER}
      backgroundColor={BACKGROUND_COLOR.DARK_PURPLE}
    >
      <Footer dict={dictFooter} />
    </Container>
  </LandingPageBody>
);
