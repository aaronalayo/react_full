import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>Roll Call</h1>
            <div className="links">
                {/* <a href="/">Hjem</a> */}
                {/* Link prevents app from direct access to server. Provides sort of cache --> Faster load */}
                <Link to="/">Home</Link>
                <Link to="/">Profile</Link>
                <Link to="/about">About</Link>
                <Link to="/statistic">Statistics</Link>
                <Link to="/login">Login</Link>
                <Link to="/logout">Logout</Link>
                <Link to="/" style={{
                    color: "white",
                    backgroundColor: 'green',
                    borderRadius: '8px'
                }}>Test</Link>
            </div>
        </nav>
    );
}

export default Navbar;