export type ViewportName =
  | 'hdScreen'
  | 'desktop'
  | 'laptop'
  | 'tablet'
  | 'mobile';

export type FontProperty = 'fontSize' | 'fontFamily';

export type FontWeight = 'regular' | 'medium' | 'semibold';

export type Headlines = 'jumbo' | 'big' | 'small' | 'superText';

export interface Palette {
  byElement: {
    text: {
      white: string;
      ecru: string;
      purple: string;
      lightRed: string;
    };
    background: {
      white: string;
      purple: string;
      darkPurple: string;
      extraDarkPurple: string;
      gradientPurpleFade: string;
      gradientRed: string;
      gradientRedReverse: string;
      gradientWhite: string;
      gradientWhiteReversed: string;
      transparentWhite: { [key in '05' | '10' | '20' | '30']: string };
    };
    highlights: {
      palePurple: string;
      darkPurple: string;
    };
    shadows: {
      purple: { [key in '10' | '20']: string };
    };
  };
  byColor: {
    red: {
      light: string;
      regular: string;
    };
    purple: {
      pale: string;
      regular: string;
      dark: string;
      extraDark: string;
    };
    white: {
      full: string;
      ecru: string;
    };
    grey: {
      light: string;
    };
  };
}

export interface Layers {
  standard: string;
  medium: string;
  high: string;
  higher: string;
  top: string;
  veryTop: string;
  overlay: string;
  modalContent: string;
  guard: string;
}

export type FontStyles = {
  [key in FontProperty]: string;
};

export interface Typography {
  fonts: {
    default: string;
    headline: string;
    fables: {
      sans: string;
      serif: string;
      dyslexic: string;
    };
  };
  fontWeights: {
    [key in FontWeight]: number;
  };
  headlines: {
    [key in Headlines]: FontStyles;
  };
  paragraphs: {
    default: FontStyles;
  };
  inputs: {
    default: FontStyles;
    error: FontStyles;
  };
}

export interface Theme {
  palette: Palette;
  interfaceWidth: string;
  media: {
    [key in ViewportName]: string;
  };
  typography: Typography;
  zIndex: Layers;
}
