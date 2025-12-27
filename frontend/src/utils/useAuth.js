import { useEffect } from 'react';
import { useRouter } from "next/navigation";

export default function useAuth() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('user');
    if (!token) {
      router.replace('/livetest/cmsadminlogin'); // redirect to login if no token
    }
  }, [router]);
}
