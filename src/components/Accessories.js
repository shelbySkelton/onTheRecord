import React, { useState, useEffect } from 'react';
import { getAllAccessories } from '../axios-services/products';


const Accessories = () => {
    const [allAccessories, setAllAccessories] = useState([])

    useEffect(() => {
        getAllAccessories()
          .then(allAccessories => {
            console.log(allAccessories)
            setAllAccessories(allAccessories)
          })
      }, [])

     return(
        <div>
      <h1>Accessories Page</h1>
      <div className='products-container'>

        {
          allAccessories.map((accessory, idx) => {
            return (
              <section className="product-card" key={idx}>
                <span className="product-img">
                  <img src={accessory.img_url} alt="album-cover" width="150" height="150"></img><br></br>
                </span>
                <span>{accessory.name}</span><br></br>
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