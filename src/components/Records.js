import React, { useState, useEffect } from "react";
import { getAllRecords } from "../axios-services/products";
import { Link, Navigate } from "react-router-dom";
import { getMyCart, addCartItem, addItemToGuestCart } from "../axios-services/cart";


const Records = ({ user, isLoggedIn }) => {
  const [allRecords, setAllRecords] = useState([]);
  const [myCart, setMyCart] = useState({});
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    getAllRecords().then((allRecords) => {
      setAllRecords(allRecords);
    });
    if (isLoggedIn){
      getMyCart().then((myCart) => {
        setMyCart(myCart);
      });
    }
  }, []);
  // console.log(myCart.id);
  // console.log(allRecords);

  function searchMatches(record, searchTerm) {
    let instances = 0;
    let isItThere = false;

      let recordName = record.name.toLowerCase().split(" ")
      let recordArtist = record.artist.toLowerCase().split(" ")
      let recordAlbumName = record.album_name.toLowerCase().split(" ")
      let recordGenre = record.genre.toLowerCase().split(" ")
      let recordDesc = record.description.toLowerCase().split(" ")
      isItThere = recordName.includes(searchTerm)
                  || recordArtist.includes(searchTerm) 
                  || recordAlbumName.includes(searchTerm) 
                  || recordDesc.includes(searchTerm) 
                  || recordGenre.includes(searchTerm)
      if (isItThere) {
        instances ++
      }
   return isItThere;
  }


  const filteredRecords = allRecords.filter(record => searchMatches(record, searchTerm))
  const recordsToDisplay = searchTerm.length ? filteredRecords : allRecords;

  return (
    <div>
      <h1>Records Page</h1>
      <p>
        {isLoggedIn
          ? `You're Logged In as ${user.first_name}`
          : `You are not logged in`}
      </p>
        <input
          id='search-words'
          type='text'
          value={searchTerm}
          placeholder="Search records.."
          onChange={(evt)=> setSearchTerm(evt.target.value)}
        >
        </input>
        <button
          onClick={(evt) => setSearchTerm('')}
        >Clear Search</button>


      <div className="products-container">
        {recordsToDisplay.map((record, idx) => {
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
