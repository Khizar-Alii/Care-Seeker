import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PopularCategories.css";
// Importing FontAwesome for icons
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";



const services = [
  {
    title: "Watchman",
    description: "Professional and reliable watchmen for your safety needs.",
    icon: "fas fa-user-shield",
  },
  {
    title: "Elder Care",
    description: "Compassionate elder care services for your loved ones.",
    icon: "fas fa-heart",
  },
  {
    title: "Baby Care",
    description:
      "Experienced baby caregivers to ensure your child's well-being.",
    icon: "fas fa-baby",
  },
  {
    title: "Gym Trainer",
    description: "Certified gym trainers to help you stay fit and healthy.",
    icon: "fas fa-dumbbell",
  },
  {
    title: "Housekeeper",
    description: "Experienced housekeepers to keep your home spotless.",
    icon: "fas fa-broom",
  },
  {
    title: "Driver",
    description: "Professional drivers for your personal or business needs.",
    icon: "fas fa-car",
  },
  {
    title: "Gardener",
    description: "Skilled gardeners to take care of your plants and lawns.",
    icon: "fas fa-seedling",
  },
  {
    title: "Chef",
    description: "Professional chefs to cook delicious meals for you.",
    icon: "fas fa-utensils",
  },
  {
    title: "Tutor",
    description: "Qualified tutors for your children's educational needs.",
    icon: "fas fa-book",
  },
  {
    title: "Nurse",
    description: "Certified nurses to take care of your medical needs.",
    icon: "fas fa-stethoscope",
  },
];


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
const PopularCategories = () => {  
  const serviceSettings = {
    arrows: true,
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: "ease",
    autoplay: true,
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
    ],
  };

  return (
    <main>
      <section className="services">
        <h2>Our Services</h2>
        <Slider {...serviceSettings}>
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <i className={service.icon}></i>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </Slider>
      </section>
    </main>
  );
};

export default PopularCategories;