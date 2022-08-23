const { useDebugValue } = require("react");
const client = require("../client");



//TO CREATE DATABASE TABLE

async function createProductsTable() {
    try {
        await client.query(`
                            
        CREATE TABLE products
        (
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
            genre VARCHAR(255),
            status VARCHAR(255) DEFAULT 'Active' CHECK(status IN ('Active', 'Inactive'))
        );
        `)
    } catch (error) {
        console.log("Error building products table!")
        throw error;
    }
}



async function createProduct({ name,
    price,
    category,
    quantity,
    img_url,
    condition,
    album_name,
    artist,
    description,
    genre,
    status }) {
    try {
        const { rows: [product] } = await client.query(`
            INSERT INTO products(name, price, category, quantity, img_url, condition, album_name, artist, description, genre, status)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *;
        `, [name, price, category, quantity, img_url, condition, album_name, artist, description, genre, status])
        return product;
    } catch (error) {
        console.log("Error creating product!");
        throw error;
    }
}



async function getAllActiveProducts() {
    try {
        console.log("Getting all active products...")
        const { rows: products } = await client.query(`
            SELECT *
            FROM products
            WHERE status='Active';
        `)

        return products;
    } catch (error) {
        console.log("Error getting all active products!")
        throw error;
    }
}

async function getAllInactiveProducts() {
    try {
        console.log("Getting all inactive products...")
        const { rows: products } = await client.query(`
            SELECT *
            FROM products
            WHERE status='Inactive';
        `)

        return products;
    } catch (error) {
        console.log("Error getting all inactive products!")
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
    } catch (error) {
        console.log("Error getting all active products!")
        throw error;
    }
}




async function updateProduct({ id, ...fields }) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}" = $${index + 1}`
    ).join(', ');

    if (setString.length === 0) {
        return
    }
    try {
        const { rows: [product] } = await client.query(`
            UPDATE products
            SET ${setString}
            WHERE id= ${id}
            RETURNING *
        `, Object.values(fields));
        return product;
    } catch (error) {
        console.log("Error updating product!")
        throw error;
    }
}


async function getActiveProductsByCategory(category) {
    try {
        console.log("Getting all products by category...")
        const { rows } = await client.query(`
            SELECT *
            FROM products
            WHERE category= $1 AND status='Active';
        `, [category]);

        return rows;
    } catch (error) {
        console.log("Error getting all active products by category!")
        throw error;
    }
}

async function getProductById(id) {
    try {
        const { rows: [product] } = await client.query(`
            SELECT * FROM products
            WHERE id=$1;
        `, [id]);
        return product;
    } catch (error) {
        console.log("Error in getRecordById!")
        throw error;
    }
}





async function deactivateProduct(id) {

    try {
        const { rows: [deactivatedProduct] } = await client.query(`
            UPDATE products
            SET status= 'Inactive'
            WHERE id=$1
            RETURNING *
        `, [id]);

        return deactivatedProduct;
    } catch (error) {
    console.log(error.detail)
    throw error;
    }
}




