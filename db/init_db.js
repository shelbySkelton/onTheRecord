const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');

const { createProductsTable, createInitialProducts, createProduct, getProductsByCategory, getProductById, getAllProducts, updateProduct } = require('./models/products')
const { getAllUsers, createUser, createInitialUsers, createUsersTable, getUser, getUserById, createInitialAdmin } = require('./models/user')
const { createReviewsTable, createInitialReviews, getReviewsByUser, getReviewsByProduct, updateReview, deleteReview } = require('./models/reviews');

async function dropTables() {
  await client.query(`
    DROP TABLE IF EXISTS reviews;
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
    await createReviewsTable();

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
    await createInitialReviews();
  } catch (error) {
    console.log("Error populating initial data!")
    throw error;
  }

}




async function testDB() {
  try {
    console.log("Starting to test database...");

    console.log("Calling getProductsByCategory(Record)...");
    const records = await getProductsByCategory("Record");
    console.log("getProductsByCategory(Record): ", records);

    console.log("Calling getProductsByCategory(Accessory)...");
    const accessories = await getProductsByCategory("Accessory");
    console.log("getProductsByCategory(Accessory): ", accessories);

    console.log("Calling getProductById... on id: 3");
    const product = await getProductById(3);
    console.log("getProductById: ", product);


    // console.log("Calling updateProduct on product 2...")
    // const updatedProduct = await updatedProduct(req)
    // console.log("Finished updating product:", updatedProduct)


    console.log("Calling getAllUsers");
    const users = await getAllUsers();
    console.log("getAllUsers: ", users)


    console.log("Calling getUser");
    const glamgal = await getUser({email: "glamgal@example.com", password: "glamgal123"})
    console.log("Glamgal: ", glamgal)

    console.log("Calling getUserById");
    const user1 = await getUserById(4);
    console.log("User4: ", user1);

    console.log("Calling get review by user");
    const user2 = await getReviewsByUser(2);
    console.log("user2: ", user2);

    console.log("Calling get review by product");
    const user3 = await getReviewsByProduct(7);
    console.log("user3: ", user3);

    console.log("Calling updateReview on reviews [6]");
    // console.log("review: ", reviews[6].id)
    const updateReviewResult = await updateReview(6, {
      rating: "4",
      content: "I updated this review"
    });
    console.log("Result: ", updateReviewResult);

    console.log("Calling delete review [6]");
    const updateDeleteReview = await deleteReview(6)
    console.log("deleteReview: ", updateDeleteReview)

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
