'use client';

import { useParams, useRouter } from 'next/navigation';
import type { ReactElement } from 'react';

import PlanPage from '@/components/templates/PlanPage';

const Plan = (): ReactElement => {
  const router = useRouter();
  const params = useParams();
  const currentLang = (params?.lang as string) || 'en';

  return (
    <PlanPage
      onPlanSelected={() => {
        if (window.history.length > 1) {
          router.back();
          return;
        }

        router.push(`/${currentLang}/settings`);
      }}
    />
  );
};

export default Plan;
