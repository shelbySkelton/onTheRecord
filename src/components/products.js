import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../axios-services/products';
import { Link, Navigate } from 'react-router-dom'
import { addCartItem, getMyCart, addItemToGuestCart } from '../axios-services/cart';

import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Products = ({ isLoggedIn, user }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [myCart, setMyCart] = useState({})
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    getAllProducts()
      .then(allProducts => {
        setAllProducts(allProducts)
      })
    if (isLoggedIn) {
      getMyCart()
        .then(myCart => {
          setMyCart(myCart)
        })
    }
  }, [])



  function searchMatches(product, searchTerm) {
    let instances = 0;
    let isItThere = false;

    let productName = product.name.toLowerCase().split(" ")
    let productArtist = (product.artist ? product.artist.toLowerCase().split(" ") : null)
    let productAlbumName = (product.album_name ? product.album_name.toLowerCase().split(" ") : null)
    let productGenre = (product.genre ? product.genre.toLowerCase().split(" ") : null)
    let productDesc = product.description.toLowerCase().split(" ")
    isItThere = productName.includes(searchTerm)
      || (productArtist ? productArtist.includes(searchTerm) : null)
      || (productAlbumName ? productAlbumName.includes(searchTerm) : null)
      || productDesc.includes(searchTerm)
      || (productGenre ? productGenre.includes(searchTerm) : null)
    if (isItThere) {
      instances++
    }
    return isItThere;
  }

  const filteredProducts = allProducts.filter(record => searchMatches(record, searchTerm))
  const productsToDisplay = searchTerm.length ? filteredProducts : allProducts;


  // Snackbar alert
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

<<<<<<< HEAD
  return (
    <div>
=======
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


  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Item has been added to your cart"
        action={action}
      />
>>>>>>> ce8352daeaa995a1ed2958c2907d41aa38906994
      <h1 className='font-effect-shadow-multiple'>All Products</h1>

      <input
        id='search-words'
        type='text'
        value={searchTerm}
        placeholder="Search products.."
        onChange={(evt) => setSearchTerm(evt.target.value)}
      >
      </input>
      <button
        onClick={(evt) => setSearchTerm('')}
      >Clear Search</button>

      <div className='products-container'>

        {
          productsToDisplay.map((product, idx) => {

            const handleClick = async (event) => {
              event.preventDefault();
              setOpen(true);
              if (isLoggedIn) {
                const cartItem = {
                  product_id: allProducts.id,
                  priceAtPurchase: allProducts.price,
                  cart_id: myCart.id
                }
                const data = await addCartItem(cartItem);
                return data;
              } else {
                const guestCartItem = {
                  product_id: product.id,
                  product_name: product.name,
                  priceAtPurchase: Number(product.price)
                }
                const sessionCart = await addItemToGuestCart(guestCartItem)
              }
            }

            return (
              <section className="product-card" key={idx}>
                <span className="product-img">
                  <img src={product.img_url} alt="album-cover" width="150" height="150"></img><br></br>
                </span><br></br>
                <Link className="product-link" to={`/products/${product.id}`} >{product.name}</Link><br></br>
                <span>${product.price}</span><br></br>
                <button onClick={handleClick} className='add-to-cart-button'>Add to Cart</button>
              </section>
            )
          })
        }


      </div>
    </div>
  )
}

export default Products;