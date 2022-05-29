import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../css/AddTeacher.css";
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


export const GetSingleTeacher = () => {

    const [state, setState] = useState(initialState);
    const {first_name, last_name, email, password, department_id } = state;
    
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
    };
            return (
              <div style={{ marginTop: "100px" }}>
                <Navbar/>
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
                  type="number"
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
                  value="Update"
                  style={{ width: "50%" }}
                 // onClick={handleSubmit}
                />
                <Link to="/teachers">
                  <input type="button" value="Go back" onClick={Link} />
                </Link>
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










