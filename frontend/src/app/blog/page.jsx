'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/home/Header';
import Blog from '@/components/blog/Blog';
import Footer from '@/components/common/footer/Footer';
import GetNewsletter from '@/components/home/GetNewsletter';

export default function BlogPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
   
    // Initialize animations when component mounts
    if (typeof window !== 'undefined') {
      // Initialize WOW.js for animations
      if (window.WOW) {
        new window.WOW().init();
      }
    }
  }, []);

  return (
    <main className="main">
      <Header />
      <Blog />
      <GetNewsletter/>
      <Footer />
    </main>
  );
}
