"use client";

import { useEffect, useState } from "react";
import { addBlogAPI } from "../../../api/blog";
import { useRouter, useParams } from "next/navigation";
import dynamic from 'next/dynamic';

import { getBlogcategoryTableData } from "../../../api/blogcategory";
import { toast } from 'react-toastify';

// Import Tiptap editor
import TiptapEditor from './TiptapEditor';


const CreateList = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [logo, setLogo] = useState(null);
  const [blogcategories, setBlogcategories] = useState([]);
  const [selectedBlogcategory, setSelectedBlogcategory] = useState("");
  const [metatitle, setMetatitle] = useState([]);
  const [metadescription, setMetaDescription] = useState([]);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  useEffect(() => {
    const fetchBlogcategories = async () => {
      try {
        const response = await getBlogcategoryTableData();

        setBlogcategories(response || []);
      } catch (err) {
        console.error("Error fetching Blogcategory:", err);
      }
    };

    fetchBlogcategories();
    setError(""); // Clear any existing error on component mount
  }, []);
  // upload profile
  const uploadLogo = (e) => {
    setLogo(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setError("");
    setFieldErrors(prev => ({ ...prev, title: "" }));

    // Auto-generate slug from title
    const generatedSlug = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim('-'); // Remove leading/trailing hyphens

    setSlug(generatedSlug);
  };
  const handleSlugChange = (e) => {
    setSlug(e.target.value);
    setError("");
    setFieldErrors(prev => ({ ...prev, slug: "" }));
  };
  const handleDescriptionChange = (value) => {
    setDescription(value);
    setError("");
    setFieldErrors(prev => ({ ...prev, description: "" }));
  };

  const handleBlogcategoryChange = (e) => {
    setSelectedBlogcategory(e.target.value);
    setError("");
    setFieldErrors(prev => ({ ...prev, blogcategory: "" }));
  };

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  const addBlog = async (e) => {
    e.preventDefault();
    setisSubmitting(true);

    // Clear previous errors
    setError("");
    setFieldErrors({});

    // Collect all validation errors
    const errors = {};
    let hasErrors = false;

    // Validate fields first (before making API call)
    if (!title.trim()) {
      errors.title = "Title is required";
      hasErrors = true;
      toast.error("Title is required");
    }
    if (!slug.trim()) {
      errors.slug = "Slug is required";
      hasErrors = true;
      toast.error("Slug is required");
    }
    if (!description.trim()) {
      errors.description = "Description is required";
      hasErrors = true;
      toast.error("Description is required");
    }
    if (!selectedBlogcategory) {
      errors.blogcategory = "Blog category is required";
      hasErrors = true;
      toast.error("Blog category is required");
    }

    // If there are validation errors, show them and scroll to top
    if (hasErrors) {
      setFieldErrors(errors);
      setisSubmitting(false);
      scrollToTop();
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("blogCategory", selectedBlogcategory);
      formData.append("metatitle", metatitle);
      formData.append("metadescription", metadescription);
      if (logo) {
        formData.append("image", logo);
      }

      // API call - button will show "Publishing..." during this
      const data = await addBlogAPI(formData);

      // Reset button state after API call completes (success or error)
      setisSubmitting(false);

      if (data.status == "success") {
        toast.success(data.message);
        // Clear form fields
        setTitle("");
        setDescription("");
        setSlug("");
        setLogo(null);
        // Redirect after a short delay
        setTimeout(() => {
          router.push("/cmsadminlogin/my-blog");
        }, 1500);
      }
      else if (data.message == "Not authorized, no token") {
        setError(data.message);
        router.push("/cmsadminlogin");
      } else {
        // Handle other error responses
        setError(data.message || "Failed to publish blog");
      }
    } catch (error) {
      // Reset button state on error
      setisSubmitting(false);
      setError(error.message || "An error occurred while publishing the blog");
    }
  };


  return (
    <>
      {/* Error Alert Banner */}
      {/* {Object.keys(fieldErrors).length > 0 && (
        <div className="col-12 mb-3">
          <div className="alert alert-danger" role="alert">
            <strong><i className="fas fa-exclamation-triangle me-2"></i>Please fill in all required fields marked with *</strong>
            <ul className="mb-0 mt-2">
              {fieldErrors.title && <li>{fieldErrors.title}</li>}
              {fieldErrors.slug && <li>{fieldErrors.slug}</li>}
              {fieldErrors.description && <li>{fieldErrors.description}</li>}
              {fieldErrors.blogcategory && <li>{fieldErrors.blogcategory}</li>}
            </ul>
          </div>
        </div>
      )} */}
      
      <form onSubmit={addBlog} className="row">
        <div className="col-lg-12">
          <div className="wrap-custom-file">
            <input
              type="file"
              id="image1"
              accept="image/png, image/gif, image/jpeg, image/svg+xml, image/svg, image/webp, image/avif"
              onChange={uploadLogo}
            />
            <label
              style={
                logo !== null
                  ? {
                    backgroundImage: `url(${URL.createObjectURL(
                      logo
                    )})`,
                  }
                  : undefined
              }
              htmlFor="image1"
            >
              <span>
                <i className="flaticon-download"></i> Upload Photo{" "}
              </span>
            </label>
          </div>
          <p>*minimum 260px x 260px</p>
        </div>
        {/* End .col */}
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label htmlFor="BlogcategorySelect">Select Blog category <span className="text-danger">*</span></label>
            <select
              id="BlogcategorySelect"
              className={`selectpicker form-select ${fieldErrors.blogcategory ? 'border-danger' : ''}`}
              value={selectedBlogcategory}
              onChange={handleBlogcategoryChange}
              data-live-search="true"
              data-width="100%"
            >
              <option value="">-- Select Blog category --</option>
              {blogcategories.map((blogcategory) => (
                <option key={blogcategory._id} value={blogcategory._id}>
                  {blogcategory.title}
                </option>
              ))}
            </select>
            {fieldErrors.blogcategory && <p className="text-danger text-sm mt-1">{fieldErrors.blogcategory}</p>}
            {error && !fieldErrors.blogcategory && <p className="text-danger text-sm mt-1">{error}</p>}
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="blogTitle">Blog Title <span className="text-danger">*</span></label>
            <input 
              type="text" 
              className={`form-control ${fieldErrors.title ? 'border-danger' : ''}`}
              id="blogTitle" 
              value={title} 
              onChange={handleTitleChange} 
            />
            {fieldErrors.title && <p className="text-danger text-sm mt-1">{fieldErrors.title}</p>}
            {error && !fieldErrors.title && <p className="text-danger text-sm mt-1">{error}</p>}
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="blogSlug">Blog Slug (SEO URL) <span className="text-danger">*</span></label>
            <input
              type="text"
              className={`form-control ${fieldErrors.slug ? 'border-danger' : ''}`}
              id="blogSlug"
              value={slug}
              onChange={handleSlugChange}
              placeholder="Auto-generated from title"
              readOnly
              style={{ backgroundColor: '#f8f9fa', cursor: 'not-allowed' }}
            />
            {fieldErrors.slug && <p className="text-danger text-sm mt-1">{fieldErrors.slug}</p>}
            {error && !fieldErrors.slug && <p className="text-danger text-sm mt-1">{error}</p>}
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="blogSource">Blog Source</label>
            <input type="text" className="form-control" id="blogSource" value={source} onChange={(e) => setSource(e.target.value)} />
            {error && <p className="text-danger text-sm mt-1">{error}</p>}
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="blogDate">Blog Date</label>
            <input type="date" className="form-control" id="blogDate" value={date} onChange={(e) => setDate(e.target.value)} />
            {error && <p className="text-danger text-sm mt-1">{error}</p>}
          </div>
        </div>
        {/* End .col */}
        <div className="col-lg-12">
          <div className="my_profile_setting_textarea form-group">
            <label htmlFor="blogDescription">Description <span className="text-danger">*</span></label>
            <TiptapEditor
              data={description}
              onChange={handleDescriptionChange}
            />
            {fieldErrors.description && <p className="text-danger text-sm mt-1">{fieldErrors.description}</p>}
            {error && !fieldErrors.description && <p className="text-danger text-sm mt-1">{error}</p>}
          </div>

        </div>

        {/* End .col */}
        <div className="col-lg-6 col-xl-6 d-none">
          <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label>Status</label>
            <select
              className="selectpicker form-select"
              data-live-search="true"
              data-width="100%"
            >
              <option data-tokens="1">Active</option>
              <option data-tokens="2">Deactive</option>
            </select>
          </div>
        </div>
        {/* End .col */}

        <div className=" mt30 ">
          <div className="col-lg-12">
            <h3 className="mb30">Meta Information</h3>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="my_profile_setting_input form-group">
                <label htmlFor="blogMetatitle">Meta Title</label>

                <input type="text"
                  className="form-control"
                  id="blogMetatitle"
                  value={metatitle}
                  onChange={(e) => setMetatitle(e.target.value)} />
              </div>
            </div>
            <div className="col-lg-12">
              <div className="my_profile_setting_textarea form-group">
                <label htmlFor="blogMetaDescription">Meta Description</label>
                <textarea id="blogMetaDescription" className="form-control" rows="7" value={metadescription} onChange={(e) => setMetaDescription(e.target.value)} placeholder="Enter meta description"></textarea>
                {error.metadescription && <span className="text-danger">{error.metadescription}</span>}
              </div>

            </div>


            {/* End .col */}
          </div>

        </div>


        <div className="col-xl-12">
          <div className="my_profile_setting_input blog-preview-button-container">
            <button className="btn-default" type="button" onClick={() => window.location.href = '/cmsadminlogin/my-dashboard'}>Back</button>
            <div className="blog-preview-button-group">
              <button className="btn-default" type="button" onClick={() => setShowPreview(true)}>Preview</button>
              <button type="submit" className="btn-default" disabled={isSubmitting} >{isSubmitting ? 'Publishing...' : 'Publish'}</button>
            </div>
          </div>
        </div>

        {/* Preview Modal */}
        {showPreview && (
          <div 
            className="blog-preview-modal-overlay"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setShowPreview(false);
              }
            }}
          >
            <div className="blog-preview-modal-content">
              {/* Close Button */}
              <button
                className="blog-preview-modal-close"
                onClick={() => setShowPreview(false)}
              >
                ×
              </button>

              {/* Preview Content - Matching Frontend Blog Display */}
              <div className="blog-preview-content-wrapper">
                {/* Page Header */}
                <div 
                  className="blog-preview-header"
                  style={{
                    backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 100%), url(${process.env.NEXT_PUBLIC_SITE_URL}public/img/plant-leaf.webp)`
                  }}
                >
                  <div className="blog-preview-header-inner">
                    <h1 className="blog-preview-title">
                      {title || "Blog Post"}
                    </h1>
                  </div>
                </div>

                {/* Blog Image */}
                <div className="blog-preview-image-container">
                  {logo ? (
                    <img
                      src={URL.createObjectURL(logo)}
                      alt={title || "Blog post"}
                      className="blog-preview-image"
                    />
                  ) : (
                    <img
                      src={`${process.env.NEXT_PUBLIC_SITE_URL}public/img/about-us.webp`}
                      alt="Blog post image"
                      className="blog-preview-image"
                    />
                  )}
                </div>

                {/* Blog Content */}
                <div className="blog-preview-content-section">
                  {description ? (
                    <div 
                      className="blog-preview-description"
                      dangerouslySetInnerHTML={{ __html: description }}
                    />
                  ) : (
                    <p className="blog-preview-empty-content">
                      No content available for this blog post.
                    </p>
                  )}
                </div>
              </div>
          </div>
        </div>
        )}
      </form>
    </>
  );
};

export default CreateList;
