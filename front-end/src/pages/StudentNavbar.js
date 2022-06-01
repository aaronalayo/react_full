import React from "react";

import { Link } from "react-router-dom";
import "../css/Navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">Roll Call System</div>
      <div className="menus">
        <ul className="menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="">Check In </Link>
          </li>
          <li>
            <Link to="">See Statistics</Link>
          </li>
          <li>
            <Link to="">logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
