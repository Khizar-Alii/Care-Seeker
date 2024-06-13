// EmployerProfile.jsx
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { Context } from "../../main";
import styles from "./Profile.module.css";
import { IoLocationOutline } from "react-icons/io5";
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
      <div className={styles.profile}>
        <section className={styles.profileTop}>
          <section className={styles.profileTopInner}>
              {user?.image?.url ? (
                <img src={user.image.url} alt="User Avatar" className="userAvatar" />
              ) : (
                <img src="./heroS.jpg" alt="User Avatar" className="userAvatar" />
              )}
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
