import type { Theme } from './types';

export const breakpoints = {
  interfaceWidth: 1600,
  highDef: 1920,
  desktop: 1440,
  laptop: 1024,
  tablet: 768,
  mobile: 380,
};

export const theme: Theme = {
  palette: {
    byElement: {
      text: {
        white: '#FFFFFF',
        ecru: '#FAF0DD',
        purple: '#261A4F',
        lightRed: '#FF684C',
      },
      background: {
        white: '#FFFFFF',
        purple: '#261A4F',
        darkPurple: '#1F153E',
        extraDarkPurple: '#170F2F',
        gradientPurpleFade:
          'linear-gradient(0deg, rgba(38, 26, 79, 1) 0%, rgba(38, 26, 79, 0) 100%)',
        gradientRed: 'linear-gradient(180deg, #E84528 0%, #B92409 100%)',
        gradientRedReverse: 'linear-gradient(180deg, #B92409 0%, #E84528 100%)',
        gradientWhite: 'linear-gradient(180deg, #FDFAF8 0%, #FAF0DD 100%)',
        gradientWhiteReversed:
          'linear-gradient(180deg, #FAF0DD 0%, #FDFAF8 100%)',
        transparentWhite: {
          '05': 'rgba(255, 255, 255, 0.05)',
          '10': 'rgba(255, 255, 255, 0.1)',
          '20': 'rgba(255, 255, 255, 0.2)',
          '30': 'rgba(255, 255, 255, 0.3)',
        },
      },
      highlights: {
        palePurple: '#EFEAFF',
        darkPurple: '#1F153E',
      },
      shadows: {
        purple: {
          '10': 'rgba(30, 10, 50, 0.1)',
          '20': 'rgba(30, 10, 50, 0.2)',
        },
      },
    },
    byColor: {
      red: {
        light: '#FF684C',
        regular: '#BE341B',
      },
      purple: {
        pale: '#C9B6FA',
        regular: '#261A4F',
        dark: '#1F153E',
        extraDark: '#170F2F',
      },
      white: {
        full: '#FFFFFF',
        ecru: '#FAF0DD',
      },
    },
  },
  interfaceWidth: `${breakpoints.interfaceWidth}px`,
  media: {
    mobile: `screen and (min-width: ${breakpoints.mobile}px)`,
    tablet: `screen and (min-width: ${breakpoints.tablet}px)`,
    laptop: `screen and (min-width: ${breakpoints.laptop}px)`,
    desktop: `screen and (min-width: ${breakpoints.desktop}px)`,
    hdScreen: `screen and (min-width: ${breakpoints.highDef}px)`,
  },
  typography: {
    fonts: {
      default: 'Baloo2, sans-serif',
      headline: 'YesevaOne, serif',
    },
    fontWeights: {
      regular: 400,
      medium: 500,
      semibold: 600,
    },
    headlines: {
      jumbo: {
        fontSize: 'clamp(3.4rem, 8vw, 6.4rem)',
        fontFamily: 'YesevaOne, serif',
      },
      big: {
        fontSize: 'clamp(2.4rem, 6vw, 4.8rem)',
        fontFamily: 'YesevaOne, serif',
      },
      small: {
        fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
        fontFamily: 'Baloo2, sans-serif',
      },
      superText: {
        fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
        fontFamily: 'Baloo2, sans-serif',
      },
    },
    paragraphs: {
      default: {
        fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
        fontFamily: 'Baloo2, sans-serif',
      },
    },
    inputs: {
      default: {
        fontSize: 'clamp(1.4rem, 2.25vw, 1.6rem)',
        fontFamily: 'Baloo2, sans-serif',
      },
      error: {
        fontSize: '1.2rem',
        fontFamily: 'Baloo2, sans-serif',
      },
    },
  },
  zIndex: {
    standard: '0',
    medium: '1',
    high: '2',
    higher: '3',
    top: '4',
    veryTop: '5',
    overlay: '6',
    modalContent: '7',
    guard: '8',
  },
};
