import React, { useState, useEffect } from "react";
import { testMe } from "../axios-services/users";
import {
    BrowserRouter as Router,
    Link
  } from 'react-router-dom';


const Header = ({ isLoggedIn, setIsLoggedIn, user, setUser, isAdmin, setIsAdmin }) => {



    useEffect(() => {
        testMe()
            .then(user => {
                setUser(user);
                if (!(user === {})) {
                    setIsLoggedIn(true);
                }       
            })
    }, [])



    return (
        <div className="header-container">
        <navbar className='header-nav'>
            <Link to='/login'
                hidden={isLoggedIn ? false : true}
                onClick={(evt) => {
                    localStorage.removeItem('token');
                    setIsLoggedIn(false);
                    setUser({});
                }}> Log Out
            </Link>

            <Link to="/login"
                hidden={isLoggedIn ? true : false}
            >Log in</Link>
            <Link to="/register"
                hidden={isLoggedIn ? true : false}

            >Register</Link>
            <Link
                hidden={isLoggedIn ? false : true}
                to="/myAccount">{user.first_name}'s Account</Link>
            <Link to="/cart">My Cart</Link>

        </navbar>
        </div>
    )
}


export default Header;