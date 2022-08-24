import React, { useState, useEffect } from 'react';
//import LogOut from './LogOut';
import { testMe } from '../axios-services/users';

const Home = (props) => {
  const { isLoggedIn, setIsLoggedIn, user, setUser,  guestCart, setGuestCart } = props

  return (
    <div className='home'>
      <h1>{isLoggedIn
          ? `Welcome ${user.first_name}!`
          : `Welcome!`}</h1>
    </div>
  )
}
export default Home;