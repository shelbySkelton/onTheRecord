const express = require('express');
const reviewsRouter = express.Router();
const requireUser = require('./utils');
const { createReview, getReviewByUser, getReviewByProduct, updateReview, deleteReview} = require('../db/models/reviews');

reviewsRouter.use((req, res, next) => {
    console.log("A request is being made to /reviews");
    next();
  });

  reviewsRouter.get('/:userId', async (req, res, next) => {
    const { userId } = req.params
    try {
      const reviews = await getReviewByUser(userId);
      res.send(reviews)
      next();
    } catch (error) {
      next(error)
    }
  });

  reviewsRouter.get('/:productId', async (req, res, next) => {
    const { productId } = req.params
    try {
      const reviews = await getReviewByProduct(productId);
      res.send(reviews)
      next();
    } catch (error) {
      next(error)
    }
  });

  reviewsRouter.post('/', requireUser, async (req, res, next) => {
    const { rating, content } = req.body
    try {
      const userId = req.user.id
      const productId = req.product.id
      const reviewData = { userId, productId, rating, content };
      const newCreatedReview = await createReview(reviewData);
      const userOrderedProduct = await getMyPreviousOrdersWithItems(userId)
      if(userOrderedProduct) {
        res.send(newCreatedReview)
        next();
      } else {
        next({
          name: 'FailedCreateReview',
          message: "Could not create new review"
      })
      }
    } catch ({ name, message }) {
      next({ name, message });
  }
  });

  reviewsRouter.patch('/', requireUser, async (req, res, next) => {
    const { rating, content } = req.body
    try {
      const userId = req.user.id
      const productId = req.product.id
      const reviewData = { userId, productId, rating, content };
      const newUpdatedReview = await updateReview(reviewData);
      const userOrderedProduct = await getMyPreviousOrdersWithItems(userId)
      if(userOrderedProduct) {
        res.send(newUpdatedReview)
        next();
      } else {
        next({
          name: 'FailedUpdateReview',
          message: "Could not update review"
      })
      }
    } catch ({ name, message }) {
      next({ name, message });
  }
  })

// reviewsRouter.delete('/', async (req, res, next) => {
//     try {
//        // use deleteReview function here 
//     } catch (error) {
//       next(error)  
//     }
// })


module.exports = reviewsRouter;