'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Maintenance removed: redirect to home
export default function MaintenanceRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/');
  }, [router]);
  return null;
}
