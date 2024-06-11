import React, { useContext, useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { Link, Navigate } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import styles from "./Login.module.css"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://care-seeker-api.vercel.app/api/v1/user/login",
        { email, password, role },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setEmail("");
      setPassword("");
      setRole("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if(isAuthorized){
    return <Navigate to={'/'}/>
  }

  return (
    <>
      <section className={styles.authPage}>
        <div className={styles.container}>
          <div className={styles.header}>
            {/* <img src="/CS.png" alt="logo" /> */}
            <h1>Welcome Back</h1>
            <h3>Please enter your details to sign in.</h3>
          </div>
          <form>
            {/* <div className={styles.inputTag}>
              <label>Login As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div> */}
            <div className={styles.inputTag}>
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="khizi@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  htmlFor="email"
                  autoComplete="false"
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className={styles.inputTag}>
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  autoComplete="false"
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  htmlFor="password"
                />
                <RiLock2Fill />
              </div>
            </div>
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
            {/* <Link to={"/register-employer"} className={styles.goToRegBtn}>Register as an Employer</Link>
            <Link to={"/register-job-seeker"} className={styles.goToRegBtn}>Register as an Job Seeker</Link> */}
            <Link to={"/register"} className={styles.goToRegBtn}>Don't have an account</Link> 
          </form>
        </div>
      </section>
    </>
  );
};
export default Login;
