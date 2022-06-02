import { useEffect, useState } from "react";

const LoginValidate = (token) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    useEffect(() => {
        if (token === null) {
            setIsLoggedIn(false)
        } else {
            setIsLoggedIn(true)
        }
    }, [token])


    return {isLoggedIn};
}


export default LoginValidate;