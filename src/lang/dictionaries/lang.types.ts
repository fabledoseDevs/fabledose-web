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
};
