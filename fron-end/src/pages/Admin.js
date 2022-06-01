import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "../css/Admin.css";
import axios  from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



axios.defaults.baseURL = "http://localhost:8080";


export const Admin = () => {
  
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
    
    const deleteTeacher = (id) => {
      if (window.confirm("Please Confirm Deletation !" + id)) {
        id = 21;
        axios.delete(`/api/teachers/delete/${id}`);
        toast.success("Teacher is deleted Successfully !" + id);
            //load the updated data
            setTimeout(() => loadData(), 500); //load the data after 500 ms
        }
  }

  // // delete one teacher
  // const id = useParams();
  // const deleteTeacher = async (id) => {
  //   if (window.confirm("Please Confirm Deletation !"+ id)) {
  //     const response = await axios.delete(`/api/teachers/delete/${id}`);
  //     console.log(response.status);
  //     if (response.status === 200) {
  //       toast.success(response.data);
  //       loadData();
  //     }     

  //   } 
    
  // };
 
  const [state, setState] = useState("");
  const getSingleTeacher = async (id) => {
    const response = await axios.get(`api/teachers/findOne/${id}`);
    if (response.status === 200) {
      console.log(response)
      setState({ ...response.data[0] });
    }
  };
    return (
      <div style={{ marginTop: "150px" }}>
        <h2>Welcome to Roll call admin Overview page</h2>
        <br></br> <br></br>
        <Link to="/addTeacher">
          <button type="submit" className="btn btn-secondary" onClick={Link}>
            Add Teacher
          </button>
        </Link>
        <table>
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
                      <Link to={`/teachers/update/${teacher_id}`}>
                        <button
                          className="btn btn-edit"
                          onClick={() => getSingleTeacher(teacher_id)}
                        >
                          Update
                        </button>
                      </Link>
                      <button
                        className="btn btn-delete"
                        onClick={() => deleteTeacher(teacher_id)}
                      >
                        Delete
                      </button>
                      <Link to={`/view/${teacher_id}`}>
                        <button className="btn btn-view">View</button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    );
};

