import React, { useState } from "react";
import axios from "axios";
import styles from "./Profile.module.css";

const EditProfile = ({ user, onClose, onSave }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [company, setCompany] = useState(user.company);
  const [bio, setBio] = useState(user.bio);
  const [des, setDes] = useState(user.des);
  const [location, setLocation] = useState(user.location);
  const [education, setEducation] = useState(user.education || []);
  const [experience, setExperience] = useState(user.experience || []);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    try {
      const payload = {
        name,
        email,
        phone,
        bio,
        des,
        location,
      };

      if (user.role === "Employer") {
        payload.company = company;
      } else {
        payload.education = education;
        payload.experience = experience;
      }

      const response = await axios.put(
        "http://localhost:3000/api/v1/user/update",
        payload,
        {
          withCredentials: true,
        }
      );
      onSave(response.data.user);
      onClose();
    } catch (error) {
      console.error("Failed to update profile", error);
      setError(error.response?.data?.error || "Failed to update profile");
    }
  };

  const handleEducationChange = (index, key, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][key] = value;
    setEducation(updatedEducation);
  };

  const handleExperienceChange = (index, key, value) => {
    const updatedExperience = [...experience];
    updatedExperience[index][key] = value;
    setExperience(updatedExperience);
  };

  const addEducation = () => {
    setEducation([...education, { institution: "", from: "", to: "" }]);
  };

  const addExperience = () => {
    setExperience([...experience, { company: "", role: "", from: "", to: "" }]);
  };

  return (
    <div className={styles.editProfile}>
      <h2>Edit Profile</h2>
      {error && <p className={styles.error}>{error}</p>}
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Phone:
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </label>
      {user.role === "Employer" ? (
        <label>
          Company:
          <input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </label>
      ) : (
        <>
          <label>
            Education:
            <button type="button" onClick={addEducation}>
              Add Education
            </button>
          </label>
          {education.map((edu, index) => (
            <div key={index} className={styles.educationItem}>
              <label>
                Institution:
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) =>
                    handleEducationChange(index, "institution", e.target.value)
                  }
                />
              </label>
              <label>
                From:
                <input
                  type="text"
                  value={edu.from}
                  onChange={(e) =>
                    handleEducationChange(index, "from", e.target.value)
                  }
                />
              </label>
              <label>
                To:
                <input
                  type="text"
                  value={edu.to}
                  onChange={(e) =>
                    handleEducationChange(index, "to", e.target.value)
                  }
                />
              </label>
            </div>
          ))}
          <label>
            Experience:
            <button type="button" onClick={addExperience}>
              Add Experience
            </button>
          </label>
          {experience.map((exp, index) => (
            <div key={index} className={styles.experienceItem}>
              <label>
                Looking For:
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) =>
                    handleExperienceChange(index, "company", e.target.value)
                  }
                />
              </label>
              <label>
                Role:
                <input
                  type="text"
                  value={exp.role}
                  onChange={(e) =>
                    handleExperienceChange(index, "role", e.target.value)
                  }
                />
              </label>
              <label>
                From:
                <input
                  type="text"
                  value={exp.from}
                  onChange={(e) =>
                    handleExperienceChange(index, "from", e.target.value)
                  }
                />
              </label>
              <label>
                To:
                <input
                  type="text"
                  value={exp.to}
                  onChange={(e) =>
                    handleExperienceChange(index, "to", e.target.value)
                  }
                />
              </label>
            </div>
          ))}
        </>
      )}
      <label>
        Bio:
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
      </label>
      <label>
        Description:
        <textarea value={des} onChange={(e) => setDes(e.target.value)} />
      </label>
      <label>
        Address:
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      <button className={styles.submitBtn} onClick={handleSave}>
        Save
      </button>
      <button className={styles.btnBtn} onClick={onClose}>
        Cancel
      </button>
    </div>
  );
};

export default EditProfile;