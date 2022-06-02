import axios from "axios";
import { useState, useEffect } from "react";
import { useToken } from "../auth/useToken";
import { Navbar } from "./StudentNavbar";


axios.defaults.baseURL = "http://localhost:8080";

export const StudentOverviewPage = () => {
  const [token] = useToken();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [passPhraseValue, setPassPhraseValue] = useState('');
  
  
  
  const onCheckInClicked = async () => {

    await axios.post('/api/checkin', {
        passphrase:passPhraseValue},
        {
          headers: { Authorization: `Bearer ${token}` },
        }

        
    ).then((response) => {
      setShowSuccessMessage(response.data)

      
    }).catch(function (error) {
        if (error.response) {
        setShowErrorMessage(error.response.data)
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
    
        }
    });

}
return(
  <div>
  <Navbar/>
  <div className="content-container">
   
    <h1>Check In</h1>
    {showSuccessMessage && (
          <div className="success">{showSuccessMessage}</div>
        )}
        {showErrorMessage && <div className="fail">{showErrorMessage}</div>}
          <input
            value={passPhraseValue}
            onChange={(e) => setPassPhraseValue(e.target.value)}
            placeholder="passphrase"
          />
          <button
            disabled={!passPhraseValue }
            onClick={onCheckInClicked}
          >
           Check In
          </button>
    </div>
    </div>
)
}