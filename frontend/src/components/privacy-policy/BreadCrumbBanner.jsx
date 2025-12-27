import BreadCrumb from "@/components/common/BreadCrumb";


const BreadCrumbBanner = () => {
  return (
    <section className="inner_page_breadcrumb">
      <video
        className="background-video"
        autoPlay
        muted
        loop
        playsInline
      >
    <source 
    // src="/assets/images/background/frame-video.mp4"
    src={`${process.env.NEXT_PUBLIC_API_URL}public/assets/images/background/frame-video.mp4`}
     type="video/mp4" />
  </video>
      <div className="container">
        <div className="row">
          <div className="col-xl-6">
            <div className="breadcrumb_content">
              <BreadCrumb title="privacy policy" />
              <h4 className="breadcrumb_title">Privacy Policy</h4>
            </div>
          </div>
          {/* End .col */}
        </div>
      </div>
    </section>
  );
};

export default BreadCrumbBanner;
