import React, { useState, useEffect } from "react";
import { getAllRecords } from "../axios-services/products";
import { Link, Navigate } from "react-router-dom";
import { getMyCart, addCartItem, addItemToGuestCart } from "../axios-services/cart";


const Records = ({ user, isLoggedIn }) => {
  const [allRecords, setAllRecords] = useState([]);
  const [myCart, setMyCart] = useState({});
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
  // console.log(myCart.id);
  // console.log(allRecords);


  return (
    <div>
      <h1 className='font-effect-shadow-multiple' >Vinyl Records</h1>
      <div className="products-container">
        {allRecords.map((record, idx) => {
          const handleClick = async (event) => {
            event.preventDefault();
            if (isLoggedIn) {
              const cartItem = {
                product_id: record.id,
                priceAtPurchase: record.price,
                cart_id: myCart.id,
              }
              const data = await addCartItem(cartItem);
              return data;
            } else {
              const guestCartItem = {
                product_id: record.id,
                product_name: record.name,
                priceAtPurchase: Number(record.price)
              }
              const sessionCart = await addItemToGuestCart(guestCartItem);
              console.log("sessionCart: ", sessionCart)
            }

          };
          return (
            <section className="product-card" key={idx}>
              <span className="product-img">
                <img
                  src={record.img_url}
                  alt="album-cover"
                  width="150"
                  height="150"
                ></img>
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
