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
  AddProduct,
  EditUser,
  UserAccount,
  Checkout,
  ReviewOrder
} from './index'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import styles from '../style/App.css';


// const link = ({ className, children }) => (
//   <a className={className}>
//     {children}
//   </a>
// );

// const StyledLink = styled(link)`
//   color: palevioletred;
//   font-weight: bold;
// `;

// render(
//   <div>
//     <Link>Unstyled, boring Link</Link>
//     <br />
//     <StyledLink>Styled, exciting Link</StyledLink>
//   </div>
// );


const App = () => {
  const [APIHealth, setAPIHealth] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({})
  const [guestCart, setGuestCart] = useState([])

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
        setIsLoggedIn(true);
        setUser(user);
        if (user.isAdmin) {
          setIsAdmin(true);
        }
        sessionStorage.setItem('guestCart', JSON.stringify(guestCart));
      })
    getAPIStatus();
  }, [guestCart]);


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
        <navbar className= 'products-nav'>
          <Link to="/home">Home</Link>
          <Link to="/products/records">Records</Link>
          <Link to="/products/Accessories">Accessories</Link>
          <Link to='/admin' hidden={isAdmin ? false : true}>Admin Dashboard</Link>

        </navbar>
        <Routes>
          <Route path="/login" element={<Login
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            user={user}
            setUser={setUser}
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
            guestCart={guestCart}
            setGuestCart={setGuestCart}
          />} />
          <Route path="/register" element={<Register
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            user={user} 
            guestCart={guestCart}
            setGuestCart={setGuestCart}
          />} />
          <Route path="/home" element={<Home
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setUser={setUser}
            user={user}
            isAdmin={isAdmin}
            guestCart={guestCart}
            setGuestCart={setGuestCart}
          />} />
          <Route path="/products/all" element={<Products
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            user={user}
            isAdmin={isAdmin}
            guestCart={guestCart}
            setGuestCart={setGuestCart}
            />}/>
          <Route path="/products/records" element={<Records
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            user={user} 
            isAdmin={isAdmin}
            guestCart={guestCart}
            setGuestCart={setGuestCart}
          />} />
          <Route path="/products/accessories" element={<Accessories
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            user={user} 
            isAdmin={isAdmin}
            guestCart={guestCart}
            setGuestCart={setGuestCart}
            />} />
          <Route path="/products/:productId" element={<SingleProduct
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            user={user} 
            isAdmin={isAdmin}
            guestCart={guestCart}
            setGuestCart={setGuestCart}
            />} />
          <Route path="/admin" element={<Admin
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
            user={user}
            setUser={setUser}
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
            />}
          />
          <Route path="/admin/edit-product/:productId" element={<EditProduct
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
            user={user}
            setUser={setUser}
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
            />}
          />
          <Route path="/admin/edit-user/:userId" element={<EditUser
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
            user={user}
            setUser={setUser}
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
            />}
          />
          <Route path="/my-account" element={<UserAccount
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
            user={user}
            setUser={setUser}
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
            guestCart={guestCart}
            setGuestCart={setGuestCart}
            />}
          />
          <Route path="/admin/add-product" element={<AddProduct
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
            user={user}
            setUser={setUser}
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin}
            />}
          />
          <Route path="/cart" element={<Cart
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
            user={user}
            setUser={setUser}
            isAdmin={isAdmin}
            setIsAdmin={setIsAdmin} />} />
          
          <Route path="/cart/checkout" element={<Checkout 
          setIsLoggedIn={setIsLoggedIn}
          isLoggedIn={isLoggedIn}
          user={user}
          setUser={setUser}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
          guestCart={guestCart}
          setGuestCart={setGuestCart}
            />}
          />
          <Route path="/cart/checkout/review-order" element={<ReviewOrder 
          setIsLoggedIn={setIsLoggedIn}
          isLoggedIn={isLoggedIn}
          user={user}
          setUser={setUser}
          isAdmin={isAdmin}
          setIsAdmin={setIsAdmin}
          guestCart={guestCart}
          setGuestCart={setGuestCart}
            />}
          />

        </Routes>
      </Router>
    </div>
  );
};

export default App;
