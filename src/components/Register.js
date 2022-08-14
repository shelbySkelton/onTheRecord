import React, { useState } from "react";
import { registerUser } from '../axios-services/users';

const Register = () => {
    const [email, setEmail] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = {
            email,
            password,
            first_name,
            last_name
        }
        const data = await registerUser(user);
        console.log('This is my registered data', data);
        localStorage.setItem('token', data.token);
        setToken(data.token);
    }

    return (
        <div id="register">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input className="text-box" type="text" name="username" onChange={(event) => {
                        setEmail(event.target.value);
                    }} /><br></br>
                </label>
                <label>
                    First name:
                    <input className="text-box" type="text" name="firstname" onChange={(event) => {
                        setFirst_name(event.target.value);
                    }} /><br></br>
                </label>
                <label>
                    Last name:
                    <input className="text-box" type="text" name="lastname" onChange={(event) => {
                        setLast_name(event.target.value);
                    }} /><br></br>
                </label>
                <label>
                    Password:
                    <input className="text-box" type="text" name="password" onChange={(event) => {
                        setPassword(event.target.value);
                    }} /><br></br>

                </label>
                <label>
                    Confirm Password:
                    <input className="text-box" type="text" name="confirmPassword" onChange={(event) => {
                        setConfirmPassword(event.target.value);
                    }} /><br></br>
                </label>
                <button className="button" type="submit">Register</button>
            </form>
        </div>
    );
};



export default Register;