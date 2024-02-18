// Dashboard.jsx

import React, { useState, useEffect, } from 'react';
import {useNavigate} from "react-router-dom";
import "./Dashboard.css";
import UserDetails from '../component/UserDetails';
import UserDashboard from '../component/UserDashboard';
import UserTestDetails from "../component/UserTestDetails";

const Dashboard = () => {
  const [name, setName] = useState('');

  const navigate = useNavigate();
  useEffect(() => {
    const naming = async () => {
      if(!localStorage.getItem("details"))
      {
        navigate("/login");
      }
      else {
        setName(await JSON.parse(localStorage.getItem("details")))
      }
    }
    naming();
  },[]);

  return (
    <div className="box">
      <div className="left">
        <UserDetails user={name} />
      </div>
      <div className="right">
        <UserDashboard user={name} />
        <UserTestDetails/>
      </div>
    </div>
  );
};

export default Dashboard;
