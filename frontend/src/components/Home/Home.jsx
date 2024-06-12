import React from "react";
import { useContext } from "react";
import { Context } from "../../main";
import { Link, Navigate } from "react-router-dom";
import HowItWorks from "./HowItWorks/HowItWorks";
import PopularCategories from "./PopularCategories/PopularCategories";
import HeroSection from "./HeroSection/HeroSection";
import Testimonials from "./Testimonials/Testimonials";

const Home = () => {
  const { isAuthorized, user } = useContext(Context);
  if (!isAuthorized) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <section className="homePage page">
        <HeroSection />
        <HowItWorks />
        <PopularCategories />
        <Testimonials />
      </section>
    </>
  );
};

export default Home;
