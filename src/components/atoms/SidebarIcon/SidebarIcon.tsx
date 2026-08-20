import {
  ArrowLeftStartOnRectangleIcon,
  QuestionMarkCircleIcon,
  MagnifyingGlassIcon,
  BookOpenIcon,
  HeartIcon,
  CogIcon,
  UserIcon,
} from '@heroicons/react/24/outline';

import { SidebarIconBody } from './SidebarIcon.styled';
import type { SidebarIcon as SidebarIconType, IconSwitch as IconSwitchType } from './SidebarIcon.types';
import { SIDEBAR_ICON } from './SidebarIcon.types';

const IconSwitch: IconSwitchType = icon => {
  switch (icon) {
    case SIDEBAR_ICON.SEARCH:
      return <MagnifyingGlassIcon />;
    case SIDEBAR_ICON.LIBRARY:
      return <BookOpenIcon />;
    case SIDEBAR_ICON.FAVORITES:
      return <HeartIcon />;
    case SIDEBAR_ICON.SETTINGS:
      return <CogIcon />;
    case SIDEBAR_ICON.USER:
      return <UserIcon />;
    case SIDEBAR_ICON.EXIT:
      return <ArrowLeftStartOnRectangleIcon />;
    default:
      return <QuestionMarkCircleIcon />;
  }
};

export const SidebarIcon: SidebarIconType = ({ icon, isActive = false }) => (
  <SidebarIconBody styleVariant={isActive}>{IconSwitch(icon)}</SidebarIconBody>
);
