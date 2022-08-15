// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require('bcrypt')



async function createUsersTable() {

  try {
    console.log("Starting to build users table");

    await client.query(`
      CREATE TABLE users
      (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        "isAdmin" BOOLEAN DEFAULT false
      );
    `)

    console.log("Finished building users table");
  } catch (error) {
    console.log("Error building users table")
  }
}

async function createUser({ email, password, first_name, last_name }) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
  try {
    const { rows: [user] } = await client.query(`
      INSERT INTO users(email, password, first_name, last_name)
      VALUES ($1, $2, $3, $4)
      RETURNING id, email, first_name, last_name;
    `, [email, hashedPassword, first_name, last_name])

    return user;
  } catch (error) {
    console.log("Error creating user")
  }
}

async function createAdmin({ email, password, first_name, last_name, isAdmin }) {
  const SALT_COUNT = 10;
  const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
  try {
    const { rows: [admin] } = await client.query(`
      INSERT INTO users(email, password, first_name, last_name, isAdmin)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING email, first_name, last_name;
    `, [email, hashedPassword, first_name, last_name, isAdmin])

    return admin;
  } catch (error) {
    console.log("Error creating user")
  }
}

async function createInitialAdmin() {
  console.log("Trying to create initial administrator");
  try {
    const adminToCreate =
    {
      email: "admin@example.com",
      password: "secretpassword",
      first_name: "Admiral",
      last_name: "Ministrator",
      isAdmin: true
    }
    const admin = await createAdmin(adminToCreate);
    return admin;
  } catch (error) {
    console.log("Error creating administrator password");
    throw error;
  }
}

async function createInitialUsers() {
  console.log("Starting to create users . . .")
  try {
    const usersToCreate = [
      { email: "albert@example.com", password: "bertie99", first_name: "Al", last_name: "Bert" },
      { email: "sandra@example.com", password: "sandra123", first_name: "Sandra", last_name: "Ardnas" },
      { email: "glamgal@example.com", password: "glamgal123", first_name: "Glamorous", last_name: "Gal" },
    ]

    const users = await Promise.all(usersToCreate.map(createUser))

    console.log("Users created:")
    console.log(users)
    console.log("Finished creating users!")
  } catch (error) {
    console.log("Error creating users!")
    throw error;
  }
}

async function getUserByEmail(email) {
  try {
    const { rows: [user] } = await client.query(`
      SELECT *
      FROM users
      WHERE email= $1;
    `, [email])
    return user;
  } catch (error) {
    console.log("Error with getUserByEmail")
    throw error;    
  }
}

async function getUser({ email, password }) {
  const user = await getUserByEmail(email);
  const hashedPassword = user.password;
  const passwordsMatch = await bcrypt.compare(password, hashedPassword);
  
  if (passwordsMatch) {
      try {
        const { rows: [user] } = await client.query(`
          SELECT id, email, first_name, last_name
          FROM users
          WHERE email = $1 and password = $2;
        `, [email, hashedPassword])
        console.log("This is user: ", user)
        return user;
      } catch (error) {
        console.log('Error in the getUser')
        throw error;
      }
  }
}

async function getUserById(userId){
  try {
    const { rows: [ user ] } = await client.query(`
      SELECT id, email, first_name, last_name, "isAdmin"
      FROM users
      WHERE id=$1;
    `, [userId]);

    if (!user){
      return null;
    } else {
      // get their cart (use getCartByUser)
      // let userCart = await getCartByUser(userId);

      // then add the cart to the user object with key 'cart'
      // user.cart = userCart

      // return the user object
      return user;

    }
  } catch (error) {
    console.log("Error in getUserById");
    throw error;
  }
}

async function getAllUsers() {
  try {
    console.log("Getting all users");

    const { rows: users } = await client.query(`
      SELECT id, email, first_name, last_name 
      FROM users;
    `)

    return users;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUsersTable,
  createUser,
  createInitialUsers,
  getUser,
  getUserByEmail,
  getUserById,
  createInitialAdmin
};