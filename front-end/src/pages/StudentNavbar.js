import React from "react";

import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

export const Navbar = () => {
  const navigate =useNavigate();
  function logout(){
    localStorage.removeItem('token')
    navigate('/')
  }
  function home(){
    navigate('/')
  }
  function checkIn(){
    navigate("/student_overview")
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
          <button onClick={checkIn}>Home</button>
          </li>
          <li>
            <button onClick={logout}>logout</button>
          </li>
        </ul>
      </div>
    </div>
  );
};
