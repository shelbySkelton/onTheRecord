import React, { useState } from "react";
import { registerUser } from '../axios-services/users';

const Register = () => {
    const [email, setEmail] = useState('');
    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');
    const [password, setPassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');
    const [token, setToken] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [newPw1, setNewPw1] = useState('');
    const [newPw2, setNewPw2] = useState('');

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
        setErrorMessage(data.message);
    }

    return (
        <div id="register">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input className="text-box" type="text" name="email" onChange={(event) => {
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
                    <input value={newPw1} minLength="8" className="text-box" type="password" name="password" onChange={(event) => {
                        setNewPw1(event.target.value);
                    }} /><br></br>

                </label>
                <label>
                    Confirm Password:
                    <input value={newPw2} className="text-box" type="password" name="confirmPassword"
                        onChange={(event) => {
                            setNewPw2(event.target.value);
                        }}
                        onInput={(event) => {
                            setPassword(event.target.value)
                        }}
                    /><br></br>
                </label>
                <button className="button" type="submit"
                    disabled={(newPw1 === newPw2) ? false : true}
                >Register</button>
                <p>{errorMessage}</p>
                <p>{(newPw1 === newPw2) ? null : "Passwords must be matching"}</p>
            </form>
        </div>
    );
};



export default Register;