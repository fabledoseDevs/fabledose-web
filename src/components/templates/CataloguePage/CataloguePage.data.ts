import type { CatalogueAuthor, CatalogueBook } from './CataloguePage.types';

/**
 * Creates a predictable mock cover path based on book order.
 */
const getCoverPath = (order: number): string => {
  const index = (order % 7) + 1;
  return `/mockImages/mockTile-0${index}.jpg`;
};

const createBook = (
  id: string,
  title: string,
  description: string,
  order: number,
): CatalogueBook => ({
  id,
  title,
  description,
  cover: getCoverPath(order),
  storyUrl: '/',
});

/**
 * Mock catalogue records for Polish search screen.
 * One object per author with nested books and existing mock cover images.
 */
export const catalogueAuthorsMock_PL: CatalogueAuthor[] = [
  {
    id: 'author-01',
    name: 'Adamski, Jan',
    books: [
      createBook(
        'book-001',
        'Akademia pana Kleksa',
        'Fantazyjna opowieść o niezwykłej szkole.',
        0,
      ),
      createBook(
        'book-002',
        'Alicja w krainie czarów',
        'Podróż przez świat pełen absurdów i magii.',
        1,
      ),
    ],
  },
  {
    id: 'author-02',
    name: 'Arno, Ilona',
    books: [
      createBook(
        'book-003',
        'Brzydkie kaczątko',
        'Klasyczna historia o odnajdywaniu siebie.',
        2,
      ),
      createBook(
        'book-004',
        'Baśnie tysiąca i jednej nocy',
        'Zbiór niezwykłych opowieści Wschodu.',
        3,
      ),
    ],
  },
  {
    id: 'author-03',
    name: 'Bielski, Jan',
    books: [
      createBook(
        'book-005',
        'Calineczka',
        'Baśniowa podróż maleńkiej bohaterki.',
        4,
      ),
      createBook(
        'book-006',
        'Czerwony kapturek',
        'Znana opowieść o odwadze i ostrożności.',
        5,
      ),
    ],
  },
  {
    id: 'author-04',
    name: 'Button, Benjamin',
    books: [
      createBook(
        'book-007',
        'Dzieci z Bullerbyn',
        'Codzienne przygody dzieci na szwedzkiej wsi.',
        6,
      ),
      createBook(
        'book-008',
        'Dziadek do orzechów',
        'Świąteczna historia pełna wyobraźni.',
        7,
      ),
    ],
  },
  {
    id: 'author-05',
    name: 'Cywil, Antoni',
    books: [
      createBook(
        'book-009',
        'Elementarz marzeń',
        'Krótka opowieść o sile dziecięcych marzeń.',
        8,
      ),
      createBook(
        'book-010',
        'Echo leśnej polany',
        'Historia o przyjaźni i odkrywaniu natury.',
        9,
      ),
    ],
  },
  {
    id: 'author-06',
    name: 'Daszyński, Piotr',
    books: [
      createBook(
        'book-011',
        'Ferdynand Wspaniały',
        'Pełna humoru opowieść o psie i jego rodzinie.',
        10,
      ),
      createBook(
        'book-012',
        'Figle liska Rudka',
        'Leśne przygody sprytnego liska.',
        11,
      ),
    ],
  },
  {
    id: 'author-07',
    name: 'Dunborow, John',
    books: [
      createBook(
        'book-013',
        'Gucio zaczarowany',
        'Przemiana chłopca i lekcja odpowiedzialności.',
        12,
      ),
      createBook(
        'book-014',
        'Góra szklana',
        'Klasyczna wyprawa po odwagę i miłość.',
        13,
      ),
    ],
  },
  {
    id: 'author-08',
    name: 'Durnham, Alice',
    books: [
      createBook(
        'book-015',
        'Historia małej syrenki',
        'Morska opowieść o poświęceniu i marzeniach.',
        14,
      ),
      createBook(
        'book-016',
        'Herbatka u kapelusznika',
        'Zwariowane spotkanie w świecie fantazji.',
        15,
      ),
    ],
  },
  {
    id: 'author-09',
    name: 'Falkowski, Leon',
    books: [
      createBook(
        'book-017',
        'Jaś i Małgosia',
        'Baśń o rodzeństwie i domku z piernika.',
        16,
      ),
      createBook(
        'book-018',
        'Jak smok uczył się latać',
        'Ciepła opowieść o pokonywaniu własnych lęków.',
        17,
      ),
    ],
  },
  {
    id: 'author-10',
    name: 'Grabiński, Mikołaj',
    books: [
      createBook(
        'book-019',
        'Kot w butach',
        'Historia o sprycie i szczęściu.',
        18,
      ),
      createBook(
        'book-020',
        'Karzeł i zaczarowany dzwon',
        'Przygoda o dotrzymywaniu obietnic.',
        19,
      ),
    ],
  },
  {
    id: 'author-11',
    name: 'Jabłoński, Wit',
    books: [
      createBook(
        'book-021',
        'Legenda o złotym smoku',
        'Miejska legenda w baśniowej odsłonie.',
        20,
      ),
      createBook(
        'book-022',
        'Lampa Aladyna',
        'Klasyczna opowieść o życzeniach i ich cenie.',
        21,
      ),
    ],
  },
  {
    id: 'author-12',
    name: 'Kowalska, Marta',
    books: [
      createBook(
        'book-023',
        'Mała księżniczka',
        'Historia empatii i siły charakteru.',
        22,
      ),
      createBook(
        'book-024',
        'Most nad chmurami',
        'Baśń o przyjaźni między światami.',
        23,
      ),
    ],
  },
  {
    id: 'author-13',
    name: 'Lis, Olga',
    books: [
      createBook(
        'book-025',
        'Noc w zaczarowanym ogrodzie',
        'Nocna przygoda pośród magicznych roślin.',
        24,
      ),
      createBook(
        'book-026',
        'Niezwykłe podróże Sindbada',
        'Morskie wyprawy pełne przygód i tajemnic.',
        25,
      ),
    ],
  },
  {
    id: 'author-14',
    name: 'Nowak, Eryk',
    books: [
      createBook(
        'book-027',
        'O krasnoludkach i sierotce Marysi',
        'Polska klasyka dla młodszych czytelników.',
        26,
      ),
      createBook(
        'book-028',
        'Opowieść wigilijna',
        'Historia przemiany serca w świątecznym czasie.',
        27,
      ),
    ],
  },
  {
    id: 'author-15',
    name: 'Orłowska, Joanna',
    books: [
      createBook(
        'book-029',
        'Piękna i bestia',
        'Baśń o tym, że dobro ukryte jest w sercu.',
        28,
      ),
      createBook(
        'book-030',
        'Podróż do wnętrza baśni',
        'Metaopowieść o bohaterach i czytelnikach.',
        29,
      ),
    ],
  },
  {
    id: 'author-16',
    name: 'Pawlik, Daniel',
    books: [
      createBook(
        'book-031',
        'Rybak i złota rybka',
        'Historia o zachłanności i jej konsekwencjach.',
        30,
      ),
      createBook(
        'book-032',
        'Rumcajs i zaczarowany las',
        'Wesoła wyprawa po leśnych ścieżkach.',
        31,
      ),
    ],
  },
  {
    id: 'author-17',
    name: 'Sadowski, Olaf',
    books: [
      createBook(
        'book-033',
        'Sekret starego zamku',
        'Zagadka ukryta w murach dawnej warowni.',
        32,
      ),
      createBook(
        'book-034',
        'Szewczyk Dratewka',
        'Baśń o odwadze i mądrych wyborach.',
        33,
      ),
    ],
  },
  {
    id: 'author-18',
    name: 'Urban, Nina',
    books: [
      createBook(
        'book-035',
        'Trzy małe świnki',
        'Znana historia o przezorności i pracy.',
        34,
      ),
      createBook(
        'book-036',
        'Tajemnica bursztynowej wyspy',
        'Przygoda na wyspie pełnej sekretów.',
        35,
      ),
    ],
  },
  {
    id: 'author-19',
    name: 'Wójcik, Helena',
    books: [
      createBook(
        'book-037',
        'Uśpiona królewna',
        'Klasyczna opowieść o klątwie i przebudzeniu.',
        36,
      ),
      createBook(
        'book-038',
        'Urodziny wróżki Zefiryny',
        'Magiczne święto i niespodziewani goście.',
        37,
      ),
    ],
  },
  {
    id: 'author-20',
    name: 'Zieliński, Karol',
    books: [
      createBook(
        'book-039',
        'Wesoły pociąg do marzeń',
        'Podróż, w której każdy wagon kryje historię.',
        38,
      ),
      createBook(
        'book-040',
        'Złota gęś',
        'Baśń o szczęściu, które przychodzi do odważnych.',
        39,
      ),
    ],
  },
];

