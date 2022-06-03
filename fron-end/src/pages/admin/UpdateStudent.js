import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Navbar } from "../../fragment/AdminNav";

axios.defaults.baseURL = "http://localhost:8080";

// defining the initialstate
const initialState = {
  student_id: "",
  first_name: "",
  last_name: "",
  user_name: "",
  password: "",
  program_id: "",
};

//working
export const UpdateStudent = () => {

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [program_id, setProgramId] = useState("");

  const params = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    const loadData = async () => {
      try {
        await axios.get(`/api/students/findOne/${params.id}`).then((response) => {
          const data = response.data;
          setFirstName(data.first_name);
          setLastName(data.last_name)
          setPassword(data.password)
          setProgramId(data.program_id)
          console.log(data)
          toast.success(data)
        })
      } catch (error) {
        // console.log('Here', error)
        toast.error(error)
      }
    }
    loadData();
  }, [params.id])

  const handleSubmit = async () => {
    await axios
      .post(`/api/students/findOne/${params.id}`, {
        //path the body
        first_name: first_name,
        last_name: last_name,
        password: password,
        program_id: program_id,
      })
      .then((response) => {
        // when user is succssfull to add the contain empty the field again
        // console.log('Or here', response.data);
        setFirstName(first_name);
        setLastName(last_name);
        setPassword(password);
        setProgramId(program_id);
        toast.success(response.data)
        // catching the error and read from the api
      })
      .catch((err) => toast.error(err.response.data));
    // toast.error("Can not add !");

  }


  return (
    <div>
      <Navbar />
      <div className="auth-content-container">
        <br></br>
        <br></br>
        <h2>Student From</h2>
        <div className="form-outline mb-4">
          <input
            className="form-control"
            type="text"
            id="name"
            name="first_name"
            placeholder="First Name"
            value={""}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="form-outline mb-4">
          <input
            className="form-control"
            type="text"
            id="name"
            name="last_name"
            placeholder="Last Name"
            value={""}
            onChange={(e) => setLastName(e.target.value)} />
        </div>
        <div className="form-outline mb-4">
          <input
            className="form-control"
            type="password"
            id="password"
            name="password"
            placeholder="password"
            value={""}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-outline mb-4">
          <input
            className="form-control"
            type="number"
            id="program_id"
            name="program_id"
            placeholder="Program Id"
            value={""}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-outline mb-4">
          <button className="btn btn-success btn-block mb-4"
            onClick={handleSubmit}
          >Update</button>
        </div>
        <div className="form-outline mb-4">
          <Link to={(-1)}><button className="btn btn-success btn-block mb-4">Back</button></Link>
        </div>
      </div>
    </div>
  );
};