import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import styles from "./Jobs.module.css";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [salaryFrom, setSalaryFrom] = useState('');
  const [city, setCity] = useState('');
  const [filteredJobs, setFilteredJobs] = useState([]);
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      axios
        .get("http://localhost:3000/api/v1/job/getall", {
          withCredentials: true,
        })
        .then((res) => {
          setJobs(res.data);
          setFilteredJobs(res.data.jobs);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    }
  }, [isAuthorized, navigateTo]);

  const handleFilter = () => {
    let filtered = jobs.jobs;

    if (salaryFrom) {
      filtered = filtered.filter(job => {
        const jobSalary = job.fixedSalary ? parseFloat(job.fixedSalary) : parseFloat(job.salaryFrom);
        return jobSalary >= parseFloat(salaryFrom);
      });
    }

    if (city) {
      filtered = filtered.filter(job => job.city.toLowerCase().includes(city.toLowerCase()));
    }

    setFilteredJobs(filtered);
  };

  const clearFilters = () => {
    setSalaryFrom('');
    setCity('');
    setFilteredJobs(jobs.jobs);
  };

  return (
    <section className={styles.jobs}>
      <div className={styles.container}>
        <h1>ALL AVAILABLE JOBS</h1>
        <div className={styles.filterForm}>
          <h2>Filter Jobs</h2>
          <div className={styles.filterField}>
            <label htmlFor="salaryFrom">Salary From:</label>
            <input
              type="number"
              placeholder="From"
              id="salaryFrom"
              name="from"
              value={salaryFrom}
              onChange={(e) => setSalaryFrom(e.target.value)}
            />
          </div>
          <div className={styles.filterField}>
            <label htmlFor="city">City:</label>
            <input
              type="text"
              placeholder="City Name"
              id="city"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className={styles.filterButtons}>
            <button onClick={handleFilter} className={styles.applyButton}>Apply Filters</button>
            <button onClick={clearFilters} className={styles.clearButton}>Clear Filters</button>
          </div>
        </div>
        <div className={styles.banner}>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((element) => {
              return (
                <div className={styles.card} key={element._id}>
                  <p className={styles.title}>{element.title}</p>
                  <p className={styles.category}>{element.category}</p>
                  <p className={styles.location}>{element.country}, {element.city}</p>
                  <p className={styles.salary}>{element.fixedSalary ? `Fixed Salary: ${element.fixedSalary}` : `Salary From: ${element.salaryFrom}`}</p>
                  <Link to={`/job/${element._id}`} className={styles.detailsLink}>Job Details</Link>
                </div>
              );
            })
          ) : (
            <p className={styles.noJobs}>No jobs match the criteria</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobs;