import axios from "axios";
const API_URL = "http://localhost:4000/api";


export async function getReviewsUserId(userId) {
  try {
    const { data } = await axios.get(`/api/reviews/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
  }
}


export async function getReviewsProductId(productId) {
  try {
    const { data } = await axios.get(`/api/reviews/products/${productId}`)

    return data;
  } catch (error) {
    console.error(error);
  }
}


export async function createNewReview({ user_id, product_id, rating, content }) {
  try {
    const { data } = await axios.post(`/api/reviews`, {
      // headers: {
      //   Authorization: `Bearer ${localStorage.token}`,
      // }
    // },
      // {
        user_id,
        product_id,
        rating,
        content
      });

    return data;
  } catch (error) {
    console.error(error);
  }
}

