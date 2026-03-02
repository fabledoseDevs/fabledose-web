export type DictionaryType = {
  common: {
    login: string;
    logout: string;
    register: string;
    cancel: string;
    read: string;
    readFable: string;
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
  logoutPage: {
    headline: string;
    onSuccess: string;
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
    subsidiarity: { title: string; description: string };
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
  settingsPage: {
    title: string;
    tabs: {
      [key: string]: string;
    };
    profile_n_account: {
      displayName: {
        label: string;
        infoTitle: string;
        infoDescription: string;
      };
      email: {
        label: string;
        infoTitle: string;
        infoDescription: string;
      };
      password: {
        label: string;
        infoTitle: string;
        infoDescription: string;
      };
      plan: {
        label: string;
        infoTitle: string;
        infoDescription: string;
        tier0: string;
        tier1: string;
        tier2: string;
      };
      creditCard: {
        label: string;
        infoTitle: string;
        infoDescription: string;
      };
      language: {
        label: string;
        infoTitle: string;
        infoDescription: string;
      };
      deleteAccount: {
        label: string;
        infoTitle: string;
        infoDescription: string;
        buttonText: string;
      };
    };
    parental_control: {
      status: {
        label: string;
        infoTitle: string;
        infoDescription: string;
      };
      pin: {
        label: string;
        infoTitle: string;
        infoDescription: string;
      };
      screenLimit: {
        label: string;
        infoTitle: string;
        infoDescription: string;
      };
      excludeHours: {
        label: string;
        infoTitle: string;
        infoDescription: string;
      };
      ads: {
        label: string;
        infoTitle: string;
        infoDescription: string;
      };
      profiles: {
        label: string;
        infoTitle: string;
        infoDescription: string;
      };
    };
    display_n_audio: {
      fontSize: {
        label: string;
        infoTitle: string;
        infoDescription: string;
      };
      fontFamily: {
        label: string;
        infoTitle: string;
        infoDescription: string;
      };
      textBackground: {
        label: string;
        infoTitle: string;
        infoDescription: string;
      };
      backgroundIntensity: {
        label: string;
        infoTitle: string;
        infoDescription: string;
      };
      storyLanguage: {
        label: string;
        infoTitle: string;
        infoDescription: string;
      };
      illustrationAnimation: {
        label: string;
        infoTitle: string;
        infoDescription: string;
      };
      animationQuality: {
        label: string;
        infoTitle: string;
        infoDescription: string;
      };
      narration: {
        label: string;
        infoTitle: string;
        infoDescription: string;
      };
      narrationVolume: {
        label: string;
        infoTitle: string;
        infoDescription: string;
      };
      backgroundMusic: {
        label: string;
        infoTitle: string;
        infoDescription: string;
      };
      musicVolume: {
        label: string;
        infoTitle: string;
        infoDescription: string;
      };
    };
    notifications: {
      news: {
        label: string;
        infoTitle: string;
        infoDescription: string;
      };
      payments: {
        label: string;
        infoTitle: string;
        infoDescription: string;
      };
      newsletter: {
        label: string;
        buttonText: string;
        infoTitle: string;
        infoDescription: string;
      };
    };
    privacy_n_data: {
      headline: string;
      description: string;
      personalData: {
        name: {
          label: string;
          infoTitle: string;
          infoDescription: string;
        };
        email: {
          label: string;
          infoTitle: string;
          infoDescription: string;
        };
        address: {
          label: string;
          infoTitle: string;
          infoDescription: string;
        };
      };
      cookies: {
        label: string;
        infoTitle: string;
        infoDescription: string;
        functional: {
          label: string;
          infoTitle: string;
          infoDescription: string;
        };
        analytical: {
          label: string;
          infoTitle: string;
          infoDescription: string;
        };
        marketing: {
          label: string;
          infoTitle: string;
          infoDescription: string;
        };
        partnerA: {
          label: string;
          infoTitle: string;
          infoDescription: string;
        };
        partnerB: {
          label: string;
          infoTitle: string;
          infoDescription: string;
        };
      };
      legal: {
        headline: string;
        links: {
          dataAdmin: string;
          privacyPolicy: string;
          cookies: string;
          partners: string;
          howToEdit: string;
        };
      };
    };
    support_n_feedback: {
      headline: string;
      description: string;
      contactButton: string;
      helpArticles: {
        headline: string;
        links: {
          faq: string;
          howToReadAnimated: string;
          displayAudioSettings: string;
          account: string;
          paymentsRefunds: string;
          techSupport: string;
          loremIpsum: string;
          sitAmet: string;
        };
      };
      legalInfo: {
        headline: string;
        links: {
          termsOfUse: string;
          privacyPolicy: string;
          cookies: string;
        };
      };
      feedback: {
        headline: string;
        links: {
          sendDirectFeedback: string;
          rateApp: string;
        };
      };
    };
    info: {
      headline: string;
      description: string;
      companyDetails: {
        headline: string;
        name: string;
        address: string;
        nip: string;
        regon: string;
        tel: string;
      };
      appUsage: {
        headline: string;
        version: string;
      };
      license: {
        headline: string;
        copyright: string;
        allRightsReserved: string;
      };
      openSource: {
        headline: string;
        contributors: string;
      };
    };
  };
};
