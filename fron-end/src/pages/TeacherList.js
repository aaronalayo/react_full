import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import "../css/Admin.css";
import axios  from "axios";


axios.defaults.baseURL = "http://localhost:8080";

const initialState = {
  teacher_id:"",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  department_id: "",
};



export const GetList = () => {
  
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);
  
  const navigate = useNavigate();
  
  // get all teachers list
  const loadData = async () => {
    await axios.get("/api/teachers/all").then((response) => {
      if (response.status === 200) {
        console.log(response.data);
        setData(response.data);
      }
    })
    
  };



  const handleEditButtonClick = (id) =>
      navigate(`/teachers/updateOne/${id}`);


  return (
    <div style={{ marginTop: "15px" }}>
      <div className="Details">
        <h2>Welcome to Roll call admin Overview page</h2>
        <br></br> <br></br>
        <Link to="/addTeacher">
          <button type="submit" className="btn btn-secondary" onClick={Link}>
            Add Teacher
          </button>
        </Link>
        <table responsive>
          <tr>
            <th>Teacher Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department Id</th>
            <th>Action</th>
          </tr>
          <tbody>
            {data &&
              data.map((teachers) => {
                return (
                  <tr key={teachers.teacher_id}>
                    <td>{teachers.teacher_id}</td>
                    <td>{teachers.first_name}</td>
                    <td>{teachers.last_name}</td>
                    <td>{teachers.email}</td>
                    <td>{teachers.department_id}</td>
                    <td>
                      <button
                        onClick={() =>
                          handleEditButtonClick(teachers.teacher_id)
                        }
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
