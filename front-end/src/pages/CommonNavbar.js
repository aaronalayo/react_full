import React from "react";

import { useNavigate } from "react-router-dom";
import "../css/Navbar.css";

export const Navbar = () => {
  const navigate =useNavigate();
  function home(){
    navigate('/')
  }
  function about(){
    navigate('/about')
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
          <button onClick={about}>About</button>
          </li>
        </ul>
      </div>
    </div>
  );
};
