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
        paragraph={
          <>
            Uzyskaj dostęp do&nbsp;wysokiej jakości treści dla&nbsp;najmłodszych{' '}
            <strong>za&nbsp;darmo</strong>
            <br />
            lub&nbsp;w&nbsp;pakiecie premium za&nbsp;jedyne&nbsp;19,99&nbsp;PLN.
          </>
        }
        button={{
          text: 'Wejdź do świata bajek',
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
          width: {
            widthType: WIDTH_TYPE.PX,
            widthValue: 175,
          },
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
            superText={'FAQ'}
            headline={'Najczęściej zadawane pytania'}
            paragraph={[
              'Każda historia to podróż – przez animowane ilustracje, baśniowe dźwięki i ciepły głos narratora. Wiemy, że możesz mieć pytania, zanim wyruszysz w pierwszą przygodę. Dlatego przygotowaliśmy odpowiedzi na najczęściej zadawane pytania – by rozwiać wątpliwości i zostawić miejsce tylko na... wyobraźnię.',
              'W tej sekcji znajdziesz odpowiedzi na pytania o funkcje portalu, dostępność materiałów, urządzenia i bezpieczeństwo najmłodszych. A jeśli nie znajdziesz tu odpowiedzi – napisz do nas! Jesteśmy jak dobra wróżka: zawsze chętni do pomocy.',
            ]}
          />
          <Button
            actionType={ACTION_TYPE.NAVIGATION}
            variant={BUTTON_VARIANT.RED}
            text={'Kontakt'}
            width={{
              widthType: WIDTH_TYPE.AUTO,
            }}
          />
        </Container>
        <Accordion
          ribsList={[
            {
              mainText: 'Czym jest Fabledose?',
              children: (
                <Paragraph>
                  Fabledose to cyfrowa biblioteka baśni dla dzieci – miejsce,
                  gdzie tekst spotyka się z animacją, dźwiękiem i wyobraźnią.
                  Oferujemy opowieści w trzech formach: animowanych baśni,
                  audiobooków i ebooków. Każda historia to doświadczenie
                  zaprojektowane z myślą o zmysłach dziecka. Łączymy przyjemność
                  z czytania ze światem ruchomych obrazów i narracji.
                </Paragraph>
              ),
              isOpen: false,
              isSelfControlled: false,
            },
            {
              mainText: 'Na jakich urządzeniach mogę korzystać z Fabledose?',
              children: (
                <Paragraph>
                  Fabledose działa na większości współczesnych urządzeń:
                  komputerach, tabletach i smartfonach z systemem Android lub
                  iOS. Korzystanie nie wymaga instalowania aplikacji – wystarczy
                  dostęp do przeglądarki i Internetu. Wszystkie bajki odtwarzasz
                  bezpośrednio na stronie. To wygodne rozwiązanie zarówno w
                  domu, jak i w podróży.
                </Paragraph>
              ),
              isOpen: false,
              isSelfControlled: false,
            },
            {
              mainText: 'Czy muszę płacić za dostęp do treści?',
              children: (
                <Paragraph>
                  Fabledose oferuje zarówno darmowe bajki z reklamami, jak i
                  pełny dostęp bez reklam w ramach płatnej subskrypcji. Wersja
                  premium obejmuje animowane baśnie, audiobooki oraz ebooki.
                  Najtańszy abonament kosztuje 14,99 PLN miesięcznie. Dzięki
                  temu masz nieograniczony dostęp do całej biblioteki, bez
                  przerywników.
                </Paragraph>
              ),
              isOpen: false,
              isSelfControlled: false,
            },
            {
              mainText: 'Czy bajki są odpowiednie dla różnych grup wiekowych?',
              children: (
                <Paragraph>
                  Tak – nasze historie są starannie podzielone według wieku i
                  poziomu rozwoju dziecka. Znajdziesz bajki dla maluchów,
                  przedszkolaków i starszych dzieci. Każda opowieść rozwija inne
                  kompetencje: emocjonalne, językowe czy społeczne. To
                  bezpieczna przestrzeń do odkrywania świata przez opowieści.
                </Paragraph>
              ),
              isOpen: false,
              isSelfControlled: false,
            },
            {
              mainText: 'Czy mogę korzystać z Fabledose offline?',
              children: (
                <Paragraph>
                  Tak, ale dotyczy to tylko audiobooków i ebooków dostępnych w
                  ramach subskrypcji. Można je pobrać i odtwarzać bez dostępu do
                  Internetu, np. w podróży lub wieczorem przed snem. Animowane
                  baśnie ze względu na swój charakter są dostępne wyłącznie
                  online. Już najtańszy plan abonamentowy umożliwia korzystanie
                  offline.
                </Paragraph>
              ),
              isOpen: false,
              isSelfControlled: false,
            },
            {
              mainText: 'Czy Fabledose jest bezpieczne dla dzieci?',
              children: (
                <Paragraph>
                  Tak – wszystkie treści powstają we współpracy z pedagogami i
                  autorami specjalizującymi się w literaturze dziecięcej.
                  Historie mają nie tylko rozrywkowy, ale i edukacyjny
                  charakter. Ilustratorzy dbają o każdy detal, a palety kolorów
                  oraz tempo animacji są dostosowane do dziecięcej wrażliwości.
                  Tworzymy przestrzeń przyjazną i bezpieczną.
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
