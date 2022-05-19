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
    
  //   const deleteTeacher = (id) => {
  //       if (window.confirm("Please Confirm Deletation !")) {
  //           axios.delete(`/api/teachers/delete/${id}`);
  //           toast.success("Teacher is deleted Successfully !")
  //           //load the updated data
  //           setTimeout(() => loadData(), 500); //load the data after 500 ms
  //       }
  // }

  // delete one teacher
  const  id  = useParams();
  const deleteTeacher = async (id) => {
    if (window.confirm("Please Confirm Deletation !")) {
      const response = await axios.delete(`/api/teachers/delete/${id}`);
      if (response.status === 200) {
        toast.success(response.data);
        loadData();
      }
    }   
  };
 
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
          <button type="submit" classNa
            me="btn btn-secondary" onClick={Link}>
            Add Teacher
          </button>
        </Link>
        <table className="styled-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Department Id</th>
            </tr>
            <tbody>
              {data && data.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                    <td>{item.email}</td>
                    <td>{item.department_id}</td>
                    <td>
                      <Link to={`/update/${item.id}`}>
                        <button className="btn btn-edit"
                          onClick={() => getSingleTeacher(item.id)}>Update</button>
                      </Link>
                      <button
                        className="btn btn-delete"
                        onClick={() => deleteTeacher(item.id)}
                      >Delete</button>
                      <Link to={`/view/${item.id}`}>
                        <button className="btn btn-view">View</button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </thead>
        </table>
      </div>
    );
};

