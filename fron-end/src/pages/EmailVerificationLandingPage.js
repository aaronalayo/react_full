import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useToken } from '../auth/useToken';
import { EmailVerificationSuccess } from './EmailVerificationSuccess';
import { EmailVerificationFail } from './EmailVerficationFail';

axios.defaults.baseURL = 'http://localhost:8080';
export const EmailVerificationLandingPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [ isSuccess, setIsSuccess] = useState(false);
    const { verificationString  } = useParams();
    const [, setToken] = useToken();
     
    useEffect(() => {
        const loadVerification = async () => {
            try {
                await axios.put('/api/verify-email', {verificationString}).then((response) => {
                    const { token } = response.data;
                    setToken(token);
                    setIsSuccess(true);
                    setIsLoading(false);
                });
            
            } catch (e) {
                setIsSuccess(false);
                setIsLoading(false);
            }
        }

        loadVerification();
    }, [setToken, verificationString])

    if(isLoading) return <p>Loading...</p>
    if(!isSuccess) return <EmailVerificationFail />
    return <EmailVerificationSuccess />
}