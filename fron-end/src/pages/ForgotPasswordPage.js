import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8080';
export const ForgotPasswordPage = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [emailValue, setEmailValue] = useState('');

    const navigate = useNavigate();
    function login() {
        navigate( '/login')
      }
    const onSubmitClicked = async () => {
        try {
            await axios.put(`/api/forgot-password/${emailValue}`);
            setSuccess(true);
            setTimeout(() => {
                login();
            }, 3000);
        } catch (error) {
            setErrorMessage(error.message)
        }
    }
    return success ?(
        <div className="content-container">
            <h1>Success</h1>
            <p>Cherck your email for a reset link</p>
        </div>
    ) : (
        <div className="content-container">
            <h1>Forgot password</h1>
            <p>Enter your email and we'll send you a reset link</p>
            {errorMessage && <div className="fail">{errorMessage}</div>}
            <input
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                placeholder="someone@email.com"/>
                <button
                disabled={!emailValue}
                onClick={onSubmitClicked}>Send Reset Link</button>
        </div>
    )
}