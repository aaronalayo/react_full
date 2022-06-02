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
  teacher_id: "",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  department_id: "",
};


export const GetSingleTeacher = () => {

  const [state, setState] = useState(initialState);
  const { first_name, last_name, email, password, department_id } = state;

  const teacher_id = useParams();
  useEffect(() => {
    axios
      .get(`/api/teachers/findOne/${teacher_id}`)
      .then((response) => setState({ ...response.data[0] }));
  }, [teacher_id]);


  const handleInputChange = (e) => {
    //destrusting the name and value from the event.terget so that user can write new value
    const { name, value } = e.target;
    setState({ ...state, [name]: value });

    const token = localStorage.getItem('token')
    const jwt = token.split('.')[1]
    const decoded = JSON.parse(window.atob(jwt))
    const email = decoded['email']
    console.log(email)

  };
  return (
    <div>
      <Navbar />
      <div className="auth-content-container">
        <h2>Teacher Form for {email} </h2>
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
            id="email"
            name="email"
            placeholder="Email"
            value={email}
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
            id="department_id"
            name="department_id"
            placeholder="Department Id"
            value={department_id}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-outline mb-4">
          <button className="btn btn-success btn-block mb-4"
          // onClick={handleSubmit}
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
}



//         await axios
//             .patch(`api/teachers/updateOne/${teacher_id}`, {
//                 //path the body
//                 first_name: first_name,
//                 last_name: last_name,
//                 email: email,
//                 password: password,
//                 department_id: department_id,
//             })
//             .then(() => {
//                 // when user is succssfull to add the contain empty the field again
//                 setState({
//                     first_name: "",
//                     last_name: "",
//                     email: "",
//                     password: "",
//                     department_id: "",
//                 });
//                 // catching the error and read from the api
//             })
//             .catch((err) => toast.error(err.response.data));
//         toast.error("Can not add !");
            
//     }
// }
   
// //handling input change (e = event)
//     const handleInputChange = (e) => {
// //destrusting the name and value from the event.terget so that user can write new value
//         const { name, value } = e.target;
//         setState({ ...state, [name]: value });
//     }










