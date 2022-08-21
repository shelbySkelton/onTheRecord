import React, { useState, useEffect } from 'react';
//import LogOut from './LogOut';
import { testMe } from '../axios-services/users';

const Home = (props) => {
  const { isLoggedIn, setIsLoggedIn, user, setUser,  guestCart, setGuestCart } = props
  // console.log(props)
  return (
    <>
      <h1>Placeholder</h1>
      <p>{(isLoggedIn) ? `You're Logged In as ${user.first_name}`: `You are not logged in`}</p>
    </>
  )
}
export default Home;