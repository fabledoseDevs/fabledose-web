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
import { useDictionary } from '@/lang/DictionaryProvider';
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

export const LandingPage: LandingPageType = () => {
  const { landingPage } = useDictionary();

  return (
    <LandingPageBody>
      <TopBar />

      <Container
        containerType={CONTAINER_ELEMENT.HEADER}
        backgroundColor={BACKGROUND_COLOR.PURPLE}
      >
        <Jumbotron
          logo={false}
          headline={landingPage.jumbotron.headline}
          paragraph={
            <span
              dangerouslySetInnerHTML={{
                __html: landingPage.jumbotron.paragraph,
              }}
            />
          }
          button={{
            text: landingPage.jumbotron.button,
            actionType: ACTION_TYPE.NAVIGATION,
            variant: BUTTON_VARIANT.RED,
            payload: '/register',
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
            superText: landingPage.freeStory.superText,
            headline: landingPage.freeStory.title,
            paragraph: landingPage.freeStory.paragraph,
          }}
          buttonData={{
            actionType: ACTION_TYPE.NAVIGATION,
            variant: BUTTON_VARIANT.RED,
            text: landingPage.freeStory.button,
            payload: '/',
            width: {
              widthType: WIDTH_TYPE.PX,
              widthValue: 175,
            },
          }}
          imageData={{
            src: mockCover.src,
            alt: landingPage.freeStory.title,
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
          { img: infoBoxImgOne, data: landingPage.infoBox.one },
          { img: infoBoxImgTwo, data: landingPage.infoBox.two },
          { img: infoBoxImgThree, data: landingPage.infoBox.three },
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
          title={landingPage.registerBanner.title}
          covers={[
            {
              imageUrl: mockImageOne.src,
              fableTitle: 'Złotowłosa',
              fableDescription:
                'Lorem ipsum dolor sit amet consectetur. Ac senectus duis et gravida vestibulum morbi. Proin ultrices egestas amet non cursus consequat.',
              fableUrl: 'zlotowlosa-i-trzy-misie-1',
              registerTile: true,
            },
            {
              imageUrl: mockImageTwo.src,
              fableTitle: 'Trzy małe świnki',
              fableUrl: 'trzy-male-swinki-1',
              fableDescription:
                'Lorem ipsum dolor sit amet consectetur. Ac senectus duis et gravida vestibulum morbi. Proin ultrices egestas amet non cursus consequat.',
              registerTile: true,
            },
            {
              imageUrl: mockImageThree.src,
              fableTitle: 'O rybaku i złotej rybce',
              fableUrl: 'o-rybaku-i-zlotej-rybce-1',
              fableDescription:
                'Lorem ipsum dolor sit amet consectetur. Ac senectus duis et gravida vestibulum morbi. Proin ultrices egestas amet non cursus consequat.',
              registerTile: true,
            },
            {
              imageUrl: mockImageFour.src,
              fableTitle: 'Złotowłosa',
              fableUrl: 'zlotowlosa-i-trzy-misie-2',
              fableDescription:
                'Lorem ipsum dolor sit amet consectetur. Ac senectus duis et gravida vestibulum morbi. Proin ultrices egestas amet non cursus consequat.',
              registerTile: true,
            },
            {
              imageUrl: mockImageFive.src,
              fableTitle: 'Trzy małe świnki',
              fableUrl: 'trzy-male-swinki-2',
              fableDescription:
                'Lorem ipsum dolor sit amet consectetur. Ac senectus duis et gravida vestibulum morbi. Proin ultrices egestas amet non cursus consequat.',
              registerTile: true,
            },
            {
              imageUrl: mockImageSix.src,
              fableTitle: 'O rybaku i złotej rybce',
              fableUrl: 'o-rybaku-i-zlotej-rybce-2',
              fableDescription:
                'Lorem ipsum dolor sit amet consectetur. Ac senectus duis et gravida vestibulum morbi. Proin ultrices egestas amet non cursus consequat.',
              registerTile: true,
            },
            {
              imageUrl: mockImageSeven.src,
              fableTitle: 'Trzy małe świnki',
              fableUrl: 'trzy-male-swinki-3',
              fableDescription:
                'Lorem ipsum dolor sit amet consectetur. Ac senectus duis et gravida vestibulum morbi. Proin ultrices egestas amet non cursus consequat.',
              registerTile: true,
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
              superText={landingPage.faqSection.superText}
              headline={landingPage.faqSection.headline}
              paragraph={[
                landingPage.faqSection.paragraph[0],
                landingPage.faqSection.paragraph[1],
              ]}
            />
            <Button
              actionType={ACTION_TYPE.NAVIGATION}
              variant={BUTTON_VARIANT.RED}
              text={landingPage.faqSection.button}
              width={{
                widthType: WIDTH_TYPE.AUTO,
              }}
            />
          </Container>
          <Accordion
            ribsList={[
              {
                mainText: landingPage.faq[0].question,
                children: <Paragraph>{landingPage.faq[1].answer}</Paragraph>,
                isOpen: false,
                isSelfControlled: false,
              },
              {
                mainText: landingPage.faq[1].question,
                children: <Paragraph>{landingPage.faq[1].answer}</Paragraph>,
                isOpen: false,
                isSelfControlled: false,
              },
              {
                mainText: landingPage.faq[2].question,
                children: <Paragraph>{landingPage.faq[2].answer}</Paragraph>,
                isOpen: false,
                isSelfControlled: false,
              },
              {
                mainText: landingPage.faq[3].question,
                children: <Paragraph>{landingPage.faq[3].answer}</Paragraph>,
                isOpen: false,
                isSelfControlled: false,
              },
              {
                mainText: landingPage.faq[4].question,
                children: <Paragraph>{landingPage.faq[4].answer}</Paragraph>,
                isOpen: false,
                isSelfControlled: false,
              },
              {
                mainText: landingPage.faq[5].question,
                children: <Paragraph>{landingPage.faq[5].answer}</Paragraph>,
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
        <Footer />
      </Container>
    </LandingPageBody>
  );
};
