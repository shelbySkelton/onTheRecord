const express = require('express');
const cartRouter = express.Router();
const {
  addItemToCart,
  createInitialCart,
  createInitialCartItems,
  getMyCartWithItems
} = require('../db/models/cart')

cartRouter.use((req, res, next) => {
  console.log("A request is being made to /cart");
  next();
})

cartRouter.get("/", (req, res, next) => {
  // For getting and displaying a cart

})

cartRouter.delete("/", (req, res, next) => {

})

module.exports = cartRouter