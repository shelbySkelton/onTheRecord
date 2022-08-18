const express = require('express');
const reviewsRouter = express.Router();
const requireUser = require('./utils');
const { createReview, getReviewByUser, getReviewByProduct, updateReview, deleteReview} = require('../db/models/reviews');

reviewsRouter.use((req, res, next) => {
    console.log("A request is being made to /reviews");
    next();
  });

  reviewsRouter.get('/:userId', async (req, res, next) => {
    try {
      const reviews = await getReviewByUser(user_id);
      res.send(reviews)
      next();
    } catch (error) {
      next(error)
    }
  });

  reviewsRouter.get('/:productId', async (req, res, next) => {
    try {
      const reviews = await getReviewByProduct(product_id);
      res.send(reviews)
      next();
    } catch (error) {
      next(error)
    }
  });

  // reviewsRouter.post('/', requireUser, async (req, res, next) => {
  //   try {
  //       // use createReview function here
  //       // requireUser
  //       // getMyOrdersWithItems
  //   } catch (error) {
  //     next(error)  
  //   }
  // });

  // reviewsRouter.post('/:productId', async (req, res, next) => {
  //   try {
  //       // use createReview function here
  //   } catch (error) {
  //     next(error)  
  //   }
  // });
  // do I need this route or just one route for both userId and productId??

  // reviewsRouter.patch('/', async (req, res, next) => {
  //   try {
  //       // use updateReview function here
  //   } catch (error) {
  //     next(error)
  //   }
  // })

// reviewsRouter.delete('/', async (req, res, next) => {
//     try {
//        // use deleteReview function here 
//     } catch (error) {
//       next(error)  
//     }
// })










module.exports = reviewsRouter;