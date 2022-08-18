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
  SingleProduct,
  Admin,
  Cart,
  Header,
  EditProduct,
  AddProduct
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
      })
    getAPIStatus();
  }, []);


  return (
    <div className="app-container">
      <Router>
        <Header
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          user={user}
          setUser={setUser}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
        />

        <div className='logo-image'>
          <img className='logo' src="https://i.imgur.com/cZV1cx1.png" alt='logo' />
        </div>
        <navbar className='products-nav'>
          <Link to="/home">Home</Link>
          <Link to="/products/records">Records</Link>
          <Link to="/products/Accessories">Accessories</Link>
          <Link to="/admin" hidden={isAdmin ? false: true}>Admin Dashboard</Link>
        </navbar>
        <Routes>
          <Route path="/login" element={<Login
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            user={user}
            setUser={setUser}
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
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
            isAdmin={isAdmin}
          />} />
          <Route path="/products/all" element={<Products
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            user={user} />}
            isAdmin={isAdmin} />
          <Route path="/products/records" element={<Records
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            user={user} />}
            isAdmin={isAdmin} />
          <Route path="/products/accessories" element={<Accessories
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            user={user} />}
            isAdmin={isAdmin} />
          <Route path="/products/:productId" element={<SingleProduct
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            user={user} />}
            isAdmin={isAdmin} />
          <Route path="/admin" element={<Admin
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
            user={user}
            setUser={setUser}
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin} />}
          />
          <Route path="/admin/edit-product/:productId" element={<EditProduct
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
            user={user}
            setUser={setUser}
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin} />}
          />
          <Route path="/admin/add-product" element={<AddProduct
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
            user={user}
            setUser={setUser}
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin} />}
          />
          <Route path="/cart" element={<Cart
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
            user={user}
            setUser={setUser}
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin} />}
          />

        </Routes>
      </Router>
    </div>
  );
};

export default App;
