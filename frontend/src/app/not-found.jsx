'use client';

import Header from '@/components/home/Header';
import ErrorPageContent from '@/components/404/ErrorPageContent';
import Footer from '@/components/common/footer/Footer';

export default function NotFound() {
  return (
    <main className="main">
      <Header />
      <ErrorPageContent />
      <Footer />
    </main>
  );
}
