import type { DictionaryType } from './lang.types';

export const DictionaryPL: DictionaryType = {
  helpCenter: {
    title: 'Centrum pomocy',
    intro:
      'Jak możemy pomóc? Zacznij od krótkich odpowiedzi albo wybierz artykuł. Wszystkie poradniki i informacje prawne są dostępne bez logowania.',
    home: 'Strona główna',
    open: 'Otwórz centrum pomocy',
    faqTitle: 'Najczęstsze pytania',
    articlesTitle: 'Artykuły i poradniki',
    guides: 'Konto i korzystanie z Fabledose',
    project: 'O projekcie i kontakt',
    legal: 'Prywatność i zasady',
    other: 'Pozostałe artykuły',
    contactTitle: 'Nie znalazłeś odpowiedzi?',
    contactDescription:
      'Opisz problem i napisz do nas. W artykule kontaktowym znajdziesz adres oraz wskazówki, co warto podać w zgłoszeniu.',
    contactButton: 'Kontakt',
    faq: [
      {
        question: 'Czy muszę płacić, żeby korzystać z Fabledose?',
        answer:
          'Nie. Free obejmuje selekcję bajek i audiobooków, obecnie wszystkie opublikowane tytuły. Płatności nie są jeszcze uruchomione; zmiana planu służy testowaniu funkcji.',
      },
      {
        question: 'Jak mogę się zalogować?',
        answer:
          'Za pomocą adresu e-mail i hasła albo przez Google. Jeśli zapomnisz hasła do konta e-mail, użyj odzyskiwania na ekranie logowania. Apple Sign In jest planowane.',
      },
      {
        question: 'Ile profili dzieci mogę utworzyć?',
        answer:
          'Family pozwala utworzyć do 6 profili dzieci, Ultimate nie ogranicza ich liczby. Free nie udostępnia profili dzieci ani kontroli rodzicielskiej. Obniżenie planu nie usuwa zapisanych profili.',
      },
      {
        question: 'Czym różnią się SD, HD i 2K?',
        answer:
          'SD to 720p, HD to 1080p. HD jest dostępne od Family, a 2K w Ultimate. Do czasu dodania QHD opcja 2K odtwarza HD. AUTO dopasowuje obraz do ekranu w granicach planu.',
      },
      {
        question: 'Jak wrócić do przerwanej bajki?',
        answer:
          'Po zalogowaniu wybierz właściwy profil i opcję kontynuowania. Czytanie i słuchanie mają osobne zapisy postępu. Okrągły przycisk „Czytaj od nowa” rozpoczyna czytanie od początku.',
      },
      {
        question: 'Dlaczego bajka jest niedostępna dla dziecka?',
        answer:
          'Sprawdź wykluczenia tej bajki i harmonogram profilu, także strefę czasową. PIN rodzicielski nie jest jeszcze dostępny; te ustawienia nie zastępują nadzoru opiekuna.',
      },
      {
        question: 'Czy mogę pobrać bajkę lub słuchać offline?',
        answer:
          'Ebooki PDF i EPUB są przewidziane w Family i Ultimate, ale wymagają dodania plików. Animacje i audiobooki na stronie potrzebują Internetu; pobieranie audiobooków offline nie jest dostępne.',
      },
      {
        question: 'Jak zgłosić błąd lub poprosić o usunięcie konta?',
        answer:
          'Napisz na fabledose@gmail.com. Przy błędzie podaj bajkę lub ekran, język i przeglądarkę. W sprawie konta użyj przypisanego e-maila. Nie wysyłaj hasła; automatyczne usuwanie konta jest jeszcze odłożone.',
      },
    ],
  },
  planAccess: {
    title: 'Ta opcja wymaga innego planu',
    allPlans: 'Zobacz wszystkie plany',
    close: 'Zamknij',
    story:
      'Ta bajka nie należy do selekcji planu Free. Pełna biblioteka i bajki sezonowe są dostępne w Family oraz Ultimate.',
    ebooks:
      'Pobieranie ebooków PDF i EPUB jest dostępne w planach Family i Ultimate.',
    parental:
      'Profile dzieci i kontrola rodzicielska są dostępne w planach Family i Ultimate. Free obejmuje jedno konto użytkownika.',
    profiles:
      'Plan Family pozwala utworzyć do 6 profili dzieci. Ultimate nie ma limitu liczby profili.',
    ebookPendingTitle: 'Ebook jest w przygotowaniu',
    ebookPending:
      'Ten format jest dostępny w Twoim planie, ale plik tej bajki nie został jeszcze dodany.',
    manageProfiles: 'Profile dzieci i kontrola rodzicielska',
  },
  childProfiles: {
    noAvailableStories: 'Dla tego profilu nie ma obecnie dostępnych bajek.',
    availability: 'Dostępność dla dzieci',
    available: 'Dostępna',
    excluded: 'Wykluczona',
    hours: 'Godziny dostępu',
    scheduleEnabled: 'Ogranicz godziny dostępu',
    weekdays: 'Dni robocze',
    weekends: 'Weekend',
    allowedDay: 'Dostęp w te dni',
    start: 'Od',
    end: 'Do',
    timeZone: 'Strefa czasowa',
    scheduleHint:
      'Godzina końcowa musi być późniejsza od początkowej. Koniec przedziału zatrzymuje bajkę. Wyłączony dzień oznacza brak dostępu.',
    blockedExcluded: 'Ta bajka jest wykluczona dla wybranego profilu.',
    blockedHours:
      'Teraz jest czas na przerwę. Bajki będą dostępne w godzinach ustawionych dla tego profilu.',
    unprotected:
      'Wykluczenia i godziny działają w aplikacji. PIN nie jest uruchomiony — przełączanie profili i zmiana ustawień nie są jeszcze chronione.',
    policyError:
      'Nie udało się zapisać ustawień. Sprawdź godziny i strefę czasową, a następnie spróbuj ponownie.',
    backLibrary: 'Wróć do biblioteki',

    title: 'Profile dzieci',
    parent: 'Rodzic',
    add: 'Dodaj profil',
    edit: 'Edytuj',
    remove: 'Usuń profil',
    createTitle: 'Nowy profil dziecka',
    editTitle: 'Edytuj profil dziecka',
    name: 'Imię lub pseudonim',
    placeholder: 'Wpisz imię…',
    avatar: 'Wybierz awatar',
    age: 'Przedział wiekowy',
    unspecified: 'Nie podano',
    cancel: 'Anuluj',
    save: 'Zapisz',
    confirmTitle: 'Usunąć profil?',
    confirmBody:
      'Usunięcie obejmie ulubione i postępy tego dziecka. Nie można tego cofnąć.',
    loading: 'Wczytywanie profili…',
    saving: 'Zapisywanie…',
    error: 'Nie udało się wczytać lub zapisać profili. Spróbuj ponownie.',
    retry: 'Spróbuj ponownie',
    empty:
      'Dodaj pierwszy profil dziecka. Każde dziecko będzie miało własne ulubione i postępy.',
    signIn: 'Zaloguj się, aby zarządzać profilami dzieci.',
    pick: 'Wybierz profil',
    close: 'Zamknij',
    deleting: 'Usuwanie niedokończone — ponów',
    parentalDeferred:
      'Wykluczenia i godziny działają w aplikacji. PIN nie jest uruchomiony — przełączanie profili i zmiana ustawień nie są jeszcze chronione.',
    legacy: 'Dotychczasowe ulubione i postępy pozostają w profilu rodzica.',
  },
  common: {
    login: 'Zaloguj się',
    logout: 'Wyloguj się',
    register: 'Załóż konto',
    cancel: 'Anuluj',
    read: 'Czytaj',
    readFable: 'Czytaj bajkę',
  },
  maintenance: {
    headline: `Planowana premiera:<br />I kwartał 2027`,
    paragraph:
      'Pracujemy nad Fabledose. Nasza nowa strona jest obecnie w budowie.',
    accessTitle: 'Dostęp testowy',
    accessPassword: 'Hasło dostępu',
    accessSubmit: 'Odblokuj',
    accessError: 'Nieprawidłowe hasło lub brak połączenia. Spróbuj ponownie.',
    planFailed:
      'Nie udało się zmienić planu. Poprzedni plan pozostaje aktywny. Spróbuj ponownie.',
    planSaved: 'Plan testowy został zmieniony.',
  },
  notFoundPage: {
    headline: 'Wygląda na to, że zgubiłeś drogę.',
    subtitle: '(Taka strona nie istnieje)',
    button: 'Wróć',
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
          'Plan Free zapewnia selekcję bajek z animacjami w SD, oraz audiobookami. Na start selekcja obejmuje wszystkie obecne bajki. Family i Ultimate obejmują całą bibliotekę, w tym bajki sezonowe, oraz ebooki PDF i EPUB po dodaniu plików. Family pozwala utworzyć do 6 profili dzieci, a Ultimate nie ogranicza ich liczby.',
      },
      {
        question: 'Czy bajki są odpowiednie dla różnych grup wiekowych?',
        answer:
          'Tak – nasze historie są starannie podzielone według wieku i poziomu rozwoju dziecka. Znajdziesz bajki dla maluchów, przedszkolaków i starszych dzieci. Każda opowieść rozwija inne kompetencje: emocjonalne, językowe czy społeczne. To bezpieczna przestrzeń do odkrywania świata przez opowieści.',
      },
      {
        question: 'Czy mogę korzystać z Fabledose offline?',
        answer:
          'Animowane bajki i audiobooki odtwarzane na stronie wymagają Internetu. Plany Family i Ultimate obejmują pobieranie ebooków PDF i EPUB, które po pobraniu można czytać offline. Pliki ebooków są w przygotowaniu; jeżeli plik nie jest jeszcze dostępny, aplikacja wyświetli informację.',
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
    legalText: `© ${new Date().getFullYear()} Zespół Fabledose. Wszelkie prawa zastrzeżone.`,
    legalLinks: [
      { title: 'Polityka Prywatności' },
      { title: 'Warunki Korzystania' },
      { title: 'Informacje o ciasteczkach' },
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
      description: 'Nowoczesna opowieść poruszająca dzisiejsze tematy.',
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
    subsidiarity: {
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
    freeEbooksNotice: {
      intro:
        'Ciesz się animowanymi bajkami oraz audiobookami bez dodatkowych opłat.',
      beforeFamily:
        'Jeżeli myślisz o pobieraniu naszych bajek w formie ebooka rozważ przejście na plan ',
      betweenPlans: ' bądź ',
      afterUltimate: '.',
      allPlans: 'Pokaż wszystkie plany',
    },
    downloading: 'Pobieranie…',
    downloadFailed:
      'Nie udało się pobrać ebooka. Sprawdź, czy jesteś zalogowany, i spróbuj ponownie.',
    readButton: 'Czytaj',
    readButtonContinue: 'Czytaj dalej',
    audiobookButton: 'Audiobook',
    downloadCta: 'Pobierz ebook',
    pdfButton: 'Ilustrowany PDF',
    epubButton: 'ePUB',
    unlockCta:
      'Wybierz Family lub Ultimate, aby uzyskać dostęp do całej biblioteki oraz ebooków PDF i EPUB.',
    unlockButton: 'Zmień typ konta',
    infoDisclaimer:
      'Sprawdź ikony poniżej lub naciśnij przycisk "Więcej infomacji" aby upewnić się, czy ta historyjka jest odpowiednia dla twojego dziecka',
    moreInfoButton: 'Więcej informacji',
  },
  userDesktop: { libraryTitle: 'Bajki w bibliotece' },
  cataloguePage: {
    headline: 'Przeszukaj katalog',
    paragraph:
      'Wpisz nazwisko autora lub tytuł bajki aby rozpocząć przeszukiwanie.',
    searchPlaceholder: 'Szukaj...',
    resultsTitle: 'Wyniki',
    titlesColumn: 'Tytuły',
    authorsColumn: 'Autorzy',
    noSelectedItem: 'Brak wybranej pozycji',
    emptyResults: 'Brak dopasowanych okładek dla obecnego zapytania.',
  },
  passwordResetPage: {
    headline: 'Odzyskaj hasło',
    description:
      'Podaj adres email użyty przy rejestracji. Wyślemy link do ustawienia nowego hasła.',
    emailLabel: 'Adres email:',
    placeholder: 'twoj@adres.email',
    submit: 'Wyślij link',
    sending: 'Wysyłanie…',
    success:
      'Jeśli konto z tym adresem istnieje, otrzymasz wiadomość z linkiem do zmiany hasła. Sprawdź również folder spam.',
    invalidEmail: 'Podaj poprawny adres email.',
    tooManyRequests: 'Zbyt wiele prób. Poczekaj chwilę i spróbuj ponownie.',
    networkError: 'Brak połączenia. Sprawdź internet i spróbuj ponownie.',
    failure: 'Nie udało się wysłać linku. Spróbuj ponownie później.',
    backToLogin: 'Wróć do logowania',
    forgotPassword: 'Nie pamiętam hasła',
  },
  registerPage: {
    flow: {
      loading: 'Ładowanie konta…',
      saving: 'Zapisywanie planu…',
      loadError: 'Nie udało się wczytać konta. Spróbuj ponownie.',
      saveError:
        'Nie udało się zapisać planu. Wybierz go ponownie, aby ponowić zapis.',
      retry: 'Spróbuj ponownie',
      paidUnavailable:
        'Na razie rejestrację można ukończyć z planem darmowym. Płatne plany będą dostępne po uruchomieniu płatności.',
    },
    form: {
      headline: 'Załóż konto',
      stepLabel: 'Krok',
      stepHighlight: '1 z 2',
      description:
        'Użyj adresu email lub skorzystaj z istniejącego konta Google, Facebook lub Apple.',
      googleButton: 'Zaloguj się przez Google',
      appleButton: 'Zaloguj się przez Apple',
      separatorLabel: 'lub',
      emailLabel: 'Adres email:',
      emailPlaceholder: 'twoj@adres.email',
      passwordLabel: 'Utwórz hasło:',
      confirmPasswordLabel: 'Powtórz hasło:',
      submitLoading: 'Przetwarzanie…',
      submit: 'Dalej',
      hasAccount: 'Masz konto?',
      loginLink: 'Zaloguj się',
      passwordMismatch: 'Hasła nie są identyczne',
      googleError: 'Wystąpił błąd podczas logowania przez Google',
      requiredEmail: 'Adres email jest wymagany',
      requiredPassword: 'Hasło jest wymagane',
      passwordMustMatch: 'Hasła muszą być identyczne',
      createAccountError: 'Nie udało się utworzyć konta',
    },
    planSelector: {
      headline: 'Skonfiguruj konto',
      stepLabel: 'Krok',
      stepHighlight: '2 z 2',
      registrationDescription:
        'Konto zostało założone. Domyślnie zostało ustawione na plan Free.<br />Jeżeli interesuje cię szerszy zakres usługi, tutaj wybierzesz konto dopasowane do Twoich oczekiwań.',
      standaloneDescription: 'Wybierz plan dopasowany do Twoich oczekiwań.',
      showDetails: 'Zobacz pełne porównanie',
      hideDetails: 'Ukryj pełne porównanie',
      backToTop: 'Powrót do góry',
      plans: {
        free: {
          title: 'Free',
          description:
            'Dostęp do selekcji animowanych bajek oraz audiobooków.\nBrak kontroli rodzicielskiej.',
          optionalParagraphs: ['Konto sponsorowane (zawiera reklamy).'],
          button: 'Wybieram Free',
        },
        family: {
          title: 'Family',
          description:
            'Dostęp do wszystkich bajek w formatach animowanych historyjek, audiobooków oraz ebooków. Animowane historyjki w jakości HD.\nKontrola rodzicielska dla maksymalnie 6 profili dzieci.',
          optionalParagraphs: [],
          button: 'Wybieram Family',
        },
        ultimate: {
          title: 'Ultimate',
          description:
            'Dostęp do wszystkich bajek w formatach animowanych historyjek, audiobooków oraz ebooków. Animowane historyjki w jakości HD oraz QHD.\nKontrola rodzicielska dla nieograniczonej liczby profili dzieci.',
          optionalParagraphs: ['Licencja na pokazy publiczne.'],
          button: 'Wybieram Ultimate',
        },
      },
      extended: {
        contentTitle: 'Dostęp do treści',
        qualityTitle: 'Jakość bajek',
        childrenTitle: 'Kontrola rodzicielska',
        licenseTitle: 'Rodzaj licencji',
        monthlyCostLabel: 'Miesięczny koszt',
        free: {
          contentParagraph: 'Dostęp do selekcji bajek:',
          contentList: ['animowana książka', 'audiobook'],
          qualityList: ['SD (720p)'],
          childrenParagraph:
            'Jedno konto. Profile dzieci i kontrola rodzicielska wyłączone.',
          licenseParagraph:
            'Licencja na pokazy prywatne w gronie najbliższej rodziny.',
        },
        family: {
          contentParagraph: 'Wszystkie bajki, również sezonowe:',
          contentList: ['animowana książka', 'audiobook', 'ebook PDF i EPUB'],
          qualityList: ['SD (720p)', 'HD (1080p)'],
          childrenParagraph: 'Do 6 profili dzieci i kontrola rodzicielska.',
          licenseParagraph:
            'Licencja na pokazy prywatne w gronie najbliższej rodziny.',
        },
        ultimate: {
          contentParagraph: 'Wszystkie bajki, również sezonowe:',
          contentList: ['animowana książka', 'audiobook', 'ebook PDF i EPUB'],
          qualityList: ['SD (720p)', 'HD (1080p)', 'QHD (2K)'],
          childrenParagraph:
            'Nieograniczona liczba profili dzieci i kontrola rodzicielska.',
          licenseParagraph: 'Licencja na pokazy prywatne i publiczne.',
        },
      },
    },
  },
  storyDetails: {
    close: 'Zamknij',
    tags: 'Tematy i oznaczenia',
    comment: 'Komentarz',
    synopsis: 'Streszczenie',
    guidance:
      'Zapoznaj się ze streszczeniem bajki, jeżeli masz wątpliwości, czy ta bajka jest odpowiednia dla twojego dziecka.',
    spoilers: 'Poniżej znajdziesz pełną fabułę wraz z zakończeniem.',
  },
  audiobook: {
    close: 'Zamknij odtwarzacz',
    progress: 'Postęp odsłuchu',
    speed: 'Prędkość odtwarzania',
    backward: 'Cofnij o 10 sekund',
    forward: 'Przewiń o 10 sekund',
    play: 'Odtwórz audiobook',
    pause: 'Wstrzymaj audiobook',
    playbackFailed:
      'Nie udało się odtworzyć nagrania. Spróbuj ponownie lub wróć do bajki.',
    loading: 'Wczytywanie miejsca odsłuchu…',
    loadFailed: 'Nie udało się wczytać miejsca odsłuchu.',
    saving: 'Zapisywanie miejsca odsłuchu…',
    saveFailed: 'Nie udało się zapisać miejsca odsłuchu.',
    unavailable: 'Nagranie nie jest jeszcze dostępne w tym języku.',
  },
  librarySync: {
    favoritesTitle: 'Ulubione',
    favoritesDescription: 'Twoje ulubione historie w jednym miejscu',
    continuingTitle: 'Kontynuuj czytanie',
    myFavorites: 'Moje ulubione',
    empty: 'Brak zapisanych historii. Dodaj ulubioną bajkę lub zacznij czytać.',
    loading: 'Wczytywanie zapisanych historii…',
    loadFailed: 'Nie udało się wczytać zapisanych historii.',
    refresh: 'Odśwież',
    savingProgress: 'Zapisywanie postępu…',
    progressFailed: 'Nie udało się zapisać postępu czytania.',
    retrySave: 'Ponów zapis',
    favoriteFailed: 'Nie udało się zapisać zmiany w ulubionych.',
    favoriteAdded: 'Dodano do ulubionych',
    favoriteRemoved: 'Usunięto z ulubionych',
    addFavorite: 'Dodaj do ulubionych',
    removeFavorite: 'Usuń z ulubionych',
    resetProgress: 'Czytaj od nowa',
    progressLoadFailed: 'Nie udało się wczytać miejsca, na którym skończyłeś.',
    loadingProgress: 'Wczytywanie postępu czytania…',
    savingFavorite: 'Zapisywanie ulubionych…',
  },
  settingsPage: {
    accountSecurity: {
      deletionIncomplete:
        'Usuwanie nie zostało ukończone. Konto jest oznaczone do usunięcia i zapisy mogą być zablokowane. Ponów usuwanie; jeśli błąd się powtarza, skontaktuj się z pomocą.',
      cancel: 'Anuluj',
      close: 'Zamknij',
      working: 'Trwa operacja…',
      currentPassword: 'Obecne hasło',
      newEmail: 'Nowy adres email',
      newPassword: 'Nowe hasło',
      confirmPassword: 'Potwierdź nowe hasło',
      googleConfirmation: 'Potwierdzisz swoją tożsamość w oknie Google.',
      confirmDeletion:
        'Rozumiem, że konto zostanie trwale usunięte, a ulubione, postępy czytania i ustawienia zostaną wyczyszczone.',
      required: 'Wypełnij wymagane pola.',
      invalidEmail: 'Podaj poprawny adres email.',
      sameEmail: 'To jest Twój obecny adres email.',
      mismatch: 'Nowe hasło i potwierdzenie muszą być identyczne.',
      wrongPassword: 'Obecne hasło jest niepoprawne.',
      weakPassword:
        'Hasło nie spełnia wymagań Firebase. Wybierz silniejsze hasło.',
      emailInUse: 'Ten adres email jest już używany.',
      recentLogin: 'Potwierdź ponownie swoją tożsamość i spróbuj jeszcze raz.',
      popupCancelled:
        'Potwierdzenie Google zostało anulowane. Możesz spróbować ponownie.',
      popupBlocked: 'Zezwól na wyskakujące okno Google i spróbuj ponownie.',
      accountChanged:
        'Konto zmieniło się w trakcie operacji. Otwórz formularz ponownie.',
      tooManyRequests: 'Zbyt wiele prób. Poczekaj i spróbuj ponownie.',
      networkError: 'Sprawdź połączenie z internetem i spróbuj ponownie.',
      serviceUnavailable:
        'Usługa usuwania konta jest niedostępna. Spróbuj ponownie później.',
      unsupported:
        'Ta metoda logowania nie obsługuje jeszcze potwierdzania tożsamości.',
      failure: 'Nie udało się wykonać operacji. Spróbuj ponownie.',
      emailConfirmed: 'Potwierdzony adres email został zaktualizowany.',
      checkEmail: 'Sprawdź potwierdzenie',
      email: {
        title: 'Zmiana adresu email',
        description:
          'Potwierdź tożsamość, a następnie kliknij link wysłany na nowy adres. Do potwierdzenia obowiązuje obecny adres.',
        submit: 'Zmień email',
        success:
          'Wysłaliśmy link na nowy adres. Po jego kliknięciu wróć tutaj i sprawdź potwierdzenie.',
      },
      password: {
        title: 'Zmiana hasła',
        description: 'Potwierdź tożsamość i ustaw nowe hasło.',
        submit: 'Zmień hasło',
        success: 'Hasło zostało zmienione.',
      },
      delete: {
        title: 'Trwałe usunięcie konta',
        description:
          'Tej operacji nie można cofnąć. Po usunięciu konta Firebase automatycznie rozpocznie sprzątanie jego danych.',
        submit: 'Usuń konto trwale',
        success: 'Konto zostało usunięte.',
      },
    },
    title: 'Ustawienia',
    tabs: {
      profile_n_account: 'Profil i konto',
      parental_control: 'Kontrola rodzicielska',
      display_n_audio: 'Ekran i dźwięk',
      notifications: 'Powiadomienia',
      privacy_n_data: 'Prywatność i dane',
      support_n_feedback: 'Pomoc i opinie',
      info: 'Informacje',
    },
    profile_n_account: {
      displayName: {
        label: 'Nazwa wyświetlana',
        infoTitle: 'Nazwa wyświetlana',
        infoDescription: 'Ta nazwa będzie widoczna dla innych użytkowników.',
      },
      email: {
        label: 'Adres Email',
        infoTitle: 'Adres Email',
        infoDescription: 'Twój adres email służy do logowania i komunikacji.',
        verificationEmailSent:
          'Na podany adres wysłaliśmy email weryfikacyjny. Ta zmiana zostanie zatwierdzona tylko w przypadku kliknięcia w link potwierdzający w wysłanej wiadomości email.',
      },
      password: {
        label: 'Hasło',
        infoTitle: 'Hasło',
        infoDescription: 'Używaj silnego hasła, aby chronić swoje konto.',
        changeButton: 'Zmień hasło',
        modalTitle: 'Zmiana hasła',
        modalDescription:
          'Ze względów bezpieczeństwa najpierw potwierdź obecne hasło.',
        currentPasswordLabel: 'Obecne hasło',
        newPasswordLabel: 'Nowe hasło',
        confirmPasswordLabel: 'Potwierdź nowe hasło',
        okButton: 'OK',
        cancelButton: 'Anuluj',
        validationRequired: 'Wszystkie pola hasła są wymagane.',
        validationMismatch: 'Nowe hasło i potwierdzenie muszą być identyczne.',
        updateSuccess: 'Hasło zostało zaktualizowane.',
        wrongCurrentPassword: 'Obecne hasło jest niepoprawne.',
        recentLoginRequired:
          'Sesja wygasła. Zaloguj się ponownie i spróbuj jeszcze raz.',
        updateFailed: 'Nie udało się zaktualizować hasła.',
      },
      plan: {
        label: 'Plan',
        infoTitle: 'Plan subskrypcji',
        infoDescription: 'Informacje o Twoim aktualnym planie subskrypcji.',
        changeButton: 'Zmień plan',
        modalTitle: 'Wybierz plan',
        modalDescription: 'Wybierz plan, którego chcesz używać na tym koncie.',
        free: 'Bezpłatny',
        family: 'Rodzinny',
        ultimate: 'Ultimate',
      },
      creditCard: {
        label: 'Karta płatnicza',
        infoTitle: 'Karta płatnicza',
        infoDescription: 'Twoja metoda płatności za subskrypcję.',
      },
      language: {
        label: 'Język',
        infoTitle: 'Język',
        infoDescription: 'Zmień język aplikacji.',
      },
      deleteAccount: {
        deferredNotice:
          'Usuwanie konta będzie dostępne w późniejszym etapie testów.',
        label: 'Usuwanie konta',
        infoTitle: 'Usuwanie konta',
        infoDescription: 'Trwale usuń swoje konto i wszystkie dane.',
        buttonText: 'Usuń',
      },
    },
    parental_control: {
      status: {
        label: 'Status:',
        infoTitle: 'Status kontroli rodzicielskiej',
        infoDescription: 'Włącz lub wyłącz kontrolę rodzicielską.',
      },
      pin: {
        label: 'PIN:',
        infoTitle: 'PIN',
        infoDescription: 'Kod PIN zabezpieczający ustawienia.',
      },
      screenLimit: {
        label: 'Limit ekranowy:',
        infoTitle: 'Limit ekranowy',
        infoDescription: 'Dzienny limit czasu spędzonego przed ekranem.',
      },
      excludeHours: {
        label: 'Wyklucz godziny:',
        infoTitle: 'Wyklucz godziny',
        infoDescription:
          'Godziny, w których korzystanie z aplikacji jest zablokowane.',
      },
      ads: {
        label: 'Reklamy:',
        infoTitle: 'Reklamy',
        infoDescription: 'Zarządzaj wyświetlaniem reklam.',
      },
      profiles: {
        label: 'Profile dzieci:',
        infoTitle: 'Profile dzieci',
        infoDescription: 'Zarządzaj profilami swoich dzieci.',
      },
    },
    display_n_audio: {
      fontSize: {
        label: 'Rozmiar czcionki:',
        infoTitle: 'Rozmiar czcionki',
        infoDescription: 'Dostosuj wielkość tekstu w bajkach.',
      },
      fontFamily: {
        label: 'Rodzaj czcionki:',
        infoTitle: 'Rodzaj czcionki',
        infoDescription: 'Wybierz krój pisma, który najlepiej Ci się czyta.',
      },
      textBackground: {
        label: 'Tło tekstu:',
        infoTitle: 'Tło tekstu',
        infoDescription: 'Wybierz kolor tła pod tekstem.',
        options: {
          none: 'brak',
          light: 'jasne',
          dark: 'ciemne',
        },
      },
      backgroundIntensity: {
        label: 'Intensywność tła:',
        infoTitle: 'Intensywność tła',
        infoDescription: 'Dostosuj przezroczystość tła tekstu.',
      },
      storyLanguage: {
        label: 'Język bajek:',
        infoTitle: 'Język bajek',
        infoDescription:
          'Wybierz język, w którym chcesz czytać i słuchać bajek.',
      },
      illustrationAnimation: {
        label: 'Animacja ilustracji:',
        infoTitle: 'Animacja ilustracji',
        infoDescription: 'Włącz lub wyłącz ruchome elementy ilustracji.',
      },
      animationQuality: {
        label: 'Jakość animacji:',
        infoTitle: 'Jakość animacji',
        infoDescription:
          'AUTO dobiera jakość do ekranu w granicach planu. SD (720p) jest dostępne dla każdego, HD (1080p) od Family, a 2K w Ultimate. Do czasu dodania animacji 2K ta opcja odtwarza HD.',
      },
      narration: {
        label: 'Narracja:',
        infoTitle: 'Narracja',
        infoDescription: 'Włącz lub wyłącz głos lektora.',
      },
      narrationVolume: {
        label: 'Głośność narracji:',
        infoTitle: 'Głośność narracji',
        infoDescription: 'Dostosuj głośność lektora.',
      },
      backgroundMusic: {
        label: 'Muzyka w tle:',
        infoTitle: 'Muzyka w tle',
        infoDescription: 'Włącz lub wyłącz podkład muzyczny.',
      },
      musicVolume: {
        label: 'Głośność muzyki:',
        infoTitle: 'Głośność muzyki',
        infoDescription: 'Dostosuj głośność muzyki w tle.',
      },
    },
    notifications: {
      news: {
        label: 'Nowości (PUSH):',
        infoTitle: 'Powiadomienia o nowościach',
        infoDescription: 'Otrzymuj powiadomienia o nowych bajkach i funkcjach.',
      },
      payments: {
        label: 'Płatności (PUSH):',
        infoTitle: 'Powiadomienia o płatnościach',
        infoDescription:
          'Otrzymuj powiadomienia dotyczące Twoich płatności i subskrypcji.',
      },
      newsletter: {
        label: 'Newsletter:',
        buttonText: 'Substack',
        infoTitle: 'Newsletter',
        infoDescription: 'Zarządzaj swoją subskrypcją newslettera na Substack.',
      },
    },
    privacy_n_data: {
      headline: 'Prywatność i dane',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta semper venenatis. Pellentesque tempus mi in orci iaculis posuere. Nulla efficitur varius ex vel porttitor. Phasellus id magna non felis dignissim tristique et at orci. Proin mollis volutpat diam et varius. Nullam id scelerisque turpis, id ornare ipsum. Praesent ut aliquam tellus. Vivamus id arcu turpis.',
      cookies: {
        label: 'Ciasteczka:',
        infoTitle: 'Zarządzanie ciasteczkami',
        infoDescription:
          'Zdecyduj, które pliki cookies chcesz dopuścić do działania w Twojej przeglądarce.',
        functional: {
          label: 'Funkcyjne:',
          infoTitle: 'Ciasteczka funkcjonalne',
          infoDescription: 'Ciasteczka niezbędne dla funkcjonowania aplikacji.',
        },
        analytical: {
          label: 'Analityczne:',
          infoTitle: 'Ciasteczka analityczne',
          infoDescription:
            'Pomagają nam zrozumieć, jak użytkownicy korzystają z serwisu.',
        },
        marketing: {
          label: 'Marketingowe:',
          infoTitle: 'Ciasteczka marketingowe',
          infoDescription: 'Używane do dopasowania reklam do Twoich potrzeb.',
        },
        partnerA: {
          label: 'Partner A:',
          infoTitle: 'Partner A',
          infoDescription: 'Ciasteczka dostarczane przez naszego partnera A.',
        },
        partnerB: {
          label: 'Partner B:',
          infoTitle: 'Partner B',
          infoDescription: 'Ciasteczka dostarczane przez naszego partnera B.',
        },
      },
      legal: {
        headline: 'Informacje prawne i artykuły pomocy:',
        links: {
          dataAdmin: 'Administracja danych',
          privacyPolicy: 'Polityka prywatności',
          cookies: 'Ciasteczka',
          partners: 'Nasi partnerzy',
          howToEdit: 'Jak edytować bądź usunąć dane osobowe?',
        },
      },
    },
    support_n_feedback: {
      headline: 'Pomoc i feedback',
      description:
        'Znajdziesz tu instrukcje korzystania z Fabledose, informacje o koncie i odpowiedzi dotyczące bajek. Jeśli nie znajdziesz rozwiązania, napisz do nas.',
      contactButton: 'Kontakt',
      helpArticles: {
        headline: 'Artykuły pomocy:',
        links: {
          howToReadAnimated: 'Jak czytać bajki animowane? (tutorial)',
          displayAudioSettings: 'Ustawienia wyświetlania i audio',
          account: 'Konto i plany',
          paymentsRefunds: 'Płatności i zwroty',
          techSupport: 'Kontakt ze wsparciem technicznym',
          parentalControls: 'Kontrola rodzicielska',
        },
      },
      legalInfo: {
        headline: 'Informacje prawne:',
        links: {
          termsOfUse: 'Regulamin korzystania',
          privacyPolicy: 'Polityka prywatności',
          cookies: 'Ciasteczka',
        },
      },
      feedback: {
        headline: 'Feedback:',
        links: {
          sendDirectFeedback: 'Wyślij bezpośredni Feedback',
          rateApp: 'Oceń aplikację w sklepie AppStore, Sklep Play lub innej',
        },
      },
    },
    info: {
      headline: 'Informacje',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis porta semper venenatis. Pellentesque tempus mi in orci iaculis posuere. Nulla efficitur varius ex vel porttitor. Phasellus id magna non felis dignissim tristique et at orci. Proin mollis volutpat diam et varius. Nullam id scelerisque turpis, id ornare ipsum. Praesent ut aliquam tellus. Vivamus id arcu turpis.',
      companyDetails: {
        headline: 'Dane Firmy:',
        name: 'Fabledose sp. z o. o.',
        address: 'Długa 9, 01-234 Nigdziebądź',
        nip: 'NIP: 123456789',
        regon: 'REGON: 123456789',
        tel: 'Tel. +48 987654321',
      },
      appUsage: {
        headline: 'Używasz aplikacji:',
        version: 'Fabledose WEB. v 1.1',
      },
      license: {
        headline: 'Licencja:',
        copyright: 'Copyright 2025 Fabledose.',
        allRightsReserved: 'All rights reserved.',
      },
      openSource: {
        headline: 'Open Source Contributions:',
        contributors: 'GitHub, Swiper, Lorem',
      },
    },
    SettingsSwitch: {
      enabled: 'włączone',
      disabled: 'wyłączone',
    },
  },
};
