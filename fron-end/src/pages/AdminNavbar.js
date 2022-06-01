import React from "react";
import { Link} from "react-router-dom";
import "../css/Navbar.css"
import Logout from "./logout";



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
              <Link to="/addTeacher">Add Teacher </Link>
            </li>
            <li>
              <Link to="/addStudent">Add Student</Link>
            </li>
            <li>
              <Link to="/teachers">See Teacher List</Link>
            </li>
            <li>
              <Link to="/students">See Student List</Link>
            </li>
            <li>
              <Link to="/login" onClick={Link} component={Logout}>
                Logout
              </Link>

              
            </li>
          </ul>
        </div>
      </div>
    );

}

