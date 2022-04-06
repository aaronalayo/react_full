import { useNavigate } from "react-router-dom";

export const EmailVerificationFail = () => {
    const navigate = useNavigate();
    function signup() {
        navigate( '/signup')
      }
    return  (
        <div className="content-container">
            <h1>Uh oh...</h1>
            <p>
                Something went wrong while verifying your email.
            </p>
            <button onClick={signup()}>Back to Sign-up</button>         
        </div>
    )

}