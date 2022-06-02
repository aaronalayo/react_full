import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
// import "../css/Admin.css";

axios.defaults.baseURL = 'http://localhost:8080';
export const ForgotPasswordPage = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [emailValue, setEmailValue] = useState('');

  const navigate = useNavigate();
  // function login() {
  //   navigate('/login')
  // }
  const onSubmitClicked = async () => {
    try {
      await axios.put(`/api/forgot-password/${emailValue}`);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setErrorMessage(error.message)
    }
  }
  return success ? (

    <div>
      <div className="content-container">
        <h1>Success</h1>
        <p>Check your email for a reset link</p>
      </div>
    </div>
  ) : (

    <form>
      <div className="auth-content-container">

        {errorMessage && <div className="fail">{errorMessage}</div>}

        <h2>Forgot Password</h2>
        <div className="form-outline mb-4">
          <h6>Please enter the Email you want to receive the reset-link to.</h6>
        </div>

        <div className="form-outline mb-4">
          <label className="auth-label">Email</label>
          <input
            className="form-control"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            placeholder="someone@email.com"
          />
        </div>

        <button disabled={!emailValue}
          onClick={onSubmitClicked}
          className="btn btn-primary btn-block mb-4"
        >Send reset-link</button>

        <div className="row mb-4">
          <div className="col">
            <Link to='/login'>Remember it? Return to home.</Link>
          </div>
        </div>

      </div>

    </form>
  );
}