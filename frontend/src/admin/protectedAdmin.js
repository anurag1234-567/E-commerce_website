import { Navigate, Outlet} from "react-router-dom";
import jwtDecode from "jwt-decode";

function ProtectedAdmin(){
    const token = localStorage.getItem('jwtToken');
    if(!token) return <Navigate to='/' />;

    const decoded = jwtDecode(token);

    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime) return <Navigate to='/login' />

    return decoded.role !== 'admin' ? <Navigate to='/' /> : <Outlet />;
}
export default ProtectedAdmin;