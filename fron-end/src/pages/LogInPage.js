import axios from "axios";
import { useState, useEffect } from "react"
import { useNavigate  } from 'react-router-dom';
import { useToken } from "../auth/useToken";
import { useQueryParams} from "../util/useQueryParams";

axios.defaults.baseURL = 'http://localhost:8080';
export const LogInPage = () => {
    const [, setToken] = useToken();
    const [errorMessage, setErrorMessage] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);  
    const [ googleOauthUrl, setgoogleOauthUrl ] = useState('');
    const { token: oauthToken} = useQueryParams();
        
    const navigate = useNavigate();
    function home() {
        navigate( '/')
      };
    useEffect(() => {
        if(oauthToken) {
            setToken(oauthToken);
            navigate('/')
        }
        
    }, [oauthToken, setToken, navigate])

    useEffect(() => {
        const loadOauthUrl = async () => {
            try {
                await axios.get('/auth/google/url').then((response) => {
                    const { url } = response.data;
                    setgoogleOauthUrl(url);
                })
            } catch (error) {
                console.log(error)
            }
        }
        loadOauthUrl();
    }, [])
    useEffect(() => {
        if (showErrorMessage) {
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 3000);
        }
    }, [showErrorMessage]);

    function forgotpassword() {
        navigate( '/forgot-password')
      };
      function signup() {
        navigate( '/signup')
      };
      function teacherOverview(){
          navigate('/teacher_overview')
      }
    const onLogInClicked = async () => {
        await axios.post('/api/login', {
            email: emailValue,
            password: passwordValue,
        }).then((response) => {
            console.log(response)
            const {token} = response.data;
            setToken(token);
            teacherOverview();
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
        <div className="content-container">
            <h1>Log In</h1>
            {showErrorMessage && <div className="fail">{showErrorMessage}</div>}            
            <input
                value={emailValue}
                onChange={e => setEmailValue(e.target.value)}
                placeholder="someone@email.com"/>
            <input 
                type="password"
                value={passwordValue}
                onChange={e => setPasswordValue(e.target.value)}
                placeholder="password"/>
                <hr />
            <button
                disabled={!emailValue || !passwordValue} 
                onClick={onLogInClicked}>Log In</button>
            <button onClick={forgotpassword}>Forgot your password?</button>
            <button onClick={signup}>Don't have an account? Sign Up</button>
            <button
                disabled={!googleOauthUrl}
                onClick={() => {window.location.href = googleOauthUrl}}
            >Log in with Google</button>

        </div>
    )
}