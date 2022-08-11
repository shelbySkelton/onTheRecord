const { useDebugValue } = require("react");
const client = require("../client");


//TO CREATE DATABASE TABLE

async function createProductsTable() {
    try{
        await client.query(`
                            
        CREATE TABLE products(
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            price NUMERIC NOT NULL,
            category VARCHAR(255) NOT NULL,
            quantity INTEGER CHECK (quantity>= 0),
            img_url TEXT NOT NULL,
            condition VARCHAR(7) NOT NULL CHECK(condition IN ('New','Used')),
            album_name VARCHAR(255),
            artist VARCHAR(255),
            description TEXT NOT NULL,
            genre VARCHAR(255)
        );
        `) 
    } catch (error) {
        console.log("Error building products table!")
        throw error;
    }
}



async function createProduct ({ name, 
                                price, 
                                category, 
                                quantity, 
                                img_url, 
                                condition, 
                                album_name, 
                                artist, 
                                description, 
                                genre }) 
                                {
    try{
        const { rows: [ product ]} = await client.query(`
            INSERT INTO products(name, price, category, quantity, img_url, condition, album_name, artist, description, genre)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *;
        `, [name, price, category, quantity, img_url, condition, album_name, artist, description, genre])
        console.log("Created Product: ", product)
        return product;
    } catch (error) {
        console.log("Error creating product!");
        throw error;
    }
}



async function getAllProducts() {
    try {
        console.log("Getting all products...")
        const { rows: products } = await client.query(`
            SELECT *
            FROM products;
        `)

        return products;
    } catch(error) {
        console.log("Error getting all products!")

        throw error;
    }
}

async function getProductById(id) {
    try{
        const { rows: [product] } = await client.query(`
            SELECT * FROM products
            WHERE id=$1;
        `, [id]);
        console.log("getProductById: ", product)
        return product;
    } catch(error){
        console.log("Error in getRecordById!")
        throw error;
    }
}

// async function updateRecord({id, ...fields}) {
//     const setString = Object.keys(fields).map(
//         (key, index) => `"${key}" = $${ index + 1 }`
//         ).join(', ');
//         if (setString === 0){
//             return;
//         }
//         try{
//             const { rows: [ record ] } = await client.query(`
//                 UPDATE records
//                 SET ${ setString }
//                 WHERE id = ${ id }
//                 RETURNING *;
//             `, Object.values(fields));
//             return record;
//         } catch(error){
//             console.log("Error in updateRecord!")
//             throw error;
//         }
// }

                






module.exports = {
    createProductsTable,
    createProduct,
    getAllProducts,
    // getRecordById,
    // getRecordByName,
    // getRecordByArtist,
    // getRecordByGenre,
    // updateRecord,
    // deleteRecord,
  };