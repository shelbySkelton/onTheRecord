import React, { useState, useEffect } from 'react';
//import LogOut from './LogOut';
import { testMe } from '../axios-services/users';

const ErrorPage = (props) => {
  const { isLoggedIn, setIsLoggedIn, user, setUser,  guestCart, setGuestCart } = props

  return (
    <React.Fragment>
      <h1 className='font-effect-shadow-multiple'>Oh noes! This page doesn't exist!</h1>
    </React.Fragment>
  )
}

export default ErrorPage;