async function createInitialProducts() {
    console.log("Starting to create initial products...")
    try {

        const productsToCreate = [
            {
                name: "Dark Side of the Moon LP (Remastered 2016)",
                price: "2.00",
                category: "Record",
                quantity: "2",
                img_url: "https://i.discogs.com/mwWMy1jLJhX7BGUigOAzbMQjmN6y2a9ppdzulDAUYSU/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE4NzMw/MTMtMTQ3MTEwMDM4/MS0zMDIyLmpwZWc.jpeg",
                condition: "Used",
                album_name: "Dark Side of the Moon",
                artist: "Pink Floyd",
                description: "The eighth studio LP to be released by Pink Floyd. It was recorded at Abbey Road Studios in London, England and released in 1973. It stands as one of the most successful commercial recordings of all time,",
                genre: "Rock",
                status: "Active"
            },
            {
                name: "Blond (Limited Edition LP)",
                price: "100.00",
                category: "Record",
                quantity: "5",
                img_url: "https://cdn11.bigcommerce.com/s-5anmkusrsf/images/stencil/960w/products/113/389/281e87c6-d403-5d84-bd22-928fa637b4aa__92706.1592599401__00618.1642301685.jpg?c=1",
                condition: "New",
                album_name: "Blond",
                artist: "Frank Ocean",
                description: "Blonde is the second studio album by American singer Frank Ocean. It was released on August 20, 2016, as a timed exclusive on the iTunes Store and Apple Music, and followed the August 19 release of Ocean's video album Endless. The album features guest vocals from André 3000, Beyoncé, and Kim Burrell, among others.",
                genre: "R&B",
                status: "Active"
                
            },
            {
                name: "Renaissance 2 x LP",
                price: "49.99",
                category: "Record",
                quantity: "10",
                img_url: "https://i.discogs.com/aNyHg79Ua5dW1R6cxlFNZl0RhprVo0wVwhkqoJUWH44/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIzOTQ5/NDc2LTE2NTg0NjIz/OTEtNzQ5Ni5qcGVn.jpeg",
                condition: "New",
                album_name: "RENAISSANCE",
                artist: "Beyonce",
                description: "Renaissance (also titled as Act I: Renaissance) is the seventh studio album by American singer Beyoncé, released on July 29, 2022, by Parkwood Entertainment and Columbia Records. It is her first solo studio release since Lemonade (2016) and serves as the first installment of a trilogy project.",
                genre: "Pop",
                status: "Active"
            },
            {
                name: "Lemonade (Limited Edition Yellow Colored Double LP",
                price: "68.99",
                category: "Record",
                quantity: "20",
                img_url: "https://i.discogs.com/LL5RNud4a8_KYjh9sFZLvuUogE4ZX0_a3TA_ldENvb0/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTg0ODY3/MTQtMTQ3NzU3NTAx/MC02OTY5LmpwZWc.jpeg",
                condition: "Used",
                album_name: "Lemonade",
                artist: "Beyonce",
                description: "Lemonade is the sixth studio album by American singer Beyoncé. It was released on April 23, 2016, by Parkwood Entertainment and Columbia Records, accompanied by a 65-minute film of the same title on HBO.",
                genre: "Soul",
                status: "Active"
            },
            {
                name: "Get This In Ya!! (EP, Limited Edition)",
                price: "27.87",
                category: "Record",
                quantity: "15",
                img_url: "https://i.discogs.com/YPnQ8vtM3uYGEAq-UY-0060CC86zRMiFGBZVPDMEKl4/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEyMDQw/OTU0LTE1ODA4OTAx/NTgtOTM5NC5qcGVn.jpeg",
                condition: "New",
                album_name: "Get This In Ya!!",
                artist: "The Chats",
                description: "Get This in Ya!! is the second EP released by Australian punk rock band the Chats, released on 30 August 2019. It is the band's last EP before the release of their first studio album High Risk Behavior in March 2020. The EP contains the song 'Smoko', which along with its music video became popular on the internet in 2017.",
                genre: "Punk",
                status: "Active"
            },
            {
                name: "Toxic Planet LP",
                price: "19.99",
                category: "Record",
                quantity: "5",
                img_url: "https://i.discogs.com/w8arKGSxZO7nxx2HutdkhRdoF0AEw90OCEZTpPexOLo/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEyNzUy/NTIyLTE1NDEyNzcy/MjktODQ3Mi5qcGVn.jpeg",
                condition: "New",
                album_name: "Toxic Planet",
                artist: "Cobra Man",
                description: "Released alongside the full length video from the Worble skate collective, TOXIC PLANET is Cobra Man’s follow up to their 2017 debut album “New Driveway Soundtrack” and is their second for Memphis, TN based Goner Records. The Los Angeles power disco duo blends the essence of classic disco funk, the raw power of warehouse punk, and the supernatural qualities of their favorite slasher films to create something unique.",
                genre: "Electronic",
                status: "Active"
            },
            {
                name: "Marc Anthony LP",
                price: "24.99",
                category: "Record",
                quantity: "1",
                img_url: "https://i.discogs.com/_Wf9CWXMMUWvMOXwK7Pkwj5erJ0SZgyLp5NsyX_1IlQ/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTk4OTU4/Ny0xNTkwODYzNzM4/LTQ1MDAuanBlZw.jpeg",
                condition: "New",
                album_name: "Marc Anthony",
                artist: "Marc Anthony",
                description: "Marc Anthony is the first English album and fourth studio album overall by American singer Marc Anthony. It was released on September 14, 1999 by Columbia. The album debuted in the top 10 on the US Billboard 200 and has since gone 3× Platinum in the United States. This was Anthony's first English album since his 1991 effort, When the Night Is Over, in which he recorded with Little Louie Vega. It sold more than 4 million copies worldwide.",
                genre: "Latin",
                status: "Active"
            },
            {
                name: "Ley De Gravedad",
                price: "34.99",
                category: "Record",
                quantity: "3",
                img_url: "https://i.discogs.com/7Ux7if-JE1u1CDr73vTOz19jmfiQ_ozy1PRaslr8l2Y/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIyNjI4/NDgzLTE2NTY0NDA2/MzItMTg5OC5qcGVn.jpeg",
                condition: "New",
                album_name: "Ley De Gravedad",
                artist: "Luis Fonzi",
                description: "Ley degravida 1 is the tenth studio album by Puerto Rican Latin pop singer Luis Fonsi , released on March 11, 2022 through Universal Music Latin. The album is characterized by the combination of rhythms between urban, pop, tropical and ballad. Also, the album was released along with its single 'Dolce'. From this album, some singles such as: 'Turn around', 'Bésame', 'Perfecta' and 'Nuestra balada' among others. This album includes the participation of Nicky Jam, Cali & El Dandee, Farruko, Rauw Alejandro, Sebastián Yatra, Manuel Turizo and Dalex",
                genre: "Latin",
                status: "Active"
            },
            {
                name: "Boundless Audio Record Cleaner Brush",
                price: "15.99",
                category: "Accessory",
                quantity: "30",
                img_url: "https://m.media-amazon.com/images/I/61K2QykmDZL._AC_SL1500_.jpg",
                condition: "New",
                description: "Vinyl Cleaning Carbon Fiber Anti-Static Record Brush",
                status: "Active"
            },
            {
                name: "HIStory - Past, Present And Future - Book I",
                price: "30.99",
                category: "Record",
                quantity: "1",
                img_url: "https://i.discogs.com/pTwrG7KuVpRZ_XKoZJF15yk_RLYM5QIwetgz1LGpySA/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTQ0NjI3/My0xNjU1MDUzNDc0/LTU1ODYuanBlZw.jpeg",
                condition: "New",
                album_name: "HIStory - Past, Present And Future - Book I",
                artist: "Michael Jackson",
                description: "HIStory: Past, Present and Future, Book I is the ninth studio album by the American singer Michael Jackson, released on June 20, 1995. It was Jackson's fifth album released through Epic Records, and the first on his label MJJ Productions. The album includes appearances by Janet Jackson, Shaquille O'Neal, Slash, and the Notorious B.I.G. The genres span R&B, pop, hip hop, elements of hard rock and funk rock. The themes include environmental awareness, isolation, greed, suicide, injustice, and Jackson's conflicts and common-ground with the media.",
                genre: "Pop",
                status: "Active"
            },
            {
                name: "Anti",
                price: "24.99",
                category: "Record",
                quantity: "2",
                img_url: "https://i.discogs.com/Vaudr6-YbiBZTL5g1F4AUM3Ho4Q2uPiutd3PsI0UXBg/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTgwNzc5/OTAtMTQ1NDcxMDgw/OC0zODA0LmpwZWc.jpeg",
                condition: "New",
                album_name: "ANTI",
                artist: "Rihanna",
                description: "Anti (stylised in all caps) is the eighth studio album by Barbadian singer Rihanna. She started recording in 2014 after ending her contract with Def Jam Recordings, who had released all of her albums since her debut in 2005. As executive producer, Rihanna recorded Anti with producers including Jeff Bhasker, Boi-1da, DJ Mustard, Hit-Boy, Brian Kennedy, Timbaland and No I.D., at studios in Canada, the United States and France. SZA and Drake contribute guest vocals.",
                genre: "Pop",
                status: "Active"
            },
            {
                name: "Keasbey Nights LP (Limited Edition - blue translucent",
                price: "14.99",
                category: "Record",
                quantity: "5",
                img_url: "https://i.discogs.com/E_CXMnuqyOU-YUTqQMMxq0RmhL5H3Rwh3hXx80N_LZ0/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTI1NjA3/NTAtMTQ4NTcyNzQw/MS04MDYxLmpwZWc.jpeg",
                condition: "New",
                album_name: "Keasbey Nights",
                artist: "Catch 22",
                description: "Keasbey Nights is the debut album by the American ska punk band Catch 22, released on March 24, 1998 by Victory Records.",
                genre: "Ska",
                status: "Active"
            },
            {
                name: "Show & Listen Album Cover Display Frame",
                price: "34.99",
                category: "Accessory",
                quantity: "50",
                img_url: "https://m.media-amazon.com/images/I/81PTNiGYHFL._AC_SX679_.jpg",
                condition: "New",
                description: "12.5x12.5, Black. Record display frame features unique quick release mechanism allowing you to play and display different records easily without having to move the frame or take it off the wall",
                status: "Active"
            },
            {
                name: "Cork & Rubber Record Mat",
                price: "24.95",
                category: "Accessory",
                quantity: "50",
                img_url: "https://cdn.shopify.com/s/files/1/0105/4542/products/turntablelab-cork-candid_1200x1200.jpg?v=1571263677",
                condition: "New",
                description: "2mm height, custom Turntable Lab cork record mat. Improves sound quality playback with cork's dampening qualities (lessens vibrations) and helps eliminate static electricity on your records. Works with all turntables (works best on metal platters).",
                status: "Active"
            },
            {
                name: "Spacemat Record Splipmat",
                price: "14.95",
                category: "Accessory",
                quantity: "100",
                img_url: "https://cdn.shopify.com/s/files/1/0105/4542/products/turntablelab-recordmat-stars-topview_1800x1800.jpg?v=1635441936",
                condition: "New",
                description: "Custom Lab slipmats featuring an awesome star field print designed by PH. Super soft style, medium weight mats with smooth sublimated print for a smooth surface that won't scratch your records. Suitable for DJing or everyday listening.",
                status: "Active"
            },
            {
                name: "Record Cleaner Starter Kit",
                price: "34.95",
                category: "Accessory",
                quantity: "70",
                img_url: "https://cdn.shopify.com/s/files/1/0105/4542/products/groovewasher-turntablelabedition_2000x2000.jpg?v=1585171616",
                condition: "New",
                description: "Turntable Lab edition w/ classic oil-rubbed walnut handle. Safely and effectively removes dust, dirt, and fingerprints from your vinyl. Wet clean system includes brush handle, cleaning pad, label mask and G2 cleaning fluid.",
                status: "Active"
            },
            {
                name: "Come On Over 2 x LP (2016 Reissue)",
                price: "39.99",
                category: "Record",
                quantity: "8",
                img_url: "https://i.discogs.com/kf_BARtOTnkvBb-G0JWoWjsOWrtrkBwx6dpUnKbi-vk/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTk0Mzcx/MzEtMTQ4MDU2OTg5/MC0xOTE1LmpwZWc.jpeg",
                condition: "New",
                album_name: "Come On Over",
                artist: "Shania Twain",
                description: "Come On Over became the best selling studio album of all time by a female artist in any genre and best selling country album of all time moving 40 million copies worldwide. Featuring 'You're Still The One', 'From This Moment On', and 'Man! I Feel Like A Woman' the record earned her four Grammy awards. Issued on 120g vinyl for the first time ever.",
                genre: "Country",
                status: "Active"
            }
            // {
            //     name: "",
            //     price: "",
            //     category: "",
            //     quantity: "",
            //     img_url: "",
            //     condition: "",
            //     album_name: "",
            //     artist: "",
            //     description: "",
            //     genre: "",
            // }
        ]

        const products = await Promise.all(
            productsToCreate.map((product) => createProduct(product))
        )

        console.log("Finished creating initial products!")
    } catch (error) {
        console.error("Error creating initial products!")
        throw error;
    }
}






module.exports = {
    createProductsTable,
    createProduct,
    getAllActiveProducts,
    getAllInactiveProducts,
    getAllProducts,
    getActiveProductsByCategory,
    getProductById,
    createInitialProducts,
    updateProduct,
    deactivateProduct
    // getRecordByName,
    // getRecordByArtist,
    // getRecordByGenre,
};