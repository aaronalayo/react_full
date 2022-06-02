import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
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
export const UpdateStudent = () => {
  // defining the state
  const [state, setState] = useState(initialState);
  // destructuring the feilds from state (to avoid writting ex. state.first_name)
  const { first_name, last_name, user_name, password, program_id } = state;

  // storing the reference of the useHistory in to history variable
  const navigate = useNavigate();
  const { student_id } = useParams();

  useEffect(() => {
    axios
      .get(`/api/students/findOne/${student_id}`)
      .then((response) => setState({ ...response.data[0] }));
  }, [student_id]);

  // handling default behaviour of browser

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!first_name || !last_name || !user_name || !password || !program_id) {
      toast.error("Please provide value into each input field");
    } else {
      // update
      await axios
        .patch(`api/students/updateOne/${student_id}`, {
          //path the body
          first_name: first_name,
          last_name: last_name,
          user_name: user_name,
          password: password,
          program_id: program_id,
        })
        .then(() => {
          // when user is succssfull to add the contain empty the field again
          setState({
            student_id: "",
            first_name: "",
            last_name: "",
            user_name: "",
            password: "",
            program_id: "",
          });
          // catching the error and read from the api
        })
        .catch((err) => toast.error(err.response.data));
      toast.error("Can not add !");
    }

    setTimeout(() => navigate("/students"), 500);
  }


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
        <h2>Student From</h2>
        <div className="form-outline mb-4">
          <input
            className="form-control"
            type="text"
            id="name"
            name="first_name"
            placeholder="First Name"
            value={""}
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
            value={""}
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
            value={""}
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
            value={""}
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
            value={""}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-outline mb-4">
          <button className="btn btn-success btn-block mb-4"
            onClick={handleSubmit}
          >Update</button>
        </div>
        <div className="form-outline mb-4">
          <Link to={(-1)}><button className="btn btn-success btn-block mb-4">Back</button></Link>
        </div>
      </div>
    </div>
  );
};