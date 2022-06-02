import axios from "axios";
import { useState, useEffect } from "react"


axios.defaults.baseURL = 'http://localhost:8080';

export const HealthCheckPage = () => {
    const [showSuccessMessage, setShowSuccessMMessage] = useState(false); 
    const [showErrorMessage, setShowErrorMessage] = useState(false); 

    useEffect(() => {
        if (showErrorMessage) {
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 3000);
        }else if (showSuccessMessage){
            setTimeout(() => {
                setShowSuccessMMessage(false);
            }, 3000)
        }
    }, [showErrorMessage, showSuccessMessage]);
    const onHealthCheckClicked = async () => {
        await axios.get('/api/health_check').then((response) => {
            console.log(response)
            setShowSuccessMMessage(response.data)
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

    return (
        <div className="content-container">
            <h1>Health Check</h1>
            {showSuccessMessage && <div className="success">{showSuccessMessage}</div>}   
            {showErrorMessage && <div className="fail">{showErrorMessage}</div>}            
     
            <button
               
                onClick={onHealthCheckClicked}>Check</button>
   
            

        </div>
    )
}