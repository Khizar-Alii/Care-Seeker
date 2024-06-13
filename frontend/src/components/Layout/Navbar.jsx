import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../main";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";
import "./Navbar.css";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthorized, setIsAuthorized, user } = useContext(Context);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const navigateTo = useNavigate();
  const dropdownRef = useRef(null);

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    if (dropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible]);

  const handleLogout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/user/logout",
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigateTo("/login");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthorized(true);
    }
  };

  const toggleDropdown = (e) => {
    e.preventDefault();
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
      <div className="container">
        <div className="logo">
          <img src="/logo.png" alt="logo" />
        </div>
        <ul className={!show ? "menu" : "show-menu menu"}>
          <li>
            <Link to={"/"} onClick={() => setShow(false)}>
              HOME
            </Link>
          </li>
          <li>
            <Link to={"/job/getall"} onClick={() => setShow(false)}>
              ALL JOBS
            </Link>
          </li>
          <li>
            <Link to={"/applications/me"} onClick={() => setShow(false)}>
              {user && user.role === "Employer"
                ? "APPLICANT'S APPLICATIONS"
                : "MY APPLICATIONS"}
            </Link>
          </li>
          {user && user.role === "Employer" ? (
            <>
              <li>
                <Link to={"/job/post"} onClick={() => setShow(false)}>
                  POST NEW JOB
                </Link>
              </li>
              <li>
                <Link to={"/job/me"} onClick={() => setShow(false)}>
                  VIEW YOUR JOBS
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}
          <li className="dropdown">
            <div className="userIcon" onClick={(e) => toggleDropdown(e)}>
              {user?.image?.url ? (
                <img
                  src={user.image.url}
                  alt="User Avatar"
                  className="userAvatar"
                  style={{
                    objectFit: "cover",
                    height: "100%",
                  }}
                />
              ) : (
                user?.name?.charAt(0).toUpperCase()
              )}
            </div>
            <div
              className={`dropdownContent ${dropdownVisible ? "show" : ""}`}
              ref={dropdownRef}
            >
              <Link className="navbarDropBtns" to="/profile">
                Profile
              </Link>
              <span
                style={{ borderTop: "1px solid black", width: "90%" }}
              ></span>
              <button onClick={handleLogout} className="navbarDropBtns">
                LOGOUT
              </button>
            </div>
          </li>
        </ul>
        <div className="hamburger">
          <GiHamburgerMenu onClick={() => setShow(!show)} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
