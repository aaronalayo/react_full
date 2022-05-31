import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom';
import { useToken } from "../auth/useToken";
import axios from 'axios';


export const SignUpPage = () => {
  const [token, setToken] = useToken();
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [activationCodeValue, setActivationCodeValue] = useState('');
  const [confirmPasswordValue, setconfirmPasswordValue] = useState('');

  axios.defaults.baseURL = 'http://localhost:8080';
  const navigate = useNavigate();
  // function login() {
  //   navigate('/login')
  // }

  function pleaseVerify() {
    navigate('/please-verify')
  }
  useEffect(() => {
    if (showErrorMessage) {
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);
    }
  }, [showErrorMessage]);

  const onSignUpClicked = async () => {
    await axios.post('/api/signup', {
      email: emailValue,
      activationCode: activationCodeValue,
      password: passwordValue,
      confirmPasswordValue: confirmPasswordValue,

    }).then((response) => {

      const { token } = response.data
      setToken(token);
      pleaseVerify();
    }).catch(function (error) {
      if (error.response) {
        setShowErrorMessage(error.response.data)
        // Request made and server responded
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);

      }
    });
  }

  return (

    <div className="auth-content-container">

      {errorMessage && <div className="fail">{errorMessage}</div>}
      {showErrorMessage && <div className="fail">{showErrorMessage}</div>}


      <div className="auth-content-container">
        <h2>Sign Up</h2>
        <div className="form-outline mb-4">
          <label className="auth-label">Email</label>
          <input
            className="form-control"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            placeholder="someone@email.com"
          />
        </div>
        <div className="form-outline mb-4">
          <label className="auth-label">Activation Code</label>
          <input
            className="form-control"
            value={activationCodeValue}
            onChange={(e) => setActivationCodeValue(e.target.value)}
            placeholder="Actication Code"
          />
        </div>

        <div className="form-outline mb-4">
          <label className="auth-label">Password</label>
          <input
            className="form-control"
            type="password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            placeholder="password"
          />
        </div>

        <div className="form-outline mb-4">
          <label className="auth-label">Re-type Password</label>
          <input
            className="form-control"
            type="password"
            value={confirmPasswordValue}
            onChange={(e) => setconfirmPasswordValue(e.target.value)}
            placeholder="Password"
          />
        </div>


        <button disabled={!emailValue || !passwordValue}
          onClick={onSignUpClicked}
          className="btn btn-primary btn-block mb-4"
        >Sign Up</button>

        <div className="text-center">
          <p>Already a member? <Link to='/login'>Sign In</Link></p>
        </div>
      </div>
    </div>
  )
}