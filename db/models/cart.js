const client = require('../client');

async function createCartOrdersTable(){
  try {
    console.log("Creating cart orders table")

    await client.query(`
      CREATE TABLE cart_orders
      (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        order_status VARCHAR(255) DEFAULT "active"
      );
    `)

  } catch (error) {
    console.log("Error")
  }
}

async function createCartItemsTable(){
  try {
    console.log("Creating cart items table...")

    await client.query(`
      CREATE TABLE individual_cart_items
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

async function createUserCart({ user_id }){
  try {
    const { rows: [ cart ] } = await client.query(`
      INSERT INTO cart_orders(user_id)
      VALUES ($1)
      ON CONFLICT (order_status) DO NOTHING
      RETURNING *;
    `, [ user_id ])

    return cart;
  } catch (error) {
    console.log("Error creating user cart")
    throw error;
  }
}

async function addItemToCart({ product_id, priceAtPurchase, cart_id }){
  // product_id and priceAtPurchase can be taken from the frontend
  // cart_id can be stored in a useState, and a useEffect can be used to fetch cart
  try {
    const { rows: [ item ]} = await client.query(`
      INSERT INTO individual_cart_items(product_id, "priceAtPurchase", cart_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [ product_id, priceAtPurchase, cart_id ])

    return item;
  } catch (error) {
    console.log("Error adding item to the cart")
    throw error;
  }
}

async function getMyCartItems(){
  // requires user authentication
  try {
    const { rows: items } = await client.query(`
      SELECT 
    `)
  } catch (error) {
    
  }

}

async function joinProductsInfoWithCartItems() {
  // This function will be used to get all relevant product info (name, descript, artist, img)
  // and join it with individual_cart_items at product_id=products(id)
}

async function joinCartOrdersWithIndivCartItems() {
}






module.exports = {
  createCartTable
}