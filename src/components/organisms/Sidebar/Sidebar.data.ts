import { SIDEBAR_ICON } from '@/atoms/SidebarIcon/SidebarIcon.types';

export const desktopMainMenu = [
  { icon: SIDEBAR_ICON.SEARCH, href: '/search' },
  { icon: SIDEBAR_ICON.LIBRARY, href: '/library' },
  { icon: SIDEBAR_ICON.FAVORITES, href: '/favorites' },
  { icon: SIDEBAR_ICON.SETTINGS, href: '/settings' },
];

export const desktopSecondaryMenu = [
  { icon: SIDEBAR_ICON.USER, href: '/user' },
  { icon: SIDEBAR_ICON.EXIT, href: '/logout' },
];

export const mobileMenu = [
  { icon: SIDEBAR_ICON.SEARCH, href: '/search' },
  { icon: SIDEBAR_ICON.LIBRARY, href: '/library' },
  { icon: SIDEBAR_ICON.FAVORITES, href: '/favorites' },
  { icon: SIDEBAR_ICON.SETTINGS, href: '/settings' },
  { icon: SIDEBAR_ICON.USER, href: '/user' },
];
