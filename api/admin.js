require('dotenv').config();
const express = require("express");

//const jwt = require('jsonwebtoken')
//const { JWT_SECRET } = process.env;
const { requireUser, requireAdmin } = require('./utils')
const adminRouter = express.Router();
const { getAllProducts,
    getProductById,
    createProduct,
    deactivateProduct,
    getAllUsers,
    getUserById,
    updateProduct,
    getMyPreviousOrdersWithItems,
    updateCartStatus,
    updateUser
  } = require('../db/models')


adminRouter.get('/', requireAdmin, (req, res, next) => {
    res.send("A request is being made to /admin");
    next();
})


adminRouter.get('/users/:userId', async (req, res, next) => {
  const {userId} = req.params;
  try {
    const user = await getUserById(userId)
    res.send(user);
  } catch (error) {
    next(error)
  }
})


adminRouter.get('/:userId/orders', requireAdmin, async (req, res, next) => {
  const { userId } = req.params;
 try {
    const userOrders = await getMyPreviousOrdersWithItems(userId);
    res.send(userOrders)

  } catch({name, message}) {
    next({name, message})
  }
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
        genre,
        status = "" } = req.body;

    const productData = { name, 
        price,
        category,
        quantity,
        img_url,
        condition,
        album_name,
        artist,
        description,
        genre,
        status };

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
            genre,
            status } = req.body;

      const refObj = {
        name, price, category, quantity, img_url, condition, album_name, artist, description, genre, status
      }

      const updateFields = {};

      updateFields.id = Number(productId)

      for (detail in refObj) {
        if (refObj[detail]) {
          updateFields[detail] = refObj[detail];
        }
      }

      try {
 
        const updatedProduct = await updateProduct(updateFields);

        res.send(updatedProduct)
     } 
      catch ({name, message}) {
        next({name, message})
      }
  })

adminRouter.patch('/orders/:orderId', requireAdmin, async (req, res, next) => {
  const {orderId} = req.params;
  const { status } = req.body
  try {
    const order = await updateCartStatus(orderId, status);
    res.send(order)
  } catch ({name, message}) {
    next({name, message})
  }

})

adminRouter.patch('/users/:userId', requireAdmin, async (req, res, next) => {
  const { userId } = req.params;
  const { isAdmin } = req.body;
  const updateFields = {};
  updateFields.id = userId;
  updateFields.isAdmin = isAdmin;
  try {
    const user = await updateUser(updateFields)
    res.send(user)
  } catch ({name, message}) {
    next({name, message})
  }
})

adminRouter.get('/users', requireAdmin, async (req, res, next) => {
    try {
        const users = await getAllUsers();
        res.send(users);
    } catch (error) {
        next(error)
    }
})



module.exports = adminRouter;