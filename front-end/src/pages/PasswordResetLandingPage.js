import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { PasswordResetSuccess } from './PasswordResetSuccess';
import { PasswordResetFail } from './PasswordResetFail';

axios.defaults.baseURL = 'http://localhost:8080';

export const PasswordResetLandingPage = () => {
    const [ isSucces, setIsSuccess] = useState(false);
    const [isFailure, setIsFailure ] = useState(false);
    const [ passwordValue, setPasswordValue] = useState('');
    const [ confirmPasswordValue, setConfirmPasswordValue ] = useState('');
    const { passwordResetCode } = useParams();

    const onResetClicked = async () => {
        try {
            await axios.put(`/api/users/${passwordResetCode}/reset-password`, { passwordValue });
            setIsSuccess(true)
        } catch (error) {
            setIsFailure(true)
        }
    }

    if(isFailure) return <PasswordResetFail />
    if(isSucces) return <PasswordResetSuccess />

    return (
        <div className="content-container">
            <h1>Reset Password</h1>
            <p>Please enter a new password</p>
            <input
                type='password'
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                placeholder="Password"/>
             <input
                type='password'
                value={confirmPasswordValue}
                onChange={e => setConfirmPasswordValue(e.target.value)}
                placeholder="Confirm Password"/>
            <button
                disabled={!passwordValue || !confirmPasswordValue || passwordValue !== confirmPasswordValue}
                onClick={onResetClicked}>Reset Password</button>
        </div>
    )

}