import type { DictionaryType } from './lang.types';

export const DictionaryEn: DictionaryType = {
  common: {
    login: 'Login',
    logout: 'Logout',
    register: 'Create account',
    cancel: 'Cancel',
    read: 'Read',
    readFable: 'Read fable',
  },
  maintenance: {
    headline: 'Q2 2026 premier',
    paragraph: `Our new website is currently under construction.<br />Until it's ready, we are looking forward to welcoming you<br />at our demo page.`,
    button: 'See DEMO',
  },
  landingPage: {
    jumbotron: {
      headline: 'Place where fairy tales come to life.',
      paragraph: `Get access to&nbsp;high quality content for&nbsp;the youngest <strong>for free</strong><br />or&nbsp;in&nbsp;premium package for&nbsp;just&nbsp;4,99&nbsp;EUR.`,
      button: 'Enter the world of fairy tales',
    },
    freeStory: {
      superText: 'Read without creating an account',
      title: 'Fisherman and his wife',
      paragraph:
        "A fisherman's life is turned upside down by a goldfish. Will he be able to avert the impending disaster and save himself and his wife?",
      button: 'Read now',
      coverDescription: 'Fisherman and the goldfish',
    },
    infoBox: {
      one: {
        picAlt: '',
        title: 'What is Fabledose?',
        description:
          'Fabledose is a story library offering animated books, audiobooks, and ebooks for children and adults. You can read, watch, and listen through our website or mobile app.',
      },
      two: {
        picAlt: '',
        title: 'Education and entertainment',
        description:
          "All our content combines educational value with fun. It helps children ease into reading and develop. It's also a great way to build a bond between a caregiver and a child.",
      },
      three: {
        picAlt: '',
        title: 'Meeting your needs',
        description:
          'Fabledose gives you safe content tailored to children’s developmental needs while offering great fun — all at an affordable price.',
      },
    },
    registerBanner: {
      title: `Get your access to fairytales<br/>for free!`,
    },
    faqSection: {
      superText: 'FAQ',
      headline: 'Frequently asked questions',
      paragraph: [
        'Every story is a journey — through animated illustrations, fairy‑tale sounds, and the warm voice of a narrator. We know you may have questions before you set off on your first adventure. That’s why we’ve prepared answers to the most common questions — to clear up doubts and leave room only for... imagination.',
        'In this section you’ll find answers about the portal’s features, content availability, devices, and children’s safety. And if you don’t find what you’re looking for — write to us! We’re like a good fairy: always happy to help.',
      ],
      button: 'Contact',
    },
    faq: [
      {
        question: 'What is Fabledose?',
        answer:
          'Fabledose is a digital library of fairy tales for children — a place where text meets animation, sound, and imagination. We offer stories in three formats: animated fairy tales, audiobooks, and ebooks. Each story is a reading experience enhanced by moving images and narration.',
      },
      {
        question: 'On which devices can I use Fabledose?',
        answer:
          "Fabledose works on most modern devices: computers, tablets, and smartphones running Android or iOS. You don't need to install an app — just a web browser and Internet access. All stories play directly on the website. It's a convenient solution both at home and on the go.",
      },
      {
        question: 'Do I have to pay to access the content?',
        answer:
          'Fabledose offers both free stories with ads and full ad-free access with a paid subscription. The premium plan includes animated fairy tales, audiobooks, and ebooks. The cheapest plan costs 14.99 PLN per month. This gives you unlimited access to the entire library, without interruptions.',
      },
      {
        question: 'Are the stories suitable for different age groups?',
        answer:
          "Yes — our stories are carefully categorized by the child's age and developmental level. You'll find tales for toddlers, preschoolers, and older children. Each story develops different skills: emotional, language, or social. It's a safe space for discovering the world through stories.",
      },
      {
        question: 'Can I use Fabledose offline?',
        answer:
          'Yes, but only for audiobooks and ebooks available within the subscription. You can download them and play them without Internet access, for example while traveling or before bedtime. Animated fairy tales, due to their nature, are available online only. Even the cheapest subscription plan allows offline use.',
      },
      {
        question: 'Is Fabledose safe for children?',
        answer:
          "Yes — all content is created in collaboration with educators and authors specializing in children's literature. The stories are not only entertaining but also educational. Our illustrators take care of every detail, and the color palettes and animation pacing are adapted to children's sensitivity. We create a friendly and safe space.",
      },
    ],
  },
  logoutPage: {
    headline: 'Are you sure you want to log out?',
    onSuccess: 'You have been logged out successfully.',
  },
  newsletterForm: {
    paragraph:
      'Join our Substack to receive our newsletter or follow our blog for updates on new content.',
    disclaimer:
      'Signing up accepts our Privacy Policy and acknowledges that we will send you marketing emails by mail.',
  },
  footer: {
    linkList: [
      {
        title: 'Portal',
        links: [{ title: 'Account' }, { title: 'Payments' }, { title: 'Help' }],
      },
      {
        title: 'Company',
        links: [
          { title: 'About us' },
          { title: 'Collaboration' },
          { title: 'Contact' },
        ],
      },
      {
        title: 'Follow us',
        links: [],
      },
    ],
    legalText: `© ${new Date().getFullYear()} Fabledose Team. All rights reserved.`,
    legalLinks: [
      { title: 'Privacy Policy' },
      { title: 'Terms of Use' },
      { title: 'Cookies' },
    ],
  },
  tagIcon: {
    'age-3': {
      title: 'Age 3',
      description: 'This fairy tale is suitable for children aged 3 and up.',
    },
    'age-5': {
      title: 'Age 5',
      description: 'This fairy tale is suitable for children aged 5 and up.',
    },
    'classic-fable': {
      title: 'Classic Fable',
      description: 'A timeless, traditional fable with enduring lessons.',
    },
    'contemporary-fable': {
      title: 'Contemporary Fable',
      description: 'A modern fable reflecting today’s themes and settings.',
    },
    responsibility: {
      title: 'Responsibility',
      description: 'Highlights taking ownership for actions and duties.',
    },
    carefulness: {
      title: 'Carefulness',
      description: 'Encourages being cautious, attentive, and considerate.',
    },
    subsidiarity: {
      title: 'Subsidiarity',
      description: 'Promotes kindness and lending a hand to others in need.',
    },
    diligence: {
      title: 'Diligence',
      description: 'Celebrates persistence, hard work, and dedication.',
    },
    privacy: {
      title: 'Privacy',
      description: 'Teaches respect for personal spaces and secrets.',
    },
    family: {
      title: 'Family',
      description: 'Focuses on bonds, love, and support within a family.',
    },
    death: {
      title: 'Death',
      description: 'Introduces the concept of life cycles and loss.',
    },
    'toxic-relations': {
      title: 'Toxic Relations',
      description: 'Warns against harmful relationships and sets boundaries.',
    },
    moderation: {
      title: 'Moderation',
      description: 'Encourages balance and avoiding excess in all things.',
    },
    cooperation: {
      title: 'Cooperation',
      description: 'Shows the power of teamwork and working together.',
    },
    reparation: {
      title: 'Reparation',
      description: 'Focuses on making amends and restoring what was harmed.',
    },
  },
  storyCard: {
    readButton: 'Read',
    audiobookButton: 'Audiobook',
    downloadCta: 'Download ebook',
    pdfButton: 'Illustrated PDF',
    epubButton: 'ePUB',
    unlockCta:
      'Upgrade your subscription to grant access to audiobooks and ebooks',
    unlockButton: 'Manage subscription',
    infoDisclaimer:
      'Check tag icons below or press the "More info" button to confirm that this story is suitable for your child.',
    moreInfoButton: 'More info',
  },
};
