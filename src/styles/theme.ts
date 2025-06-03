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
        gradientRed: 'linear-gradient(180deg, #E84528 0%, #B92409 100%)',
        gradientRedReverse: 'linear-gradient(180deg, #B92409 0%, #E84528 100%)',
      },
    },
    byColor: {
      red: {
        light: '#FF684C',
        regular: '#BE341B',
      },
      purple: {
        regular: '#261A4F',
        dark: '#1F153E',
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
      default: 'Baloo2',
      headline: 'YesevaOne',
    },
    headlines: {
      jumbo: {
        fontSize: '6.4rem',
        fontWeight: '400',
        lineHeight: '1.25',
        fontFamily: 'YesevaOne',
      },
      big: {
        fontSize: '4.8rem',
        fontWeight: '400',
        lineHeight: '1.25',
        fontFamily: 'YesevaOne',
      },
      small: {
        fontSize: '2.4rem',
        fontWeight: '600',
        lineHeight: '1.25',
        fontFamily: 'Baloo2',
      },
      superText: {
        fontSize: '1.8rem',
        fontWeight: '500',
        lineHeight: '1.25',
        fontFamily: 'Baloo2',
      },
    },
    paragraphs: {
      default: {
        fontSize: '1.8rem',
        fontWeight: '400',
        lineHeight: '1.25',
        fontFamily: 'Baloo2',
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
