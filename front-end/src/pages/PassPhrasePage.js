import axios from "axios";
import { useState, useEffect } from "react"
import { useNavigate  } from 'react-router-dom';
import { TeacherNavbar } from "./TeacherNavbar"

axios.defaults.baseURL = 'http://localhost:8080';
export const PassPhrasePage = () => {

    const [ passPhrase , setPassPhrase ] = useState("")
    useEffect(() => {
          setPassPhrase(sessionStorage.getItem('passphrase'));
  
    },[] );
    return (
      <div>
        <TeacherNavbar/>
          <div className="content-container">
            <h1>This is your key</h1>
            <p>{passPhrase}</p>
            </div>
      </div>
        
    )           
}