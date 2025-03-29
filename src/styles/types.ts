export type ViewportName =
  | 'hdScreen'
  | 'desktop'
  | 'laptop'
  | 'tablet'
  | 'mobile';

export interface Palette {
  basic: {
    beige: string;
    denim: string;
    wasabi: string;
    coral: string;
    white: string;
    black: string;
  }
  beigeVariants: {
    lighter: string;
    darker: string;
  };
  denimVariants: {
    lighter: string;
    darker: string;
  };
  wasabiVariants: {
    lighter: string;
    darker: string;
  };
  coralVariants: {
    lighter: string;
    darker: string;
  };
  whiteVariants: {
    lighter: string;
    darker: string;
  };
  blackVariants: {
    lighter: string;
    darker: string;
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
    poltawskiNowy: string;
    lato: string;
  };
  zIndex: Layers;
}