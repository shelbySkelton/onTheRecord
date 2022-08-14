import React, { useState, useEffect } from 'react';
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from '../axios-services';
import { Home, Products, Records, Accessories, SingleProduct } from './index'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import '../style/App.css';

const App = () => {
  const [APIHealth, setAPIHealth] = useState('');

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
    getAPIStatus();
  }, []);

  return (
    <div className="app-container">
      <Router>
        <navbar className='header-nav'>

          <Link to="/login">Log in</Link>
          <Link to="/register">Register</Link>
          <Link to="/myAccount">My Account</Link>
          <Link to="/cart">My Cart</Link>

        </navbar>
        <div className='logo-image'>
          <img src='https://images.unsplash.com/photo-1542208998-f6dbbb27a72f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80' width='200' height='150' />
        </div>
        <navbar className='products-nav'>
          <Link to="/home">Home</Link>
          <Link to="/products/records">Records</Link>
          <Link to="/products/Accessories">Accessories</Link>
        </navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/all" element={<Products />} />
          <Route path="/products/records" element={<Records />} />
          <Route path="/products/accessories" element={<Accessories />} />
          <Route path="/products/:productId" element={<SingleProduct/>} />

        </Routes>
      </Router>
    </div>
  );
};

export default App;
