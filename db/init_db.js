const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');
const { createProductsTable, createProduct } = require('./models/products')

async function dropTables() {
  await client.query(`
    DROP TABLE IF EXISTS products;
  `)
}

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    await dropTables()

    // build tables in correct order
    await createProductsTable();

  } catch (error) {
    console.log("Error building tables!")
    throw error;
  }
}




async function createInitialProducts() {
  console.log("Starting to create initial products...")
  try {
    const productsToCreate = [
      {
        name: "Dark Side of the Moon Remastered LP",
        price: "2.00",
        category: "Record",
        quantity: "2",
        img_url: "https://i.discogs.com/mwWMy1jLJhX7BGUigOAzbMQjmN6y2a9ppdzulDAUYSU/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE4NzMw/MTMtMTQ3MTEwMDM4/MS0zMDIyLmpwZWc.jpeg",
        condition: "Used",
        album_name: "Dark Side of the Moon",
        artist: "Pink Floyd",
        description: "The eighth studio LP to be released by Pink Floyd. It was recorded at Abbey Road Studios in London, England and released in 1973. It stands as one of the most successful commercial recordings of all time,",
        genre: "Rock",
      }
    ]
    const products = await Promise.all(
      productsToCreate.map((product) => createProduct(product))
    )
    console.log("Products Created: ", products)
    console.log("Finished creating initial products!")
  } catch (error) {
    console.error("Error creating initial products!")
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

  } catch (error) {
    console.log("Error populating initial data!")
    throw error;
  }



}
//             }
//             {
//                 name: "Blond",
//                 artist: "Frank Ocean",
//                 condition: "New",
//                 description: "Blonde is the second studio album by American singer Frank Ocean. It was released on August 20, 2016, as a timed exclusive on the iTunes Store and Apple Music, and followed the August 19 release of Ocean's video album Endless. The album features guest vocals from André 3000, Beyoncé, and Kim Burrell, among others.",
//                 genre: "R&B",
//                 price: "100.00",
//                 img_link: "https://cdn11.bigcommerce.com/s-5anmkusrsf/images/stencil/960w/products/113/389/281e87c6-d403-5d84-bd22-928fa637b4aa__92706.1592599401__00618.1642301685.jpg?c=1",

//             }  
//             {
//                 name: "Renaissance",
//                 artist: "Beyonce",
//                 condition: "New",
//                 description: "Renaissance (also titled as Act I: Renaissance) is the seventh studio album by American singer Beyoncé, released on July 29, 2022, by Parkwood Entertainment and Columbia Records. It is her first solo studio release since Lemonade (2016) and serves as the first installment of a trilogy project.",
//                 genre: "pop",
//                 price: "49.99",
//                 img_link: "https://i.discogs.com/aNyHg79Ua5dW1R6cxlFNZl0RhprVo0wVwhkqoJUWH44/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIzOTQ5/NDc2LTE2NTg0NjIz/OTEtNzQ5Ni5qcGVn.jpeg",
//             }      
//             {
//                 name: "Lemonade",
//                 artist: "Beyonce",
//                 condition: "Used",
//                 description: "Lemonade is the sixth studio album by American singer Beyoncé. It was released on April 23, 2016, by Parkwood Entertainment and Columbia Records, accompanied by a 65-minute film of the same title on HBO.",
//                 genre: "soul",
//                 price: "49.99",
//                 img_link: "https://i.discogs.com/LL5RNud4a8_KYjh9sFZLvuUogE4ZX0_a3TA_ldENvb0/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTg0ODY3/MTQtMTQ3NzU3NTAx/MC02OTY5LmpwZWc.jpeg",
//             }
//             {
//                 name: "Get This In Ya!!",
//                 artist: "The Chats",
//                 condition: "New",
//                 description: "Get This in Ya!! is the second EP released by Australian punk rock band the Chats, released on 30 August 2019. It is the band's last EP before the release of their first studio album High Risk Behavior in March 2020. The EP contains the song "Smoko", which along with its music video became popular on the internet in 2017.",
//                 genre: "Punk",
//                 price: "27.87",
//                 img_link: "https://i.discogs.com/YPnQ8vtM3uYGEAq-UY-0060CC86zRMiFGBZVPDMEKl4/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEyMDQw/OTU0LTE1ODA4OTAx/NTgtOTM5NC5qcGVn.jpeg",
//             }
//             {
//                 name: "Toxic Planet",
//                 artist: "Cobra Man",
//                 condition: "New",
//                 description: "Released alongside the full length video from the Worble skate collective, TOXIC PLANET is Cobra Man’s follow up to their 2017 debut album “New Driveway Soundtrack” and is their second for Memphis, TN based Goner Records. The Los Angeles power disco duo blends the essence of classic disco funk, the raw power of warehouse punk, and the supernatural qualities of their favorite slasher films to create something unique.",
//                 genre: "electronic",
//                 price: "19.99",
//                 img_link: "https://i.discogs.com/w8arKGSxZO7nxx2HutdkhRdoF0AEw90OCEZTpPexOLo/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEyNzUy/NTIyLTE1NDEyNzcy/MjktODQ3Mi5qcGVn.jpeg",
//             }
//             {
//                 name: "Come On Over",
//                 artist: "Shania Twain",
//                 condition: "Used",
//                 description: "Come On Over is the third studio album by Canadian country music singer Shania Twain. It was released on November 4, 1997, by Mercury Records, and became the best-selling country album, the best selling album by a Canadian and is recognized by Guinness World Records as the biggest-selling studio album by a solo female artist, and the best-selling album in the USA by a solo female artist.",
//                 genre: "country",
//                 price: "5.99",
//                 img_link: "https://i.discogs.com/kf_BARtOTnkvBb-G0JWoWjsOWrtrkBwx6dpUnKbi-vk/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTk0Mzcx/MzEtMTQ4MDU2OTg5/MC0xOTE1LmpwZWc.jpeg",
//             }
//             {
//                 name: "",
//                 artist: "",
//                 condition: "Used",
//                 description: "",
//                 genre: "soul",
//                 price: "49.99",
//                 img_link: "",
//             }
//             {
//                 name: "",
//                 artist: "",
//                 condition: "Used",
//                 description: "",
//                 genre: "soul",
//                 price: "49.99",
//                 img_link: "",
//             }
//             {
//                 name: "",
//                 artist: "",
//                 condition: "Used",
//                 description: "",
//                 genre: "soul",
//                 price: "49.99",
//                 img_link: "",
//             }                               
//         

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
