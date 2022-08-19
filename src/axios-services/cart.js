import axios from "axios";
const API_URL = "http://localhost:4000/api";

export async function getMyCart() {
  try {
    const { data } = await axios.get(`/api/cart/mycart`, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    });

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function createUserCart({ user_id, order_status }){
  try {
    const { data } = await axios.post(`/api/cart/newUserCart`, {
      user_id,
      order_status
    });

    return data;
  } catch (error) {
    console.error(error);
  }
}


//SHELBYS ADD


export async function getGuestCart(){
  try {
    const { data } = await axios.get('/api/cart/guestCart')
    console.log("data from axios: ", data)
    return data;
  } catch (error) {
    console.log("Error getting guestCartIn Session")
    console.error(error)
  }
}

export async function addItemToGuestCart ({product_id, priceAtPurchase}) {
  console.log("Axios product_id, priceatpurchase: ", product_id, priceAtPurchase)
  try {
    const { data } = await axios.post(`/api/cart/guestCart`, {
      "product_id": product_id,
      "priceAtPurchase": priceAtPurchase
    })

    return data;
  } catch (error) {
    console.log("Error adding item to guestCart")
    console.error(error)
  }
}




// END SHELBYS ADD


export async function createGuestCart({ session_id, order_status}){
  try {
    const { data } = await axios.post('/api/cart/newGuestCart', {
      session_id,
      order_status
    })

    return data
  } catch (error) {
    console.error(error)
  }
}

export async function addCartItem({ product_id, priceAtPurchase, cart_id }) {
  try {
    const { data } = await axios.post("/api/cart/", {
      product_id,
      priceAtPurchase,
      cart_id,
    });
    console.log("added item to cart!")
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
