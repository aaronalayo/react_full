import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../css/addTeacher.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "http://localhost:8080";

// defining the initialstate
const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  department_id: "",
};


export const GetSingleTeacher = () => {

    const [state, setState] = useState(initialState);
    const {first_name, last_name, email, password, department_id } = state;
    const navigate = useNavigate();
    const { id } = useParams();
  

     useEffect(() => {
      const getOneTeacher = async () => {
          try {
            await axios.get(`/api/teachers/findOne/${id}`).then((response) => {
              console.log(response.data)
              setState({ ...response.data})
              })
          } catch (error) {
              console.log(error)
          }
      }
      getOneTeacher()
  }, [id])

  function to_teachers() {
    navigate( '/teachers')
  };
    
    
    const handleInputChange = (e) => {
      //destrusting the name and value from the event.terget so that user can write new value
      const { name, value } = e.target;
      setState({ ...state, [name]: value });
    };
            return (
              <div style={{ marginTop: "100px" }}>
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
                  <button onClick={to_teachers}>Go back</button>
  
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










