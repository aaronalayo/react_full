import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "http://localhost:8080";


//working
const DeleteStudent = (student_id) => {
    // defining the state
    const [state, setState] = useState();
    // destructuring the feilds from state (to avoid writting ex. state.first_name)

    // storing the reference of the useHistory in to history variable
    const navigate = useNavigate();
    // const { id } = useParams();

    useEffect(() => {
        
        axios.delete(`api/students/delete/${student_id}`).then((response) => {
            toast.success(response.data)

        }).catch((err) => toast.error(err.response.data));        

        setTimeout(() => navigate("/students"), 500);
    });

    return DeleteStudent();


    };


