import { Link, useNavigate } from 'react-router-dom';

function AdminNavbar() {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('jwtToken');
        navigate('/login');
    }

    return (
        <div className='adminNavbar'>
            <h3 className='e-commerce'>E-commerce website</h3>
            <div className='navbar-itm-wrp'>
                <p><Link to='/admin' className='link'>Home</Link></p>
                <p><Link to='/admin/addProduct' className='link'>Add Product</Link></p>
                <p><Link to='/admin/orders' className='link'>View Orders</Link></p>
                <p onClick={handleLogout}>Logout</p>
            </div>
        </div>
    );
}
export default AdminNavbar;