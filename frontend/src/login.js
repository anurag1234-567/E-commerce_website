import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import VisibilityOffSharpIcon from '@mui/icons-material/VisibilityOffSharp';
import VisibilitySharpIcon from '@mui/icons-material/VisibilitySharp';
import axios from 'axios';

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleTypeChange = ()=>{
        setShowPassword((showPassword) => { setShowPassword(!showPassword) })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const data = {email, password};
            const res = await axios.post('http://localhost:4000/login', data);
            const { token, role } = res.data;
            localStorage.setItem('jwtToken', token);
            role !== 'admin' ? navigate('/') : navigate('/admin');
        }catch(err){
            setError('Invalid Credentials, Please verify and try again!');
            console.log(err);
        }
    }

    return(
        <div className="login-wrp">
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
            { error && <p className="error">{error}</p> }

            <input type='email' value={email} placeholder='Email' onChange={(e)=>{ setEmail(e.target.value)}} required /> 

            <div className="password-wrp">
                <input type={showPassword ? 'text': 'password'} value={password} placeholder='Password' onChange={(e)=>{ setPassword(e.target.value)}} required /> 
                <div className="icon" onClick={handleTypeChange}>
                   { showPassword ? <VisibilitySharpIcon/> : <VisibilityOffSharpIcon /> }
                </div>
            </div>

            <p><Link to='/forgetPassword' className="link">Forget Password?</Link></p>
            <input type='submit' value='Log in' />
        </form>
        <p style={{ textAlign: 'center'}}>Don't have an account? <Link to='/register' className="link">Create Account</Link></p>
        </div>
    )
}
export default Login;