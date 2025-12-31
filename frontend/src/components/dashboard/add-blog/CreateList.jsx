"use client";

import { useEffect, useState } from "react";
import { addBlogAPI } from "../../../api/blog";
import { useRouter, useParams } from "next/navigation";
import dynamic from 'next/dynamic';

import { getBlogcategoryTableData } from "../../../api/blogcategory";
import { toast } from 'react-toastify';

// Dynamically import CKEditor wrapper with SSR disabled
const CKEditorWrapper = dynamic(() => import('./CKEditorWrapper'), { ssr: false });


const CreateList = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [logo, setLogo] = useState(null);
  const [blogcategories, setBlogcategories] = useState([]);
  const [selectedBlogcategory, setSelectedBlogcategory] = useState("");
  const [metatitle, setMetatitle] = useState([]);
  const [metadescription, setMetaDescription] = useState([]);
  const [isSubmitting, setisSubmitting] = useState("");
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
  };
  const handleDescriptionChange = (value) => {
    setDescription(value);
    setError("");
  };

  const handleBlogcategoryChange = (e) => {
    setSelectedBlogcategory(e.target.value);
    setError("");
  };
  const addBlog = async (e) => {
    e.preventDefault();
    setisSubmitting(true)

    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!slug.trim()) {
      setError("Slug is required");
      return;
    }
    if (!description.trim()) {
      setError("Description is required");
      return;
    }
    if (!selectedBlogcategory) {
      setError("Blog category is required");
      return;
    }

    setError("");

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


      const data = await addBlogAPI(formData); // Use FormData here

      toast.success(data.message);

      if (data.status == "success") {
        setTimeout(() => {
          router.push("/cmsadminlogin/my-blog");
        }, 1500);
      }

      setTitle("");
      setDescription("");
      setSlug("");
      setLogo(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setisSubmitting(false);
    }
  };


  return (
    <>
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
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="blogTitle">Blog Title</label>
            <input type="text" className="form-control" id="blogTitle" value={title} onChange={handleTitleChange} />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="blogSlug">Blog Slug (SEO URL)</label>
            <input
              type="text"
              className="form-control"
              id="blogSlug"
              value={slug}
              onChange={handleSlugChange}
              placeholder="Auto-generated from title"
              readOnly
              style={{ backgroundColor: '#f8f9fa', cursor: 'not-allowed' }}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="blogSource">Blog Source</label>
            <input type="text" className="form-control" id="blogSource" value={source} onChange={(e) => setSource(e.target.value)} />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>
        <div className="col-lg-6 col-xl-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="blogDate">Blog Date</label>
            <input type="date" className="form-control" id="blogDate" value={date} onChange={(e) => setDate(e.target.value)} />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          </div>
        </div>
        {/* End .col */}
        <div className="col-lg-12">
          <div className="my_profile_setting_textarea form-group">
            <label htmlFor="blogDescription">Description</label>
            <CKEditorWrapper
              data={description}
              onChange={(event, editor) => {
                const data = editor.getData();
                handleDescriptionChange(data);
              }}
              config={{
                toolbar: {
                  items: [
                    'heading',
                    '|',
                    'fontSize',
                    'fontFamily',
                    '|',
                    'fontColor',
                    'fontBackgroundColor',
                    '|',
                    'bold',
                    'italic',
                    'underline',
                    'strikethrough',
                    '|',
                    'alignment',
                    '|',
                    'numberedList',
                    'bulletedList',
                    '|',
                    'outdent',
                    'indent',
                    '|',
                    'link',
                    'imageUpload',
                    'insertTable',
                    'mediaEmbed',
                    '|',
                    'blockQuote',
                    'codeBlock',
                    '|',
                    'horizontalLine',
                    'specialCharacters',
                    '|',
                    'undo',
                    'redo',
                    '|',
                    'sourceEditing'
                  ],
                  shouldNotGroupWhenFull: true
                },
                heading: {
                  options: [
                    { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                    { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                    { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                    { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                    { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                    { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                    { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
                  ]
                },
                fontSize: {
                  options: [
                    9,
                    11,
                    13,
                    'default',
                    17,
                    19,
                    21,
                    24,
                    28,
                    32,
                    36,
                    48
                  ],
                  supportAllValues: true
                },
                fontFamily: {
                  options: [
                    'default',
                    'Arial, Helvetica, sans-serif',
                    'Courier New, Courier, monospace',
                    'Georgia, serif',
                    'Lucida Sans Unicode, Lucida Grande, sans-serif',
                    'Tahoma, Geneva, sans-serif',
                    'Times New Roman, Times, serif',
                    'Trebuchet MS, Helvetica, sans-serif',
                    'Verdana, Geneva, sans-serif',
                    'Roboto, sans-serif',
                    'Open Sans, sans-serif',
                    'Lato, sans-serif',
                    'Montserrat, sans-serif',
                    'Poppins, sans-serif'
                  ],
                  supportAllValues: true
                },
                alignment: {
                  options: ['left', 'center', 'right', 'justify']
                },
                image: {
                  toolbar: [
                    'imageTextAlternative',
                    '|',
                    'toggleImageCaption',
                    '|',
                    'imageStyle:inline',
                    'imageStyle:alignLeft',
                    'imageStyle:alignCenter',
                    'imageStyle:alignRight',
                    'imageStyle:alignBlockLeft',
                    'imageStyle:alignBlockRight',
                    'imageStyle:block',
                    'imageStyle:side',
                    '|',
                    'linkImage'
                  ],
                  styles: [
                    // Inline styles
                    'inline',
                    'alignLeft',
                    'alignCenter',
                    'alignRight',
                    // Block styles
                    'alignBlockLeft',
                    'alignBlockRight',
                    'block',
                    'side'
                  ],
                  resizeUnit: '%',
                  resizeOptions: [
                    {
                      name: 'resizeImage:original',
                      label: 'Original Size',
                      value: null
                    },
                    {
                      name: 'resizeImage:10',
                      label: '10%',
                      value: '10'
                    },
                    {
                      name: 'resizeImage:25',
                      label: '25%',
                      value: '25'
                    },
                    {
                      name: 'resizeImage:50',
                      label: '50%',
                      value: '50'
                    },
                    {
                      name: 'resizeImage:75',
                      label: '75%',
                      value: '75'
                    },
                    {
                      name: 'resizeImage:100',
                      label: '100%',
                      value: '100'
                    }
                  ],
                  upload: {
                    types: ['jpeg', 'jpg', 'png', 'gif', 'webp', 'svg+xml']
                  }
                },
                table: {
                  contentToolbar: [
                    'tableColumn',
                    'tableRow',
                    'mergeTableCells',
                    'tableCellProperties',
                    'tableProperties'
                  ]
                },
                link: {
                  decorators: {
                    openInNewTab: {
                      mode: 'manual',
                      label: 'Open in a new tab',
                      attributes: {
                        target: '_blank',
                        rel: 'noopener noreferrer'
                      }
                    }
                  },
                  addTargetToExternalLinks: true
                },
                mediaEmbed: {
                  previewsInData: true
                },
                htmlSupport: {
                  allow: [
                    {
                      name: /.*/,
                      attributes: true,
                      classes: true,
                      styles: true
                    }
                  ]
                },
                minHeight: '500px',
                placeholder: 'Write your blog content here...'
              }}
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
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
          <div className="my_profile_setting_input">
            <button className="btn-default float-start" type="button" onClick={() => window.location.href = '/cmsadminlogin/my-dashboard'}>Back</button>
            <button type="submit" className="btn-default float-end" disabled={isSubmitting} >{isSubmitting ? 'Sending...' : 'Submit'}</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateList;
