require('dotenv').config();
const express = require('express');
const { requireUser } = require('./utils')
const cartRouter = express.Router();
const {
  addItemToCart,
  createInitialCart,
  createInitialCartItems,
  getMyCartWithItems,
  deleteItemFromCart
} = require('../db/models/cart')

cartRouter.use((req, res, next) => {
  console.log("A request is being made to /cart");
  next();
})

cartRouter.get('/', requireUser, async (req, res, next) => {
  const userId = req.user.id
  console.log("userId: ", userId)
  try {
    const myCart = await getMyCartWithItems(userId)
    console.log("My cart: ", myCart)
    res.send(myCart)

  } catch ({name, message}) {
    next({name, message})
  }
})

// cartRouter.delete("/", (req, res, next) => {

// })



module.exports = cartRouter