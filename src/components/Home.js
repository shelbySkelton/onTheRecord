import React, { useState, useEffect } from 'react';
//import LogOut from './LogOut';
import { testMe } from '../axios-services/users';

const Home = ({ isLoggedIn, setIsLoggedIn, user, setUser,  guestCart, setGuestCart }) => {


  return (
    <div className='home'>
      <h1>{isLoggedIn
          ? `Welcome ${user.first_name}!`
          : `Welcome!`}</h1>
      <p>{(isLoggedIn) ? `You're Logged In as ${user.first_name}`: `You are not logged in`}</p>
    </div>
  )
}
export default Home;