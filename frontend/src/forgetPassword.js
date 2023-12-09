import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
  
function ForgetPassword(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(password !== rePassword){
            setError('New Password and Re-entered Password do not match');
            return;
        } 
        const data = { email, password };
        
        try{
            const res = await axios.post('http://localhost:4000/resetPassword', data);
            alert(res.data);
            navigate('/login');
        }catch(err){
            if(err.response) setError(err.response.data);
            console.log(err);
        }
    }

    return(
        <div className='forgetPassword-wrp'>
        <h3>Change Password</h3>
        <form onSubmit={handleSubmit}>
         {error && <p className='error'>{error}</p>}

         <input type='email' value={email} placeholder='Email'
         onChange={(e)=>{ setEmail(e.target.value) }} required/>

         <input type={showPassword ? 'text' : 'password'} value={password} placeholder='New Password'
         onChange={(e)=>{ setPassword(e.target.value) }} required/>

         <input type={showPassword ? 'text' : 'password'} value={rePassword} placeholder='Confirm Password'
         onChange={(e)=>{ setRePassword(e.target.value) }} required />

         <label className='showPassword-wrp'>
           <input type='checkbox' onChange={()=>{ setShowPassword(!showPassword) }} />
           Show Password
         </label>

         <input type='submit' value='Reset Password' />
        </form>
        </div>
    );
}
export default ForgetPassword;