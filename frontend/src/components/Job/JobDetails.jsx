import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";
import styles from "./JobDetails.module.css";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();

  const { isAuthorized, user } = useContext(Context);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/job/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setJob(res.data.job);
      })
      .catch((error) => {
        navigateTo("/notfound");
      });
  }, [id, navigateTo]);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
  }, [isAuthorized, navigateTo]);

  return (
    <section className={styles.page}>
      <div className={styles.container}>
        <h3>Job Details</h3>
        <div className={styles.card}>
          <table className={styles.jobTable}>
            <tbody>
              <tr>
                <td>
                  <strong>Title</strong>
                </td>
                <td>{job.title}</td>
              </tr>
              <tr>
                <td>
                  <strong>Category</strong>
                </td>
                <td>{job.category}</td>
              </tr>
              <tr>
                <td>
                  <strong>Country</strong>
                </td>
                <td>{job.country}</td>
              </tr>
              <tr>
                <td>
                  <strong>City</strong>
                </td>
                <td>{job.city}</td>
              </tr>
              <tr>
                <td>
                  <strong>Location</strong>
                </td>
                <td>{job.location}</td>
              </tr>
              <tr>
                <td>
                  <strong>Description</strong>
                </td>
                <td colSpan="3">{job.description}</td>
              </tr>
              <tr>
                <td>
                  <strong>Posted On</strong>
                </td>
                <td>{job.jobPostedOn}</td>
              </tr>
              <tr>
                <td>
                  <strong>Salary</strong>
                </td>
                <td>
                  {job.fixedSalary
                    ? job.fixedSalary
                    : `${job.salaryFrom} - ${job.salaryTo}`}
                </td>
              </tr>
            </tbody>
          </table>
          {user && user.role !== "Employer" && (
            <Link to={`/application/${job._id}`} className={styles.applyButton}>
              Apply Now
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;