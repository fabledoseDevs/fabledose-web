'use client';
import Image from 'next/image';

import { useSidebarState } from '@/contexts/SidebarContext';
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

export const Sidebar: SidebarType = () => {
  const { isHidden } = useSidebarState();

  return (
    <SidebarBody $isHidden={isHidden}>
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
};
