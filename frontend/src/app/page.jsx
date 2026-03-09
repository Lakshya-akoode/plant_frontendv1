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
        url: "/img/plant-chat-media.png",
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
    images: ["/img/plant-chat-media.png"],
  },
};

export default function Home() {
  return <HomePageContent />;
}
