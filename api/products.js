const express = require('express');
const productsRouter = express.Router();
const { requireUser, requireAdmin } = require('./utils.js')
const { getAllProducts,
        getProductsByCategory, 
        getProductById, 
        updateProduct } = require('../db/models')


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

// THIS WILL REQUIRE A 'requireAdmin' middleware!***
productsRouter.patch('/:productId', requireAdmin, async (req, res, next) => {
  const { productId } = req.params;
  const { name, 
          price, 
          category, 
          quantity, 
          img_url, 
          condition, 
          album_name, 
          artist, 
          description, 
          genre } = req.body;

    const updateFields = {};

    if (name) {
      updateFields.name = name;
    }
    if (price) {
      updateFields.price = price;
    }
    if (category) {
      updateFields.category= category;
    }
    if (quantity) {
      updateFields.quantity= quantity;
    }
    if (img_url) {
      updateFields.img_url = img_url;
    }
    if (condition) {
      updateFields.condition = condition;
    }
    if (album_name) {
      updateFields.album_name = album_name
    }
    if (artist) {
      updateFields.artist = artist
    }
    if (description) {
      updateFields.description = description
    }
    if (genre) {
      updateFields.genre = genre
    }

    try {
      const updatedProduct = await updateProduct(updateFields);
      res.send(updatedProduct)
    } catch ({name, message}) {
      next({name, message})
    }
})



module.exports = productsRouter;