import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
// import 'react-toastify/dist/ReactToastify.css';
// import ToastProvider from '../components/common/ToastProvider';
import SurveyProvider from "../components/common/SurveyProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Plant Chat® - Plant-Based Wellness Platform",
  description: "Nourishing the Master Regulator: Real-time, evidence-informed guidance on plant-based wellness.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" style={{ margin: 0, padding: 0, height: '100%' }}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
        <meta name="description" content="Nourishing the Master Regulator: Real-time, evidence-informed guidance on plant-based wellness." />
        <meta name="keywords" content="plant-based wellness, herbal medicine, AI-driven insights, holistic health" />
        <meta name="author" content="Plant Chat®" />
        <link rel="shortcut icon" type="image/png" href={`${process.env.NEXT_PUBLIC_API_URL}public/images/favicon.png`} />
        <link rel="icon" type="image/png" sizes="32x32" href={`${process.env.NEXT_PUBLIC_API_URL}public/images/favicon.png`} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Marcellus&family=Sora:wght@100..800&display=swap" rel="stylesheet" />
        <link href="/css/bootstrap.min.css" rel="stylesheet" media="screen" />
        <link rel="stylesheet" href="/css/swiper-bundle.min.css" />
        <link href="/css/all.min.css" rel="stylesheet" media="screen" />
        <link href="/css/choices.min.css" rel="stylesheet" media="screen" />
        <link href="/css/animate.css" rel="stylesheet" />
        <link href="/css/style-icon.css" rel="stylesheet" media="screen"/>
        <link href="/css/style.css" rel="stylesheet" media="screen"/>
        <link href="/css/responsive.css" rel="stylesheet" media="screen"/>
        <link href="/css/custom.css" rel="stylesheet" media="screen" />
       
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} style={{ margin: 0, padding: 0, height: '100%' }}>
        {/* <ToastProvider /> */}
        <SurveyProvider>
          {children}
        </SurveyProvider>
       
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/js/swiper-bundle.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/js/gsap.min.js"
          strategy="lazyOnload"
        />
        <Script
          src="/js/ScrollTrigger.min.js"
          strategy="lazyOnload"
        />
        <Script
          src="/js/wow.min.js"
          strategy="lazyOnload"
        />
        <Script
          src="/js/custom.js"
          strategy="afterInteractive"
        />
       
      </body>
    </html>
  );
}
