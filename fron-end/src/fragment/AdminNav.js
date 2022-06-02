import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import Logic from './Logic'
import { useToken } from "../auth/useToken";

import LoginValidate from '../pages/authentication/LoginValidate';

export const Navbar = () => {

    // const [navbarUserIsLogged, setnavbarUserIsLogged] = useState(false);
    // const [loggedIn, setLoggedIn] = useState(Logic.isUserLoggedIn);
    const [token, setToken] = useToken();
    const { isLoggedIn } = LoginValidate(token)

    return (
        <nav className="wide-navbar">
            <h1><Link to='/admin'>Roll Call</Link></h1>
            <div className="links">
                <Link to="/teachers">All teachers</Link>
                <Link to="/students">All Students</Link>
                <Link to="/addTeacher">Add Teacher</Link>
                <Link to="/addStudent">Add Student</Link>
                {/* <Link to="/student_overview">Check In</Link> */}
                <Link to="/about">About</Link>
                { isLoggedIn && <Link onClick={()=>{setToken(null)}} to="/logout">Logout</Link>}
            </div>
        </nav>
    );
}
