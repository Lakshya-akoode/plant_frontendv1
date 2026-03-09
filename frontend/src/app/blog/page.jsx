import BlogPageContent from "@/components/pages/BlogPageContent";

export const metadata = {
  title: "PC News Blog - Plant Chat®",
  description: "Stay informed with the latest research, botanical science, and data-driven wellness innovation from Plant Chat®.",
  openGraph: {
    title: "PC News Blog - Plant Chat®",
    description: "Stay informed with the latest research, botanical science, and data-driven wellness innovation from Plant Chat®.",
    images: ["/img/plant-chat-media.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PC News Blog - Plant Chat®",
    description: "Stay informed with the latest research, botanical science, and data-driven wellness innovation from Plant Chat®.",
    images: ["/img/plant-chat-media.png"],
  },
};

export default function BlogPage() {
  return <BlogPageContent />;
}
