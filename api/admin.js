require('dotenv').config();
const express = require("express");

//const jwt = require('jsonwebtoken')
//const { JWT_SECRET } = process.env;
const { requireUser, requireAdmin } = require('./utils')
const adminRouter = express.Router();
const { getAllProducts,
    getProductById,
    createProduct,
    updateProduct } = require('../db/models')


adminRouter.get('/', requireAdmin, (req, res, next) => {
    res.send("A request is being made to /admin");
    next();
})



adminRouter.get('/products', requireAdmin, async (req, res, next) => {
    try {
        const products = await getAllProducts();
        res.send(products);
    } catch (error) {
        next(error)
    }
})

adminRouter.post('/products', requireAdmin, async (req, res, next) => {
    const { name,
        price,
        category,
        quantity,
        img_url,
        condition,
        album_name,
        artist,
        description,
        genre = "" } = req.body;

    const productData = { name, 
        price,
        category,
        quantity,
        img_url,
        condition,
        album_name,
        artist,
        description,
        genre};
    console.log("ProductData: ", productData)
    try {
        const newProduct = await createProduct(productData);
        if (newProduct) {
            res.send(newProduct)
            next();
        } else {
            next({
                name: 'FailedCreateProduct',
                message: "Could not create new product with provided details"
            })
        }
    } catch ({name, message}) {
        next({name, message})
    }
})

adminRouter.patch('/products/:productId', requireAdmin, async (req, res, next) => {
    console.log("AM I WORKIN??")
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

      updateFields.id = Number(productId)

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
 
        console.log("Updatefields: ", updateFields)
        const updatedProduct = await updateProduct(updateFields);

        res.send(updatedProduct)
     } 
      catch ({name, message}) {
        next({name, message})
      }
  })

module.exports = adminRouter;