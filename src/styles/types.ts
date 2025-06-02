export type ViewportName =
  | 'hdScreen'
  | 'desktop'
  | 'laptop'
  | 'tablet'
  | 'mobile';

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
    };
  };
  byColor: {
    red: {
      light: string;
      regular: string;
    };
    purple: {
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

export interface Theme {
  palette: Palette;
  interfaceWidth: string;
  media: {
    [key in ViewportName]: string;
  };
  fonts: {
    default: string;
    headline: string;
  };
  zIndex: Layers;
}
