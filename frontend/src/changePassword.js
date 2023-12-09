import { useState } from "react";
import Navbar from './navbar';
import axios from 'axios';
 
function ChangePassword(){
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(newPassword !== reEnterPassword){
            setError('New Password and Re-entered Password do not match');
            return;
        } 
        const token = localStorage.getItem('jwtToken');
        
        try{
            const res = await axios.post('http://localhost:4000/ChangePassword', { token, oldPassword, newPassword });
            setError(''); setOldPassword(''); setNewPassword(''); setReEnterPassword(''); 
            alert(res.data);
        }catch(err){
            if(err.response && err.response.data) setError(err.response.data);
            console.log(err);
        }
    }

    return(
        <>
        <Navbar />
        <div className='changePassword-wrp'>
            <h3>Change Password</h3>

            <form onSubmit={handleSubmit}>
                {error && <p className='error'>{error}</p>}
                <input type={showPassword ? 'text' : 'password'} value={oldPassword} placeholder='Old Password' 
                onChange={(e)=>{ setOldPassword(e.target.value); }} required />

                <input type={showPassword ? 'text' : 'password'} value={newPassword} placeholder='New Password' 
                onChange={(e)=>{ setNewPassword(e.target.value) }} required />

                <input type={showPassword ? 'text' : 'password'} value={reEnterPassword} placeholder='Confirm New Password' 
                onChange={(e)=>{ setReEnterPassword(e.target.value) }} required />

                <label className='showPassword-wrp'>
                   <input type='checkbox' onChange={()=>{ setShowPassword(!showPassword) }} />
                   Show Password
                </label>

                <input type='submit' value='Save Password' />
            </form>
        </div>
        </>
    );
}
export default ChangePassword;