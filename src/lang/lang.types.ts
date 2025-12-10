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
  lpJumbotron: {
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
};
