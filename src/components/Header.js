import React, { useState, useEffect } from "react";
import { testMe } from "../axios-services/users";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { getMyCart } from "../axios-services/cart";

const Header = (props) => {
  const { isLoggedIn, setIsLoggedIn, user, setUser, isAdmin, setIsAdmin } =
    props;
  // const [user, setUser] = useState({})
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  // const [myCart, setMyCart] = useState({})
  useEffect(() => {
    testMe().then((user) => {
      setUser(user);
      if (user) {
        setIsLoggedIn(true);
      }
    });
    // if (isLoggedIn) getMyCart().then(myCart => {
    //   setMyCart(myCart)
    // })

  }, []);

  return (
    <div className="header-container">
      <navbar className="header-nav">
        <Link
          to="/login"
          hidden={isLoggedIn ? false : true}
          onClick={(evt) => {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            setUser({});
          }}
        >
          {" "}
          Log Out
        </Link>

        <Link to="/login" hidden={isLoggedIn ? true : false}>
          Log in
        </Link>
        <Link to="/register" hidden={isLoggedIn ? true : false}>
          Register
        </Link>
        <Link hidden={isLoggedIn ? false : true} to="/my-account">
          {user.first_name}'s Account
        </Link>
        <Link to="/cart">My Cart</Link>
      </navbar>
    </div>
  );
};

export default Header;
