import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Admin.css";
import axios from "axios";
import { Navbar } from "./AdminNavbar";

axios.defaults.baseURL = "http://localhost:8080";

const initialState = {
  student_id: "",
  first_name: "",
  last_name: "",
  user_name: "",
  password: "",
  program_id: "",
};

export const GetStudentList = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const navigate = useNavigate();

  // get all students list
  const loadData = async () => {
    const response = await axios.get("/api/students/all");
    if (response.status === 200) {
      setData(response.data);
    }
  };


  const handleEditButtonClick = (student_id) =>
    navigate(`/students/findOne/${student_id}`);

  return (
    <div>
      <Navbar />
      <div className="Details">
        <br></br>
        <h2>Students List</h2>
        <br></br>
        {/* <Link to="/addStudent">
          <button type="submit" className="btn btn-secondary" onClick={Link}>
            Add Student
          </button>
        </Link> */}
        <table responsive>
          <tr>
            <th>Student Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>User Name</th>
            <th>Program Id</th>
            <th>Action</th>
          </tr>
          <tbody>
            {data &&
              data.map((students, student_id) => {
                return (
                  <tr key={students.student_id}>
                    <td>{students.student_id}</td>
                    <td>{students.first_name}</td>
                    <td>{students.last_name}</td>
                    <td>{students.user_name}</td>
                    <td>{students.program_id}</td>
                    <td>
                      {/* <button
                        className="btn btn-edit"
                        onClick={navigate(`/students/updateOne/${student_id}`)}
                      >View </button> */}
                      <button className="edit"
                        onClick={() =>
                          handleEditButtonClick(students.student_id)
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
};
