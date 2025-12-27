'use client';

const GetNewsletter = () => {
  return (
    <section className="newsletter-section bg-light py-5">
      <div className="text-center">
        <h4 className="mb-3">Sign up for the <strong>Get Balanced® Newsletter</strong></h4>
        <p className="text-muted">Stay informed about our latest innovations and research.</p>

        <form id="newsletter-form" className="row justify-content-center" method="post" action="">
          <div className="col-md-6 col-sm-8">
            <div className="input-group">
              <input type="email" name="newsletter_email" className="form-control" placeholder="Enter your email address" required />
              <button className="btn btn-dark" type="submit">Subscribe</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default GetNewsletter;
