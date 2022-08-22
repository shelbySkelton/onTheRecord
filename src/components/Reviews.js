// import { Reviews } from "@mui/icons-material";
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { getReviewsUserId, getReviewsProductId, createNewReview } from "../axios-services/reviews";



// const Review = () => {
//     const { productId } = useParams();
//     const [allReviewsUser, setAllReviewsUser] = useState('');
//     const [createReview, setCreateReview] = useState('');
//     const [allReviewsProduct, setAllReviewsProduct] = useState('');

//     useEffect(() => {
//         getReviewsUserId()
//         .then(allReviewsUser => {
//             console.log(allReviewsUser)
//             setAllReviewsUser(allReviewsUser)
//           })

//           getReviewsProductId(productId)
//           console.log("product id: ", productId)
//           .then(allReviewsProduct => {
//               console.log(allReviewsProduct)
//               setAllReviewsProduct(allReviewsProduct)
//             })
//     }, [])

    
//     return(
//         <div>
//             <h1>Hello!</h1>
//         </div>
//     );
// }


// // Display add review as a button
// // create a handle submit function
// // display the option to delete review for users
// // create an onSubmit Delete function
// // allow user to view reviews by products they want to purchase but. not allowed to edit that review
// // need to figure out a way to add isAdmin to the backend or can it be applied in the front end? Not so sure about the front end
// // need to use modals to be able to create a review (watch modal and edit post video)
// // does review need a useEffect? Yes, to display the reviews of products on the page
// // useState


// export default Reviews;



// const style = {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 400,
//     bgcolor: 'background.paper',
//     border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
// };