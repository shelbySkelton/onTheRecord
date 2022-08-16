import React, { useState, useEffect } from 'react';
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from '../axios-services';
import { testMe } from '../axios-services/users';

import {
  Home,
  Products,
  Records,
  Accessories,
  Login,
  Register,
  SingleProduct
} from './index'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import '../style/App.css';


const App = () => {
  const [APIHealth, setAPIHealth] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({})

  useEffect(() => {

    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data

    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? 'api is up! :D' : 'api is down :/');
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    testMe()
      .then(user => {
        setUser(user);
        console.log("user: ", user)
      })
    getAPIStatus();
  }, []);


  return (
    <div className="app-container">
      <Router>
        <navbar className='header-nav'>
          <Link to='/home'
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
        <div className='logo-image'>
          {/* <img className='logo' src='https://images.unsplash.com/photo-1542208998-f6dbbb27a72f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' width='200' height='150' /> */}
          <img className='logo' src="https://i.imgur.com/cZV1cx1.png" alt='logo' />
        </div>
        <navbar className='products-nav'>
          <Link to="/home">Home</Link>
          <Link to="/products/records">Records</Link>
          <Link to="/products/Accessories">Accessories</Link>
          <p>{isLoggedIn ? `You're Logged In, ${user.first_name}` : "You're Not Logged In"}</p>
        </navbar>
        <Routes>
          <Route path="/login" element={<Login
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            user={user}
            setUser={setUser}
          />} />
          <Route path="/register" element={<Register
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            user={user} />} />
          <Route path="/home" element={<Home
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setUser={setUser}
            user={user}
          />} />
          <Route path="/products/all" element={<Products
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            user={user} />} />
          <Route path="/products/records" element={<Records
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            user={user} />} />
          <Route path="/products/accessories" element={<Accessories
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            user={user} />} />
          <Route path="/products/:productId" element={<SingleProduct
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            user={user} />} />

        </Routes>
      </Router>
    </div>
  );
};

export default App;
