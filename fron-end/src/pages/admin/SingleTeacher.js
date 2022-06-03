import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
// import "../css/addTeacher.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "../../fragment/AdminNav";

axios.defaults.baseURL = "http://localhost:8080";

export const GetSingleTeacher = () => {

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [department_id, setDepartmentId] = useState("");

  const params = useParams();
  const navigate = useNavigate();
  function teachers() {
    navigate('/teachers')
  }



  useEffect(() => {
    const loadData = async () => {
      try {
        await axios.get(`/api/teachers/findOne/${params.id}`).then((response) => {
          const data = response.data;
          setFirstName(data.oneTeacher.first_name);
          setLastName(data.oneTeacher.last_name)
          setEmail(data.oneTeacher.email)
          setPassword(data.oneTeacher.password)
          setDepartmentId(data.oneTeacher.department_id)
          toast.success(data)
        })
      } catch (error) {
        console.log(error)
        toast.error(error)
      }
    }
    loadData();
  }, [params.id])

  // const handleSubmit = async () => {
  //   await axios
  //     .post(`api/teachers/updateOne/${params.id}`, {
  //       //path the body
  //       first_name: first_name,
  //       last_name: last_name,
  //       email: email,
  //       password: password,
  //       department_id: department_id,
  //     })
  //     .then((response) => {
  //       // when user is succssfull to add the contain empty the field again
  //       console.log(response.data);
  //       setFirstName(first_name);
  //       setLastName(last_name);
  //       setEmail(email);
  //       setPassword(password);
  //       setDepartmentId(department_id);
  //       teachers();
  //       // catching the error and read from the api
  //     })
  //     .catch((err) => toast.error(err.response.data));
  //   // toast.error("Can not add !");

  // };

  return (
    <div>
      <Navbar />
      <div className="auth-content-container">
        <h2>Teacher Form for {email} </h2>
        <div className="form-outline mb-4">
          <input
            className="form-control"
            type="text"
            id="first_name"
            name="first_name"
            placeholder="First Name"
            value={first_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-outline mb-4">
          <input
            className="form-control"
            type="text"
            id="last_name"
            name="last_name"
            placeholder="Last Name"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-outline mb-4">
          <input
            className="form-control"
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-outline mb-4">
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-outline mb-4">
          <input
            className="form-control"
            type="number"
            id="department_id"
            name="department_id"
            placeholder="Department Id"
            value={department_id}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="form-outline mb-4">
          <button className="btn btn-success btn-block mb-4"
          // onClick={handleSubmit}
          >Save</button>
        </div>
        {/* <input
                  type="submit"
                  value="Save"
                  style={{ width: "19.5%" }}
                  onClick={handleSubmit}
                /> */}
        <div className="form-outline mb-4">
          <Link to={(-1)}><button className="btn btn-success btn-block mb-4">Back</button></Link>
        </div>
      </div>
    </div>
  );
}



