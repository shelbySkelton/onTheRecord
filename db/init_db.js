const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');

const { createProductsTable, createInitialProducts, createProduct, getActiveProductsByCategory, getProductById, getAllProducts, getAllInactiveProducts, getAllActiveProducts, updateProduct, deactivateProduct } = require('./models/products')
const { getAllUsers, createUser, createInitialUsers, createUsersTable, getUser, getUserById, createInitialAdmin } = require('./models/user')
const { 
  createCartOrdersTable,
  createCartItemsTable,
  addItemToCart,
  createInitialCarts,
  createInitialCartItems,
  getMyCartWithItems,
  getMyOrdersWithItems,
  deleteItemFromCart
} = require('./models/cart')


async function dropTables() {
  await client.query(`
    DROP TABLE IF EXISTS carted_items;
    DROP TABLE IF EXISTS cart_orders;
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS users;
  `)
}

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    await dropTables()

    // build tables in correct order
    await createProductsTable();
    await createUsersTable();
    await createCartOrdersTable();
    await createCartItemsTable();

  } catch (error) {
    console.log("Error building tables!")
    throw error;
  }
}






async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
    // createInitialRecords FOR OUR populateInitalData() in init_db.js
    await createInitialProducts();
    await createInitialUsers();
    await createInitialAdmin();
    await createInitialCarts();
    await createInitialCartItems();
  } catch (error) {
    console.log("Error populating initial data!")
    throw error;
  }

}




async function testDB() {
  try {
    console.log("Starting to test database...");




    console.log("Calling getActiveProductsByCategory(Record)...");
    const records = await getActiveProductsByCategory("Record");
    console.log("getProductsByActiveCategory(Record): ", records);

    console.log("Calling getActiveProductsByCategory(Accessory)...");
    const accessories = await getActiveProductsByCategory("Accessory");
    console.log("getActiveProductsByCategory(Accessory): ", accessories);

    console.log("Calling getProductById... on id: 3");
    const product = await getProductById(3);
    console.log("getProductById: ", product);


    console.log("Calling updateProduct on product 2...")
    const updates = {
      id: 2,
      description: "UPDATED WORKED!!!!",
      status: 'Inactive'
    }
    const updatedProduct = await updateProduct(updates)
    console.log("Finished updating product:", updatedProduct)

    console.log("Calling delete product 13")
    const wasDeleteSuccessful = await deactivateProduct(13)
    console.log("was delete successful?", wasDeleteSuccessful)

    console.log("Calling deactivate product 1")
    const deactivatedProduct = await deactivateProduct(1)
    console.log("product deactived:", deactivatedProduct)


    console.log("Calling getAllActiveProducts...");
    const activeProducts = await getAllActiveProducts();
    console.log("activeProducts: ", activeProducts);

    console.log("Calling getAllProducts...");
    const allProducts = await getAllProducts();
    console.log("allProducts: ", allProducts);

    console.log("Calling getAllInactiveProducts...");
    const allInactiveProducts = await getAllInactiveProducts();
    console.log("allInactiveProducts: ", allInactiveProducts);

    // console.log("Calling getAllUsers");
    // const users = await getAllUsers();
    // console.log("getAllUsers: ", users)


    // console.log("Calling getUser");
    // const glamgal = await getUser({email: "glamgal@example.com", password: "glamgal123"})
    // console.log("Glamgal: ", glamgal)


    // console.log("Calling getUserById");
    // const user1 = await getUserById(4);
    // console.log("User4: ", user1);
    // console.log("These are user2's past and present orders")
    // const user2Carts = await getMyOrdersWithItems(2);
    // console.log("user2carts: ", user2Carts)

    // console.log("getMyCartWithItems for user 1")
    // const cart1 = await getMyCartWithItems(1);
    // console.log("cart1: ", cart1)

    // console.log("Deleting item 2 from cart 1")
    // const deletedItem = await deleteItemFromCart(2)
    // console.log("Our deleted item: ", deletedItem)

    // console.log("getMyCartWithItems for user 1 AFTER deleting")
    // const newcart = await getMyCartWithItems(1);
    // console.log("cart1 after deleting item: ", newcart)
    // console.log("Calling getUserById");
    // const user1 = await getUserById(4);
    // console.log("User4: ", user1);

  } catch (error) {
    console.error("Error testing database!");
    throw error;
  }
}



buildTables()
  .then(populateInitialData)
  .then(testDB)
  .catch(console.error)
  .finally(() => client.end());
