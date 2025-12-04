import Image from 'next/image';

import SidebarMenu from '@/molecules/SidebarMenu';

import {
  desktopMainMenu,
  desktopSecondaryMenu,
  mobileMenu,
} from './Sidebar.data';
import {
  BottomMenuHolder,
  LogoWrapper,
  MiddleMenuHolder,
  MobileMenuHolder,
  SidebarBody,
} from './Sidebar.styled';
import type { Sidebar as SidebarType } from './Sidebar.types';

export const Sidebar: SidebarType = () => (
  <SidebarBody>
    <LogoWrapper>
      <Image
        src="/icons/logo-icon.png"
        alt="Fabledose"
        width={42}
        height={27}
      />
    </LogoWrapper>

    <MiddleMenuHolder>
      <SidebarMenu menuItems={desktopMainMenu} direction="column" />
    </MiddleMenuHolder>

    <BottomMenuHolder>
      <SidebarMenu menuItems={desktopSecondaryMenu} direction="column" />
    </BottomMenuHolder>

    <MobileMenuHolder>
      <SidebarMenu menuItems={mobileMenu} direction="row" />
    </MobileMenuHolder>
  </SidebarBody>
);
