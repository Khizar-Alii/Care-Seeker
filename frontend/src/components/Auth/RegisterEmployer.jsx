import React, { useContext, useState } from "react";
import { MdOutlineMailOutline, MdBusiness, MdLocationOn } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import styles from "./Register.module.css";

const RegisterEmployer = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role] = useState("Employer");
  const [company, setCompany] = useState("");
  const [bio, setBio] = useState("");
  const [des, setDes] = useState("");
  const [location, setLocation] = useState("");

  const { isAuthorized, setIsAuthorized } = useContext(Context);
  

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      formData.append("role", role);
      formData.append("company", company);
      formData.append("bio", bio);
      formData.append("des", des);
      formData.append("location", location);
      

      const { data } = await axios.post(
        "http://localhost:3000/api/v1/user/register",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setPhone("");
      setCompany("");
      setBio("");
      setDes("");
      setLocation("");
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthorized) {
    return <Navigate to={"/login"} />;
  }

  return (
    <form onSubmit={handleRegister}>
      <div className={styles.inputTag}>
        <label>Name</label>
        <div>
          <input
            type="text"
            placeholder="Khizar ALi"
            value={name}
            onChange={(e) => setName(e.target.value)}
            htmlFor="name"
            required
          />
          <FaPencilAlt />
        </div>
      </div>
      <div className={styles.inputTag}>
        <label>Email Address</label>
        <div>
          <input
            type="email"
            placeholder="khizar@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            htmlFor="email"
            required
          />
          <MdOutlineMailOutline />
        </div>
      </div>
      <div className={styles.inputTag}>
        <label>Phone Number</label>
        <div>
          <input
            type="tel"
            placeholder="03175983425"
            value={phone}
            onChange={(e) => {
              if (/^\d{0,11}$/.test(e.target.value)) {
                setPhone(e.target.value);
              }
            }}
            name="number"
            htmlFor="number"
            maxLength="11"
            title="Phone number must be 11 digits"
            className={styles.noArrows}
            required
          />
          <FaPhoneFlip />
        </div>
      </div>
      <div className={styles.inputTag}>
        <label>Password</label>
        <div>
          <input
            type="password"
            placeholder="Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            htmlFor="password"
            required
          />
          <RiLock2Fill />
        </div>
      </div>
      <div className={styles.inputTag}>
        <label>Confirm Password</label>
        <div>
          <input
            type="password"
            placeholder="Confirm Your Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            htmlFor="confirmPassword"
            required
          />
          <RiLock2Fill />
        </div>
      </div>
      <div className={styles.inputTag}>
        <label>Looking For</label>
        <div>
          <input
            type="text"
            placeholder="What services you want to connect"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          <MdBusiness />
        </div>
      </div>
      <div className={styles.inputTag}>
        <label>Address</label>
        <div>
          <input
            type="text"
            placeholder="Current Address"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <MdLocationOn />
        </div>
      </div>
      <div className={styles.inputTag}>
        <label>Bio</label>
        <div>
          <textarea
            placeholder="Describe Yourself"
            value={bio}
            rows={5}
            onChange={(e) => setBio(e.target.value)}
            required
          />
        </div>
      </div>
      <div className={styles.inputTag}>
        <label>Description</label>
        <div>
          <textarea
            placeholder="Tell us about Yourself"
            value={des}
            rows={5}
            onChange={(e) => setDes(e.target.value)}
            required
          />
        </div>
      </div>
      <button type="submit">Register</button>
      <Link to={"/login"}>Login Now</Link>
    </form>
  );
};

export default RegisterEmployer;