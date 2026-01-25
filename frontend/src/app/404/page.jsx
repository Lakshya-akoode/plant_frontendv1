'use client';

import Header from '@/components/home/Header';
import Error from "@/components/404/ErrorPageContent";
import Footer from '@/components/common/footer/Footer';

export default function ErrorPage() {
return (
    <main className="main">
      <Header />
      <Error />
      <Footer />
    </main>
  );
}