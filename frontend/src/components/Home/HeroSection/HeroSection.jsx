import React from "react";
import Styles from "./HeroSection.module.css"

const HeroSection = () => {
  return (
    <>
      <div className={Styles.heroSection}>
        <div className={Styles.container}>
          <div className={Styles.title}>
            <h1>Find the Best Physical</h1>
            <h1>Skills Professionals</h1>
            <p>
            Connecting you with reliable and experienced professionals for all
              your physical skill needs.
            </p>
          </div>
          <div className={Styles.image}>
            <img src="/heroS.jpg" alt="hero" />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
