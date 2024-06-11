import React, { useState } from "react";
import RegisterEmployer from "./RegisterEmployer";
import RegisterJobSeeker from "./RegisterJobSeeker";
import styles from "./RegisterMain.module.css";

const Register = () => {
  const [activeTab, setActiveTab] = useState("Employer");

  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Sign Up.</h1>
        </div>
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tabButton} ${
              activeTab === "Employer" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("Employer")}
          >
            Sign Up as Employer
          </button>
          <button
            className={`${styles.tabButton} ${
              activeTab === "Job Seeker" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("Job Seeker")}
          >
            Sign Up as Job Seeker
          </button>
        </div>
        <div className={styles.formContainer}>
          {activeTab === "Employer" && <RegisterEmployer />}
          {activeTab === "Job Seeker" && <RegisterJobSeeker />}
        </div>
      </div>
      </div>
  );
};

export default Register;