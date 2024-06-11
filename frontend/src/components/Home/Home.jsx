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
        <section
          className="call-to-action"
          style={{
            backgroundColor: "#282c34",
            color: "white",
            padding: "50px 20px",
            textAlign: "center",
          }}
        >
          {user && user.role === "Employer" ? (
            <h2 style={{ fontSize: "2.5em", marginBottom: "20px" }}>
              Ready to Find the Perfect Care Seeker?
            </h2>
          ) : (
            <h2 style={{ fontSize: "2.5em", marginBottom: "20px" }}>
              Ready to Find the Perfect Professional?
            </h2>
          )}
          <Link
            to={user && user.role === "Employer" ? "/job/post" : "/job/getall"}
            style={{
              backgroundColor: "#61dafb",
              padding: "15px 30px",
              fontSize: "1em",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              textDecoration:"none",
              margin:"10px 0"
            }}
            className="cta-button"
          >
            Get Started Now
          </Link>
        </section>
      </section>
    </>
  );
};

export default Home;
