'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/home/Header';
import ContactUs from '@/components/contact-us/ContactUs';
import Footer from '@/components/common/footer/Footer';

export default function ContactUsPage() {
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
      <ContactUs />
      <Footer />
    </main>
  );
}
