import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";

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
    <section className="jobs page">
      <div className="container">
        <h1>ALL AVAILABLE JOBS</h1>
        <div className="filter-form" style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '10px' }}>Filter Jobs</h2>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="salaryFrom" style={{ display: 'block', marginBottom: '5px' }}>Salary From:</label>
            <input
              type="number"
              placeholder="From"
              id="salaryFrom"
              name="from"
              value={salaryFrom}
              onChange={(e) => setSalaryFrom(e.target.value)}
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="city" style={{ display: 'block', marginBottom: '5px' }}>City:</label>
            <input
              type="text"
              placeholder="City Name"
              id="city"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
          <button onClick={handleFilter} style={{ padding: '10px 20px', marginRight: '10px', cursor: 'pointer', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px',margin:"10px 0" }}>Apply Filters</button>
          <button onClick={clearFilters} style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '5px' }}>Clear Filters</button>
        </div>
        <div className="banner">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((element) => {
              return (
                <div className="card" key={element._id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <p>{element.city}</p>
                  <p>{element.fixedSalary ? `Fixed Salary: ${element.fixedSalary}` : `Salary From: ${element.salaryFrom}`}</p>
                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              );
            })
          ) : (
            <p>No jobs match the criteria</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Jobs;