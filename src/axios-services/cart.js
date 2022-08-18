import axios from "axios";
const API_URL = "http://localhost:4000/api";

export async function getMyCart() {
  try {
    const { data } = await axios.get(`/api/cart/`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });
    // console.log("Data from getMyCart: ", data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function addCartItem({ product_id, priceAtPurchase, cart_id }) {
  try {
    const { data } = await axios.post("/api/cart/", {
      product_id,
      priceAtPurchase,
      cart_id,
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function deleteCartItem(cartedItemId) {
  try {
    console.log("this is carted item id in axios", cartedItemId)
    const { data } = await axios.delete("/api/cart/", {
      data: {
        cartedItemId: cartedItemId
      }
    });
    // console.log("This is the axios data", data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
