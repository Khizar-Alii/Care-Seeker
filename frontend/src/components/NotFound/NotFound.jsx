import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFound.module.css"

const NotFound = () => {
  return (
    <>
      <section className={styles.notfound}>
        <div className={styles.content}>
          <img src="/notfound.png" alt="notfound" />
          <Link to={"/"}>RETURN TO HOME PAGE</Link>
        </div>
      </section>
    </>
  );
};

export default NotFound;
