import React from "react";
import { Link, useNavigate} from "react-router-dom";
import "../css/Navbar.css"




export const Navbar = () => {
  const navigate = useNavigate();
  function home(){
    navigate('/')
  }
  function addTeacher(){
    navigate("/addTeacher")
  }
  function addStudent(){
    navigate("/addStudent")
  }
  function teachers(){
    navigate("/teachers")
  }
  function students(){
    navigate("/students")
  }
  function logout(){
    localStorage.removeItem('token')
    navigate("/")
  }
    return (
      <div className="navbar">
        <div className="logo">Roll Call System</div>
        <div className="menus">
          <ul className="menu">
            {/* <li>
              <button onClick={home}>Home</button>
            </li> */}
            <li>
            <button onClick={addTeacher}>Add Teacher</button>
            </li>
            <li>
            <button onClick={addStudent}>Add Student</button>
            </li>
            <li>
            <button onClick={teachers}>Teachers List</button>
            </li>
            <li>
            <button onClick={students}>Students List</button>
            </li>
            <li>
            <button onClick={logout}>Logout</button>
              
            </li>
          </ul>
        </div>
      </div>
    );

}

