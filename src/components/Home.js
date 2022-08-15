import React, { useState, useEffect } from 'react';
import LogOut from './LogOut';
import { testMe } from '../axios-services/users';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState({})

  useEffect(() => {
    testMe()
      .then(isLoggedIn => {
        
        console.log("isLoggedIn: ", isLoggedIn)
        setIsLoggedIn(isLoggedIn);
      })
  }, [])
  return(
    <>
    <h1>Placeholder</h1>
    <LogOut/>
    </>
  )
}
export default Home;