'use client';

import type { ReactElement } from 'react';

import LogoutPage from '@/components/templates/LogoutPage';
import Sidebar from '@/organisms/Sidebar';

const Logout = (): ReactElement => (
  <>
    <Sidebar />
    <LogoutPage />
  </>
);

export default Logout;
