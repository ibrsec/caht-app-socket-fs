 
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
    // const currentUser  = true
    const currentUser  = useSelector((state)=>state.auth.user) 
  return currentUser ? <Navigate to='/'/>  :  <Outlet />
}

export default PublicRoute