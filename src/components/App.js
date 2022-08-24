import React, { useState, useEffect, createElement } from "react";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from "../axios-services";
import { testMe } from "../axios-services/users";
import { getMyCart, createGuestCart } from "../axios-services/cart";

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
  ReviewOrder,
  Orders
} from './index'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import styles from '../style/App.css';


import "../style/App.css";

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState({});
  const [guestCart, setGuestCart] = useState([]);
  const [address, setAddress] = useState({});
  const [myCart, setMyCart] = useState({})

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data

    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    if (localStorage.token){

      testMe().then((user) => {
        setIsLoggedIn(true);
        setUser(user);
        setIsAdmin(user.isAdmin)
      });

    } else {
      sessionStorage.setItem("guestCart", JSON.stringify(guestCart));
      // createGuestCart().then((myCart) => {
      //   setMyCart(myCart)
      // })
    }
    if (isLoggedIn){
      getMyCart().then((myCart) => {
        setMyCart(myCart)
      })
    }
    getAPIStatus();
  }, [isLoggedIn, guestCart]);

  const [hoverCount, setHoverCount] = useState(0);
  console.log(hoverCount)
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
          myCart={myCart}
          setMyCart={setMyCart}
        />

        {hoverCount === 3 ? (
          <div className="logo-image">
            <img
              className="logo-secret"
              onClick={() => setHoverCount(hoverCount + 1)}
              src="https://i.imgur.com/cZV1cx1.png"
              alt="logo"
            />
          </div>
        ) : (
          <div className="logo-image">
            <img
              className="logo"
              onClick={() => setHoverCount(hoverCount + 1)}
              src="https://i.imgur.com/cZV1cx1.png"
              alt="logo"
            />
          </div>
        )}
        <div className="products-nav">
          <Link to="/home">Home</Link>

          <Link to="/products/records">Records</Link>
          <Link to="/products/Accessories">Accessories</Link>
          {
            isAdmin ? <Link to="/admin" hidden={isAdmin ? false : true}>
            Admin Dashboard
          </Link> : null
          }
          {/* <Link to="/admin" hidden={isAdmin ? false : true}>
            Admin Dashboard
          </Link> */}
        </div>
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
          {/* <Route path="/home" element={<Home
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setUser={setUser}
            user={user}
            isAdmin={isAdmin}
            guestCart={guestCart}
            setGuestCart={setGuestCart}
          />} /> */}
          <Route path="/home" element={<Products
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setUser={setUser}
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
          <Route
            path="/register"
            element={
              <Register
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                guestCart={guestCart}
                setGuestCart={setGuestCart}
              />
            }
          />
          <Route
            path="/"
            element={
              <Home
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                setUser={setUser}
                user={user}
                isAdmin={isAdmin}
                guestCart={guestCart}
                setGuestCart={setGuestCart}
              />
            }
          />

          <Route path="/admin/orders/:userId" element={<Orders
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
          <Route
            path="/products/records"
            element={
              <Records
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                isAdmin={isAdmin}
                guestCart={guestCart}
                setGuestCart={setGuestCart}
              />
            }
          />
          <Route
            path="/products/accessories"
            element={
              <Accessories
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                isAdmin={isAdmin}
                guestCart={guestCart}
                setGuestCart={setGuestCart}
              />
            }
          />
          <Route
            path="/products/:productId"
            element={
              <SingleProduct
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                isAdmin={isAdmin}
                guestCart={guestCart}
                setGuestCart={setGuestCart}
              />
            }
          />
          <Route
            path="/admin"
            element={
              <Admin
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
                user={user}
                setUser={setUser}
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
              />
            }
          />
          <Route
            path="/admin/edit-product/:productId"
            element={
              <EditProduct
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
                user={user}
                setUser={setUser}
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
              />
            }
          />
          <Route
            path="/admin/edit-user/:userId"
            element={
              <EditUser
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
                user={user}
                setUser={setUser}
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
              />
            }
          />
          <Route
            path="/my-account"
            element={
              <UserAccount
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
                user={user}
                setUser={setUser}
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
                guestCart={guestCart}
                setGuestCart={setGuestCart}
              />
            }
          />
          <Route
            path="/admin/add-product"
            element={
              <AddProduct
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
                user={user}
                setUser={setUser}
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
                user={user}
                setUser={setUser}
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
              />
            }
          />

          <Route
            path="/cart/checkout"
            element={
              <Checkout
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
                user={user}
                setUser={setUser}
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
                guestCart={guestCart}
                setGuestCart={setGuestCart}
                address={address}
                setAddress={setAddress}
              />
            }
          />
          <Route
            path="/cart/checkout/review-order"
            element={
              <ReviewOrder
                setIsLoggedIn={setIsLoggedIn}
                isLoggedIn={isLoggedIn}
                user={user}
                setUser={setUser}
                isAdmin={isAdmin}
                setIsAdmin={setIsAdmin}
                guestCart={guestCart}
                setGuestCart={setGuestCart}
                address={address}
                setAddress={setAddress}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
