

const client = require("../client");
const { getAllUsers } = require("./user");


async function createReviewsTable() {
    try {
        await client.query(`
                            
        CREATE TABLE reviews(
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id),
            product_id INTEGER REFERENCES products(id),
            rating INTEGER NOT NULL CHECK(rating BETWEEN 1 and 5),
            content TEXT
        );
        `)
    } catch (error) {
        console.log("Error building reviews table!")
        throw error;
    }
}

async function createInitialReviews() {
    console.log("Starting to create initial reviews...")

    try {
        const [Sandra, Al, Glamorous] = await getAllUsers();
        await createReview({
            user_id: Sandra.id,
            product_id: "1",
            rating: "5",
            content: "It was delivered in great condition! I love how it was packaged, and it arrived earlier than I expected!"
        });

        await createReview({
            user_id: Al.id,
            product_id: "2",
            rating: "5",
            content: "Love love love this album, I'm glad I got it! Was packaged really well and shipping was fast, it arrived sooner than expected. On the records is a great place to shop with no difficulties at all. Thanks!"
        });

        await createReview({
            user_id: Glamorous.id,
            product_id: "3",
            rating: "5",
            content: "Amazing album, it was worth the investment!"
        });

        await createReview({
            user_id: Glamorous.id,
            product_id: "2",
            rating: "5",
            content: "Shipping was fast and came in great condition!"
        });

        await createReview({
            user_id: Al.id,
            product_id: "7",
            rating: "5",
            content: "Love Marc Anthony! I've been searching for a vinyl record of his Marc Anthony album and could not find it anywhere, I'm glad I was able to find it here."
        });

        await createReview({
            user_id: Sandra.id,
            product_id: "7",
            rating: "5",
            content: "This album is rare on the market, it was great having to find it here! And it also came in amazing condition."
        });

        console.log("Finished creating initial reviews...")
    } catch (error) {
        console.error("Error creating initial reviews!")
        throw error;
    }
}

async function createReview({
    user_id,
    product_id,
    rating,
    content
}) {
    try {
        const { rows: [review] } = await client.query(`
            INSERT INTO reviews(user_id, product_id, rating, content)
            VALUES($1, $2, $3, $4)
            RETURNING *; 
        `, [user_id, product_id, rating, content]);
        return review;
    } catch (error) {
        throw error;
    }
}

async function getReviewsByUser(user_id) { 
    try {
        const { rows: reviews } = await client.query(`
          SELECT reviews.*, users.email AS "creatorName"
          FROM reviews
          JOIN users ON reviews.user_id=users.id
          WHERE user_id=$1;
        `, [ user_id ]);
    
        return reviews;
      } catch(error) {
        console.log("Error in getReviewsByUser")
        throw error;
      }
}

async function getReviewsByProduct(product_id) {
    try {
        const { rows: reviews } = await client.query(`
          SELECT reviews.*, products.album_name AS "productName"
          FROM reviews
          JOIN products ON reviews.product_id=products.id
          WHERE product_id=$1;
        `, [ product_id ]);
    
        return reviews;
      } catch(error) {
        console.log("Error in getReviewsByProduct")
        throw error;
      }
}

async function updateReview(reviewId, fields = {}) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${key}" = $${ index + 1 }`
      ).join(', ');
      
      if (setString.length === 0) {
        return;
      }
      try {
        const { rows: [review] } = await client.query(`
          UPDATE reviews
          SET ${ setString }
          WHERE id= ${ reviewId }
          RETURNING *
        `, Object.values(fields));
    
        return review;
      } catch (error) {
        console.log("Error in updating Review!")
        throw error;
      }
}

async function deleteReview(id) {
    try {
        const { rows: [ deleteReview ] } = await client.query(`
            DELETE FROM reviews 
            WHERE id=$1 
            RETURNING *;
        `, [id])
    
        return deleteReview;
      } catch (error) {
        console.log("Error in deleteReview")
        throw error
      }
}
// check a logged in user previous orders. If product id and previous order (front end)
// check if the user already purchased the item to leave a review for




module.exports = {
    createReviewsTable,
    createInitialReviews,
    createReview,
    getReviewsByUser,
    getReviewsByProduct,
    updateReview,
    deleteReview
};