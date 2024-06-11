import React, { useContext, useState,useEffect } from "react";
import Modal from "react-modal";
import { Context } from "../../main";
import styles from "./Profile.module.css";
import { IoLocationOutline } from "react-icons/io5";
import EditProfile from "./EditProfile";

Modal.setAppElement("#root");

const JobSeekerProfile = () => {
  const { user, setUser } = useContext(Context);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleString();
  };

  const { name, email, phone, location, bio, des, education, experience } =
    user;

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
              <i className={styles.dateandTime}>
              <IoLocationOutline /> {location} - {formatDate(currentTime)}
              </i>
          <button className={styles.editProBtn} onClick={handleEditProfile}>Edit Profile</button>
            </div>
          </section>
        </section>
        <section className={styles.headBioContainer}>
          <h1>{bio}</h1>
          <p>{des}</p>
        </section>
        <section className={styles.profileContact}>
          <span>Reach out to me.</span>
          <p>{email}</p>
          <p>{phone}</p>
        </section>
        <section className={styles.educationSection}>
          <h4>Education</h4>
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
