import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { getProductById } from '../axios-services/products';
import { useParams } from 'react-router-dom';
import { getMyCart, addCartItem, addItemToGuestCart, getGuestCart } from '../axios-services/cart';
import { getReviewsUserId, getReviewsProductId, createNewReview } from "../axios-services/reviews";

import Modal from './Modal';

const SingleProduct = ({ isLoggedIn, user, guestCart, setGuestCart }) => {

    const { productId } = useParams();
    const [productDetails, setProductDetails] = useState({});
    const [myCart, setMyCart] = useState({})
    const [isModal, setIsModal] = useState(false)
    const [allReviewsUser, setAllReviewsUser] = useState([]);
    const [createReview, setCreateReview] = useState('');
    const [rating, setRating] = useState(5);
    const [allReviewsProduct, setAllReviewsProduct] = useState([]);


    useEffect(() => {
        getProductById(productId)
            .then(productDetails => {
                setProductDetails(productDetails)
            })
        getMyCart()
            .then(myCart => {
                setMyCart(myCart)
            })
        getReviewsProductId(productId)
            .then(allReviewsProduct => {
                setAllReviewsProduct(allReviewsProduct)
            })
    }, [])

    const handleClick = async (event) => {
        event.preventDefault();
        if (isLoggedIn) {
            const cartItem = {
                product_id: productId,
                priceAtPurchase: productDetails.price,
                cart_id: myCart.id
            }
            const data = await addCartItem(cartItem);
            return data;
        } else {
            const guestCartItem = {
                product_id: productId,
                product_name: productDetails.name,
                priceAtPurchase: productDetails.price
            }
            const sessionCart = await addItemToGuestCart(guestCartItem);
            guestCart.push(guestCartItem)
        }

    }

    return (
        <div>
            <div className='single-product-container'>

                <div className='product-view'>
                    <h1 id='header-singleProduct'>{productDetails.name}</h1>
                    <img src={productDetails.img_url} alt="album-cover" width="250" height="250"></img><br></br>
                    <span>{productDetails.quantity} Left In Stock!</span>
                    <button onClick={handleClick} className='add-to-cart-button'>Add to Cart</button>
                </div>
                <div className='product-details'>
                    <span hidden={productDetails.artist ? false : true}
                    ><span className="detail-label">Artist: </span><span>{productDetails.artist}</span></span>
                    <span hidden={productDetails.album_name ? false : true}
                    ><span className="detail-label">Album: </span><span>{productDetails.album_name}</span></span>
                    <span hidden={productDetails.genre ? false : true}
                    ><span className="detail-label">Genre: </span><span>{productDetails.genre}</span></span>
                    <span>{productDetails.description}</span>
                    <span>${productDetails.price}</span>

                </div>
            </div>
            <div className='product-reviews'>
        
                <h3>Reviews</h3>
        
                {allReviewsProduct.map((review, idx) => {
                  return(
                    <span key={idx}>
                       <p> {review.rating}/5 </p> <br></br>
                       <p> {review.content} </p> <br></br>
                       <hr></hr>
                    </span> 
                  )
                
                })}
            </div>
            <div>
                <button onClick={() => setIsModal(true)}>Add a Review</button>
            </div>
            <div>
                {
                    isModal && <Modal 
                    setIsModal={setIsModal} 
                    productDetails={productDetails} 
                    createReview={createReview}
                    setCreateReview={setCreateReview}
                    rating={rating}
                    setRating={setRating}
                    user={user}
                    allReviewsProduct={allReviewsProduct}
                    setAllReviewsProduct={setAllReviewsProduct}
                    />
                }
            </div>
        </div>
    )

}

export default SingleProduct;