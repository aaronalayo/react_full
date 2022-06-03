import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Logout = () => {

    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem('token')
      console.log(token)

      if (token === null) {
        toast.error('Not signed in')
        navigate('/login')
      } else {
        toast.success('Signed out :) ')
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