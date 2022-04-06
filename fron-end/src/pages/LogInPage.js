import axios from "axios";
import { useState } from "react"
import { useNavigate  } from 'react-router-dom';
import { useToken } from "../auth/useToken";

axios.defaults.baseURL = 'http://localhost:8080';
export const LogInPage = () => {
    const [token, setToken] = useToken();
    const [errorMessage, setErrorMessage] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');

    const navigate = useNavigate();
    function forgotpassword() {
        navigate( '/forgot-password')
      }
      function signup() {
        navigate( '/signup')
      }
      function home() {
        navigate( '/')
      }
    const onLogInClicked = async () => {
        const response = await axios.post('/api/login', {
            email: emailValue,
            password: passwordValue,
        });
        const {token} = response.data;
        setToken(token);
        home();
    }
    return (
        <div className="content-container">
            <h1>Log In</h1>
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
                <hr />
            <button
                disabled={!emailValue || !passwordValue} 
                onClick={onLogInClicked}>Log In</button>
            <button onClick={forgotpassword}>Forgot your password?</button>
            <button onClick={signup}>Don't have an account? Sign Up</button>

        </div>
    )
}