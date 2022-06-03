import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
// import "../css/Admin.css";
import axios from "axios";
import { Navbar } from "../../fragment/AdminNav";


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
      navigate(`/teachers/update/${teacher_id}`);


  return (
    <div>
      <Navbar />
      <div className="wide-content-container">
        <br></br>
        <h2>Teachers List</h2>
        <br></br>
        {/* <Link to="/addTeacher">
          <button type="submit" className="btn btn-secondary" onClick={Link}>
            Add Teacher
          </button>
        </Link> */}
        <table className="table table-hover">
          <tr>
            <th scope="col">Teacher Id</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Email</th>
            <th scope="col">Department Id</th>
            <th scope="col">Action</th>
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
                      <div className="form-outline mb-4">
                      <button className="btn btn-success btn-block mb-4"
                        onClick={() =>
                          handleEditButtonClick(teacher_id)
                        }
                      >
                        Edit
                      </button>
                      </div>
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
