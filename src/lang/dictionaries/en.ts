import type { DictionaryType } from './lang.types';

export const DictionaryEn: DictionaryType = {
  helpCenter: {
    title: 'Help centre',
    intro:
      'How can we help? Start with a quick answer or choose an article. All guides and legal information are available without signing in.',
    home: 'Home',
    open: 'Open help centre',
    faqTitle: 'Frequently asked questions',
    articlesTitle: 'Articles and guides',
    guides: 'Accounts and using Fabledose',
    project: 'About the project and contact',
    legal: 'Privacy and terms',
    other: 'Other articles',
    contactTitle: 'Still need help?',
    contactDescription:
      'Tell us what happened. The contact article includes our email address and tips on what to include in a support request.',
    contactButton: 'Contact',
    faq: [
      {
        question: 'Do I have to pay to use Fabledose?',
        answer:
          'No. Free includes a selection of stories and audiobooks, currently every published title. Payments have not launched; changing plans currently tests features.',
      },
      {
        question: 'How can I sign in?',
        answer:
          'Use an email address and password, or Google. For an email account, use password recovery on the sign-in screen if needed. Apple Sign In is planned.',
      },
      {
        question: 'How many child profiles can I create?',
        answer:
          'Family allows up to 6 child profiles; Ultimate has no profile limit. Free does not include child profiles or parental controls. Downgrading does not delete saved profiles.',
      },
      {
        question: 'What is the difference between SD, HD and 2K?',
        answer:
          'SD is 720p and HD is 1080p. HD is available from Family; 2K is available in Ultimate. Until QHD files are added, 2K plays HD. AUTO adapts to the screen within plan limits.',
      },
      {
        question: 'How do I continue a story?',
        answer:
          'Sign in, select the correct profile and choose Continue. Reading and listening progress are saved separately. The round restart control starts reading from the beginning.',
      },
      {
        question: 'Why is a story unavailable for a child?',
        answer:
          'Check story exclusions and the profile schedule, including its time zone. A parental PIN is not available yet; these preferences do not replace adult supervision.',
      },
      {
        question: 'Can I download a story or listen offline?',
        answer:
          'PDF and EPUB ebooks are intended for Family and Ultimate, but files must be supplied first. Website animations and audiobooks need Internet access; offline audiobook downloads are not available.',
      },
      {
        question: 'How do I report a problem or request account deletion?',
        answer:
          'Email fabledose@gmail.com. For a problem, include the story or screen, language and browser. For an account request, use its registered email address. Never send your password; automatic account deletion is currently deferred.',
      },
    ],
  },
  planAccess: {
    title: 'This feature requires another plan',
    allPlans: 'See all plans',
    close: 'Close',
    story:
      'This story is not in the Free selection. Family and Ultimate include the full library and seasonal stories.',
    ebooks:
      'PDF and EPUB ebook downloads are available with Family and Ultimate.',
    parental:
      'Child profiles and parental controls are available with Family and Ultimate. Free includes one user account.',
    profiles:
      'Family allows up to 6 child profiles. Ultimate has no child-profile limit.',
    ebookPendingTitle: 'Ebook coming soon',
    ebookPending:
      'Your plan includes this format, but the file for this story has not been added yet.',
    manageProfiles: 'Child profiles and parental controls',
  },
  childProfiles: {
    noAvailableStories:
      'There are currently no available stories for this profile.',
    availability: 'Availability for children',
    available: 'Available',
    excluded: 'Excluded',
    hours: 'Access hours',
    scheduleEnabled: 'Limit access hours',
    weekdays: 'Weekdays',
    weekends: 'Weekend',
    allowedDay: 'Allow access on these days',
    start: 'From',
    end: 'Until',
    timeZone: 'Time zone',
    scheduleHint:
      'End time must be later than start time. Stories stop at the end of the window. A disabled day has no access.',
    blockedExcluded: 'This story is excluded for the selected profile.',
    blockedHours:
      'Time for a break. Stories will be available during the hours set for this profile.',
    unprotected:
      'Exclusions and hours apply within the app. Parent PIN is not enabled: profile switching and settings changes are not protected yet.',
    policyError:
      'Settings could not be saved. Check the hours and time zone, then try again.',
    backLibrary: 'Back to library',

    title: 'Child profiles',
    parent: 'Parent',
    add: 'Add profile',
    edit: 'Edit',
    remove: 'Delete profile',
    createTitle: 'New child profile',
    editTitle: 'Edit child profile',
    name: 'Name or nickname',
    placeholder: 'Enter a name…',
    avatar: 'Choose an avatar',
    age: 'Age group',
    unspecified: 'Not specified',
    cancel: 'Cancel',
    save: 'Save',
    confirmTitle: 'Delete this profile?',
    confirmBody:
      'This deletes the child’s favourites and progress. This cannot be undone.',
    loading: 'Loading profiles…',
    saving: 'Saving…',
    error: 'Profiles could not be loaded or saved. Please try again.',
    retry: 'Try again',
    empty:
      'Add the first child profile. Each child will have their own favourites and progress.',
    signIn: 'Sign in to manage child profiles.',
    pick: 'Choose profile',
    close: 'Close',
    deleting: 'Deletion incomplete — retry',
    parentalDeferred:
      'Exclusions and hours apply within the app. Parent PIN is not enabled: profile switching and settings changes are not protected yet.',
    legacy: 'Existing favourites and progress remain in the parent profile.',
  },
  common: {
    login: 'Login',
    logout: 'Logout',
    register: 'Create account',
    cancel: 'Cancel',
    read: 'Read',
    readFable: 'Read fable',
  },
  maintenance: {
    headline: 'Planned launch: Q1 2027',
    paragraph:
      'We are working on Fabledose. Our new website is currently under construction.',
    accessTitle: 'Test access',
    accessPassword: 'Access password',
    accessSubmit: 'Unlock',
    accessError:
      'Incorrect password or connection unavailable. Please try again.',
    planFailed:
      'Could not change the plan. Your previous plan is still active. Please try again.',
    planSaved: 'Test plan updated.',
  },
  notFoundPage: {
    headline: "It looks like you've lost your way.",
    subtitle: '(Page dose not exist)',
    button: 'Return',
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
          'Free includes a selection of animated stories in SD, and audiobooks. At launch, the selection includes every current story. Family and Ultimate include the full library, seasonal stories, and PDF and EPUB ebooks once files are added. Family supports up to 6 child profiles; Ultimate has no profile limit.',
      },
      {
        question: 'Are the stories suitable for different age groups?',
        answer:
          "Yes — our stories are carefully categorized by the child's age and developmental level. You'll find tales for toddlers, preschoolers, and older children. Each story develops different skills: emotional, language, or social. It's a safe space for discovering the world through stories.",
      },
      {
        question: 'Can I use Fabledose offline?',
        answer:
          'Animated stories and audiobooks played on the website require an Internet connection. Family and Ultimate include PDF and EPUB ebook downloads for offline reading. Ebook files are being prepared; the app explains when a file is not available yet.',
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
    freeEbooksNotice: {
      intro: 'Enjoy animated stories and audiobooks at no additional cost.',
      beforeFamily:
        'If you would like to download our stories as ebooks, consider switching to the ',
      betweenPlans: ' or ',
      afterUltimate: ' plan.',
      allPlans: 'See all plans',
    },
    downloading: 'Downloading…',
    downloadFailed:
      'Could not download the ebook. Check that you are signed in and try again.',
    readButton: 'Read',
    readButtonContinue: 'Continue reading',
    audiobookButton: 'Audiobook',
    downloadCta: 'Download ebook',
    pdfButton: 'Illustrated PDF',
    epubButton: 'ePUB',
    unlockCta:
      'Choose Family or Ultimate for the full library and PDF and EPUB ebooks',
    unlockButton: 'Manage subscription',
    infoDisclaimer:
      'Check tag icons below or press the "More info" button to confirm that this story is suitable for your child.',
    moreInfoButton: 'More info',
  },
  userDesktop: { libraryTitle: 'Your library' },
  cataloguePage: {
    headline: 'Search the catalogue',
    paragraph: 'Type an author surname or story title to start searching.',
    searchPlaceholder: 'Search...',
    resultsTitle: 'Results',
    titlesColumn: 'Titles',
    authorsColumn: 'Authors',
    noSelectedItem: 'No item selected',
    emptyResults: 'No matching covers for the current query.',
  },
  passwordResetPage: {
    headline: 'Reset your password',
    description:
      'Enter the email address used to register. We will send a link to set a new password.',
    emailLabel: 'Email address:',
    placeholder: 'you@example.com',
    submit: 'Send reset link',
    sending: 'Sending…',
    success:
      'If an account exists with this email address, you will receive a password reset link. Please also check your spam folder.',
    invalidEmail: 'Enter a valid email address.',
    tooManyRequests: 'Too many attempts. Please wait a moment and try again.',
    networkError:
      'Connection failed. Check your internet connection and try again.',
    failure: 'The reset link could not be sent. Please try again later.',
    backToLogin: 'Back to sign in',
    forgotPassword: 'Forgot your password?',
  },
  registerPage: {
    flow: {
      loading: 'Loading account…',
      saving: 'Saving your plan…',
      loadError: 'Your account could not be loaded. Please try again.',
      saveError: 'Your plan could not be saved. Select it again to retry.',
      retry: 'Try again',
      paidUnavailable:
        'Registration is currently available with the free plan. Paid plans will become available when checkout launches.',
    },
    form: {
      headline: 'Create account',
      stepLabel: 'Step',
      stepHighlight: '1 of 2',
      description:
        'Use your email address or continue with your Google, Facebook, or Apple account.',
      googleButton: 'Continue with Google',
      appleButton: 'Continue with Apple',
      separatorLabel: 'or',
      emailLabel: 'Email address:',
      emailPlaceholder: 'your@email.com',
      passwordLabel: 'Create password:',
      confirmPasswordLabel: 'Repeat password:',
      submitLoading: 'Processing…',
      submit: 'Continue',
      hasAccount: 'Already have an account?',
      loginLink: 'Log in',
      passwordMismatch: 'Passwords do not match',
      googleError: 'Google sign-in failed',
      requiredEmail: 'Email address is required',
      requiredPassword: 'Password is required',
      passwordMustMatch: 'Passwords must match',
      createAccountError: 'Could not create account',
    },
    planSelector: {
      headline: 'Set up your account',
      stepLabel: 'Step',
      stepHighlight: '2 of 2',
      registrationDescription:
        'Your account has been created and set to Starter by default.<br />If you need a wider service range, choose a plan tailored to your needs.',
      standaloneDescription: 'Choose the plan that fits your needs.',
      showDetails: 'Show full comparison',
      hideDetails: 'Hide full comparison',
      backToTop: 'Back to top',
      plans: {
        free: {
          title: 'Free',
          description:
            'Access to a selection of animated stories and audiobooks.\nNo parental controls.',
          optionalParagraphs: ['Sponsored account (includes ads).'],
          button: 'Choose Free',
        },
        family: {
          title: 'Family',
          description:
            'Access to all stories as animated stories, audiobooks and ebooks. Animated stories in HD quality.\nParental controls for up to 6 child profiles.',
          optionalParagraphs: [],
          button: 'Choose Family',
        },
        ultimate: {
          title: 'Ultimate',
          description:
            'Access to all stories as animated stories, audiobooks and ebooks. Animated stories in HD and QHD quality.\nParental controls for an unlimited number of child profiles.',
          optionalParagraphs: ['Licence for public screenings.'],
          button: 'Choose Ultimate',
        },
      },
      extended: {
        contentTitle: 'Content access',
        qualityTitle: 'Story quality',
        childrenTitle: 'Parental controls',
        licenseTitle: 'License type',
        monthlyCostLabel: 'Monthly cost',
        free: {
          contentParagraph: 'Access to selected stories:',
          contentList: ['animated story', 'audiobook'],
          qualityList: ['SD (720p)'],
          childrenParagraph:
            'One account. Child profiles and parental controls are disabled.',
          licenseParagraph:
            'Licence for private viewing within the immediate family.',
        },
        family: {
          contentParagraph: 'All stories, including seasonal titles:',
          contentList: ['animated story', 'audiobook', 'PDF and EPUB ebooks'],
          qualityList: ['SD (720p)', 'HD (1080p)'],
          childrenParagraph: 'Up to 6 child profiles and parental controls.',
          licenseParagraph:
            'Licence for private viewing within the immediate family.',
        },
        ultimate: {
          contentParagraph: 'All stories, including seasonal titles:',
          contentList: ['animated story', 'audiobook', 'PDF and EPUB ebooks'],
          qualityList: ['SD (720p)', 'HD (1080p)', 'QHD (2K)'],
          childrenParagraph: 'Unlimited child profiles and parental controls.',
          licenseParagraph: 'Licence for private and public screenings.',
        },
      },
    },
  },
  storyDetails: {
    close: 'Close',
    tags: 'Themes and guidance',
    comment: 'Notes for parents',
    synopsis: 'Synopsis',
    guidance:
      'Read the synopsis if you are unsure whether this story is suitable for your child.',
    spoilers: 'The full plot, including the ending, is described below.',
  },
  audiobook: {
    close: 'Close audiobook player',
    progress: 'Listening progress',
    speed: 'Playback speed',
    backward: 'Go back 10 seconds',
    forward: 'Skip forward 10 seconds',
    play: 'Play audiobook',
    pause: 'Pause audiobook',
    playbackFailed:
      'The recording could not be played. Try again or return to the story.',
    loading: 'Loading listening position…',
    loadFailed: 'The listening position could not be loaded.',
    saving: 'Saving listening position…',
    saveFailed: 'The listening position could not be saved.',
    unavailable: 'The recording is not available in this language yet.',
  },
  librarySync: {
    favoritesTitle: 'Favorites',
    favoritesDescription: 'Your favorite stories in one place',
    continuingTitle: 'Continue reading',
    myFavorites: 'My favorites',
    empty: 'No saved stories yet. Add a favorite or start reading.',
    loading: 'Loading saved stories…',
    loadFailed: 'Saved stories could not be loaded.',
    refresh: 'Refresh',
    savingProgress: 'Saving reading progress…',
    progressFailed: 'Reading progress could not be saved.',
    retrySave: 'Retry save',
    favoriteFailed: 'The favorite change could not be saved.',
    favoriteAdded: 'Added to favorites',
    favoriteRemoved: 'Removed from favorites',
    addFavorite: 'Add to favorites',
    removeFavorite: 'Remove from favorites',
    resetProgress: 'Read again',
    progressLoadFailed: 'Your saved reading position could not be loaded.',
    loadingProgress: 'Loading reading progress…',
    savingFavorite: 'Saving favorites…',
  },
  settingsPage: {
    accountSecurity: {
      deletionIncomplete:
        'Deletion was not completed. The account is marked for deletion and writes may be blocked. Retry deletion; if the error persists, contact support.',
      cancel: 'Cancel',
      close: 'Close',
      working: 'Working…',
      currentPassword: 'Current password',
      newEmail: 'New email address',
      newPassword: 'New password',
      confirmPassword: 'Confirm new password',
      googleConfirmation: 'Confirm your identity in the Google popup.',
      confirmDeletion:
        'I understand that my account will be permanently deleted and my favorites, reading progress and settings will be erased.',
      required: 'Complete the required fields.',
      invalidEmail: 'Enter a valid email address.',
      sameEmail: 'This is your current email address.',
      mismatch: 'The new password and confirmation must match.',
      wrongPassword: 'The current password is incorrect.',
      weakPassword:
        'The password does not meet Firebase requirements. Choose a stronger password.',
      emailInUse: 'This email address is already in use.',
      recentLogin: 'Confirm your identity again and retry.',
      popupCancelled: 'Google confirmation was cancelled. You can try again.',
      popupBlocked: 'Allow the Google popup and try again.',
      accountChanged:
        'The account changed during this operation. Reopen the form.',
      tooManyRequests: 'Too many attempts. Please wait and retry.',
      networkError: 'Check your internet connection and try again.',
      serviceUnavailable:
        'Account deletion is unavailable. Please try again later.',
      unsupported:
        'Reauthentication is not yet supported for this sign-in method.',
      failure: 'The operation failed. Please try again.',
      emailConfirmed: 'Your verified email address has been updated.',
      checkEmail: 'Check verification',
      email: {
        title: 'Change email address',
        description:
          'Confirm your identity, then follow the link sent to your new address. Your current address remains active until verification.',
        submit: 'Change email',
        success:
          'A verification link was sent to the new address. Follow it, then return here and check verification.',
      },
      password: {
        title: 'Change password',
        description: 'Confirm your identity and choose a new password.',
        submit: 'Change password',
        success: 'Your password has been changed.',
      },
      delete: {
        title: 'Permanently delete account',
        description:
          'This cannot be undone. After the account is deleted, Firebase automatically starts erasing its data.',
        submit: 'Permanently delete account',
        success: 'Your account has been deleted.',
      },
    },
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
        verificationEmailSent:
          'Verification email was sent to provided email address. This update will only take place if activation link is clicked in that message.',
      },
      password: {
        label: 'Password',
        infoTitle: 'Password',
        infoDescription: 'Use a strong password to protect your account.',
        changeButton: 'Change password',
        modalTitle: 'Change password',
        modalDescription:
          'For security reasons, confirm your current password first.',
        currentPasswordLabel: 'Current password',
        newPasswordLabel: 'New password',
        confirmPasswordLabel: 'Confirm new password',
        okButton: 'OK',
        cancelButton: 'Cancel',
        validationRequired: 'All password fields are required.',
        validationMismatch: 'New password and confirmation must match.',
        updateSuccess: 'Password updated successfully.',
        wrongCurrentPassword: 'Current password is incorrect.',
        recentLoginRequired:
          'Session expired. Log in again and then retry password change.',
        updateFailed: 'Unable to update password.',
      },
      plan: {
        label: 'Plan',
        infoTitle: 'Subscription Plan',
        infoDescription: 'Information about your current subscription plan.',
        changeButton: 'Change plan',
        modalTitle: 'Choose your plan',
        modalDescription: 'Select the plan you want to use on this account.',
        free: 'Free',
        family: 'Family',
        ultimate: 'Ultimate',
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
        deferredNotice:
          'Account deletion will be available at a later testing stage.',
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
        options: {
          none: 'none',
          light: 'light',
          dark: 'dark',
        },
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
        infoDescription:
          'AUTO adapts to screen size within your plan limits. SD (720p) is available in every plan, HD (1080p) in Family and Ultimate, and 2K in Ultimate. Until 2K animations are added, this option plays HD.',
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
      description:
        'Find guides to using Fabledose, account information and help with stories. If you cannot find a solution, get in touch.',
      contactButton: 'Contact',
      helpArticles: {
        headline: 'Help articles:',
        links: {
          howToReadAnimated: 'How to read animated fables? (tutorial)',
          displayAudioSettings: 'Display and audio settings',
          account: 'Accounts and plans',
          paymentsRefunds: 'Payments and refunds',
          techSupport: 'Contact technical support',
          parentalControls: 'Parental controls',
        },
      },
      legalInfo: {
        headline: 'Legal information:',
        links: {
          termsOfUse: 'Terms of Use',
          privacyPolicy: 'Privacy Policy',
          cookies: 'Cookies',
        },
      },
      feedback: {
        headline: 'Feedback:',
        links: {
          sendDirectFeedback: 'Send direct Feedback',
          rateApp: 'Rate the app in AppStore, Google Play or other',
        },
      },
    },
    info: {
      headline: 'Information',
      description:
        'Privacy and data are important to us. Here you can manage your personal information, cookie settings, and view legal documents regarding your data protection.',
      companyDetails: {
        headline: 'Company Details:',
        name: 'Fabledose sp. z o. o.',
        address: 'Długa 9, 01-234 Nigdziebądź',
        nip: 'VAT ID: 123456789',
        regon: 'REGON: 123456789',
        tel: 'Tel. +48 987654321',
      },
      appUsage: {
        headline: 'You are using the application:',
        version: 'Fabledose WEB. v 1.1',
      },
      license: {
        headline: 'License:',
        copyright: 'Copyright 2025 Fabledose.',
        allRightsReserved: 'All rights reserved.',
      },
      openSource: {
        headline: 'Open Source Contributions:',
        contributors: 'GitHub, Swiper, Lorem',
      },
    },
    SettingsSwitch: {
      enabled: 'on',
      disabled: 'off',
    },
  },
};
