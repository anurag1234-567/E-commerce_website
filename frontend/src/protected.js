import { Outlet, Navigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function Protected(){
    const token = localStorage.getItem('jwtToken');
    if(!token) return <Navigate to='/login' />
    
    const decoded = jwtDecode(token);

    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime) return <Navigate to='/login' />

    return decoded.role !== 'admin' ? <Outlet /> : <Navigate to='/admin' />
}
export default Protected;