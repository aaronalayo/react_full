import axios from "axios";
import { useState, useEffect } from "react"
import { useNavigate  } from 'react-router-dom';

axios.defaults.baseURL = 'http://localhost:8080';
export const PassPhrasePage = () => {

    const [ passPhrase , setPassPhrase ] = useState("")
    useEffect(() => {
        axios
          .post(
            "/api/passphrase/",
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((response) => {
            setOptions(response.data);
          })
          .catch(function (error) {
            if (error.response) {
              setShowErrorMessage(error.response.data);
              // Request made and server responded
              console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);
            }
          });
  
    }, [token]);
    return (
        <div className="content-container">
            <h1>This is your key</h1>
            {/* {showErrorMessage && <div className="fail">{showErrorMessage}</div>} */}
            </div>
    )           
}