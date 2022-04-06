import { useState } from "react"
import { useNavigate  } from 'react-router-dom';
import { useToken } from "../auth/useToken";
import axios from 'axios';


export const SignUpPage = () => {
    const [token, setToken] = useToken();
    const [errorMessage, setErrorMessage] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [confirmPasswordValue, setconfirmPasswordValue] = useState('');

    axios.defaults.baseURL = 'http://localhost:8080';
    const navigate = useNavigate();
    function login() {
        navigate( '/login')
      }
    
    function pleaseVerify() {
        navigate( '/please-verify')
      }

    const onSignUpClicked = async () => {
        const response = await axios.post('/api/signup', {
            email: emailValue,
            password: passwordValue,
        
                
    
        });
        console.log(response)
        const {token} = response.data
        setToken(token);
        pleaseVerify();
    }
    return (
        <div className="content-container">
            <h1>Sign Up</h1>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <input
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                placeholder="someone@gmail.com"/>
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