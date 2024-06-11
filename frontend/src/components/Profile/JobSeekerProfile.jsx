import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { Context } from "../../main";
import styles from "./Profile.module.css";
import { IoLocationOutline } from "react-icons/io5";
import { AiTwotoneMail } from "react-icons/ai";
import { FaPhoneVolume } from "react-icons/fa";
import { SiMinutemailer } from "react-icons/si";
import EditProfile from "./EditProfile";

Modal.setAppElement("#root");

const JobSeekerProfile = () => {
  const { user, setUser } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { name, email, phone, location, bio, des, education, experience } = user;

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveProfile = (updatedUser) => {
    setUser(updatedUser);
    setIsModalOpen(false);
  };

  return (
    <div className={styles.profileContainer}>
      <div className={styles.profileData}>
        <section className={styles.profileTop}>
          <section className={styles.profileTopInner}>
            <img src="./heroS.jpg" alt="" />
            <div className={styles.profileTopInnerText}>
              <h3>{name}</h3>
              <i>
                <IoLocationOutline /> {location}
              </i>
            </div>
          </section>
          <div className={styles.EditProfileBtn}>
            <button onClick={handleEditProfile}>Edit Profile</button>
          </div>
        </section>
        <section className={styles.headBioContainer}>
          <h1>{bio}</h1>
          <p>{des}</p>
        </section>
        <section className={styles.profileContact}>
          <h1>{user.role === "Employer" ? "Reach out to me at." : "My Contact"}</h1>
          <p>
            {user.role === "Employer" ? "Mail Me" : ""}
            {user.role === "Employer" ? (
              <a href={`mailto:${email}`}>
                <i>
                  <SiMinutemailer />
                </i>
                <span>{email}</span>
              </a>
            ) : (
              <>
                <i>
                  <AiTwotoneMail />
                </i>
                <span>{email} </span>
              </>
            )}
          </p>
          <p>
            {user.role === "Employer" ? "Call Me" : ""}
            <i>
              <FaPhoneVolume />
            </i>
            <span>{phone}</span>
          </p>
        </section>
        <section className={styles.educationSection}>
          <h2>Education</h2>
          {education && education.length > 0 ? (
            <ul>
              {education.map((edu, index) => (
                <li key={index}>
                  <h3>{edu.institution}</h3>
                  <p>
                    {edu.from} - {edu.to}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No education information available.</p>
          )}
        </section>
        <section className={styles.experienceSection}>
          <h2>Experience</h2>
          {experience && experience.length > 0 ? (
            <ul>
              {experience.map((exp, index) => (
                <li key={index}>
                  <h3>{exp.company}</h3>
                  <p>{exp.role}</p>
                  <p>
                    {exp.from} - {exp.to}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No experience information available.</p>
          )}
        </section>
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        <EditProfile
          user={user}
          onClose={handleCloseModal}
          onSave={handleSaveProfile}
        />
      </Modal>
    </div>
  );
};

export default JobSeekerProfile;