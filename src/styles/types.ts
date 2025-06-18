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
      gradientRed: string;
      gradientRedReverse: string;
    };
    highlights: {
      palePurple: string;
      darkPurple: string;
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
