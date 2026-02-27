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
  settingsPage: {
    title: 'Settings',
    tabs: {
      profile_n_account: 'Profile and account',
      parental_control: 'Parental control',
      display_n_audio: 'Display and audio',
      notifications: 'Notifications',
      privacy_n_data: 'Privacy and data',
      support_n_feedback: 'Support and feedback',
      info: 'Information',
    },
    profile_n_account: {
      displayName: {
        label: 'Displayed name',
        infoTitle: 'Displayed name',
        infoDescription: 'This name will be visible to other users.',
      },
      email: {
        label: 'Email Address',
        infoTitle: 'Email Address',
        infoDescription:
          'Your email address is used for login and communication.',
      },
      password: {
        label: 'Password',
        infoTitle: 'Password',
        infoDescription: 'Use a strong password to protect your account.',
      },
      plan: {
        label: 'Plan',
        infoTitle: 'Subscription Plan',
        infoDescription: 'Information about your current subscription plan.',
        tier0: 'Free',
        tier1: 'Family',
        tier2: 'Premium',
      },
      creditCard: {
        label: 'Credit card',
        infoTitle: 'Credit card',
        infoDescription: 'Your payment method for the subscription.',
      },
      language: {
        label: 'Language',
        infoTitle: 'Language',
        infoDescription: 'Change the language of the application.',
      },
      deleteAccount: {
        label: 'Delete account',
        infoTitle: 'Delete account',
        infoDescription: 'Permanently remove your account and all data.',
        buttonText: 'Delete',
      },
    },
    parental_control: {
      status: {
        label: 'Status:',
        infoTitle: 'Parental Control Status',
        infoDescription: 'Enable or disable parental control.',
      },
      pin: {
        label: 'PIN:',
        infoTitle: 'PIN',
        infoDescription: 'PIN code to secure your settings.',
      },
      screenLimit: {
        label: 'Screen limit:',
        infoTitle: 'Screen Limit',
        infoDescription: 'Daily time limit for screen usage.',
      },
      excludeHours: {
        label: 'Exclude hours:',
        infoTitle: 'Exclude Hours',
        infoDescription: 'Hours during which the application is blocked.',
      },
      ads: {
        label: 'Ads:',
        infoTitle: 'Ads',
        infoDescription: 'Manage how ads are displayed.',
      },
      profiles: {
        label: 'Children profiles:',
        infoTitle: 'Children Profiles',
        infoDescription: 'Manage profiles for your children.',
      },
    },
    display_n_audio: {
      fontSize: {
        label: 'Font size:',
        infoTitle: 'Font Size',
        infoDescription: 'Adjust the size of the text in stories.',
      },
      fontFamily: {
        label: 'Font family:',
        infoTitle: 'Font Family',
        infoDescription: 'Choose the typeface that is easiest for you to read.',
      },
      textBackground: {
        label: 'Text background:',
        infoTitle: 'Text Background',
        infoDescription: 'Choose the background color behind the text.',
      },
      backgroundIntensity: {
        label: 'Background intensity:',
        infoTitle: 'Background Intensity',
        infoDescription: 'Adjust the transparency of the text background.',
      },
      storyLanguage: {
        label: 'Story language:',
        infoTitle: 'Story Language',
        infoDescription:
          'Choose the language for reading and listening to stories.',
      },
      illustrationAnimation: {
        label: 'Illustration animation:',
        infoTitle: 'Illustration Animation',
        infoDescription: 'Enable or disable moving elements in illustrations.',
      },
      animationQuality: {
        label: 'Animation quality:',
        infoTitle: 'Animation Quality',
        infoDescription: 'Choose the quality of the displayed animations.',
      },
      narration: {
        label: 'Narration:',
        infoTitle: 'Narration',
        infoDescription: 'Enable or disable the narrator voice.',
      },
      narrationVolume: {
        label: 'Narration volume:',
        infoTitle: 'Narration Volume',
        infoDescription: 'Adjust the volume of the narrator.',
      },
      backgroundMusic: {
        label: 'Background music:',
        infoTitle: 'Background Music',
        infoDescription: 'Enable or disable the background music.',
      },
      musicVolume: {
        label: 'Music volume:',
        infoTitle: 'Music Volume',
        infoDescription: 'Adjust the volume of the background music.',
      },
    },
    notifications: {
      news: {
        label: 'News (PUSH):',
        infoTitle: 'News Notifications',
        infoDescription: 'Get notified about new stories and features.',
      },
      payments: {
        label: 'Payments (PUSH):',
        infoTitle: 'Payment Notifications',
        infoDescription:
          'Get notifications regarding your payments and subscription.',
      },
      newsletter: {
        label: 'Newsletter:',
        buttonText: 'Substack',
        infoTitle: 'Newsletter',
        infoDescription: 'Manage your newsletter subscription on Substack.',
      },
    },
    privacy_n_data: {
      headline: 'Privacy and data',
      description:
        'Privacy and data are important to us. Here you can manage your personal information, cookie settings, and view legal documents regarding your data protection.',
      personalData: {
        name: {
          label: 'Full name:',
          infoTitle: 'Full name',
          infoDescription: 'Change your full name displayed in your profile.',
        },
        email: {
          label: 'Email/login:',
          infoTitle: 'Email/login',
          infoDescription:
            'Your login email address. Locked for security reasons.',
        },
        address: {
          label: 'Address:',
          infoTitle: 'Address',
          infoDescription: 'Your residential address for billing purposes.',
        },
      },
      cookies: {
        label: 'Cookies:',
        infoTitle: 'Cookie management',
        infoDescription:
          'Decide which cookies you want to allow in your browser.',
        functional: {
          label: 'Functional:',
          infoTitle: 'Functional cookies',
          infoDescription: 'Cookies necessary for the application to function.',
        },
        analytical: {
          label: 'Analytical:',
          infoTitle: 'Analytical cookies',
          infoDescription:
            'Help us understand how users use the service to improve it.',
        },
        marketing: {
          label: 'Marketing:',
          infoTitle: 'Marketing cookies',
          infoDescription: 'Used to tailor advertisements to your needs.',
        },
        partnerA: {
          label: 'Partner A:',
          infoTitle: 'Partner A',
          infoDescription: 'Cookies provided by our partner A.',
        },
        partnerB: {
          label: 'Partner B:',
          infoTitle: 'Partner B',
          infoDescription: 'Cookies provided by our partner B.',
        },
      },
      legal: {
        headline: 'Legal information and help articles:',
        links: {
          dataAdmin: 'Data administration',
          privacyPolicy: 'Privacy policy',
          cookies: 'Cookies',
          partners: 'Our partners',
          howToEdit: 'How to edit or delete personal data?',
        },
      },
    },
    support_n_feedback: {
      headline: 'Support and feedback',
    },
    info: {
      headline: 'Information',
    },
  },
};
