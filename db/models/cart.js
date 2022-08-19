const productsRouter = require('../../api/products');
const client = require('../client');
const { createUser } = require('./user');

async function createCartOrdersTable(){
  try {
    console.log("Creating cart orders table")

    await client.query(`
      CREATE TABLE cart_orders
      (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        order_status VARCHAR(255) DEFAULT 'active' CHECK(order_status IN ('active', 'pending', 'shipped', 'canceled', 'lost at sea')),
        session_id TEXT
      );
    `)
    console.log("Finished creating cart_orders table")
  } catch (error) {
    console.log("Error in creating cart_orders table", error)
    throw error;
  }
}

async function createCartItemsTable(){
  try {
    console.log("Creating cart items table...")

    await client.query(`
      CREATE TABLE carted_items
      (
        id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id),
        "priceAtPurchase" FLOAT DEFAULT 0.00,
        cart_id INTEGER REFERENCES cart_orders(id)
      );
    `)

    console.log("Finished creating cart table")
  } catch (error) {
    console.log("Error creating cart table")
    throw error
  }
}


// on api/frontend: check if logged in user has an active cart (getActiveCartByUserId) in a useEffect
// if it doesnt exist (falsy), create a new active cart with userId (if logged in) or sessionID (if guest) in a useEffect
async function createUserCart({ user_id, order_status }){
  try {
    const { rows: [ cart ] } = await client.query(`
      INSERT INTO cart_orders(user_id, order_status)
      VALUES ($1, $2)
      RETURNING *;
    `, [ user_id, order_status ])

    return cart;
  } catch (error) {
    console.log("Error creating user cart")
    throw error;
  }
}

async function createGuestCart({ session_id, order_status }){
  try {
    const { rows: [ cart ]} = await client.query(`
      INSERT INTO cart_orders(session_id, order_status)
      VALUES ($1, $2)
      RETURNING *;
    `, [ session_id, order_status ])
  } catch (error) {
    console.log("Error creating a guest cart");
    throw error;
  }
}


