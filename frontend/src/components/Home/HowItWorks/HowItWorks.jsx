import React from "react";
import Styles from "./HowItWorks.module.css";

const HowItWorks = () => {
  return (
    <main style={{
      textAlign: "center",
      overflowX: "hidden"
    }}>
      <section className={Styles.howItWorks}>
        <h2>How CareSeekers Works</h2>
        <div className={Styles.howItWorksContainer}>
          <div className={Styles.step}>
            <i className="fas fa-search"></i>
            <h3>Search for Services</h3>
            <p>
              Find the professional you need by browsing our wide range of
              services.
            </p>
          </div>
          <div className={Styles.step}>
            <i className="fas fa-user-check"></i>
            <h3>Choose the Best</h3>
            <p>
              Compare professionals based on reviews and ratings to find the
              best match.
            </p>
          </div>
          <div className={Styles.step}>
            <i className="fas fa-handshake"></i>
            <h3>Hire with Confidence</h3>
            <p>
              Contact and hire the professional that meets your requirements.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HowItWorks;