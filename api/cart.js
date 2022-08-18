require('dotenv').config();
const express = require('express');
const { requireUser } = require('./utils')
const cartRouter = express.Router();
const {
  addItemToCart,
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

cartRouter.post('/', async (req, res, next) => {
  // const userId = req.user.id;
  const { product_id, priceAtPurchase, cart_id } = req.body;
  try {
    const newItem = await addItemToCart({ product_id, priceAtPurchase, cart_id })
    res.send(newItem)
  } catch (error) {
    next(error)
  }
})

cartRouter.delete('/', async (req, res, next) => {
  const { cartedItemId } = req.body
  console.log("This is request body: ", req.body)

  // console.log(req.user)
  console.log("this is carted item id in the api: ", cartedItemId)
  try {
    console.log("test")
    const deletedItem = 
    await deleteItemFromCart(cartedItemId);
    res.send(deletedItem)
  } catch (error) {
    next(error)
  }
})



module.exports = cartRouter