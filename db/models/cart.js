const client = require('../client');

async function createCartItemsTable(){
  try {
    console.log("Creating cart items table...")

    await client.query(`
      CREATE TABLE cart_items
      (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        product_id INTEGER REFERENCES products(id)
        price_at_purchase FLOAT DEFAULT 0.00,
        cart_id INTEGER 
      );
    `)

    console.log("Finished creating cart table")
  } catch (error) {
    console.log("Error creating cart table")
    throw error
  }
}

async function createCartOrdersTable(){
  try {
    console.log("Creating cart orders table")

    await client.query(`
      CREATE TABLE cart_orders
      (
        id SERIAL PRIMARY KEY,
        user_id REFERENCES users(id),
        order_status VARCHAR(255)
      );
    `)

  } catch (error) {
    console.log("Error")
  }
}

async function addVinylToOrder(){

}

async function addAccessoryToOrder(){

}

async function getCart(){
  // requires user authentication

}





module.exports ={
  createCartTable
}