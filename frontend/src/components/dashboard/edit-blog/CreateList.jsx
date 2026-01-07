"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { getBlogById, updateBlogAPI } from "../../../api/blog";
import { getBlogcategoryTableData } from "../../../api/blogcategory";
import { toast } from 'react-toastify';

// Import Tiptap editor
import TiptapEditor from './TiptapEditor';


const CreateList = () => {

  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const [blog, setBlog] = useState({ title: "", status: false, description: "", });
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [logo, setLogo] = useState(null);
  const [logoimage, setLogoImage] = useState(null);
  const [metatitle, setMetatitle] = useState("");
  const [metadescription, setMetaDescription] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const uploadLogo = (e) => {
    setLogoImage("")
    setLogo(e.target.files[0]);
  };
  const [blogcategories, setBlogcategories] = useState([]);
  const [selectedBlogcategory, setSelectedBlogcategory] = useState("");
  useEffect(() => {
    if (!id) return;
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        // setBlog({ title: data.data.title, status: data.data.status, description: data.data.description });
        setTitle(data.data.title || "")
        setSlug(data.data.slug || "")
        setStatus(data.data.status === true || data.data.status === "true")
        setDescription(data.data.description || "")
        setSource(data.data.source || "")
        // Format the createdAt timestamp for the date field
        if (data.data.createdAt) {
          const date = new Date(data.data.createdAt);
          const formattedDate = date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
          setDate(formattedDate);
        } else {
          setDate("");
        }
        setMetatitle(data.data.metatitle || "")
        setMetaDescription(data.data.metadescription || "")

        setSelectedBlogcategory(data.data.blogCategory?._id || data.data.blogCategory || "")
        if (data.data.image) {
          setLogoImage(process.env.NEXT_PUBLIC_API_URL + 'public/' + data.data.image)
        }
      } catch (error) {
        console.error("Error fetching Blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
    const fetchBlogcategories = async () => {
      try {
        const response = await getBlogcategoryTableData();

        setBlogcategories(response || []);
      } catch (err) {
        console.error("Error fetching Blogcategory:", err);
      }
    };

    fetchBlogcategories();
  }, [id]);
  const handleBlogcategoryChange = (e) => {
    setSelectedBlogcategory(e.target.value);
  };
  const handleDescriptionChange = (value) => {
    setDescription(value);
    setError("");
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);

    // Auto-generate slug from title
    const generatedSlug = e.target.value
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .trim('-'); // Remove leading/trailing hyphens

    setSlug(generatedSlug);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("blogCategory", selectedBlogcategory);
      formData.append("status", status);
      formData.append("source", source);
      formData.append("metatitle", metatitle);
      formData.append("metadescription", metadescription);
      // Note: date field is read-only (shows creation date)
      if (logo) {
        formData.append("image", logo);
      }
      const res = await updateBlogAPI(id, formData);
      // alert("Blog updated successfully!");
      toast.success(res.message);

      if (res.status == "success") {
        setTimeout(() => {
          router.push("/livetest/cmsadminlogin/my-blog");
        }, 1500);
      }
    } catch (error) {
      alert("Failed to update Blog.");
      console.error(error);
    }
  };

  // const handleChange = (e) => {
  //   setBlog((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  // };

  // const handleStatusChange = () => {
  //   setBlog((prev) => ({ ...prev, status: !prev.status }));
  // };

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <form onSubmit={handleSubmit} className="row">
        <div className="col-lg-12">
          <div className="wrap-custom-file">
            <input
              type="file"
              id="image1"
              accept="image/png, image/gif, image/jpeg, image/svg+xml, image/svg, image/webp, image/avif"
              onChange={uploadLogo}
            />
            <label
              htmlFor="image1"
              style={
                logoimage
                  ? { backgroundImage: `url(${logoimage})` }
                  : logo
                    ? { backgroundImage: `url(${URL.createObjectURL(logo)})` }
                    : undefined
              }
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
            <label htmlFor="BlogcategorySelect">Select Blog category</label>
            <select
              id="BlogcategorySelect"
              className="selectpicker form-select"
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
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="BlogTitle">Blog Title</label>
            <input
              type="text"
              className="form-control"
              id="BlogTitle"
              name="title"
              value={title}
              onChange={handleTitleChange}
            />
          </div>
        </div>
        {/* End .col */}
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="BlogSlug">Blog Slug (SEO URL)</label>
            <input
              type="text"
              className="form-control"
              id="BlogSlug"
              name="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="Auto-generated from title"
              readOnly
              style={{ backgroundColor: '#f8f9fa', cursor: 'not-allowed' }}
            />
            <small className="text-muted">Auto-generated from title</small>
          </div>
        </div>
        {/* End .col */}
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="blogSource">Blog Source</label>
            <input type="text" className="form-control" id="blogSource" value={source} onChange={(e) => setSource(e.target.value)} />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="blogDate">Blog Creation Date</label>
            <input
              type="date"
              className="form-control"
              id="blogDate"
              value={date}
              readOnly
              style={{ backgroundColor: '#f8f9fa', cursor: 'not-allowed' }}
            />
          </div>
        </div>
        <div className="col-lg-12">
          <div className="my_profile_setting_textarea form-group">
            <label htmlFor="BlogDescription">Description</label>
            <TiptapEditor
              data={description}
              onChange={handleDescriptionChange}
            />
            {error.description && <span className="text-danger">{error.description}</span>}
          </div>

        </div>


        {/* End .col */}

        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input ui_kit_select_search form-group">
            <label>Status</label>
            <select
              className="selectpicker form-select"
              data-live-search="true"
              data-width="100%"
              value={status ? "active" : "deactive"}
              onChange={(e) => setStatus(e.target.value === "active")}
            >
              <option value="active">Active</option>
              <option value="deactive">Deactive</option>
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
            <button className="btn-default" type="button" onClick={() => window.location.href = '/livetest/cmsadminlogin/my-blog'}>Back</button>
            <div className="blog-preview-button-group">
              <button className="btn-default" type="button" onClick={() => setShowPreview(true)}>Preview</button>
              <button className="btn-default" type="submit">Publish</button>
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
            <div className="blog-preview-modal-content blog-preview-modal-content-edit">
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
                  ) : logoimage ? (
                    <img
                      src={logoimage}
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
