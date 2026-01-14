"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Header from '@/components/home/Header';
import Footer from '@/components/common/footer/Footer';
import GetNewsletter from '@/components/home/GetNewsletter';
import Link from "next/link";
import { getBlogBySlug } from "../../api/frontend/blog";

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
                  {blog.title || "Blog Post"}
                </h1>
              </div>
              {/* Page Header Box End */}
            </div>
          </div>
        </div>
      </div>
      {/* Page Header End */}

      {/* Page Single Post Start */}
      <div className="page-single-post" style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {/* Content Aligned Image */}
              <div className="wow fadeInUp" data-wow-delay="0.1s" style={{ 
                marginBottom: '2rem',
                display: 'flex',
                justifyContent: 'center'
              }}>
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
                        style={{
                          width: '100%',
                          maxWidth: '1200px',
                          height: '500px',
                          objectFit: 'cover',
                          borderRadius: '15px',
                          boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
                        }}
                      />
                    );
                  })()
                ) : (
                  <img
                    src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/about-us.webp`}
                    alt="Blog post image"
                    style={{
                      width: '100%',
                      maxWidth: '1200px',
                      height: '500px',
                      objectFit: 'cover',
                      borderRadius: '15px',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
                    }}
                  />
                )}
              </div>

              {/* Post Single Content Start */}
              <div className="post-content" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Post Entry Start */}
                <div className="post-entry">
                  {blog.description ? (
                    <div 
                      className="wow fadeInUp"
                      dangerouslySetInnerHTML={{ __html: blog.description }}
                      style={{
                        fontSize: '1.1rem',
                        lineHeight: '1.8',
                        color: '#6c757d',
                        marginBottom: '1.5rem'
                      }}
                    />
                  ) : (
                    <p className="wow fadeInUp" style={{
                      fontSize: '1.1rem',
                      lineHeight: '1.8',
                      color: '#6c757d',
                      marginBottom: '1.5rem'
                    }}>
                      No content available for this blog post.
                    </p>
                  )}
                </div>
                {/* Post Entry End */}

                {/* Post Tag Links Start */}
                <div className="post-tag-links" style={{
                  borderTop: '1px solid #e9ecef',
                  paddingTop: '2rem',
                  marginTop: '3rem'
                }}>
                  <div className="row align-items-center">
                    <div className="col-lg-8">
                      {/* Post Tags Start */}
                      {(blog.tags && blog.tags.length > 0) ? (
                        <div className="post-tags wow fadeInUp" data-wow-delay="0.5s">
                          <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.5rem',
                            alignItems: 'center'
                          }}>
                            <span style={{
                              fontSize: '1rem',
                              color: '#6c757d',
                              marginRight: '0.5rem'
                            }}>
                              Tags:
                            </span>
                            <div style={{
                              display: 'flex',
                              flexWrap: 'wrap',
                              gap: '0.5rem'
                            }}>
                              {blog.tags.map((tag, index) => (
                                <span key={index} style={{
                                  backgroundColor: '#2c5530',
                                  color: 'white',
                                  padding: '0.3rem 0.8rem',
                                  borderRadius: '8px',
                                  fontSize: '0.9rem',
                                  border: '1px solid #e9ecef',
                                  fontWeight: '500'
                                }}>#{tag}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="post-tags wow fadeInUp" data-wow-delay="0.5s">
                          {/* Empty div if no tags */}
                        </div>
                      )}
                      {/* Post Tags End */}
                    </div>

                    <div className="col-lg-4">
                      {/* Post Social Links Start */}
                      <div className="post-social-sharing wow fadeInUp" data-wow-delay="0.5s" style={{ textAlign: 'right' }}>
                        <ul style={{
                          listStyle: 'none',
                          padding: 0,
                          margin: 0,
                          display: 'flex',
                          justifyContent: 'flex-end',
                          gap: '1rem'
                        }}>
                          <li>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener noreferrer" style={{
                              color: 'white',
                              fontSize: '1.2rem',
                              textDecoration: 'none',
                              transition: 'color 0.3s ease'
                            }}>
                              <i className="fa-brands fa-facebook-f"></i>
                            </a>
                          </li>
                          <li>
                            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}`} target="_blank" rel="noopener noreferrer" style={{
                              color: 'white',
                              fontSize: '1.2rem',
                              textDecoration: 'none',
                              transition: 'color 0.3s ease'
                            }}>
                              <i className="fa-brands fa-linkedin-in"></i>
                            </a>
                          </li>
                          <li>
                            <a href={`https://www.instagram.com/`} target="_blank" rel="noopener noreferrer" style={{
                              color: 'white',
                              fontSize: '1.2rem',
                              textDecoration: 'none',
                              transition: 'color 0.3s ease'
                            }}>
                              <i className="fa-brands fa-instagram"></i>
                            </a>
                          </li>
                          <li>
                            <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(typeof window !== 'undefined' ? window.location.href : '')}&text=${encodeURIComponent(blog.title || '')}`} target="_blank" rel="noopener noreferrer" style={{
                              color: 'white',
                              fontSize: '1.2rem',
                              textDecoration: 'none',
                              transition: 'color 0.3s ease'
                            }}>
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
      <GetNewsletter/>
      <Footer/>
      
    </>
  );
};

export default BlogSingle;
