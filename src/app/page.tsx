'use client';
import { type ReactElement, useState } from 'react';

import LandingPage from '@/components/templates/LandingPage';
import Maintenance from '@/components/templates/Maintenance';

const Home = (): ReactElement => {
  const [showMaintenance, setShowMaintenance] = useState(true);

  return (
    <>
      {showMaintenance ? <Maintenance /> : <LandingPage />}
      <div
        style={{
          position: 'fixed',
          bottom: '10px',
          left: '10px',
          width: '20px',
          height: '20px',
          cursor: 'pointer',
          opacity: '0.1',
          zIndex: 9999,
        }}
        onClick={() => setShowMaintenance(false)}
      />
    </>
  );
};

export default Home;
