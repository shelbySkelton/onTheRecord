import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { getAllAccessories } from '../axios-services/products';
import { Link } from 'react-router-dom'
import { getMyCart, addCartItem, addItemToGuestCart } from "../axios-services/cart";

const Accessories = ({ user, isLoggedIn, guestCart, setGuestCart }) => {
  const [allAccessories, setAllAccessories] = useState([])
  const [myCart, setMyCart] = useState({})
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
    getAllAccessories()
      .then(allAccessories => {
        setAllAccessories(allAccessories)
      })
      if (isLoggedIn){
        getMyCart().then((myCart) => {
          setMyCart(myCart);
        });
      }
  }, [])

  return (
    <div>
     <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Item has been added to your cart"
        action={action}
      />
      <h1>Accessories Page</h1>
      <div className='products-container'>

        {
          allAccessories.map((accessory, idx) => {
            const handleClick = async (event) => {
              setOpen(true);
              event.preventDefault();
              if (isLoggedIn) {
                const cartItem = {
                  product_id: accessory.id,
                  priceAtPurchase: accessory.price,
                  cart_id: myCart.id,
                };
                const data = await addCartItem(cartItem);
                return data;
              } else {
                const guestCartItem = {
                  product_id: accessory.id,
                  product_name: accessory.name,
                  priceAtPurchase: Number(accessory.price)
                  }
                const sessionCart = await addItemToGuestCart(guestCartItem);
                return sessionCart
              }
          }
            return (
              <section className="product-card" key={idx}>
                <span className="product-img">
                <Link className="product-link" to={`/products/${accessory.id}`} >
                  <img src={accessory.img_url} alt="album-cover" width="150" height="150"></img></Link><br></br>
                </span>
                <Link className="product-link" to={`/products/${accessory.id}`} >{accessory.name}</Link><br></br>
                <span>${accessory.price}</span><br></br>
                <button onClick={handleClick} className="add-to-cart-button">
                Add to Cart
              </button>
              </section>
            )
          })
        }
      </div>
    </div>
  )
}

export default Accessories;