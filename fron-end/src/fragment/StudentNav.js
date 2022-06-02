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
        <nav className="navbar">
            <h1><Link to='/student_overview'>Roll Call</Link></h1>
            <div className="links">
                {/* <Link to="/student_overview">Check In</Link> */}
                <Link to="/about">About</Link>
                { isLoggedIn && <a onClick={()=>{setToken(null)}} href="/logout">Logout</a>}
            </div>
        </nav>
    );
}
