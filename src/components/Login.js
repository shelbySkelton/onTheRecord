import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../axios-services/users';

const Login = (props) => {

    const { 
        isLoggedIn, 
        setIsLoggedIn,
        user, 
        setUser,
        setIsAdmin,
        isAdmin,
        guestCart,
        setGuestCart 
        } = props

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    // const [isLoggedIn, setIsLoggedIn] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    // const [user, setUser] = useState({})

    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = {
            email,
            password
        }
        const data = await loginUser(user);

        localStorage.setItem('token', data.token);

        //IF STATEMENT FOR DATA SUCCESS
        if (data.success) {
            setToken(data.token);
            setUser(data.user);
            setIsLoggedIn(data.success);
            if (data.user.isAdmin) {
                setIsAdmin(true);
            }
            navigate("/", { replace: true });
        }
        setErrorMessage(data.message)
    }
    return (
        <div id="login">

            <h1>Login</h1>
            <p>{(isLoggedIn) ? `You're Logged In as ${user.first_name}` : `You are not logged in`}</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input className="text-box" type="text" name="email" onChange={(event) => {
                        setEmail(event.target.value);
                    }} />
                </label><br></br>
                <label>
                    Password:
                    <input className="text-box" type="password" name="password" onChange={(event) => {
                        setPassword(event.target.value);
                    }} />
                </label><br></br>
                <button className="button" type="submit">Login</button>
                <p>{errorMessage}</p>
            </form>
        </div>
    );
};


export default Login;