import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "../css/addTeacher.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "./AdminNavbar";

axios.defaults.baseURL = "http://localhost:8080";



export const GetSingleStudent = () => {

    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [user_name, setUserName ] = useState("");
    const [ program_id, setProgramId] = useState("");

    const params = useParams();
    const navigate = useNavigate();
    function students(){
      navigate('/students')
    }
 


    useEffect(() => {
      const loadData = async () => {
          try {
              await axios.get(`/api/students/findOne/${params.id}`).then((response) => {
                  const data = response.data;
                  setFirstName(data.oneStudent.first_name);
                  setLastName(data.oneStudent.last_name)
                  setUserName(data.oneStudent.user_name)
                  setProgramId(data.oneStudent.program_id)
              })
          } catch (error) {
              console.log(error)
          }
      }
      loadData();
  }, [params.id])

    const handleSubmit = async () => {
            await axios
            .post(`/api/students/update/${params.id}`, {
                //path the body
                first_name: first_name,
                last_name: last_name,
                user_name: user_name,
                program_id: program_id,
            })
            .then((response) => {
                // when user is succssfull to add the contain empty the field again
                console.log(response.data);
                setFirstName(first_name);
                setLastName(last_name);
                setUserName(user_name);
                setProgramId(program_id);
                students();
                // catching the error and read from the api
            })
            .catch((err) => toast.error(err.response.data));
            // toast.error("Can not add !");
            
    }

            return (
              <div>
                <Navbar/>
                <input
                  type="text"
                  id="name"
                  name="first_name"
                  placeholder="First Name"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  id="name"
                  name="last_name"
                  placeholder="Last Name"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={user_name}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <input
                  type="number"
                  id="program_id"
                  name="program_id"
                  placeholder="Program Id"
                  value={program_id}
                  onChange={(e) => setProgramId(e.target.value)}
                />
                <button type="submit" value="Update" style={{ margin: "auto" }}
                 onClick={handleSubmit}
                >Update</button>
              
                  <button type="button" value="Go back" onClick={students} >Go back</button>
    
               
              </div>
            );
        }
    











