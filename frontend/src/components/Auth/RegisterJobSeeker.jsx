import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import styles from "./Register.module.css";

const RegisterJobSeeker = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role] = useState("Job Seeker");
  const [bio, setBio] = useState("");
  const [des, setDes] = useState("");
  const [location, setLocation] = useState("");
  const [education, setEducation] = useState([
    { institution: "", from: "", to: "" },
  ]);
  const [experience, setExperience] = useState([
    { company: "", role: "", from: "", to: "" },
  ]);

  const { isAuthorized, setIsAuthorized } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/user/register",
        {
          name,
          phone,
          email,
          role,
          password,
          bio,
          des,
          location,
          education,
          experience,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setBio("");
      setDes("");
      setLocation("");
      setEducation([{ institution: "", from: "", to: "" }]);
      setExperience([{ company: "", role: "", from: "", to: "" }]);
      setIsAuthorized(true);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...education];
    newEducation[index][field] = value;
    setEducation(newEducation);
  };

  const handleExperienceChange = (index, field, value) => {
    const newExperience = [...experience];
    newExperience[index][field] = value;
    setExperience(newExperience);
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
          />
          <MdOutlineMailOutline />
        </div>
      </div>
      <div className={styles.inputTag}>
        <label>Phone Number</label>
        <div>
          <input
            type="number"
            placeholder="03175983425"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="number"
            htmlFor="number"
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
          />
          <RiLock2Fill />
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
          <FaRegUser />
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
          />
        </div>
      </div>
      {education.map((edu, index) => (
        <div key={index}>
          <div className={styles.inputTag}>
            <label>Institution</label>
            <div>
              <input
                type="text"
                placeholder="Your Institution"
                value={edu.institution}
                onChange={(e) =>
                  handleEducationChange(index, "institution", e.target.value)
                }
              />
            </div>
          </div>
          <div className={styles.inputTag}>
            <label>From</label>
            <div>
              <input
                type="date"
                value={edu.from}
                onChange={(e) =>
                  handleEducationChange(index, "from", e.target.value)
                }
              />
            </div>
          </div>
          <div className={styles.inputTag}>
            <label>To</label>
            <div>
              <input
                type="date"
                value={edu.to}
                onChange={(e) =>
                  handleEducationChange(index, "to", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          setEducation([...education, { institution: "", from: "", to: "" }])
        }
      >
        Add Education
      </button>
      {experience.map((exp, index) => (
        <div key={index}>
          <div className={styles.inputTag}>
            <label>Company</label>
            <div>
              <input
                type="text"
                placeholder="Your Company"
                value={exp.company}
                onChange={(e) =>
                  handleExperienceChange(index, "company", e.target.value)
                }
              />
            </div>
          </div>
          <div className={styles.inputTag}>
            <label>Role</label>
            <div>
              <input
                type="text"
                placeholder="Your Role"
                value={exp.role}
                onChange={(e) =>
                  handleExperienceChange(index, "role", e.target.value)
                }
              />
            </div>
          </div>
          <div className={styles.inputTag}>
            <label>From</label>
            <div>
              <input
                type="date"
                value={exp.from}
                onChange={(e) =>
                  handleExperienceChange(index, "from", e.target.value)
                }
              />
            </div>
          </div>
          <div className={styles.inputTag}>
            <label>To</label>
            <div>
              <input
                type="date"
                value={exp.to}
                onChange={(e) =>
                  handleExperienceChange(index, "to", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={() =>
          setExperience([
            ...experience,
            { company: "", role: "", from: "", to: "" },
          ])
        }
      >
        Add Experience
      </button>
      <button type="submit">Register</button>
      <Link to={"/login"}>Login Now</Link>
    </form>
  );
};

export default RegisterJobSeeker;