"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getBlogTableData } from "../../api/frontend/blog";
import Image from "next/image";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Helper function to construct full image URL
  const getImageUrl = (imagePath) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const baseUrl = apiUrl.endsWith('/') ? apiUrl.slice(0, -1) : apiUrl;
    // Encode spaces and other special characters in the path while preserving slashes
    const encodedPath = imagePath.split('/').map(segment => 
      segment ? encodeURIComponent(segment) : segment
    ).join('/');
    return `${baseUrl}/public${encodedPath}`;
  };

  const fetchBlogs = async (page = 1) => {
    try {
      setLoading(true);
      const blogData = await getBlogTableData(page, 3); // 3 blogs per page
      
      // Process blog data to add backend URL to image paths and generate slugs
      const processedBlogs = blogData.items.map(blog => {
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
          // If image is already a full URL, use it as is
          if (blog.image.startsWith('http://') || blog.image.startsWith('https://')) {
            processedImage = blog.image;
          }
          // If image starts with /images/, construct full URL
          else if (blog.image.startsWith('/images/')) {
            processedImage = getImageUrl(blog.image);
          }
          // If image starts with / but not /images/, try to construct URL
          else if (blog.image.startsWith('/')) {
            processedImage = getImageUrl(blog.image);
          }
          // Otherwise, assume it's a relative path and construct full URL
          else {
            processedImage = getImageUrl('/' + blog.image);
          }
        }
        
        return {
          ...blog,
          image: processedImage,
          slug: slug
        };
      });
      
      setBlogs(processedBlogs);
      setCurrentPage(blogData.currentPage || page);
      setTotalPages(blogData.totalPages || 1);
      setTotalCount(blogData.totalCount || 0);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(1);
  }, []);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchBlogs(page);
    }
  };
  return (
    <>
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
                  fontSize: '3.5rem',
                  fontWeight: '700',
                  marginBottom: '1.5rem',
                  fontFamily: 'var(--accent-font)'
                }}>
                  Our blog
                </h1>
                <nav className="wow fadeInUp">
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
                </nav>
              </div>
              {/* Page Header Box End */}
            </div>
          </div>
        </div>
      </div>
      {/* Page Header End */}

      {/* Page Blog Start */}
      <div className="page-blog" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div className="row">
            {loading ? (
              // Loading state
              <div className="col-lg-12 text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading blogs...</p>
              </div>
            ) : blogs.length === 0 ? (
              // Empty state
              <div className="col-lg-12 text-center py-5">
                <h3>No blogs available</h3>
                <p>Check back later for new content!</p>
              </div>
            ) : (
              // Dynamic blog posts
              blogs.map((blog, index) => (
                <div key={blog._id || index} className="col-lg-4 col-md-6">
                  <div 
                    className="post-item wow fadeInUp"
                    data-wow-delay={`${index * 0.2}s`}
                  >
                     <div className="post-featured-image">
                        <Link href={`/blog-single/${blog.slug || blog._id}`} data-cursor-text="View">
                         <figure className="image-anime">
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
                                                  height={220}
                                                  style={{
                                                    width: '100%',
                                                    maxWidth: '1200px',
                                                    height: '220px',
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
                                                height: '220px',
                                                objectFit: 'cover',
                                                borderRadius: '15px',
                                                boxShadow: '0 8px 30px rgba(0,0,0,0.1)'
                                              }}
                                            />
                                          )}
                          {/* <img
                            className="img-whp cover w-100"
                            src={
                              blog.image
                                ? blog.image.replace(/\s+/g, '%20')
                                : getImageUrl('/assets/images/thumbnail.webp')
                            }
                            alt={blog.title || "Blog post"}
                            style={{
                              width: '100%',
                              height: '220px',
                              objectFit: 'cover'
                            }}
                            onError={(e) => {
                              // Fallback to default image if image fails to load
                              e.target.src = getImageUrl('/assets/images/thumbnail.webp');
                            }}
                          /> */}
                          
                         </figure>
                       </Link>
                     </div>
                    <div className="post-item-content">
                      <h2>
                         <Link href={`/blog-single/${blog.slug || blog._id}`}>
                          {blog.title || "Untitled Blog Post"}
                        </Link>
                      </h2>
                    </div>
                    <div className="blog-item-btn">
                       <Link href={`/blog-single/${blog.slug || blog._id}`} className="readmore-btn">
                        view details
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="col-lg-12">
                <div
                  className="page-pagination wow fadeInUp"
                  data-wow-delay="1.2s"
                >
                  <ul className="pagination">
                    <li className={currentPage === 1 ? 'disabled' : ''}>
                      <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                          opacity: currentPage === 1 ? 0.5 : 1
                        }}
                      >
                        <i className="fa-solid fa-arrow-left-long"></i>
                      </button>
                    </li>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <li key={page} className={currentPage === page ? 'active' : ''}>
                        <button 
                          onClick={() => handlePageChange(page)}
                          style={{ 
                            background: 'none', 
                            border: 'none', 
                            cursor: 'pointer',
                            padding: '8px 12px',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: currentPage === page ? '#4daf4e' : 'transparent',
                            color: currentPage === page ? 'white' : '#4daf4e',
                            border: currentPage === page ? 'none' : '1px solid #4daf4e'
                          }}
                        >
                          {page}
                        </button>
                      </li>
                    ))}
                    
                    <li className={currentPage === totalPages ? 'disabled' : ''}>
                      <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                          opacity: currentPage === totalPages ? 0.5 : 1
                        }}
                      >
                        <i className="fa-solid fa-arrow-right-long"></i>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            )}
            <div className="hero-btn text-center">
                <a href="/signup" className="btn-default">Sign Up</a>
            </div>
          </div>
        </div>
      </div>
      {/* Page Blog End */}
    </>
  );
}
