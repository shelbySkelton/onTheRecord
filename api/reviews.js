require("dotenv").config();
const express = require('express');
const reviewsRouter = express.Router();
const { requireUser } = require('./utils');
const { createReview, getReviewsByUser, getReviewsByProduct, updateReview, deleteReview} = require('../db/models/reviews');
const { getMyPreviousOrdersWithItems } = require('../db/models/cart')
reviewsRouter.use((req, res, next) => {
    console.log("A request is being made to /reviews");
    next();
  });

  reviewsRouter.get('/:userId', async (req, res, next) => {
    const { userId } = req.params
    try {
      const reviews = await getReviewsByUser(userId);
      res.send(reviews)
      next();
    } catch (error) {
      next(error)
    }
  });

  reviewsRouter.get('/products/:productId', async (req, res, next) => {
    const { productId } = req.params
    try {
      const reviews = await getReviewsByProduct(productId);
      res.send(reviews);
      next();
    } catch (error) {
      next(error)
    }
  });

  reviewsRouter.post('/', async (req, res, next) => {
    const { user_id, product_id, rating, content } = req.body
    // const user_id = req.user.id
    try {
      const reviewData = { user_id, product_id, rating, content };
      const newCreatedReview = await createReview(reviewData);
      // const userOrderedProduct = await getMyPreviousOrdersWithItems(user_id)
      // if(userOrderedProduct) {
        res.send(newCreatedReview)
        next();
      } 
      // else {
      //   next({
      //     name: 'FailedCreateReview',
      //     message: "Could not create new review"
      // })
      // }
      catch ({ name, message }) {
      next({ name, message });
  }
  });

//   reviewsRouter.patch('/', requireUser, async (req, res, next) => {
//     const { rating, content } = req.body
//     const updateFields = {};
//     updateFields.id = Number(user_id, product_id);
//     if(rating) {
//       updateFields.rating = rating;
//     }
//     if(content) {
//       updateFields.content = content;
//     }
//     try {
//       // const user_id = req.user.id
//       // const reviewData = { rating, content };
//       console.log("This is update fields: ", updateFields)
//       const newUpdatedReview = await updateReview(updateFields);
//       console.log("This is new updated review: ", newUpdatedReview)
//       // const userOrderedProduct = await getMyPreviousOrdersWithItems(user_id)
//       // console.log("This is userOrderedProduct: ", userOrderedProduct)
//       // if(userOrderedProduct) {
//         res.send({newUpdatedReview})
//         next();
//       // } else {
//       //   next({
//       //     name: 'FailedUpdateReview',
//       //     message: "Could not update review"
//       // })
//       // }
//     } catch ({ name, message }) {
//       next({ name, message });
//   }
//   })

// reviewsRouter.delete('/', requireUser, async (req, res, next) => {
//   const { rating, content } = req.body;
//   console.log("This is request body: ", req.body);
//   try {
//     data = { rating, content}
//     const deletedReview = await deleteReview(data);
//     res.send(deletedReview);
//   } catch (error) {
//     next(error);
//   }
// });



module.exports = reviewsRouter;