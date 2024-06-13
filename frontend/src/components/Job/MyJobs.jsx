// MyJobs.js

import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";
import styles from "./MyJobs.module.css";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();

  // Fetching all jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3000/api/v1/job/getmyjobs",
          { withCredentials: true }
        );
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response.data.message);
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  if (!isAuthorized || (user && user.role !== "Employer")) {
    navigateTo("/");
  }

  // Function For Enabling Editing Mode
  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  // Function For Disabling Editing Mode
  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  // Function For Updating The Job
  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    await axios
      .put(`http://localhost:3000/api/v1/job/update/${jobId}`, updatedJob, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setEditingMode(null);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  // Function For Deleting Job
  const handleDeleteJob = async (jobId) => {
    await axios
      .delete(`http://localhost:3000/api/v1/job/delete/${jobId}`, {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <>
      <div className={styles.myJobs}>
        <div className={styles.container}>
          <h1>Your Posted Jobs</h1>
          {myJobs.length > 0 ? (
            <div className={styles.banner}>
              {myJobs.map((element) => (
                <div className={styles.card} key={element._id}>
                  <div className={styles.content}>
                    <div className={styles.short_fields}>
                      <div>
                        <span>Title:</span>
                        <input
                          type="text"
                          disabled={editingMode !== element._id}
                          value={element.title}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "title",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <span>Country:</span>
                        <input
                          type="text"
                          disabled={editingMode !== element._id}
                          value={element.country}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "country",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <span>City:</span>
                        <input
                          type="text"
                          disabled={editingMode !== element._id}
                          value={element.city}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "city",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <span>Category:</span>
                        <select
                          value={element.category}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "category",
                              e.target.value
                            )
                          }
                          disabled={editingMode !== element._id}
                        >
                          <option value="Gardener">Gardener</option>
                          <option value="Childcare">Childcare</option>
                          <option value="Eldercare">Eldercare</option>
                          <option value="Gym Trainer">Gym Trainer</option>
                          <option value="Chef">Chef</option>
                          <option value="Watchman">Watchman</option>
                          <option value="Cooker">Cooker</option>
                          <option value="Cleaner">Cleaner</option>
                          <option value="Pet Care">Pet Care</option>
                          <option value="Plumber">Plumber</option>
                          <option value="Electrician">Electrician</option>
                          <option value="Driver">Driver</option>
                          <option value="Maid">Maid</option>
                          <option value="Tutor">Tutor</option>
                          <option value="Personal Assistant">
                            Personal Assistant
                          </option>
                          <option value="Nurse">Nurse</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <span>Salary:</span>
                        {element.fixedSalary ? (
                          <input
                            type="number"
                            disabled={editingMode !== element._id}
                            value={element.fixedSalary}
                            onChange={(e) =>
                              handleInputChange(
                                element._id,
                                "fixedSalary",
                                e.target.value
                              )
                            }
                          />
                        ) : (
                          <div>
                            <input
                              type="number"
                              disabled={editingMode !== element._id}
                              value={element.salaryFrom}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "salaryFrom",
                                  e.target.value
                                )
                              }
                            />
                            <input
                              type="number"
                              disabled={editingMode !== element._id}
                              value={element.salaryTo}
                              onChange={(e) =>
                                handleInputChange(
                                  element._id,
                                  "salaryTo",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        )}
                      </div>
                      <div>
                        <span>Expired:</span>
                        <select
                          value={element.expired}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "expired",
                              e.target.value
                            )
                          }
                          disabled={editingMode !== element._id}
                        >
                          <option value={true}>TRUE</option>
                          <option value={false}>FALSE</option>
                        </select>
                      </div>
                    </div>
                    <div className={styles.long_field}>
                      <div>
                        <span>Description:</span>
                        <textarea
                          rows={5}
                          value={element.description}
                          disabled={editingMode !== element._id}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "description",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <span>Location: </span>
                        <textarea
                          rows={5}
                          value={element.location}
                          disabled={editingMode !== element._id}
                          onChange={(e) =>
                            handleInputChange(
                              element._id,
                              "location",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div className={styles.button_wrapper}>
                    <div className={styles.edit_btn_wrapper}>
                      {editingMode === element._id ? (
                        <>
                          <button
                            onClick={() => handleUpdateJob(element._id)}
                            className={styles.check_btn}
                          >
                            <FaCheck />
                          </button>
                          <button
                            onClick={() => handleDisableEdit()}
                            className={styles.cross_btn}
                          >
                            <RxCross2 />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEnableEdit(element._id)}
                          className={styles.edit_btn}
                        >
                          Edit
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => handleDeleteJob(element._id)}
                      className={styles.delete_btn}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>
              You've not posted any job or may be you deleted all of your jobs!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyJobs;