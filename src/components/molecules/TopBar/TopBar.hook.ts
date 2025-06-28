import { useEffect, useState } from 'react';

import type { UseTopBarScroll } from './TopBar.types';

export const useTopBarScroll: UseTopBarScroll = () => {
  const [isTransparent, setIsTransparent] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsTransparent(scrollPosition === 0);
    };
    window.addEventListener('scroll', handleScroll);

    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { isTransparent };
};
