import { useState, useEffect } from "react"
import { useNavigate  } from 'react-router-dom';
import { useToken } from "../auth/useToken";
import axios from 'axios';


export const SignUpPage = () => {
    const [token, setToken] = useToken();
    const [errorMessage, setErrorMessage] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);  
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [activationCodeValue, setActivationCodeValue] = useState('');
    const [confirmPasswordValue, setconfirmPasswordValue] = useState('');

    axios.defaults.baseURL = 'http://localhost:8080';
    const navigate = useNavigate();
    function login() {
        navigate( '/login')
      }
    
    function pleaseVerify() {
        navigate( '/please-verify')
      }
      useEffect(() => {
        if (showErrorMessage) {
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 3000);
        }
    }, [showErrorMessage]);

    const onSignUpClicked = async () => {
        await axios.post('/api/signup', {
            email: emailValue,
            activationCode: activationCodeValue,
            password: passwordValue,
            confirmPasswordValue: confirmPasswordValue,
            
        }).then((response) => {
            
            const {token} = response.data
            setToken(token);
            pleaseVerify();
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
            <h1>Sign Up</h1>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            {showErrorMessage && <div className="fail">{showErrorMessage}</div>}
            <input
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                placeholder="someone@gmail.com"/>
                 <input 
                type="password"
                value={activationCodeValue}
                onChange={e => setActivationCodeValue(e.target.value)}
                placeholder="activation code"/>
            <input 
                type="password"
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                placeholder="password"/>
            <input 
                type="password"
                value={confirmPasswordValue}
                onChange={e => setconfirmPasswordValue(e.target.value)}
                placeholder="password"/>
               
                <hr />
            <button
                disabled={
                    !emailValue || !passwordValue ||
                    passwordValue !== confirmPasswordValue
                } 
                onClick={onSignUpClicked}>Sign Up</button>
            <button onClick={login}>Already have an account? Log In</button>

        </div>
    )
}