import React from "react";

import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

export const TeacherNavbar = () => {
  const navigate =useNavigate();
  function logout(){
    localStorage.removeItem('token')
    navigate('/')
  }
  function home(){
    navigate('/')
  }
  function createPassphrase(){
    navigate("/teacher_overview")
  }
  return (
    <div className="navbar">
      <div className="logo">Roll Call System</div>
      <div className="menus">
        <ul className="menu">
          <li>
          <button onClick={home}>Home</button>
          </li>
          <li>
          <button onClick={createPassphrase}>Create Passphrase</button>
          </li>
          <li>
          <button
            onClick={logout}
            >logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};
