import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../css/addTeacher.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "./AdminNavbar";

axios.defaults.baseURL = "http://localhost:8080";

// defining the initialstate
const initialState = {
  admin_id: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
};


export const CreateAdmin = () => {
  // defining the state
  const [state, setState] = useState(initialState);
  // destructuring the feilds from state (to avoid writting ex. state.first_name)
  const { first_name, last_name, email, password } = state;

  // storing the reference of the useHistory in to history variable
  const navigate = useNavigate();
  const admin_id = useParams();

  // handling default behaviour of browser

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!first_name || !last_name || !email || !password ) {
      toast.error("Please provide value into each input field");
    }
    else {
      // id not id meaning adding a admin
        await axios
          .post("/api/admin/create", {
            //path the body
            first_name: first_name,
            last_name: last_name,
            email: email,
            password: password,
          })
          .then(function (response) {
            console.log(response);
            // when user is succssfull to add the contain empty the field again
            setState({
              admin_id: "",
              first_name: "",
              last_name: "",
              email: "",
              password: "",
            });
            toast.success("Admin is added Successfully !");
            // catching the error and read from the api
          })
          .catch((err) => toast.error(err.response.data));
    }
  };
  //handling input change (e = event)
  const handleInputChange = (e) => {
    //destrusting the name and value from the event.terget so that user can write new value
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  }
  return (
    <div>
      <Navbar />
      <br></br>
      <br></br>
      <h2>Admin From</h2>
      <br></br>
      <input
        type="text"
        id="name"
        name="first_name"
        placeholder="First Name"
        value={first_name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        id="name"
        name="last_name"
        placeholder="Last Name"
        value={last_name}
        onChange={handleInputChange}
      />
      <input
        type="text"
        id="email"
        name="email"
        placeholder="Email"
        value={email}
        onChange={handleInputChange}
      />
      <input
        type="text"
        id="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={handleInputChange}
      />
      <input
        type="submit"
        value={"Save"}
        style={{ width: "19.5%" }}
        onClick={handleSubmit}
      />
      <Link to="/admin">
        <input type="button" value="Go back"/>
      </Link>
    </div>
  );
};
