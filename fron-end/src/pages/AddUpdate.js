import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../css/AddUpdate.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQueryParams } from "../util/useQueryParams";

axios.defaults.baseURL = "http://localhost:8080";


// defining the initialstate
const initialState = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  department_id:""
};

//working
export const AddUpdate = () => {
  // defining the state 
  const [state, setState] = useState(initialState);
  // destructuring the feilds from state (to avoid writting ex. state.first_name)
  const { first_name, last_name, email, password, department_id } =
    initialState;

  const navigate = useNavigate();
  const id  = useParams();
  
  

  useEffect(() => {
    axios
      .get(`/api/teachers/updateOne/:id`) 
      .then((response) => console.log(response));
        //setState({ ...response.data[0] }));
    
  }, [id]);

  
  
  
    
// handling default behaviour of browser

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!first_name || !last_name || !email || !password|| !department_id) {
            toast.error("Please provide value into each input field");
        } else {
            // id not id meaning adding a teacher
            if (!id) {
                axios
                  .post("/api/teachers/create", {
                    //path the body
                    first_name,
                    last_name,
                    email,
                    password,
                    department_id,
                  })
                  .then(() => {
                    // when user is succssfull to add the contain empty the field again
                    setState({
                      first_name:"",
                      last_name:"",
                      email:"",
                      password:"",
                      department_id:"",
                    });
                    // catching the error and read from the api
                  })
                  .catch((err) => toast.error(err.response.data));
                toast.success("Teacher is added Successfully !");
            
            } else { // else updateing 
                axios
                  .put(`/api/teachers/updateOne/:id`, {
                    //path the body
                    first_name,
                    last_name,
                    email,
                    password,
                    department_id,
                  },)
                  .then(() => {
                    // when user is succssfull to add the contain empty the field again
                    setState({
                      first_name: "",
                      last_name: "",
                      email: "",
                      password: "",
                      department_id: "",
                    });
                    // catching the error and read from the api
                  })
                  .catch((err) => toast.error(err.response.data));
              toast.success("Teacher updated Successfully !");
              console.log(id);
            
            }
            
            setTimeout(() => navigate("/admin_overview"), 500);  // using the history here
            } 
    };
//handling input change (e = event)
  const handleInputChange = (e) => {
    //destrusting the name and value from the event.terget so that user can write new value
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
    return (
      <div style={{ marginTop: "100px" }}>
        <form
          style={{
            margin: "auto",
            padding: "15px",
            maxwidth: "100px",
            alignContent: "center",
          }}
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">First name</label>
          <input
            type="text"
            id="name"
            name="first_name"
            placeholder="First Name"
            value={first_name || ""}
            onChange={handleInputChange}
          />

          <label htmlFor="name">Last name</label>
          <input
            type="text"
            id="name"
            name="last_name"
            placeholder="Last Name"
            value={last_name || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="name">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            value={email || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="name">Password</label>
          <input
            type="number"
            id="password"
            name="password"
            placeholder="password"
            value={password || ""}
            onChange={handleInputChange}
          />
          <label htmlFor="name">Department Id</label>
          <input
            type="number"
            id="department_id"
            name="department_id"
            placeholder="Department Id"
            value={department_id || ""}
            onChange={handleInputChange}
          />
          <input
            type="submit"
            value={id ? "Update" : "Save"}
            style={{ width: "100%" }}
          />
          <Link to="/admin_overview">
            <input type="button" value="Go back" onClick={Link} />
          </Link>
        </form>
      </div>
    );
};

//update/save button is according to id user will update it will show Update else Save


