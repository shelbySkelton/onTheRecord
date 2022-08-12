import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../axios-services/products';

const Products = (props) => {
  const [allProducts, setAllProducts] = useState([])
  useEffect(() => {
    getAllProducts()
    .then(allProducts =>{
      // console.log(allProducts)
      setAllProducts(allProducts)
    })
  })
  return(
    <div className='products'>
      <h1>Products Page</h1>
      <p></p>

    </div>
    
  )
}

export default Products;