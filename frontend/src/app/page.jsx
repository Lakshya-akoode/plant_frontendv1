import HomePageContent from "@/components/pages/HomePageContent";

export const metadata = {
  title: "Plant Chat® - Plant-Based Wellness Platform",
  description: "Nourishing the Master Regulator: Real-time, evidence-informed guidance on plant-based wellness.",
  openGraph: {
    title: "Plant Chat® - Plant-Based Wellness Platform",
    description: "Nourishing the Master Regulator: Real-time, evidence-informed guidance on plant-based wellness.",
    url: "/",
    siteName: "Plant Chat®",
    images: [
      {
        url: "/public/images/plant-chat-logo.svg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plant Chat® - Plant-Based Wellness Platform",
    description: "Nourishing the Master Regulator: Real-time, evidence-informed guidance on plant-based wellness.",
    images: ["/public/images/plant-chat-logo.svg"],
  },
};

export default function Home() {
  return <HomePageContent />;
}
