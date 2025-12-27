"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getBlogBySlug } from "../../api/frontend/blog";
import Header from '@/components/home/Header';
import Footer from '@/components/common/footer/Footer';

const BlogSingle = () => {
  const params = useParams();
  const slug = params?.slug;
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        
        // Check if the slug looks like a MongoDB ObjectId (24 hex characters)
        const isObjectId = /^[0-9a-fA-F]{24}$/.test(slug);
        
        if (isObjectId) {
          // If it's an ObjectId, fetch by ID
          try {
            const { getBlogById } = await import("../../api/frontend/blog");
            const data = await getBlogById(slug);
            setBlog(data.data);
          } catch (idError) {
            console.error("Error fetching blog by ID:", idError);
            setBlog(null);
          }
        } else {
          // If it's a slug, fetch by slug
          try {
            const data = await getBlogBySlug(slug);
            setBlog(data.data);
          } catch (slugError) {
            console.error("Error fetching blog by slug:", slugError);
            setBlog(null);
          }
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading blog post...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-12 text-center">
            <h1>Blog Post Not Found</h1>
            <p>The blog post you're looking for doesn't exist.</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      <Header />
      {/* Page Header Start */}
      <div className="page-header parallaxie" style={{
        backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 100%), url(${process.env.NEXT_PUBLIC_SITE_URL}public/img/plant-leaf.webp)`,
        backgroundSize: 'cover',
        backgroundPosition: 'bottom center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        padding: '120px 0 80px',
        position: 'relative',
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              {/* Page Header Box Start */}
              <div className="page-header-box">
                <h1 className="text-anime-style-2" data-cursor="-opaque" style={{
                  color: '#ffffff',
                  textShadow: '0 4px 8px rgba(0,0,0,0.5)',
                  fontSize: '2.5rem',
                  fontWeight: '300',
                  marginBottom: '1.5rem',
                  fontFamily: 'var(--accent-font)',
                  textTransform: 'capitalize'
                }}>
                  Understanding N-Acylethanolamines (NAEs) and Their Role in Our Endocannabinoid System, The Master Regulator
                </h1>
                {/* <nav className="wow fadeInUp">
                  <ol className="breadcrumb" style={{ 
                    // backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    padding: '10px 20px',
                    borderRadius: '25px',
                    // backdropFilter: 'blur(10px)'
                  }}>
                    <li className="breadcrumb-item">
                      <Link href="./" style={{ color: '#ffffff', textDecoration: 'none' }}>home</Link>
                    </li>
                    <li
                      className="breadcrumb-item active"
                      aria-current="page"
                      style={{ color: '#e2e8f0' }}
                    >
                      our blog
                    </li>
                  </ol>
                </nav> */}
              </div>
              {/* Page Header Box End */}
            </div>
          </div>
        </div>
      </div>
      {/* Page Header End */}

      {/* Page Single Post Start */}
      <div className="page-single-post">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* Post Featured Image Start */}
              <div className="post-image">
                <figure className="image-anime" style={{ visibility: 'visible' }}>
                  {blog.image ? (
                    (() => {
                      // Construct proper image URL
                      let imageUrl = blog.image;
                      if (imageUrl.startsWith('/images/')) {
                        // Image is stored in backend, prepend backend URL
                        const frontendApiUrl = process.env.NEXT_PUBLIC_FRONTEND_API_URL;
                        const baseUrl = frontendApiUrl ? frontendApiUrl.replace('/frontend/', '') : 'http://localhost:5000';
                        imageUrl = baseUrl + '/public' + imageUrl;
                      }
                      return (
                        <Image
                          src={imageUrl}
                          alt={blog.title || "Blog post"}
                          width={1200}
                          height={500}
                          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                        />
                      );
                    })()
                  ) : (
                    <div style={{ 
                      width: '100%', 
                      height: '500px', 
                      borderRadius: '15px',
                      backgroundColor: '#f8f9fa', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#6c757d'
                    }}>
                      No image available
                    </div>
                  )}
                </figure>
              </div>
              {/* Post Featured Image End */}

              {/* Post Single Content Start */}
              <div className="post-content">
                {/* Post Entry Start */}
                <div className="post-entry">
                  {blog.description ? (
                    <div 
                      className="wow fadeInUp"
                      dangerouslySetInnerHTML={{ __html: blog.description }}
                    />
                  ) : (
                    <p className="wow fadeInUp">
                      No content available for this blog post.
                    </p>
                  )}
                </div>
                {/* Post Entry End */}

                {/* Post Tag Links Start */}
                <div className="post-tag-links">
                  <div className="row align-items-center">
                    <div className="col-lg-8">
                      {/* Post Tags Start */}
                      {(blog.tags && blog.tags.length > 0) ? (
                        <div className="post-tags wow fadeInUp" data-wow-delay="0.5s">
                          <span className="tag-links">
                            Tags:
                            {blog.tags.map((tag, index) => (
                              <a key={index} href={`/blog?tag=${tag}`}>
                                {tag}
                              </a>
                            ))}
                          </span>
                        </div>
                      ) : (
                        <div className="post-tags wow fadeInUp" data-wow-delay="0.5s">
                          {/* <span className="tag-links">
                            Tags: <span style={{ color: '#999', fontStyle: 'italic' }}>No tags available</span>
                          </span> */}
                        </div>
                      )}
                      {/* Post Tags End */}
                    </div>

                    <div className="col-lg-4">
                      {/* Post Social Links Start */}
                      <div className="post-social-sharing wow fadeInUp" data-wow-delay="0.5s">
                        <ul>
                          <li>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                              <i className="fa-brands fa-facebook-f"></i>
                            </a>
                          </li>
                          <li>
                            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer">
                              <i className="fa-brands fa-linkedin-in"></i>
                            </a>
                          </li>
                          <li>
                            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`} target="_blank" rel="noopener noreferrer">
                              <i className="fa-brands fa-x-twitter"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                      {/* Post Social Links End */}
                    </div>
                  </div>
                </div>
                {/* Post Tag Links End */}
              </div>
              {/* Post Single Content End */}
            </div>
          </div>
        </div>
      </div>
      {/* Page Single Post End */}
      <Footer/>
    </>
  );
};

export default BlogSingle;
