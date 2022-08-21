import React, { useState, useEffect } from 'react';
import { getProductById } from '../axios-services/products';
import { useParams } from 'react-router-dom';
import { getMyCart, addCartItem, addItemToGuestCart, getGuestCart } from '../axios-services/cart';



const SingleProduct = ({ isLoggedIn, user,  guestCart, setGuestCart }) => {

    const { productId } = useParams();

    const [productDetails, setProductDetails] = useState({});
    const [myCart, setMyCart] = useState({})

    useEffect(() => {
        getProductById(productId)
            .then(productDetails => {
                console.log(productDetails)
                setProductDetails(productDetails)
            })
        getMyCart()
            .then(myCart => {
                setMyCart(myCart)
            })
    }, [])

    const handleClick = async (event) => {
        event.preventDefault();
        if (isLoggedIn){
            const cartItem = {
                product_id: productId,
                priceAtPurchase: Number(productDetails.price),
                cart_id: myCart.id
                }
            const data = await addCartItem(cartItem);
            return data;
        } else {
            const guestCartItem = {
                product_id: productId,
                product_name: productDetails.name,
                priceAtPurchase: Number(productDetails.price)
                }
            const sessionCart = await addItemToGuestCart(guestCartItem);
            console.log("sessionCart: ", sessionCart)
            guestCart.push(guestCartItem)
        }
       
    }

    return (
        <div>
            <p>{(isLoggedIn) ? `You're Logged In as ${user.first_name}` : `You are not logged in`}</p>
            <div className='single-product-container'>

                <div className='product-view'>
                    <h1>{productDetails.name}</h1>
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
                <span>Reviews Placeholder</span>

            </div>
        </div>
    )

}

export default SingleProduct;