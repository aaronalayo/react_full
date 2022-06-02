import { Link } from "react-router-dom";

export const NotFound = () => {
    return (

        <div className="not-found">

            <h2>Sorry</h2>

            <br />

            <p>Page could not be found :/ </p>

            <Link to="/">Return to Home ...</Link>

        </div>

    );

}



