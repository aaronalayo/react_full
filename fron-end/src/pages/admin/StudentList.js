import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "../css/Admin.css";
import axios from "axios";
import { Navbar } from "../../fragment/AdminNav";


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
  console.log(data);

  const handleEditButtonClick = (student_id) =>
    navigate(`/updateStudent/${student_id}`);

  return (
    <div>
        <Navbar />
    <div className="wide-content-container">
        <br></br>
        <h2>Students List</h2>
        <br></br>
        {/* <Link to="/addStudent">
          <button type="submit" className="btn btn-secondary" onClick={Link}>
            Add Student
          </button>
        </Link> */}
        <table responsive className="table table-hover">
          <tr>
            <th scope="col">Student Id</th>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">User Name</th>
            <th scope="col">Program Id</th>
            <th scope="col">Action</th>
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
                      <div className="form-outline mb-4">
                      <button className="btn btn-success btn-block mb-4"
                        onClick={() =>
                          handleEditButtonClick(students.student_id)
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
};
