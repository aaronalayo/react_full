import axios from "axios";
import { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useToken } from "../../auth/useToken";
import { useQueryParams } from "../../util/useQueryParams";
import { FaGoogle } from 'react-icons/fa'
import LoginValidate from './LoginValidate'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



axios.defaults.baseURL = 'http://localhost:8080/';

export const LogInPage = () => {
  const [token, setToken] = useToken();
  const [errorMessage, setErrorMessage] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  // const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null)
  const [googleOauthUrl, setgoogleOauthUrl] = useState('');
  const { token: oauthToken } = useQueryParams();
  const { isLoggedIn } = LoginValidate(token)
  

  const navigate = useNavigate();


  // function home() {
  //   navigate('/')
  // };
  useEffect(() => {
    if (oauthToken) {
      setToken(oauthToken);
      // setIsPending(false)
      // navigate('/login')
    }

  }, [oauthToken, setToken, navigate])


  useEffect(() => {

    if(isLoggedIn === true) {
      console.log('Already signed in')
      // navigate('/')
    } else {
      console.log('Not signed in. Please sign in')
      // navigate(-1)
    }
  })

  // useEffect(() => {
  //   setIsPending(true)
  //   const loadOauthUrl = async () => {
  //     try {
  //       await axios.get('/auth/google/url').then((response) => {
  //         const { url } = response.data;
  //         setgoogleOauthUrl(url);
  //         setIsPending(false)
  //       })
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   loadOauthUrl();
  // }, [])


  useEffect(() => {
    if (showErrorMessage) {
      setTimeout(() => {
        setShowErrorMessage(false);
      }, 3000);
    }
  }, [showErrorMessage]);
  
      const onLogInClicked = async () => {
        
        await axios.post('/api/login', {
            email: emailValue,
            password: passwordValue,
        }).then(res => {
            const {token} = res.data;
            setToken(token);
            
            const jwt = token.split('.')[1]
            const decoded = JSON.parse(window.atob(jwt))
            const role = decoded['role']
            console.log(role)

            if(role === 'teacher') {
              navigate('/teacher_overview')
            } else if (role === 'student') {
              navigate('/student_overview')
            } else if (role === 'admin') {
              navigate('/admin')
            }

            console.log(res.data.status)

            toast.success('Success')

            // navigate('/teacher_overview');
        }).catch(err => {
          
          toast.error(err)                
            // setShowErrorMessage(err.response.data)

            // // Request made and server responded
            // console.log(err.response.data);
            // console.log(err.response.status);
            // console.log(err.response.headers);
    })




  }

  return (

      <div className="auth-content-container">

        {errorMessage && <div className="fail">{errorMessage}</div>}
        {showErrorMessage && <div className="fail">{showErrorMessage}</div>}

        <h2>Sign In</h2>

        <div className="form-outline mb-4">
          <label className="auth-label">Email</label>
          <input
            className="form-control"
            required
            // type="email"
            value={emailValue}
            onChange={(e) => setEmailValue(e.target.value)}
            placeholder="someone@email.com"
          />
        </div>

        <div className="form-outline mb-4">
          <label className="auth-label">Password</label>
          <input
            className="form-control"
            required
            type="password"
            value={passwordValue}
            onChange={(e) => setPasswordValue(e.target.value)}
            placeholder="password"
          />
        </div>

        <button className="btn btn-success btn-block mb-4"
          disabled={!emailValue || !passwordValue}
          onClick={onLogInClicked}
        >Sign in</button>

        <div className="row mb-4">
          <div className="col">
            <Link to='/forgot-password'>Forgot password?</Link>
          </div>
        </div>



        <div className="text-center">
          <p>Not a member? <Link to='/signup'>Sign Up</Link></p>
          <p>or sign in with:</p>
          <button className="btn btn-link btn-floating mx-1"
            onClick={() => {
              window.location.href = googleOauthUrl;
            }}>
            < FaGoogle />
          </button>
        </div>
      </div>
  );
}
