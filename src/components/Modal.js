import React, { useState } from 'react';
import { createNewReview, getReviewsProductId } from '../axios-services/reviews';



const Modal = (props) => {


    const { isLoggedIn, setIsModal, productDetails, createReview, setCreateReview, rating, setRating, user, allReviewsProduct, setAllReviewsProduct } = props;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const reviews = {
            user_id: user.id,
            product_id: productDetails.id,
            rating: rating,
            content: createReview
        }

        const data = await createNewReview(reviews);

        setIsModal(false);
        getReviewsProductId(productDetails.id)
            .then(allReviewsProduct => {

                setAllReviewsProduct(allReviewsProduct)
            })
    }


    return (
        <div className='modal-container'>
            <div className='modal'>

                <div>
                    <h3>We would love to hear your feedback on {productDetails.name}!</h3>
                </div>
                <form>
                    Please select a rating:
                    <select onChange={(event) => setRating(event.target.value)}>
                        <option value="5">5</option>
                        <option value="4">4</option>
                        <option value="3">3</option>
                        <option value="2">2</option>
                        <option value="1">1</option>
                    </select> /5
                    <textarea className='review-input'
                        input="text" rows="10" cols="50"
                        onChange={(event) => setCreateReview(event.target.value)}
                        placeholder={!isLoggedIn ?
                            'Please log in to write a review' : 'Tell us what you thought!'
                        }

                    >

                    </textarea>
                    <button onClick={() => setIsModal(false)}>Exit</button>
                    <button
                        disabled={!isLoggedIn ?
                                true : false
                        }
                        onClick={(event) =>
                            handleSubmit(event)
                        }
                    >Submit</button>
                </form>
            </div>


        </div>
    )
}

export default Modal;