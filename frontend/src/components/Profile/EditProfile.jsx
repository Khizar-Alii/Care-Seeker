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
  var [education, setEducation] = useState(user.education || []);
  var [experience, setExperience] = useState(user.experience || []);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  // Function to handle file input changes
  const handleFileChange = (event) => {
    const resume = event.target.files[0];
    setImage(image);
  };

  const handleSave = async () => {
    try {
        const payload = {
            name,
            email,
            phone,
            bio,
            des,
            location,
            company,
            education,
            experience,
        };

        const formData = new FormData();
        for (const key in payload) {
            if (payload.hasOwnProperty(key)) {
                if (Array.isArray(payload[key])) {
                    formData.append(key, JSON.stringify(payload[key]));
                } else {
                    formData.append(key, payload[key]);
                }
            }
        }

        if (image) {
            formData.append("image", image);
        }

        const response = await axios.put(
            "http://localhost:3000/api/v1/user/update",
            formData,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                }
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
    setEducation((prevEducation) => {
      const updatedEducation = [...prevEducation];
      updatedEducation[index] = {
        ...updatedEducation[index],
        [key]: value
      };
      return updatedEducation;
    });
  };

  const handleExperienceChange = (index, key, value) => {
    const updatedExperience = [...experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [key]: value
    };
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
                Company:
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
      <label>
        Profile Picture:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
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