import { useNavigate } from "react-router-dom";

export const PasswordResetFail = () => {
    const navigate = useNavigate();
    function login() {
        navigate( '/login')
      }
    return  (
        <div className="content-container">
            <h1>Uh oh...</h1>
            <p>
                Something went wrong while trying to reset your password.
            </p>
            <button onClick={login}>Back to Log-in</button>         
        </div>
    )

}