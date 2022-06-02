import {Navigate} from 'react-router-dom'
import { useUser } from './useUser';

export const PrivateRoute = ({children}) => {
    
    const user = useUser();
    return user ? children : <Navigate to='/' />
}
export const PrivateRouteStudent = ({children}) => {
    
    const user = useUser();
    if(user.role === "student"){
        return user ? children :<Navigate to='/student_overview' />
    }else {
        return  user ? children :<Navigate to='/' />
    }
    
}
