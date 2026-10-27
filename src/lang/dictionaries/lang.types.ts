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
  notFoundPage: {
    headline: string;
    subtitle: string;
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
    readButtonContinue: string;
    audiobookButton: string;
    downloadCta: string;
    pdfButton: string;
    epubButton: string;
    unlockCta: string;
    unlockButton: string;
    infoDisclaimer: string;
    moreInfoButton: string;
  };
  /** Localized headings for the indexed library view. */
  userDesktop: {
    /** Heading above the carousel of available fables. */
    libraryTitle: string;
  };
  cataloguePage: {
    headline: string;
    paragraph: string;
    searchPlaceholder: string;
    resultsTitle: string;
    titlesColumn: string;
    authorsColumn: string;
    noSelectedItem: string;
    emptyResults: string;
  };
  /** Public password-recovery form and Firebase request feedback. */
  passwordResetPage: {
    headline: string;
    description: string;
    emailLabel: string;
    placeholder: string;
    submit: string;
    sending: string;
    success: string;
    invalidEmail: string;
    tooManyRequests: string;
    networkError: string;
    failure: string;
    backToLogin: string;
    forgotPassword: string;
  };
  registerPage: {
    /** Registration recovery and persistence status, shared by both account steps. */
    flow: {
      loading: string;
      saving: string;
      loadError: string;
      saveError: string;
      retry: string;
      paidUnavailable: string;
    };
    form: {
      headline: string;
      stepLabel: string;
      stepHighlight: string;
      description: string;
      googleButton: string;
      appleButton: string;
      separatorLabel: string;
      emailLabel: string;
      emailPlaceholder: string;
      passwordLabel: string;
      confirmPasswordLabel: string;
      submitLoading: string;
      submit: string;
      hasAccount: string;
      loginLink: string;
      passwordMismatch: string;
      googleError: string;
      requiredEmail: string;
      requiredPassword: string;
      passwordMustMatch: string;
      createAccountError: string;
    };
    planSelector: {
      headline: string;
      stepLabel: string;
      stepHighlight: string;
      registrationDescription: string;
      standaloneDescription: string;
      showDetails: string;
      hideDetails: string;
      backToTop: string;
      plans: {
        free: {
          title: string;
          description: string;
          optionalParagraphs: string[];
          button: string;
        };
        family: {
          title: string;
          description: string;
          optionalParagraphs: string[];
          button: string;
        };
        ultimate: {
          title: string;
          description: string;
          optionalParagraphs: string[];
          button: string;
        };
      };
      extended: {
        contentTitle: string;
        qualityTitle: string;
        childrenTitle: string;
        licenseTitle: string;
        monthlyCostLabel: string;
        free: {
          contentParagraph: string;
          contentList: string[];
          qualityList: string[];
          childrenParagraph: string;
          licenseParagraph: string;
        };
        family: {
          contentParagraph: string;
          contentList: string[];
          qualityList: string[];
          childrenParagraph: string;
          licenseParagraph: string;
        };
        ultimate: {
          contentParagraph: string;
          contentList: string[];
          qualityList: string[];
          childrenParagraph: string;
          licenseParagraph: string;
        };
      };
    };
  };
  /** Labels and spoiler disclosure for the parent-facing story details dialog. */
  storyDetails: {
    /** Shared close icon and footer label. */
    close: string;
    /** Heading for permanently explained story tags. */
    tags: string;
    /** Heading for parental context and sensitive themes. */
    comment: string;
    /** Heading for the complete plot. */
    synopsis: string;
    /** Small introductory text helping parents decide whether to read the spoilers. */
    guidance: string;
    /** Explicit disclosure that the ending is included. */
    spoilers: string;
  };
  /** Localized audiobook controls and account checkpoint feedback. */
  audiobook: {
    /** Close audiobook player */
    close: string;
    /** Listening progress */
    progress: string;
    /** Playback speed */
    speed: string;
    /** Go back 10 seconds */
    backward: string;
    /** Skip forward 10 seconds */
    forward: string;
    /** Play audiobook */
    play: string;
    /** Pause audiobook */
    pause: string;
    /** The recording could not be played. Try again or return to the story. */
    playbackFailed: string;
    /** Loading listening position… */
    loading: string;
    /** The listening position could not be loaded. */
    loadFailed: string;
    /** Saving listening position… */
    saving: string;
    /** The listening position could not be saved. */
    saveFailed: string;
    /** The recording is not available in this language yet. */
    unavailable: string;
  };
  /**
   * Localized library labels, persistence status and explicit retry actions.
   *
   * @remarks
   * Success notifications describe acknowledged favorite writes. Read failures and save failures have separate messages so the reader can remain open during a failed save.
   */
  librarySync: {
    /** Page title for saved favorites. */
    favoritesTitle: string;
    /** Introduction to the saved library. */
    favoritesDescription: string;
    /** Heading for unfinished stories. */
    continuingTitle: string;
    /** Heading for favorite stories. */
    myFavorites: string;
    /** Empty-library message. */
    empty: string;
    /** Library loading message. */
    loading: string;
    /** Library read failure message. */
    loadFailed: string;
    /** Explicit reload action label. */
    refresh: string;
    /** Progress write pending message. */
    savingProgress: string;
    /** Progress save failure message. */
    progressFailed: string;
    /** Explicit write retry label. */
    retrySave: string;
    /** Favorite mutation failure message. */
    favoriteFailed: string;
    /** Acknowledged add notification. */
    favoriteAdded: string;
    /** Acknowledged removal notification. */
    favoriteRemoved: string;
    /** Accessible action name for adding a favorite. */
    addFavorite: string;
    /** Accessible action name for removing a favorite. */
    removeFavorite: string;
    /** Restart tooltip and accessible action name. */
    resetProgress: string;
    /** Saved position read failure message. */
    progressLoadFailed: string;
    /** Starting position loading message. */
    loadingProgress: string;
    /** Favorite write pending message. */
    savingFavorite: string;
  };
  settingsPage: {
    /** Identity confirmation, sensitive mutations and retryable service feedback. */
    accountSecurity: {
      deletionIncomplete: string;
      cancel: string;
      close: string;
      working: string;
      currentPassword: string;
      newEmail: string;
      newPassword: string;
      confirmPassword: string;
      googleConfirmation: string;
      confirmDeletion: string;
      required: string;
      invalidEmail: string;
      sameEmail: string;
      mismatch: string;
      wrongPassword: string;
      weakPassword: string;
      emailInUse: string;
      recentLogin: string;
      popupCancelled: string;
      popupBlocked: string;
      accountChanged: string;
      tooManyRequests: string;
      networkError: string;
      serviceUnavailable: string;
      unsupported: string;
      failure: string;
      emailConfirmed: string;
      checkEmail: string;
      email: {
        title: string;
        description: string;
        submit: string;
        success: string;
      };
      password: {
        title: string;
        description: string;
        submit: string;
        success: string;
      };
      delete: {
        title: string;
        description: string;
        submit: string;
        success: string;
      };
    };
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
        verificationEmailSent: string;
      };
      password: {
        label: string;
        infoTitle: string;
        infoDescription: string;
        changeButton: string;
        modalTitle: string;
        modalDescription: string;
        currentPasswordLabel: string;
        newPasswordLabel: string;
        confirmPasswordLabel: string;
        okButton: string;
        cancelButton: string;
        validationRequired: string;
        validationMismatch: string;
        updateSuccess: string;
        wrongCurrentPassword: string;
        recentLoginRequired: string;
        updateFailed: string;
      };
      plan: {
        label: string;
        infoTitle: string;
        infoDescription: string;
        changeButton: string;
        modalTitle: string;
        modalDescription: string;
        free: string;
        family: string;
        ultimate: string;
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
        /** Explains why account deletion is disabled during the current test phase. */
        deferredNotice: string;
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
        options: {
          none: string;
          light: string;
          dark: string;
        };
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
    SettingsSwitch: {
      enabled: string;
      disabled: string;
    };
  };
};
