import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Styles from "./Testimonials.module.css"
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style, display: "block" }} onClick={onClick}>
      <FaChevronRight />
    </div>
  );
};

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div className={className} style={{ ...style, display: "block" }} onClick={onClick}>
      <FaChevronLeft />
    </div>
  );
};
const Testimonials = () => {
    const reviews = [
        {
          text: "The elder care service was exceptional! My grandmother feels very well cared for.",
          author: "Hamza ALi",
        },
        {
          text: "The gym trainer helped me achieve my fitness goals. Highly recommend!",
          author: "Usman Haider",
        },
        {
          text: "Finding a reliable watchman was so easy through this site. Great service!",
          author: "Mr. Najib",
        },
        {
          text: "The baby care service is amazing. Our nanny is wonderful!",
          author: "Hammad Khan",
        },
        {
          text: "Our housekeeper is excellent and very trustworthy.",
          author: "Shehreyar Khan",
        },
        {
          text: "The driver provided was very professional and punctual.",
          author: "Awais Raza",
        },
        {
          text: "The gardener transformed our backyard into a beautiful garden.",
          author: "Mohsin Ali",
        },
      ];
      
      
    const reviewSettings = {
        dots: false,
        infinite: true,
        arrows: true,
        speed: 300,
        autoplay: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        cssEase: "ease",
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            },
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ]
      };
  return (
    <div style={{
        textAlign:'center'
    }}>
      <section className={Styles.testimonials}>
        <h2>What Our Clients Say</h2>
        <Slider {...reviewSettings}>
          {reviews.map((review, index) => (
            <div key={index} className={Styles.testimonialCard}>
              <p>{review.text}</p>
              <h4> {review.author}</h4>
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
};

export default Testimonials;
