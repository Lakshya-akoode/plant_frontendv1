'use client';

import Header from '@/components/home/Header';
import Thankyou from "../../../components/thankyou-page/ThankyouPageContent";
import Footer from '@/components/common/footer/Footer';

export default function ThankyouPage() {
return (
    <main className="main">
      <Header />
      <Thankyou />
      <Footer />
    </main>
  );
}