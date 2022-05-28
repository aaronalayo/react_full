import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Admin.css";
import axios  from "axios";




axios.defaults.baseURL = "http://localhost:8080";

export const GetList = () => {
  
    const [data, setData] = useState([]);

    useEffect(() => {
        loadData();
    }, []);
  

    // get all teachers list
    const loadData = async () => {
        const response = await axios.get("/api/teachers/all");
        if (response.status === 200) {
            setData(response.data);
        }
    };
    console.log(data);


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
                data.map((teachers, teacher_id) => {
                  return (
                    <tr key={teacher_id}>
                      <td>{teachers.teacher_id}</td>
                      <td>{teachers.first_name}</td>
                      <td>{teachers.last_name}</td>
                      <td>{teachers.email}</td>
                      <td>{teachers.department_id}</td>
                      <td>
                        <Link to={`/teachers/updateOne/${teacher_id}`}>
                          <button
                            className="btn btn-edit"
                            onClick={() => getSingleTeacher(teacher_id)}
                          >
                            Update
                          </button>
                        </Link>
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
      
    
