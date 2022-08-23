import React, { useState, useEffect } from "react";
import { getAllRecords } from "../axios-services/products";
import { Link, Navigate } from "react-router-dom";
import {
  getMyCart,
  addCartItem,
  addItemToGuestCart,
} from "../axios-services/cart";


import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';




const Records = ({ user, isLoggedIn }) => {
  const [allRecords, setAllRecords] = useState([]);
  const [myCart, setMyCart] = useState({});
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };


  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  
  useEffect(() => {
    getAllRecords().then((allRecords) => {
      setAllRecords(allRecords);
    });
    if (isLoggedIn) {
      getMyCart().then((myCart) => {
        setMyCart(myCart);
      });
    }
  }, []);


  return (
    
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Item has been added to your cart"
        action={action}
      />
      <h1>Records Page</h1>
      <p>
        {isLoggedIn
          ? `You're Logged In as ${user.first_name}`
          : `You are not logged in`}
      </p>
      <div className="products-container">
        {allRecords.map((record, idx) => {
          const handleClick = async (event) => {
            setOpen(true);
            event.preventDefault();
            if (isLoggedIn) {
              const cartItem = {
                product_id: record.id,
                priceAtPurchase: record.price,
                cart_id: myCart.id,
              };
              const data = await addCartItem(cartItem);
              return data;
            } else {
              const guestCartItem = {
                product_id: record.id,
                product_name: record.name,
                priceAtPurchase: Number(record.price),
              };
              const sessionCart = await addItemToGuestCart(guestCartItem);
              return sessionCart
            }
            
          };
          return (
            <section className="product-card" key={idx}>
              <span className="product-img">
                <Link className="product-link" to={`/products/${record.id}`}>
                  <img
                    src={record.img_url}
                    alt="album-cover"
                    width="150"
                    height="150"
                  ></img>{" "}
                </Link>
                <br></br>
              </span>
              <br></br>
              <Link className="product-link" to={`/products/${record.id}`}>
                {record.name}
              </Link>
              <br></br>
              <span>${record.price}</span>
              <br></br>
              <button onClick={handleClick} className="add-to-cart-button">
                Add to Cart
              </button>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Records;
