'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getBlogTableData } from '../../api/frontend/blog';

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper function to construct full image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/img/post-1.webp'; // Default fallback image
    
    // If image is already a full URL, use it as is
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    
    // If image starts with /images/, construct full URL from backend
    const frontendApiUrl = process.env.NEXT_PUBLIC_FRONTEND_API_URL;
    const baseUrl = frontendApiUrl ? frontendApiUrl.replace('/frontend/', '') : 'http://localhost:5000';
    
    if (imagePath.startsWith('/images/') || imagePath.startsWith('/')) {
      return `${baseUrl}/public${imagePath}`;
    }
    
    // Otherwise, assume it's a relative path
    return `${baseUrl}/public/${imagePath}`;
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        // Fetch latest 3 blogs for the home page
        const blogData = await getBlogTableData(1, 3);
        
        // Process blog data to ensure slugs and image URLs are correct
        // Limit to exactly 3 blogs
        const processedBlogs = (blogData.items || [])
          .slice(0, 3)
          .map(blog => {
            // Generate slug if it doesn't exist
            let slug = blog.slug;
            if (!slug && blog.title) {
              slug = blog.title
                .toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
                .replace(/\s+/g, '-') // Replace spaces with hyphens
                .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
                .trim('-'); // Remove leading/trailing hyphens
            }

            // Process image URL
            let processedImage = blog.image;
            if (blog.image) {
              processedImage = getImageUrl(blog.image);
            } else {
              // Use default image if no image provided
              processedImage = '/img/post-1.webp';
            }
            
            return {
              ...blog,
              image: processedImage,
              slug: slug || blog._id
            };
          });
        
        setBlogs(processedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="our-blog white-bg">
      <div className="container">
        <div className="row section-row align-items-center">
          <div className="col-lg-6">
            {/* Section Title Start */}
            <div className="section-title">
              <h3 className="wow fadeInUp">Latest blog</h3>
              <h2 className="text-anime-style-2" data-cursor="-opaque">PC News<span> Insights, Stories & Research</span></h2>
            </div>
            {/* Section Title End */}
          </div>
    
          <div className="col-lg-6">
            {/* Section Title Content Start */}
            <div className="section-btn wow fadeInUp" data-wow-delay="0.2s">
              <Link href="/blog" className="btn-default">View all news</Link>
            </div>
            {/* Section Title Content End */}
          </div>
        </div>
        
        <div className="row">
          {loading ? (
            // Loading state - show skeleton or placeholder
            <>
              {[0, 1, 2].map((index) => (
                <div key={index} className="col-lg-4 col-md-6">
                  <div className="post-item wow fadeInUp" data-wow-delay={`${index * 0.2}s`}>
                    <div className="post-featured-image">
                      <div className="image-anime" style={{ 
                        width: '100%', 
                        height: '220px', 
                        backgroundColor: '#f0f0f0',
                        borderRadius: '15px'
                      }}></div>
                    </div>
                    <div className="post-item-body">
                      <div className="post-item-content">
                        <h2 className="mb-2" style={{ height: '24px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}></h2>
                      </div>
                      <div className="post-item-btn">
                        <span className="readmore-btn" style={{ opacity: 0.5 }}>read more</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : blogs.length === 0 ? (
            // Empty state - show default placeholder blogs
            <>
              <div className="col-lg-4 col-md-6">
                <div className="post-item wow fadeInUp">
                  <div className="post-featured-image">
                    <Link href="/blog" data-cursor-text="View">
                      <figure className="image-anime">
                        <img src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/post-1.webp`} alt="image" className="img-fluid" />
                      </figure>
                    </Link>
                  </div>
                  <div className="post-item-body">
                    <div className="post-item-content">
                      <h2 className="mb-2"><Link href="/blog">The Future of Plant-Based Wellness</Link></h2>
                    </div>
                    <div className="post-item-btn">
                      <Link href="/blog" className="readmore-btn">read more</Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            // Dynamic blog posts
            blogs.map((blog, index) => (
              <div key={blog._id || index} className="col-lg-4 col-md-6">
                {/* Post Item Start */}
                <div className="post-item wow fadeInUp" data-wow-delay={`${index * 0.2}s`}>
                  {/* Post Featured Image Start*/}
                  <div className="post-featured-image">
                    <Link href={`/blog-single/${blog.slug || blog._id}`} data-cursor-text="View">
                      <figure className="image-anime">
                        {blog.image ? (
                          <img 
                            src={blog.image} 
                            alt={blog.title || "Blog post"} 
                            className="img-fluid"
                            onError={(e) => {
                              // Fallback to default image if image fails to load
                              e.target.src = '/img/post-1.webp';
                            }}
                          />
                        ) : (
                          <img src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/post-1.webp`}  alt="image" className="img-fluid" />
                        )}
                      </figure>
                    </Link>
                  </div>
                  {/* Post Featured Image End */}

                  {/* Post Item Body Start */}
                  <div className="post-item-body">
                    {/* Post Item Content Start */}
                    <div className="post-item-content">
                      <h2 className="mb-2">
                        <Link href={`/blog-single/${blog.slug || blog._id}`}>
                          {blog.title || "Untitled Blog Post"}
                        </Link>
                      </h2>
                      
                    </div>
                    {/* Post Item Content End */}

                    {/* Post Item Readmore Button Start*/}
                    <div className="post-item-btn">
                      <Link href={`/blog-single/${blog.slug || blog._id}`} className="readmore-btn">read more</Link>
                    </div>
                    {/* Post Item Readmore Button End*/}
                  </div>
                  {/* Post Item Body End */}
                </div>
                {/* Post Item End */}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
