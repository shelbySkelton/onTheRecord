const express = require('express');
const productsRouter = express.Router();
const { requireUser } = require('./utils.js')
const { getAllProducts,
        getProductsByCategory, 
        getProductById, 
         } = require('../db/models')


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

productsRouter.get('/accessories', async (req, res, next) => {
  try {
    const accessories = await getProductsByCategory('Accessory')
    res.send(accessories);
    next();
  } catch (error) {
    next(error);
  }
})

productsRouter.get('/:productId', async (req, res, next) => {
  const { productId } = req.params;

  try {
    const product = await getProductById(productId)
    res.send(product)
  } catch (error) {
    next(error);
  }
})





module.exports = productsRouter;