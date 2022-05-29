import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import "../css/Admin.css";
import axios from "axios";
import { Navbar } from "./AdminNavbar";


axios.defaults.baseURL = "http://localhost:8080";

const initialState = {
  teacher_id:"",
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  department_id: "",
};



export const GetTeacherList = () => {
  
  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);
  
  const navigate = useNavigate();
  
  // get all teachers list
  const loadData = async () => {
    const response = await axios.get("/api/teachers/all");
    if (response.status === 200) {
      setData(response.data);
    }
  };
  console.log(data);


  const handleEditButtonClick = (teacher_id) =>
      navigate(`/api/teachers/updateOne/${teacher_id}`);


  return (
    <div style={{ marginTop: "15px" }}>
     <Navbar/>
      <div className="Details">
        <br></br>
        <h2>Teachers List</h2>
        <br></br>
        {/* <Link to="/addTeacher">
          <button type="submit" className="btn btn-secondary" onClick={Link}>
            Add Teacher
          </button>
        </Link> */}
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
              data.map((teachers, teacher_id) => {
                return (
                  <tr key={teachers.teacher_id}>
                    <td>{teachers.teacher_id}</td>
                    <td>{teachers.first_name}</td>
                    <td>{teachers.last_name}</td>
                    <td>{teachers.email}</td>
                    <td>{teachers.department_id}</td>
                    <td>
                      {/* <button
                        className="btn btn-edit"
                        onClick={navigate(`/teachers/updateOne/${teacher_id}`)}
                      >View </button> */}
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
