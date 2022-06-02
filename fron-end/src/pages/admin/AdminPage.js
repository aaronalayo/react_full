import { useToken } from "../../auth/useToken";
import { Navbar } from "../../fragment/AdminNav";
import LoginValidate from "../authentication/LoginValidate";

export const AdminPage = () => {

  // const [token, setToken] = useToken();
  // const { isLoggedIn } = LoginValidate(token)

  const token = localStorage.getItem('token')

  const jwt = token.split('.')[1]
  const decoded = JSON.parse(window.atob(jwt))
  const email = decoded['email']
  console.log(email)

  // if ( isLoggedIn ) {

  // }

    return (
      <div>
        <Navbar />
        <br></br>
        <div className="admin">
          <h2>Welcome to the Admin Page {email}</h2>
        </div>
      </div>
    );
    

}
