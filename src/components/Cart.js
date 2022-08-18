import React, { useState, useEffect } from 'react';
import { getMyCart } from '../axios-services/cart';
import Products from './products';

const Cart = ({isLoggedIn, user}) => {

    const [myCart, setMyCart] = useState({});
    const [myItems, setMyItems] = useState([])

    useEffect(() => {
        getMyCart()
        .then(myCart => {
            console.log(myCart)
            setMyCart(myCart)
            console.log("mycart.items: ", myCart.items)
            setMyItems(myCart.items)
            //right in herrr map through our myItems array
            //have a counter that += 1 for each matching productId in the objects
        })
    }, [])


return (
    <div className='cart-container'>
        My Cart!
    </div>

)

};

export default Cart;