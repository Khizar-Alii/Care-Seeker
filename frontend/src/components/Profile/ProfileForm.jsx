// ProfileForm.jsx
import React, { useContext, useState } from "react";
import axios from "axios";
import { Context } from "../../main";

const ProfileForm = () => {
  const { user } = useContext(Context);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    company: "",
    des: "",
    education: [{ institution: "", from: "", to: "" }],
    experience: [{ company: "", role: "", from: "", to: "" }],
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNestedChange = (index, e, type) => {
    const updatedArray = formData[type].map((item, i) =>
      i === index ? { ...item, [e.target.name]: e.target.value } : item
    );
    setFormData({ ...formData, [type]: updatedArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/${user.role.toLowerCase()}/profile/create`,
        { ...formData, user: user._id }
      );
      console.log('Profile created successfully:', response.data);
    } catch (error) {
      console.error("Error creating profile:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        placeholder="Phone"
        required
      />
      <input
        type="text"
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        placeholder="Bio"
      />
      <input
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="Location"
        required
      />

      {user.role === "Employer" && (
        <>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Company"
            required
          />
          <input
            type="text"
            name="des"
            value={formData.des}
            onChange={handleChange}
            placeholder="Description"
            required
          />
        </>
      )}

      {user.role === "JobSeeker" && (
        <>
          <textarea
            name="des"
            value={formData.des}
            onChange={handleChange}
            placeholder="Description"
          ></textarea>
          <div>
            <h3>Education</h3>
            {formData.education.map((edu, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="institution"
                  value={edu.institution}
                  onChange={(e) => handleNestedChange(index, e, "education")}
                  placeholder="Institution"
                  required
                />
                <input
                  type="date"
                  name="from"
                  value={edu.from}
                  onChange={(e) => handleNestedChange(index, e, "education")}
                  placeholder="From"
                  required
                />
                <input
                  type="date"
                  name="to"
                  value={edu.to}
                  onChange={(e) => handleNestedChange(index, e, "education")}
                  placeholder="To"
                  required
                />
              </div>
            ))}
          </div>
          <div>
            <h3>Experience</h3>
            {formData.experience.map((exp, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="company"
                  value={exp.company}
                  onChange={(e) => handleNestedChange(index, e, "experience")}
                  placeholder="Company"
                  required
                />
                <input
                  type="text"
                  name="role"
                  value={exp.role}
                  onChange={(e) => handleNestedChange(index, e, "experience")}
                  placeholder="Role"
                  required
                />
                <input
                  type="date"
                  name="from"
                  value={exp.from}
                  onChange={(e) => handleNestedChange(index, e, "experience")}
                  placeholder="From"
                  required
                />
                <input
                  type="date"
                  name="to"
                  value={exp.to}
                  onChange={(e) => handleNestedChange(index, e, "experience")}
                  placeholder="To"
                  required
                />
              </div>
            ))}
          </div>
        </>
      )}
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProfileForm;