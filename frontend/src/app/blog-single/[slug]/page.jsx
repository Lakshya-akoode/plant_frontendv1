import BlogSingle from "@/components/blog/BlogSingle";
import { getBlogBySlug, getBlogById } from "@/api/frontend/blog";

export async function generateMetadata({ params }) {
  const { slug } = params;
  let blog = null;

  try {
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(slug);
    if (isObjectId) {
      const data = await getBlogById(slug);
      blog = data?.data;
    } else {
      const data = await getBlogBySlug(slug);
      blog = data?.data;
    }
  } catch (error) {
    console.error("Error fetching blog for metadata:", error);
  }

  if (!blog) {
    return {
      title: "Blog Post Not Found - Plant Chat®",
    };
  }

  // Construct proper image URL
  let imageUrl = blog.image;
  if (imageUrl?.startsWith('/images/')) {
    const frontendApiUrl = process.env.NEXT_PUBLIC_FRONTEND_API_URL;
    const baseUrl = frontendApiUrl ? frontendApiUrl.replace('/frontend/', '') : 'http://localhost:5000';
    imageUrl = baseUrl + '/public' + imageUrl;
  } else if (!imageUrl) {
    imageUrl = "/img/plant-leaf.webp";
  }

  return {
    title: `${blog.title} - Plant Chat®`,
    description: blog.metadescription || blog.description?.replace(/<[^>]*>/g, '').substring(0, 160),
    openGraph: {
      title: blog.title,
      description: blog.metadescription || blog.description?.replace(/<[^>]*>/g, '').substring(0, 160),
      images: [imageUrl],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.metadescription || blog.description?.replace(/<[^>]*>/g, '').substring(0, 160),
      images: [imageUrl],
    },
  };
}

export default function BlogSinglePage() {
  return <BlogSingle />;
}
