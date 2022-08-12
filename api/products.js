const express = require('express');
const productsRouter = express.Router();
const { getAllProducts, getProductsByCategory } = require('../db/models')

productsRouter.use((req, res, next) => {
  console.log("A request is being made to /products");
  next();
})

productsRouter.get('/', async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products)
    next();
  } catch (error) {
    next(error)
  }
})

productsRouter.get('/records', async (req, res, next) => {
  try {
    const records = await getProductsByCategory('Record')
    res.send(records)
    next();
  } catch (error) {
    next(error)
  }
})

module.exports = productsRouter;