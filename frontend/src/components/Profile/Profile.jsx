import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Context } from "../../main";
import EmployerProfile from "./EmployerProfile";
import JobSeekerProfile from "./JobSeekerProfile";

const Profile = () => {
  const { user } = useContext(Context);
  return (
    <div>
      {user.role === "Employer" ? (
        <EmployerProfile  />
      ) : (
        <JobSeekerProfile  />
      )}
    </div>
  );
};

export default Profile;