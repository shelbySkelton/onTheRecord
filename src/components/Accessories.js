import React, { useState, useEffect } from 'react';
import { getAllAccessories } from '../axios-services/products';
import { Link } from 'react-router-dom'
import { getMyCart, addCartItem, addItemToGuestCart } from "../axios-services/cart";

const Accessories = ({ user, isLoggedIn, guestCart, setGuestCart }) => {
  const [allAccessories, setAllAccessories] = useState([])
  const [myCart, setMyCart] = useState({})
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    getAllAccessories()
      .then(allAccessories => {
        console.log(allAccessories)
        setAllAccessories(allAccessories)
      })
    if (isLoggedIn) {
      getMyCart().then((myCart) => {
        setMyCart(myCart);
      });
    }
  }, [])

  function searchMatches(accessory, searchTerm) {
    let instances = 0;
    let isItThere = false;

    let accessoryName = accessory.name.toLowerCase().split(" ")
    let accessoryDesc = accessory.description.toLowerCase().split(" ")
    isItThere = accessoryName.includes(searchTerm)
      || accessoryDesc.includes(searchTerm)
    if (isItThere) {
      instances++
    }
    return isItThere;
  }


  const filteredAccessories = allAccessories.filter(accessory => searchMatches(accessory, searchTerm))
  const accessoriesToDisplay = searchTerm.length ? filteredAccessories : allAccessories;





  return (
    <div>
      <p>{(isLoggedIn) ? `You're Logged In as ${user.first_name}` : `You are not logged in`}</p>
      <h1>Accessories Page</h1>
      <input
          id='search-words'
          type='text'
          value={searchTerm}
          placeholder="Search accessories.."
          onChange={(evt) => setSearchTerm(evt.target.value)}
        >
        </input>
        <button
          onClick={(evt) => setSearchTerm('')}
        >Clear Search</button>
      <div className='products-container'>
        {
          accessoriesToDisplay.map((accessory, idx) => {
            const handleClick = async (event) => {
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
                  priceAtPurchase: accessory.price
                }
                const sessionCart = await addItemToGuestCart(guestCartItem);
                console.log("sessionCart: ", sessionCart)
              }
            }
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