import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import Logic from './Logic'
import { useToken } from "../auth/useToken";
import { PrivateRoute } from '../auth/PrivateRoute';

import LoginValidate from '../pages/authentication/LoginValidate';

const Navbar = () => {

    // const [navbarUserIsLogged, setnavbarUserIsLogged] = useState(false);
    // const [loggedIn, setLoggedIn] = useState(Logic.isUserLoggedIn);
    const [token, setToken] = useToken();
    const { isLoggedIn } = LoginValidate(token)
    const [ a, setA ] = useState(isLoggedIn)

    console.log('Here', a)

    return (
        <nav className="navbar">
            <h1><Link to='/'>Roll Call</Link></h1>
            <div className="links">
                <Link to="/about">About</Link>
                {/* <Link to="/login">Login</Link>
                <Link to="/logout">Logout</Link> */}
                { isLoggedIn && <a onClick={()=>{setToken(null)}} href="/logout">Logout</a>}
                { isLoggedIn === false && <Link to="/login">Login</Link>}
            </div>
        </nav>
    );
}

export default Navbar;