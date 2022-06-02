import { useNavigate } from "react-router-dom";

export const EmailVerificationSuccess = () => {
    const navigate = useNavigate();
 
    function home() {
        navigate('/teacher_overview')
      }
    return  (
        <div className="content-container">
            <h1>Success!</h1>
            <p>
                Thanks for verifying your email, now you can use all the app's features!
            </p>
            <button onClick={home}>Go to home page</button>         
        </div>
    )

}
