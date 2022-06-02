import { useEffect } from "react";
import { useNavigate  } from 'react-router-dom';


export const PleaseVerifyEmailPage = () => {
    const navigate = useNavigate();
    function home() {
        navigate( '/')
      }
    

    useEffect(() => {
        setTimeout(() => {
            home();
        }, 3000)
    })
    return (
        <div className="content-container">
            <h1>Thanks for signing up</h1>
            <p>
                A verification email has been sent to the email address provided.
                Please verify your email to unlock site features
            </p>
        </div>
    )
}