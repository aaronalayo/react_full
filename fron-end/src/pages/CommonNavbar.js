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
            <Link to="">Contact</Link>
          </li>
          <li>
            <Link to="">About</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
