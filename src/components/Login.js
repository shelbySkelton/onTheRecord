import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../axios-services/users';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('')

    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = {
            email,
            password
        }
        const data = await loginUser(user);
        console.log('This is my registered data', data);
        localStorage.setItem('token', data.token);
        setToken(data.token);
        navigate("/home");
    }
    return (
        <div id="login">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input className="text-box" type="text" name="email" onChange={(event) => {
                        setEmail(event.target.value);
                    }} />
                </label><br></br>
                <label>
                    Password:
                    <input className="text-box" type="text" name="password" onChange={(event) => {
                        setPassword(event.target.value);
                    }} />
                </label><br></br>
                <button className="button" type="submit">Login</button>
            </form>
        </div>
    );
};


export default Login;