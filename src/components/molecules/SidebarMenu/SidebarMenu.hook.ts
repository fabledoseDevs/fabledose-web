import { usePathname } from 'next/navigation';

import type {
  NormalizePath as NormalizePathType,
  useSidebarMenu as useSidebarMenuType,
} from './SidebarMenu.types';

export const useSidebarMenu: useSidebarMenuType = () => {
  const pathname = usePathname() ?? '/';

  const normalizePath: NormalizePathType = path => {
    if (!path) return '/';
    let p = path.startsWith('/') ? path : `/${path}`;

    const segments = p.split('/'); // e.g., ['', 'pl', 'library']
    const first = segments[1];

    if (first && /^[a-zA-Z]{2}$/.test(first)) {
      segments.splice(1, 1);
      p = segments.join('/') || '/';
    }

    if (p.length > 1 && p.endsWith('/')) {
      p = p.replace(/\/+$/, '');
    }

    return p || '/';
  };

  return { pathname, normalizePath };
};

export default useSidebarMenu;
