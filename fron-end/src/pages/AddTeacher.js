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
  teacher_id: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  department_id: "",
};


//working
export const CreateTeacher = () => {
  // defining the state 
  const [state, setState] = useState(initialState);
  // destructuring the feilds from state (to avoid writting ex. state.first_name)
  const { first_name, last_name, email, password, department_id } = state

  

  // storing the reference of the useHistory in to history variable
  const navigate = useNavigate();
  const teacher_id = useParams();


  // useEffect(() => {
  //   axios
  //     .get(`/api/teachers/findOne/${teacher_id}`)
  //     .then((response) => setState({ ...response.data[0] }));
  // }, [teacher_id]);
    
    
  // handling default behaviour of browser

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!first_name || !last_name || !email || !password || !department_id) {
      toast.error("Please provide value into each input field");
    } else {
      await axios
        //path the body
        .post("/api/teachers/create", {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
          department_id: department_id,
        })
        .then(function (response) {
          console.log(response);
          // when user is succssfull to add the contain empty the field again
          setState({
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            department_id: "",
          });
          toast.success("Teacher is added Successfully !");
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
        <h2>Teacher From</h2>
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
          placeholder="password"
          value={password}
          onChange={handleInputChange}
        />
        <input
          type="number"
          id="department_id"
          name="department_id"
          placeholder="Department Id"
          value={department_id}
          onChange={handleInputChange}
        />
        <input
          type="submit"
          value={"Save"}
          style={{ width: "19.5%" }}
          onClick={handleSubmit}
        />
        <Link to="/teachers">
          <input
            type="button"
            value="Go back" />
        </Link>
      </div>
    );
    };
    
//update/save button is according to id user will update it will show Update else Save

