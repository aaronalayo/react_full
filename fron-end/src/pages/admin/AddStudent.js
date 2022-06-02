import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
// import "../css/addTeacher.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "../../fragment/AdminNav";

axios.defaults.baseURL = "http://localhost:8080";

// defining the initialstate
const initialState = {
  student_id: "",
  first_name: "",
  last_name: "",
  user_name: "",
  password: "",
  program_id: "",
};

//working
export const CreateStudent = () => {
  // defining the state
  const [state, setState] = useState(initialState);
  // destructuring the feilds from state (to avoid writting ex. state.first_name)
  const { first_name, last_name, user_name, password, program_id } = state;

  // storing the reference of the useHistory in to history variable
  const navigate = useNavigate();
  const student_id = useParams();

  // handling default behaviour of browser

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!first_name || !last_name || !user_name || !password || !program_id) {
      toast.error("Please provide value into each input field");
    } else {

      // id not id meaning adding a student
      await axios
        .post("/api/students/create", {
          //path the body
          first_name: first_name,
          last_name: last_name,
          user_name: user_name,
          password: password,
          program_id: program_id,
        })
        .then(function (response) {
          console.log(response);
          // when user is succssfull to add the contain empty the field again
          setState({
            student_id: "",
            first_name: "",
            last_name: "",
            user_name: "",
            password: "",
            program_id: "",
          });
          toast.success("Student is added Successfully !");
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
  };
  return (
    <div>
      <Navbar />
    <div className="auth-content-container">
      <br></br>
      <br></br>
      <h2>Student Form</h2>
      <br></br>
      <div className="form-outline mb-4">
      <input
        className="form-control"
        type="text"
        id="name"
        name="first_name"
        placeholder="First Name"
        value={first_name}
        onChange={handleInputChange}
      />
      </div>
      <div className="form-outline mb-4">
      <input
        className="form-control"
        type="text"
        id="name"
        name="last_name"
        placeholder="Last Name"
        value={last_name}
        onChange={handleInputChange}
      />
      </div>
      <div className="form-outline mb-4">
      <input
        className="form-control"
        type="text"
        id="user_name"
        name="user_name"
        placeholder="User Name"
        value={user_name}
        onChange={handleInputChange}
      />
      </div>
      <div className="form-outline mb-4">
      <input
        className="form-control"
        type="password"
        id="password"
        name="password"
        placeholder="password"
        value={password}
        onChange={handleInputChange}
      />
      </div>
      <div className="form-outline mb-4">
      <input
        className="form-control"
        type="number"
        id="program_id"
        name="program_id"
        placeholder="Program Id"
        value={program_id}
        onChange={handleInputChange}
      />
      </div>
      <div className="form-outline mb-4">
      <button className="btn btn-success btn-block mb-4"
        onClick={handleSubmit}
      >Save</button>
      </div>
      {/* <input
        type="submit"
        value="Save"
        style={{ width: "19.5%" }}
        onClick={handleSubmit}
      /> */}
      <div className="form-outline mb-4">
        <Link to={(-1)}><button className="btn btn-success btn-block mb-4">Back</button></Link>
      </div>
    </div>
    </div>
  );
};
