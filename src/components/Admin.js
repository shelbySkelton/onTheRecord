import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../axios-services/admin';
import { Link, Navigate } from 'react-router-dom'
import { testMe } from '../axios-services/users';

// import { Grid, Item } from '@mui/material/Grid';

const Admin = ({ setIsLoggedIn, isLoggedIn, setUser, user, isAdmin, setIsAdmin }) => {
    const [allProducts, setAllProducts] = useState([]);


    useEffect(() => {
        testMe()
            .then(user => {

                console.log("user: ", user)
                setUser(user);
                if (!(user === {})) {
                    setIsLoggedIn(true);
                }
                if (user.isAdmin) {
                    setIsAdmin(true)
                }
            })
    }, [])

    return (
        <div>
            <p>{(isLoggedIn) ? `You're Logged In as ${user.first_name}` : `You are not logged in`}</p>
            <p>{(isAdmin) ? `Welcome to the Admin Dashboard` : `Only Website Administrators should have access to this page`}</p>

            {/* 
    //   <h1>Products Page</h1>
    //   <div className='products-container'>

    //     
    //       {allProducts.map((product, idx) => {
    //         return (
    //           <section className="product-card" key={idx}>
    //             <span className="product-img">
    //               <img src={product.img_url} alt="album-cover" width="150" height="150"></img><br></br>
    //             </span><br></br>
    //             <Link className="product-link" to={`/products/${product.id}`} >{product.name}</Link><br></br>
    //             <span>${product.price}</span><br></br>
    //           </section>
    //         )
    //       })
    //     }


    //   </div> */}
        </div>
    )
}

export default Admin;