async function addItemToCart({ product_id, priceAtPurchase, cart_id }){
  // product_id and priceAtPurchase can be taken from the frontend
  // cart_id can be stored in a useState, and a useEffect can be used to fetch cart
  try {
    const { rows: [ item ]} = await client.query(`
      INSERT INTO carted_items(product_id, "priceAtPurchase", cart_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [ product_id, priceAtPurchase, cart_id ])

    return item;
  } catch (error) {
    console.log("Error adding item to the cart")
    throw error;
  }
}

async function createInitialCarts(){
  console.log("Starting to create initial carts...")
  try {
    const cartsToCreate = [
      { user_id: 1, order_status: 'active' }, // cart 1
      { user_id: 2, order_status: 'pending'}, // cart 2
      { user_id: 3, order_status: 'active' }, // cart 3
      { user_id: 2, order_status: 'active' }, // cart 4
      { user_id: 4, order_status: 'active' } // cart 5
    ]
    const cart = await Promise.all(cartsToCreate.map(createUserCart));
    console.log("Carts created: ", cart)
    console.log("Finished creating initial cart")
  } catch (error) {
    console.log("Error creating initial cart!")
    throw error;
  }
}

async function createInitialCartItems(){
  console.log("Start to add cart items");
  try {
    const itemsToAdd = [
      {
        product_id: 1,
        priceAtPurchase: 13.99,
        cart_id: 1
      },
      {
        product_id: 1,
        priceAtPurchase: 13.99,
        cart_id: 1
      },
      {
        product_id: 3,
        priceAtPurchase: 99.99,
        cart_id: 1
      },
      {
        product_id: 5,
        priceAtPurchase: 9.99,
        cart_id: 2
      },
      {
        product_id: 9,
        priceAtPurchase: 43.99,
        cart_id: 2
      },
      {
        product_id: 7,
        priceAtPurchase: 81.99,
        cart_id: 2
      },
      {
        product_id: 9,
        priceAtPurchase: 99.90,
        cart_id: 3
      },
      {
        product_id: 4,
        priceAtPurchase: 99.90,
        cart_id: 3
      },
      {
        product_id: 15,
        priceAtPurchase: 99.90,
        cart_id: 4
      },
    ]
    const cartItems = await Promise.all(itemsToAdd.map(addItemToCart))
    console.log("Items added to carts: ", cartItems)
    console.log("Finished adding items to cart");
  } catch (error) {
    console.log("error in createInitialCartItems");
    throw error;
  }
}

async function joinProductsInfoWithCartItems() {
  // This function will be used to get relevant product info (name, img)
  // and join it with individual_cart_items at product_id=products(id)
}
//ACTIVE CART WITH ITEMS
async function getMyCartWithItems(user_id){
  // requires user authentication
  try {
    const { rows: [cart] } = await client.query(`
      SELECT * 
      FROM cart_orders
      WHERE order_status='active' AND user_id=$1;
    `, [user_id])


    const { rows: items } = await client.query(`
      SELECT carted_items.*, products.name AS product_name, products.img_url AS product_img
      FROM carted_items
      JOIN products ON products.id = carted_items.product_id;
    `)
    
    if (items.length === 0){
      cart.items = []
    } else {
      const itemsToAdd = items.filter(item => item.cart_id === cart.id)
      cart.items = itemsToAdd
      return cart
    }
  

  } catch (error) {
    console.log("Error getting cart with items");
    throw error;
  }
}
//ALL OF MY ORDERS WITH ITEMS
async function getMyPreviousOrdersWithItems(user_id){
  // for viewing previous orders
  // gets all cart_orders and carted_items with that cart_order
  // regardless of order_status
  try {
    const { rows: carts } = await client.query(`
      SELECT * 
      FROM cart_orders
      WHERE cart_orders.user_id=$1 AND cart_orders.order_status != 'active';
    `, [user_id])

    const { rows: items } = await client.query(`
      SELECT carted_items.*, products.name AS product_name
      FROM carted_items
      JOIN products ON products.id = carted_items.product_id;
    `)

    for(const cart of carts){
      const itemsToAdd = items.filter(item => item.cart_id === cart.id)

      cart.items = itemsToAdd;
    }

    return carts
  } catch (error) {
    console.log("Error getting cart with items");
    throw error;
  }
}

async function deleteItemFromCart(cartedItemId){
  
  try {
    const { rows: [ item ]} = await client.query(`
      DELETE FROM carted_items
      WHERE id=$1
      RETURNING *;
    `, [cartedItemId])
    console.log("Item that was deleted: ", item)
    return item;

  } catch (error) {
    console.log("Error deleting Item from Carted_Items")
    throw error;
  }



}

async function checkOut(id){
  try {
    const { rows: [ cart ] } = await client.query(`
      UPDATE cart_orders
      SET order_status='pending'
      WHERE id=$1
      RETURNING *
    `, [id])

    // if(cart.session_id === null){
    //   const newUserCart = await createUserCart({ 
    //     user_id: cart.user_id, 
    //     order_status: 'active' 
    //   })
    //   console.log("New user cart:", newUserCart)
    //   return newUserCart
    // } else if (cart.user_id === null && !!cart.session_id){
    //   const newGuestCart = await createGuestCart({ 
    //     session_id: cart.session_id, 
    //     order_status: 'active'
    //   })
    //   console.log("New guest cart: ", newGuestCart)
    //   return newGuestCart
    // }
    
    return cart;
  } catch (error) {
    console.log("Error in checkOut function in db/models/cart")
  }
}

// Admin functions
// gets all cart_orders with carted_items
// update cartOrders
// getCartOrdersWithItemsByUserId - on admin dashboard, if looking at user, admin can pull up cart_orders for a user






module.exports = {
  createCartOrdersTable,
  createCartItemsTable,
  addItemToCart,
  createInitialCarts,
  createInitialCartItems,
  getMyCartWithItems,
  getMyPreviousOrdersWithItems,
  deleteItemFromCart,
  createGuestCart,
  createUserCart,
  checkOut
}