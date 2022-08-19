import React, { useState, useEffect } from 'react';
import { getAllAccessories } from '../axios-services/products';
import { Link } from 'react-router-dom'
import { getMyCart, addCartItem } from "../axios-services/cart";

const Accessories = ({ user, isLoggedIn }) => {
  const [allAccessories, setAllAccessories] = useState([])
  const [myCart, setMyCart] = useState({})
  useEffect(() => {
    getAllAccessories()
      .then(allAccessories => {
        console.log(allAccessories)
        setAllAccessories(allAccessories)
      })
      // if (isLoggedIn){
        // getMyCart().then((myCart) => {
        //   setMyCart(myCart);
        // });
      // }
  }, [])

  return (
    <div>
      <p>{(isLoggedIn) ? `You're Logged In as ${user.first_name}` : `You are not logged in`}</p>
      <h1>Accessories Page</h1>
      <div className='products-container'>

        {
          allAccessories.map((accessory, idx) => {
            const handleClick = async (event) => {
              event.preventDefault();
              const cartItem = {
                product_id: accessory.id,
                priceAtPurchase: accessory.price,
                cart_id: myCart.id,
              };
              const data = await addCartItem(cartItem);
              return data;
            };
            return (
              <section className="product-card" key={idx}>
                <span className="product-img">
                  <img src={accessory.img_url} alt="album-cover" width="150" height="150"></img><br></br>
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