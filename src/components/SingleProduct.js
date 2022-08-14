import React, { useState, useEffect } from 'react';
import { getProductById } from '../axios-services/products';
import { useParams } from 'react-router-dom';



const SingleProduct = () => {


    const { productId } = useParams();

    const [productDetails, setProductDetails] = useState({});


    useEffect(() => {
        getProductById(productId)
            .then(productDetails => {
                console.log(productDetails)
                setProductDetails(productDetails)
            })

    }, [])



    return (
        <div>
            <div className='single-product-container'>

                <div className='product-view'>
                    <h1>{productDetails.name}</h1>
                    <img src={productDetails.img_url} alt="album-cover" width="250" height="250"></img><br></br>
                    <span>{productDetails.quantity} Left In Stock!</span>
                    <button className='add-to-cart-button'>Add to Cart</button>
                </div>
                <div className='product-details'>
                    <span hidden={productDetails.artist ? false : true}
                    ><span className="detail-label">Artist: </span><span>{productDetails.artist}</span></span>
                    <span hidden = {productDetails.album_name ? false : true }
                    ><span className="detail-label">Album: </span><span>{productDetails.album_name}</span></span>
                    <span  hidden = {productDetails.genre ? false : true }
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