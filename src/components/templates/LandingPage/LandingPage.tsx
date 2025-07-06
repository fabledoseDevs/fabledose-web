import BasicDescription from '@/atoms/BasicDescription';
import Button from '@/atoms/Button';
import { ACTION_TYPE, BUTTON_VARIANT } from '@/atoms/Button/Button.types';
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

export const LandingPage: LandingPageType = () => (
  <LandingPageBody>
    <TopBar />

    <Container
      containerType={CONTAINER_ELEMENT.HEADER}
      backgroundColor={BACKGROUND_COLOR.PURPLE}
    >
      <Jumbotron
        logo={false}
        headline={`Miejsce, w którym baśnie ożywają podczas czytania`}
        paragraph={`Uzyskaj dostęp do&nbsp;wysokiej jakości treści dla&nbsp;najmłodszych <strong>za&nbsp;darmo</strong><br />lub&nbsp;w&nbsp;pakiecie premium za&nbsp;jedyne&nbsp;19,99&nbsp;PLN.`}
        button={{
          text: 'Wejdź do świata bajek',
          actionType: ACTION_TYPE.NAVIGATION,
          variant: BUTTON_VARIANT.RED,
          payload: '#',
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
          superText: 'Przeczytaj bez zakładania konta',
          headline: 'O Rybaku i Złotej Rybce',
          paragraph:
            'Życie rybaka wywraca się do góry nogami za sprawą złotej rybki. Czy uda mu się powstrzymać nadchodzącą katastrofę i ocalić siebie oraz swoją żonę?',
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
    </Container>

    <Container
      containerType={CONTAINER_ELEMENT.SECTION}
      backgroundColor={BACKGROUND_COLOR.PURPLE}
      flexDirection={FLEX_DIRECTION.ROW}
      maxWidth={1440}
      verticalPadding={PADDING.DOUBLE}
    >
      <InfoBox
        imageData={{
          src: infoBoxImgOne.src,
          alt: 'Story image description',
        }}
        title={'Czym jest Fabledose?'}
        description={
          'Fabledose jest biblioteką bajek zawierająca animowane książki, audiobooki i ebooki dla dzieci oraz dorosłych. Możesz je czytać, oglądać i słuchać za pomocą naszej strony internetowej lub aplikacji mobilnej.'
        }
      />
      <InfoBox
        imageData={{
          src: infoBoxImgTwo.src,
          alt: 'Story image description',
        }}
        title={'Edukacja i rozrywka'}
        description={
          'Wszystkie treści mają wartości edykacyjne oraz rozrywkowe. Pomagają dzieciom wdrożyć się w czytelictwo i rozwijać. Są także świetnym medium do towrzenia więzi pomiędzy opiekunem a dzieckiem.'
        }
      />
      <InfoBox
        imageData={{
          src: infoBoxImgThree.src,
          alt: 'Story image description',
        }}
        title={'Na przeciw potrzebom'}
        description={
          'Fabledose jest tym, czego potrzebujesz aby dostarczyć dzieciom bezpiecznych treści, dopasowanych do potrzeb rozwojowych i oferujących świetną zabawę. Wszystko to w przystępnej cenie.'
        }
      />
    </Container>

    <Container
      containerType={CONTAINER_ELEMENT.SECTION}
      backgroundColor={BACKGROUND_COLOR.PURPLE}
    >
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
            superText={'FAQ'}
            headline={'Najczęściej zadawane pytania'}
            paragraph={
              'Lorem ipsum dolor sit amet consectetur. Ac senectus duis et gravida vestibulum morbi. Proin ultrices egestas amet non cursus consequat.'
            }
          />
          <Button
            actionType={ACTION_TYPE.NAVIGATION}
            variant={BUTTON_VARIANT.RED}
            text={'Kontakt'}
          />
        </Container>
        <Accordion
          ribsList={[
            {
              mainText: 'Lorem ipsum',
              children: (
                <Paragraph>
                  Ut lacinia a turpis eget hendrerit. Ut velit quam, pharetra
                  non dapibus et, commodo tincidunt turpis. Etiam eget cursus
                  leo. Integer suscipit arcu est, sed porttitor diam cursus eu.
                  Nunc consequat vel lorem nec auctor. Etiam rhoncus pharetra
                  facilisis. Sed porta, elit fermentum placerat mollis, odio
                  enim gravida nulla, elementum finibus augue nunc nec lacus.
                </Paragraph>
              ),
              isOpen: false,
              isSelfControlled: false,
            },
            {
              mainText: 'Lorem ipsum',
              children: (
                <Paragraph>
                  Morbi nunc lorem, convallis eget cursus et, auctor eget est.
                  Sed nec lectus vitae arcu tincidunt euismod. Praesent
                  porttitor ipsum nec justo pellentesque, non sodales dui
                  fermentum. Proin tristique dolor nec gravida suscipit. In
                  placerat enim lectus, eu tempor lorem sagittis id. Maecenas in
                  mattis lacus, vel condimentum massa.
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
                  tincidunt lacus. Quisque et metus et nulla consectetur
                  posuere. Nulla convallis leo quis nulla cursus finibus.
                  Quisque id enim tellus. Phasellus non posuere arcu, a
                  tincidunt leo. Etiam quis nisl eu orci pretium suscipit vitae
                  ac tellus.
                </Paragraph>
              ),
              isOpen: false,
              isSelfControlled: false,
            },
            {
              mainText: 'Lorem ipsum',
              children: (
                <Paragraph>
                  Ut lacinia a turpis eget hendrerit. Ut velit quam, pharetra
                  non dapibus et, commodo tincidunt turpis. Etiam eget cursus
                  leo. Integer suscipit arcu est, sed porttitor diam cursus eu.
                  Nunc consequat vel lorem nec auctor. Etiam rhoncus pharetra
                  facilisis. Sed porta, elit fermentum placerat mollis, odio
                  enim gravida nulla, elementum finibus augue nunc nec lacus.
                </Paragraph>
              ),
              isOpen: false,
              isSelfControlled: false,
            },
            {
              mainText: 'Lorem ipsum',
              children: (
                <Paragraph>
                  Morbi nunc lorem, convallis eget cursus et, auctor eget est.
                  Sed nec lectus vitae arcu tincidunt euismod. Praesent
                  porttitor ipsum nec justo pellentesque, non sodales dui
                  fermentum. Proin tristique dolor nec gravida suscipit. In
                  placerat enim lectus, eu tempor lorem sagittis id. Maecenas in
                  mattis lacus, vel condimentum massa.
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
                  tincidunt lacus. Quisque et metus et nulla consectetur
                  posuere. Nulla convallis leo quis nulla cursus finibus.
                  Quisque id enim tellus. Phasellus non posuere arcu, a
                  tincidunt leo. Etiam quis nisl eu orci pretium suscipit vitae
                  ac tellus.
                </Paragraph>
              ),
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
