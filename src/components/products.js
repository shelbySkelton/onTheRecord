import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../axios-services/products';
import { Link, Navigate } from 'react-router-dom'
// import { Grid, Item } from '@mui/material/Grid';

const Products = ({ isLoggedIn, user, guestCart, setGuestCart }) => {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    getAllProducts()
      .then(allProducts => {
        console.log(allProducts)
        setAllProducts(allProducts)
      })
  }, [])

  return (
    <div>
      <p>{(isLoggedIn) ? `You're Logged In as ${user.first_name}` : `You are not logged in`}</p>

      <h1>Products Page</h1>
      <div className='products-container'>

        {
          allProducts.map((product, idx) => {
            return (
              <section className="product-card" key={idx}>
                <span className="product-img">
                  <img src={product.img_url} alt="album-cover" width="150" height="150"></img><br></br>
                </span><br></br>
                <Link className="product-link" to={`/products/${product.id}`} >{product.name}</Link><br></br>
                <span>${product.price}</span><br></br>
              </section>
            )
          })
        }


      </div>
    </div>
  )
}

export default Products;