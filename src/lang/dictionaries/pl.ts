import type { DictionaryType } from './lang.types';

export const DictionaryPL: DictionaryType = {
  common: {
    login: 'Zaloguj się',
    logout: 'Wyloguj się',
    register: 'Załóż konto',
    cancel: 'Anuluj',
  },
  maintenance: {
    headline: 'Planowana premiera Q2 2026',
    paragraph: `Nasza nowa strona jest obecnie w budowie.<br />Do czasu premiery zapraszamy do zapoznania się z naszymi baśniami<br />na stronie demonstracyjnej.`,
    button: 'Zobacz DEMO',
  },
  landingPage: {
    jumbotron: {
      headline: 'Miejsce, w którym baśnie ożywają podczas czytania',
      paragraph: `Uzyskaj dostęp do&nbsp;wysokiej jakości treści dla&nbsp;najmłodszych <strong>za&nbsp;darmo</strong><br />lub&nbsp;w&nbsp;pakiecie premium za&nbsp;jedyne&nbsp;19,99&nbsp;PLN.`,
      button: 'Wejdź do świata bajek',
    },
    freeStory: {
      superText: 'Przeczytaj bez zakładania konta',
      title: 'O Rybaku i Złotej Rybce',
      paragraph:
        'Życie rybaka wywraca się do góry nogami za sprawą złotej rybki. Czy uda mu się powstrzymać nadchodzącą katastrofę i ocalić siebie oraz swoją żonę?',
      button: 'Czytaj bajkę',
      coverDescription: 'Rybak i złota rybka',
    },
    infoBox: {
      one: {
        picAlt: '',
        title: 'Czym jest Fabledose?',
        description:
          'Fabledose jest biblioteką bajek zawierająca animowane książki, audiobooki i ebooki dla dzieci oraz dorosłych. Możesz je czytać, oglądać i słuchać za pomocą naszej strony internetowej lub aplikacji mobilnej.',
      },
      two: {
        picAlt: '',
        title: 'Edukacja i rozrywka',
        description:
          'Wszystkie treści mają wartości edykacyjne oraz rozrywkowe. Pomagają dzieciom wdrożyć się w czytelictwo i rozwijać. Są także świetnym medium do towrzenia więzi pomiędzy opiekunem a dzieckiem.',
      },
      three: {
        picAlt: '',
        title: 'Na przeciw potrzebom',
        description:
          'Fabledose jest tym, czego potrzebujesz aby dostarczyć dzieciom bezpiecznych treści, dopasowanych do potrzeb rozwojowych i oferujących świetną zabawę. Wszystko to w przystępnej cenie.',
      },
    },
    registerBanner: {
      title: `Zyskaj dostęp do bajek<br/>za darmo, już teraz`,
    },
    faqSection: {
      superText: 'FAQ',
      headline: 'Najczęściej zadawane pytania',
      paragraph: [
        'Każda historia to podróż – przez animowane ilustracje, baśniowe dźwięki i ciepły głos narratora. Wiemy, że możesz mieć pytania, zanim wyruszysz w pierwszą przygodę. Dlatego przygotowaliśmy odpowiedzi na najczęściej zadawane pytania – by rozwiać wątpliwości i zostawić miejsce tylko na... wyobraźnię.',
        'W tej sekcji znajdziesz odpowiedzi na pytania o funkcje portalu, dostępność materiałów, urządzenia i bezpieczeństwo najmłodszych. A jeśli nie znajdziesz tu odpowiedzi – napisz do nas! Jesteśmy jak dobra wróżka: zawsze chętni do pomocy.',
      ],
      button: 'Kontakt',
    },
    faq: [
      {
        question: 'Czym jest Fabledose?',
        answer:
          'Fabledose to cyfrowa biblioteka baśni dla dzieci – miejsce, gdzie tekst spotyka się z animacją, dźwiękiem i wyobraźnią. Oferujemy opowieści w trzech formach: animowanych baśni, audiobooków i ebooków. Każda historia to doświadczenie z czytania ze światem ruchomych obrazów i narracji.',
      },
      {
        question: 'Na jakich urządzeniach mogę korzystać z Fabledose?',
        answer:
          'Fabledose działa na większości współczesnych urządzeń: komputerach, tabletach i smartfonach z systemem Android lub iOS. Korzystanie nie wymaga instalowania aplikacji – wystarczy dostęp do przeglądarki i Internetu. Wszystkie bajki odtwarzasz bezpośrednio na stronie. To wygodne rozwiązanie zarówno w domu, jak i w podróży.',
      },
      {
        question: 'Czy muszę płacić za dostęp do treści?',
        answer:
          'Fabledose oferuje zarówno darmowe bajki z reklamami, jak i pełny dostęp bez reklam w ramach płatnej subskrypcji. Wersja premium obejmuje animowane baśnie, audiobooki oraz ebooki. Najtańszy abonament kosztuje 14,99 PLN miesięcznie. Dzięki temu masz nieograniczony dostęp do całej biblioteki, bez przerywników.',
      },
      {
        question: 'Czy bajki są odpowiednie dla różnych grup wiekowych?',
        answer:
          'Tak – nasze historie są starannie podzielone według wieku i poziomu rozwoju dziecka. Znajdziesz bajki dla maluchów, przedszkolaków i starszych dzieci. Każda opowieść rozwija inne kompetencje: emocjonalne, językowe czy społeczne. To bezpieczna przestrzeń do odkrywania świata przez opowieści.',
      },
      {
        question: 'Czy mogę korzystać z Fabledose offline?',
        answer:
          'Tak, ale dotyczy to tylko audiobooków i ebooków dostępnych w ramach subskrypcji. Można je pobrać i odtwarzać bez dostępu do Internetu, np. w podróży lub wieczorem przed snem. Animowane baśnie ze względu na swój charakter są dostępne wyłącznie online. Już najtańszy plan abonamentowy umożliwia korzystanie offline.',
      },
      {
        question: 'Czy Fabledose jest bezpieczne dla dzieci?',
        answer:
          'Tak – wszystkie treści powstają we współpracy z pedagogami autorami specjalizującymi się w literaturze dziecięcej. Historie mają nie tylko rozrywkowy, ale i edukacyjny charakter. Ilustratorzy dbają o każdy detal, a palety kolorów oraz tempo animacji są dostosowane do dziecięcej wrażliwości. Tworzymy przestrzeń przyjazną i bezpieczną.',
      },
    ],
  },
  logoutPage: {
    headline: 'Czy na pewno chcesz się wylogować?',
    onSuccess: 'Nastąpiło wylogowanie.',
  },
  newsletterForm: {
    paragraph:
      'Dołącz do nas na Substack aby otrzymywać newsletter lub śledzić nasz blog z informacjami o nowościach.',
    disclaimer:
      'Zapisujac się akceptujesza zasady naszej Polityki Prywatności oraz wyrażasz zgodę na otrzymywanie informacji marketingowych drogą mailową.',
  },
  footer: {
    linkList: [
      {
        title: 'Portal',
        links: [
          { title: 'Konto' },
          { title: 'Płatności' },
          { title: 'Centrum pomocy' },
        ],
      },
      {
        title: 'Firma',
        links: [
          { title: 'O nas' },
          { title: 'Współpraca' },
          { title: 'Kontakt' },
        ],
      },
      {
        title: 'Obserwuj nas',
        links: [],
      },
    ],
    legalText: '© 2025 Zespół Fabledose. Wszelkie prawa zastrzeżone.',
    legalLinks: [
      { title: 'Polityka Prywatności' },
      { title: 'Warunki Korzystania' },
      { title: 'Ustawienia Ciasteczek' },
    ],
  },
  tagIcon: {
    'age-3': {
      title: 'Wiek 3+',
      description: 'Ta bajka jest odpowiednia dla dzieci w wieku od 3 lat.',
    },
    'age-5': {
      title: 'Wiek 5+',
      description: 'Ta bajka jest odpowiednia dla dzieci w wieku od 5 lat.',
    },
    'classic-fable': {
      title: 'Klasyczna baśń',
      description: 'Ponadczasowa, tradycyjna opowieść z mądrym przesłaniem.',
    },
    'contemporary-fable': {
      title: 'Współczesna baśń',
      description: 'Nowoczesna opowieść odzwierciedlająca dzisiejsze tematy.',
    },
    responsibility: {
      title: 'Odpowiedzialność',
      description:
        'Podkreśla branie odpowiedzialności za swoje czyny i obowiązki.',
    },
    carefulness: {
      title: 'Ostrożność',
      description: 'Zachęca do bycia uważnym, ostrożnym i życzliwym.',
    },
    helpfulness: {
      title: 'Pomocność',
      description: 'Promuje życzliwość i niesienie pomocy innym w potrzebie.',
    },
    diligence: {
      title: 'Wytrwałość',
      description: 'Docenia konsekwencję, ciężką pracę i zaangażowanie.',
    },
    privacy: {
      title: 'Prywatność',
      description: 'Uczy szacunku do prywatnej przestrzeni i sekretów.',
    },
    family: {
      title: 'Rodzina',
      description: 'Skupia się na więziach, miłości i wsparciu w rodzinie.',
    },
    death: {
      title: 'Śmierć',
      description: 'Wprowadza pojęcie cyklu życia i straty.',
    },
    'toxic-relations': {
      title: 'Toksyczne relacje',
      description:
        'Ostrzega przed krzywdzącymi relacjami i uczy stawiania granic.',
    },
    moderation: {
      title: 'Umiar',
      description: 'Zachęca do równowagi i unikania skrajności.',
    },
    cooperation: {
      title: 'Współpraca',
      description: 'Pokazuje siłę pracy zespołowej i działania razem.',
    },
    reparation: {
      title: 'Naprawa szkód',
      description:
        'Skupia się na zadośćuczynieniu i przywracaniu tego, co zostało naruszone.',
    },
  },
  storyCard: {
    readButton: 'Czytaj',
    audiobookButton: 'Audiobook',
    downloadCta: 'Pobierz ebook',
    pdfButton: 'Ilustrowany PDF',
    epubButton: 'ePUB',
    unlockCta:
      'Ulepsz konto i uzyskaj dostęp do bajek w formie audiobooków oraz ebooków.',
    unlockButton: 'Zmień typ konta',
    infoDisclaimer:
      'Sprawdź ikony poniżej lub naciśnij przycisk "Więcej infomacji" aby upewnić się, czy ta historyjka jest odpowiednia dla twojego dziecka',
    moreInfoButton: 'Więcej informacji',
  },
};
