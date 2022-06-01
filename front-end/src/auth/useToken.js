import { useState } from "react";
import { useCookies } from 'react-cookie'

export const useToken = () => {
    const [, setCookie] = useCookies(['token'])
    const[ token, setTokenInternal ] = useState(() => {
        return localStorage.getItem('token');
    });

    const setToken = newToken => {
        localStorage.setItem('token', newToken)
        setTokenInternal(newToken)
        setCookie('token', newToken)
    }

    return [token, setToken]
}