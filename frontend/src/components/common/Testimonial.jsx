// 'use client'

import Image from "next/image";
import Slider from "react-slick";

const Testimonial = ({testimonials}) => {
  
  const settings = {
    dots: true,
    arrow: false,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  return (
    <>
      <Slider {...settings} arrows={false}>
        {testimonials?.slice(0, 30).map((item) => (
          <div className="item" key={item._id}>
            <div className="testimonial_grid">
              <div className="thumb">
                <Image width={95} height={95} src="/assets/images/testimonial/man.png" alt="1.jpg" />
              </div>
              <div className="details">
                <h4>{item.title}</h4>
                <p>{item.designation}</p>
                <p className="mt25">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </>
  );
};

export default Testimonial;
