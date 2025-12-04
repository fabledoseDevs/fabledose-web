'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import SidebarIcon from '@/atoms/SidebarIcon';

import { SidebarMenuBody } from './SidebarMenu.styled';
import type { SidebarMenu as SidebarMenuType } from './SidebarMenu.types';

export const SidebarMenu: SidebarMenuType = ({ menuItems, direction }) => {
  const pathname = usePathname();

  return (
    <SidebarMenuBody direction={direction}>
      {menuItems.map(item => {
        const isActive = pathname === item.href;

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
