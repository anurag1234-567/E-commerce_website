import { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register(){

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(password !== reEnterPassword){
            setError('New Password and Re-entered Password do not match!');
            return;
        }

        try{
            const data = {username, password, email};
            const res = await axios.post('http://localhost:4000/register', data);
            alert(res.data);
        }catch(err){
            if(err.response && err.response.status === 409) setError(err.response.data);
            else console.log(err);
        }
    }

    return(
        <>
        <div className="register-wrp">
        <h3>Create an Account</h3>
        { error && <p className="error">{error}</p> }

        <form onSubmit={handleSubmit}>

            <input type='text' value={username} placeholder='Username' 
            onChange={(e)=>{ setUsername(e.target.value)}} required /> 
            
            <input type='email' value={email} placeholder='Email'
            onChange={(e)=>{ setEmail(e.target.value)}} required /> 

            <input type={showPassword ? 'text' : 'password'} value={password} placeholder='Password'
            onChange={(e)=>{ setPassword(e.target.value)}} required /> 

            <input type={showPassword ? 'text' : 'password'}  value={reEnterPassword} placeholder='Re-enter Password'
            onChange={(e)=>{ setReEnterPassword(e.target.value)}} required />

            <label className='showPassword-wrp'>
               <input type='checkbox' onChange={()=>{ setShowPassword(!showPassword) }} />
               Show Password
            </label>

            <input type='submit' value='Register' />
        </form>
        <p style={{ textAlign: 'center'}}>Already have an account? <Link to='/' className="link">login</Link></p>
        </div>
        </>
    )
}
export default Register;