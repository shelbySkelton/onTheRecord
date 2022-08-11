const {
  client,
  // declare your model imports here
  // for example, User
} = require('./');
const { createProductsTable, createProduct, getProductsByCategory, getProductById, getAllProducts } = require('./models/products')

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
        genre: "electronic",
      },
      {
        name: "Marc Anthony LP",
        price: "24.99",
        category: "Record",
        quantity: "1",
        img_url:"https://i.discogs.com/_Wf9CWXMMUWvMOXwK7Pkwj5erJ0SZgyLp5NsyX_1IlQ/rs:fit/g:sm/q:40/h:300/w:300/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTk4OTU4/Ny0xNTkwODYzNzM4/LTQ1MDAuanBlZw.jpeg",
        condition: "New",
        album_name: "Marc Anthony",
        artist: "Marc Anthony",
        description: "Marc Anthony is the first English album and fourth studio album overall by American singer Marc Anthony. It was released on September 14, 1999 by Columbia. The album debuted in the top 10 on the US Billboard 200 and has since gone 3× Platinum in the United States. This was Anthony's first English album since his 1991 effort, When the Night Is Over, in which he recorded with Little Louie Vega. It sold more than 4 million copies worldwide.",
        genre: "Latin pop",
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
        genre: "Latin pop",
      },
      {
        name: "Boundless Audio Record Cleaner Brush",
        price: "15.99",
        category: "Accessory",
        quantity: "30",
        img_url: "https://m.media-amazon.com/images/I/61K2QykmDZL._AC_SL1500_.jpg",
        condition: "New",
        description: "Vinyl Cleaning Carbon Fiber Anti-Static Record Brush",
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
      }
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

     


async function testDB() {
  try {
    console.log("Starting to test database...");

    // console.log("Calling getAllProducts...")
    // const allProducts = await getAllProducts();
    // console.log("getAllProducts: ", allProducts)

    console.log("Calling getProductsByCategory(Record)...");
    const records = await getProductsByCategory("Record");
    console.log("getProductsByCategory(Record): ", records);

    console.log("Calling getProductsByCategory(Accessories)...");
    const accessories = await getProductsByCategory("Accessory");
    console.log("getProductsByCategory(Accessories): ", accessories);

    console.log("Calling getProductById... on id: 3");
    const product = await getProductById(3);
    console.log("getProductById: ", product);

//     console.log("Calling updateProducts on product[0]...");
//     const updateProductResult = await updateProduct(product[0].id, {
//       price: "10.00",
//       quantity: "100"
//     });
//     console.log("updateProductResult: ", updateProductResult);


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
