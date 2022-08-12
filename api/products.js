const express = require('express');
const productsRouter = express.Router();
const { getAllProducts } = require('../db/models')

productsRouter.use((req, res, next) => {
  console.log("A request is being made to /products");
  next();
})

productsRouter.get('/', async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products)
    console.log(products)
    next();
  } catch (error) {
    next(error)
  }
})

module.exports = productsRouter;