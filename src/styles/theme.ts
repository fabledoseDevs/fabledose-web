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
    basic: {
      beige: '#FAF0DD',
      denim: '#316372',
      wasabi: '#7F8A27',
      coral: '#D1504E',
      white: '#F9F9F9',
      black: '#222222',
    },
    beigeVariants: {
      lighter: '#FDF6ED',
      darker: '#CBBFB2',
    },
    denimVariants: {
      lighter: '#3E7E91',
      darker: '#183038',
    },
    wasabiVariants: {
      lighter: '#9AA830',
      darker: '#4D5417',
    },
    coralVariants: {
      lighter: '#f8615e',
      darker: '#9a3a38',
    },
    whiteVariants: {
      lighter: '#FFFFFF',
      darker: '#C9C9C9',
    },
    blackVariants: {
      lighter: '#3B3B3B',
      darker: '#000000',
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
  fonts: {
    poltawskiNowy: 'Poltawski',
    lato: 'Lato',
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
  }
};