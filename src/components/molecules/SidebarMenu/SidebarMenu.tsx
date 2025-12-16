'use client';
import Link from 'next/link';

import SidebarIcon from '@/atoms/SidebarIcon';

import { useSidebarMenu } from './SidebarMenu.hook';
import { SidebarMenuBody } from './SidebarMenu.styled';
import type { SidebarMenu as SidebarMenuType } from './SidebarMenu.types';

export const SidebarMenu: SidebarMenuType = ({ menuItems, direction }) => {
  const { pathname, normalizePath } = useSidebarMenu();

  return (
    <SidebarMenuBody direction={direction}>
      {menuItems.map(item => {
        const isActive = normalizePath(pathname) === normalizePath(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            style={{ textDecoration: 'none' }}
          >
            <SidebarIcon icon={item.icon} isActive={isActive} />
          </Link>
        );
      })}
    </SidebarMenuBody>
  );
};

export default SidebarMenu;
