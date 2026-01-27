'use client';

import { useEffect } from 'react';
import Header from '@/components/home/Header';
import Hero from '@/components/home/Hero';
import HowItWorks from '@/components/home/HowItWorks';
import AboutUs from '@/components/home/AboutUs';
import WhatWeDo from '@/components/home/WhatWeDo';
import Blog from '@/components/home/Blog';
import GetNewsletter from '@/components/home/GetNewsletter';
import CTA from '@/components/home/CTA';
import FAQ from '@/components/home/FAQ';
import Footer from '@/components/common/footer/Footer';

export default function HomePageContent() {
  useEffect(() => {
    // Initialize animations and sliders when component mounts
    if (typeof window !== 'undefined') {
      // Initialize WOW.js for animations
      if (window.WOW) {
        new window.WOW().init();
      }

      // Initialize Swiper for sliders
      if (window.Swiper) {
        // Hero slider
        new window.Swiper('.hero-slider', {
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.hero-pagination',
            clickable: true,
          },
        });

        // Process slider
        new window.Swiper('.home2-process-slider', {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: ".service-slider-next",
            prevEl: ".service-slider-prev",
          },
          breakpoints: {
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2,
            },
          },
        });
      }
    }
  }, []);

  return (
    <main className="main">
      <Header />
      <Hero />
      <HowItWorks />
      <AboutUs />
      <WhatWeDo />
      <Blog />
      <GetNewsletter />
      <CTA />
      <FAQ />
      <Footer />
    </main>
  );
}
