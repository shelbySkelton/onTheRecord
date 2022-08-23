const express = require('express');
const productsRouter = express.Router();
const { requireUser } = require('./utils.js')
const { getAllActiveProducts,
        getActiveProductsByCategory, 
        getProductById, 
         } = require('../db/models')


productsRouter.use((req, res, next) => {
  console.log("A request is being made to /products");
  next();
})

productsRouter.get('/', async (req, res, next) => {
  try {
    const products = await getAllActiveProducts();
    res.send(products)

  } catch (error) {
    next(error)
  }
})

productsRouter.get('/records', async (req, res, next) => {
  try {
    const records = await getActiveProductsByCategory('Record')
    res.send(records)

  } catch (error) {
    next(error)
  }
})

productsRouter.get('/accessories', async (req, res, next) => {
  try {
    const accessories = await getActiveProductsByCategory('Accessory')
    res.send(accessories);

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