// EmployerProfile.jsx
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { Context } from "../../main";
import styles from "./Profile.module.css";
import { IoLocationOutline } from "react-icons/io5";
import { AiTwotoneMail } from "react-icons/ai";
import { FaPhoneVolume } from "react-icons/fa";
import { SiMinutemailer } from "react-icons/si";
import EditProfile from "./EditProfile";

Modal.setAppElement("#root");

const EmployerProfile = () => {
  const { user, setUser } = useContext(Context);
  const { name, email, phone, company, bio, des, location } = user;

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

  const handleEditProfile = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveProfile = (updatedUser) => {
    setUser(updatedUser);
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
                <IoLocationOutline /> {location} - {formatDate(currentTime)}
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
          <h1>
            {user.role === "Employer" ? "Reach out to me at." : "My Contact"}
          </h1>
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
        <section className={styles.lookingFor}>
          <p>
            <strong> Looking For : </strong> {company}
          </p>
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

export default EmployerProfile;