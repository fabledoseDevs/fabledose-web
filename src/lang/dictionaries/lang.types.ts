export type DictionaryType = {
  common: {
    login: string;
    logout: string;
    register: string;
  };
  maintenance: {
    headline: string;
    paragraph: string;
    button: string;
  };
  landingPage: {
    jumbotron: {
      headline: string;
      paragraph: string;
      button: string;
    };
    // Free story will probably be CMS content in the future.
    // This translation might be removed.
    freeStory: {
      superText: string;
      title: string;
      paragraph: string;
      button: string;
      coverDescription: string;
    };
    infoBox: {
      one: {
        picAlt: string;
        title: string;
        description: string;
      };
      two: {
        picAlt: string;
        title: string;
        description: string;
      };
      three: {
        picAlt: string;
        title: string;
        description: string;
      };
    };
    registerBanner: {
      title: string;
      covers?: {
        title: string;
        id: string;
      }[];
    };
    faqSection: {
      superText: string;
      headline: string;
      paragraph: string[];
      button: string;
    };
    faq: {
      question: string;
      answer: string;
    }[];
  };
  newsletterForm: {
    paragraph: string;
    disclaimer: string;
  };
  footer: {
    linkList: {
      title: string;
      links: {
        title: string;
        href?: string;
      }[];
    }[];
    legalText: string;
    legalLinks: {
      title: string;
      href?: string;
    }[];
  };
  tagIcon: {
    'age-3': { title: string; description: string };
    'age-5': { title: string; description: string };
    'classic-fable': { title: string; description: string };
    'contemporary-fable': { title: string; description: string };
    responsibility: { title: string; description: string };
    carefulness: { title: string; description: string };
    helpfulness: { title: string; description: string };
    diligence: { title: string; description: string };
    privacy: { title: string; description: string };
    family: { title: string; description: string };
    death: { title: string; description: string };
    'toxic-relations': { title: string; description: string };
    moderation: { title: string; description: string };
    cooperation: { title: string; description: string };
    reparation: { title: string; description: string };
  };
  storyCard: {
    readButton: string;
    audiobookButton: string;
    downloadCta: string;
    pdfButton: string;
    epubButton: string;
    unlockCta: string;
    unlockButton: string;
    infoDisclaimer: string;
    moreInfoButton: string;
  };
};
