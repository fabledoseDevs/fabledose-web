'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

import { useSidebarAutoHide } from '@/hooks/useSidebarAutoHide';

interface SidebarContextType {
  isHidden: boolean;
  enableAutoHide: boolean;
  setEnableAutoHide: (enabled: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [enableAutoHide, setEnableAutoHide] = useState(false);
  const { isHidden } = useSidebarAutoHide(enableAutoHide);

  return (
    <SidebarContext.Provider value={{ isHidden, enableAutoHide, setEnableAutoHide }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebarState = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebarState must be used within SidebarProvider');
  }
  return context;
};
