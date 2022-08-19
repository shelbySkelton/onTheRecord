import React, { useState, useEffect } from 'react';
import { getAllAccessories } from '../axios-services/products';
import { Link } from 'react-router-dom'

const Accessories = ({ user, isLoggedIn, guestCart, setGuestCart }) => {
  const [allAccessories, setAllAccessories] = useState([])

  useEffect(() => {
    getAllAccessories()
      .then(allAccessories => {
        console.log(allAccessories)
        setAllAccessories(allAccessories)
      })
  }, [])

  return (
    <div>
      <p>{(isLoggedIn) ? `You're Logged In as ${user.first_name}` : `You are not logged in`}</p>
      <h1>Accessories Page</h1>
      <div className='products-container'>

        {
          allAccessories.map((accessory, idx) => {
            return (
              <section className="product-card" key={idx}>
                <span className="product-img">
                  <img src={accessory.img_url} alt="album-cover" width="150" height="150"></img><br></br>
                </span>
                <Link className="product-link" to={`/products/${accessory.id}`} >{accessory.name}</Link><br></br>
                <span>${accessory.price}</span><br></br>
              </section>
            )
          })
        }
      </div>
    </div>
  )
}

export default Accessories;