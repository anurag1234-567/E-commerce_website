import { useState, useRef} from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';
 
function Navbar(){
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const profileRef = useRef();

    window.addEventListener('click', (e)=>{
      if(e.target !== profileRef.current)
      setOpen(false);
    })

    const handleLogout = ()=>{
        localStorage.removeItem('jwtToken');
        navigate('/login');
    }

    return(
      <>
        <div className="navbar">
          <p className="e-commerce">E-Commerce App</p>
          <div className='navbar-itm-wrp'>
            <p><Link to='/' className='link'>Home</Link></p>
            <p><Link to='/userOrders' className='link'>Orders</Link></p>
            <p><Link to='/cartPage' className='link'>View Cart</Link></p>
            <AccountCircleSharpIcon className='profile-icon' onClick={()=>{ setOpen(!open) }} ref={profileRef}/>
          </div>
          {
            open && 
            <div className='drop-down-menu'>
              <p><Link to='/ChangePassword' className='link'>Change Password</Link></p>
              <p onClick={handleLogout}>logout</p>
            </div>
          }
        </div>
      </>
    );
}
export default Navbar;