import { useNavigate } from "react-router-dom"
import LoginValidate from "../pages/LoginValidate";
import { useToken } from "./useToken";

const UserRole = (token) => {

    // const navigate = useNavigate();

    // const [token, setToken] = useToken();
    // const { isLoggedIn } = LoginValidate(token)

    const jwt = token.split('.')[1]
    const decoded = JSON.parse(window.atob(jwt))
    const role = decoded['role']
    console.log(role)


    // if (role === 'teacher') {
    //     navigate('/teacher_overview')
    // } else if (role === 'student') {
    //     navigate('/student_overview')
    // }

    return {role}

}

export default UserRole;

