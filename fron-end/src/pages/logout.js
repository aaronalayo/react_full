import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "../auth/useToken";

export const Logout = () => {

    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token')
      console.log(token)

      if (token === null) {
        console.log('Not logged in')
        navigate('/login')
      } else {
        console.log('Logging out now ... ')
        localStorage.clear();
        navigate('/login')
      }
  })

  // const token = JSON.parse(localStorage.getItem('token'))
  // console.log(token)

  // useEffect(() => {
    // console.log('This got triggered')
    // localStorage.clear();
    // Navigate('/login')
    
  // });

return (
    <div>
      <h2>You are logged out!</h2>
      
    </div>
  );

}

export default Logout;