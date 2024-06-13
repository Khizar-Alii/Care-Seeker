import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { MdOutlineMailOutline } from "react-icons/md";
import styles from "./ForgotPassword.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      toast.success("Plz check your mail");
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/user/forgotpassword",
        { email },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      toast.success(data.message);
      setEmail("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className={styles.authPage}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Reset Password</h1>
          <h3>Please enter your email to reset your password.</h3>
        </div>
        <form onSubmit={handleForgotPassword}>
          <div className={styles.inputTag}>
            <label>Email Address</label>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                autoComplete="false"
                className={styles.input}
              />
              <MdOutlineMailOutline className={styles.icon} />
            </div>
          </div>
          <button type="submit" className={styles.resetButton}>
            Reset Password
          </button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