/**
 * Mock catalogue records for English search screen.
 * One object per author with translated story titles.
 */
export const catalogueAuthorsMock_EN: CatalogueAuthor[] = [
  {
    id: 'author-01',
    name: 'Adamski, Jan',
    books: [
      createBook(
        'book-001',
        'Mister Kleks Academy',
        'A fantasy story about an extraordinary school.',
        0,
      ),
      createBook(
        'book-002',
        'Alice in Wonderland',
        'A journey through a world of wonder and absurdity.',
        1,
      ),
    ],
  },
  {
    id: 'author-02',
    name: 'Arno, Ilona',
    books: [
      createBook(
        'book-003',
        'The Ugly Duckling',
        'A classic story about finding your place.',
        2,
      ),
      createBook(
        'book-004',
        'One Thousand and One Nights',
        'A collection of legendary Eastern tales.',
        3,
      ),
    ],
  },
  {
    id: 'author-03',
    name: 'Bielski, Jan',
    books: [
      createBook(
        'book-005',
        'Thumbelina',
        'A fairy-tale journey of a tiny heroine.',
        4,
      ),
      createBook(
        'book-006',
        'Little Red Riding Hood',
        'A famous story about courage and caution.',
        5,
      ),
    ],
  },
  {
    id: 'author-04',
    name: 'Button, Benjamin',
    books: [
      createBook(
        'book-007',
        'The Children of Noisy Village',
        'Daily adventures in a cheerful village.',
        6,
      ),
      createBook(
        'book-008',
        'The Nutcracker',
        'A festive story full of imagination.',
        7,
      ),
    ],
  },
  {
    id: 'author-05',
    name: 'Cywil, Antoni',
    books: [
      createBook(
        'book-009',
        'Primer of Dreams',
        'A short tale about the power of dreams.',
        8,
      ),
      createBook(
        'book-010',
        'Echo of the Forest Meadow',
        'A story of friendship and nature.',
        9,
      ),
    ],
  },
  {
    id: 'author-06',
    name: 'Daszyński, Piotr',
    books: [
      createBook(
        'book-011',
        'Ferdinand the Magnificent',
        'A warm and funny story about a dog.',
        10,
      ),
      createBook(
        'book-012',
        'Tricks of Little Fox Rudy',
        'Forest adventures of a clever fox.',
        11,
      ),
    ],
  },
  {
    id: 'author-07',
    name: 'Dunborow, John',
    books: [
      createBook(
        'book-013',
        'Enchanted Gucio',
        'A story of change and responsibility.',
        12,
      ),
      createBook(
        'book-014',
        'The Glass Mountain',
        'A classic quest for courage and love.',
        13,
      ),
    ],
  },
  {
    id: 'author-08',
    name: 'Durnham, Alice',
    books: [
      createBook(
        'book-015',
        'The Little Mermaid',
        'A sea story about sacrifice and dreams.',
        14,
      ),
      createBook(
        'book-016',
        'Tea with the Hatter',
        'A whimsical meeting in a fantasy world.',
        15,
      ),
    ],
  },
  {
    id: 'author-09',
    name: 'Falkowski, Leon',
    books: [
      createBook(
        'book-017',
        'Hansel and Gretel',
        'A tale of siblings and a gingerbread house.',
        16,
      ),
      createBook(
        'book-018',
        'How a Dragon Learned to Fly',
        'A warm story about facing your fears.',
        17,
      ),
    ],
  },
  {
    id: 'author-10',
    name: 'Grabiński, Mikołaj',
    books: [
      createBook(
        'book-019',
        'Puss in Boots',
        'A story of wit, luck, and clever plans.',
        18,
      ),
      createBook(
        'book-020',
        'The Dwarf and the Enchanted Bell',
        'An adventure about keeping promises.',
        19,
      ),
    ],
  },
  {
    id: 'author-11',
    name: 'Jabłoński, Wit',
    books: [
      createBook(
        'book-021',
        'The Legend of the Golden Dragon',
        'A city legend in fairy-tale form.',
        20,
      ),
      createBook(
        'book-022',
        "Aladdin's Lamp",
        'A classic story about wishes and their cost.',
        21,
      ),
    ],
  },
  {
    id: 'author-12',
    name: 'Kowalska, Marta',
    books: [
      createBook(
        'book-023',
        'A Little Princess',
        'A story of empathy and character.',
        22,
      ),
      createBook(
        'book-024',
        'Bridge Above the Clouds',
        'A fairy tale of friendship between worlds.',
        23,
      ),
    ],
  },
  {
    id: 'author-13',
    name: 'Lis, Olga',
    books: [
      createBook(
        'book-025',
        'Night in the Enchanted Garden',
        'A nighttime adventure among magical plants.',
        24,
      ),
      createBook(
        'book-026',
        'The Remarkable Voyages of Sindbad',
        'Sea journeys full of mystery and wonder.',
        25,
      ),
    ],
  },
  {
    id: 'author-14',
    name: 'Nowak, Eryk',
    books: [
      createBook(
        'book-027',
        'Marysia and the Dwarfs',
        'A Polish classic for young readers.',
        26,
      ),
      createBook(
        'book-028',
        'A Christmas Carol',
        'A story of inner change in holiday time.',
        27,
      ),
    ],
  },
  {
    id: 'author-15',
    name: 'Orłowska, Joanna',
    books: [
      createBook(
        'book-029',
        'Beauty and the Beast',
        'A tale proving goodness lives within.',
        28,
      ),
      createBook(
        'book-030',
        'Journey to the Heart of a Fairy Tale',
        'A story about heroes and readers alike.',
        29,
      ),
    ],
  },
  {
    id: 'author-16',
    name: 'Pawlik, Daniel',
    books: [
      createBook(
        'book-031',
        'The Fisherman and the Golden Fish',
        'A story about greed and consequences.',
        30,
      ),
      createBook(
        'book-032',
        'Rumcajs and the Enchanted Forest',
        'A cheerful forest adventure.',
        31,
      ),
    ],
  },
  {
    id: 'author-17',
    name: 'Sadowski, Olaf',
    books: [
      createBook(
        'book-033',
        'Secret of the Old Castle',
        'A mystery hidden in ancient walls.',
        32,
      ),
      createBook(
        'book-034',
        'The Shoemaker Dratewka',
        'A tale of courage and wise choices.',
        33,
      ),
    ],
  },
  {
    id: 'author-18',
    name: 'Urban, Nina',
    books: [
      createBook(
        'book-035',
        'The Three Little Pigs',
        'A known story about diligence and planning.',
        34,
      ),
      createBook(
        'book-036',
        'Mystery of the Amber Island',
        'An island adventure full of secrets.',
        35,
      ),
    ],
  },
  {
    id: 'author-19',
    name: 'Wójcik, Helena',
    books: [
      createBook(
        'book-037',
        'Sleeping Beauty',
        'A classic story of a curse and awakening.',
        36,
      ),
      createBook(
        'book-038',
        'Birthday of Fairy Zephyrine',
        'A magical celebration with surprises.',
        37,
      ),
    ],
  },
  {
    id: 'author-20',
    name: 'Zieliński, Karol',
    books: [
      createBook(
        'book-039',
        'The Happy Train to Dreams',
        'A journey where each carriage tells a story.',
        38,
      ),
      createBook(
        'book-040',
        'The Golden Goose',
        'A tale of luck that favors the brave.',
        39,
      ),
    ],
  },
];
