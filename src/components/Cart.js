import React, { useState, useEffect } from 'react';
import { getMyCart } from '../axios-services/cart';
import Products from './products';

const Cart = ({isLoggedIn, user}) => {

    const [myCart, setMyCart] = useState({});

    useEffect(() => {
        getMyCart()
        .then(myCart => {
            console.log(myCart)
            setMyCart(myCart)
        })
    }, [])



return (
    <div className='cart-container'>
        My Cart!
    </div>

)

};

export default Cart;