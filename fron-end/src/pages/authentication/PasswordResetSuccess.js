import { useNavigate } from "react-router-dom";

export const PasswordResetSuccess = () => {
    const navigate = useNavigate();
 
    function login() {
        navigate('/login')
      }
    return  (
        <div className="content-container">
            <h1>Success!</h1>
            <p>
                Your password has been reset, now please login with your new password!
            </p>
            <button onClick={login}>Log in</button>         
        </div>
    )

}