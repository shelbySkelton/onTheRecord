import axios from "axios"
const API_URL = 'http://localhost:4000/api'




export async function getAllUsers() {
  try {
    const { data } = await axios.get(`/api/admin/users`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    });
    return data;
  } catch (error) {
    console.error(error)
  }
}

export async function getUserById(userId) {
  console.log("userId: ", userId)
  try {
    const { data } = await axios.get(`/api/admin/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    });
    console.log("data: ", data)
    return data;
  } catch (error) {
    console.error(error)
  }
}

export async function getUsersOrders(userId) {
  try {
    const { data } = await axios.get(`/api/admin/${userId}/orders`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    });
    return data;
  } catch (error) {
    console.log("Error getting user's orders")
    throw error;
  }
}

export async function updateUserStatus(userId, status) {
  try {
    const { data } = await axios.patch(`/api/admin/users/${userId}`, 
    {
      "isAdmin": status
    },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    });
    return data;
  } catch (error) {
    console.log("Error in updateUserStatus")
  }
}

export async function updateOrderStatus(orderId, status) {
  try {
    const { data } = await axios.patch(`/api/admin/orders/${orderId}`, 
    {
      "status": status
    },
    {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    });
    return data;
  } catch (error) {
    console.log("Error in updateOrderStatus")
    throw error;
  }
}



export async function getAdminProducts() {
  try {
    const { data } = await axios.get(`/api/admin/products`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    });
    return data;
  } catch (error) {
    console.error(error)
  }
}


export async function createProduct(
                        name,
                        price,
                        category,
                        quantity,
                        img_url,
                        condition,
                        album_name,
                        artist,
                        description,
                        genre,
                        status) {
  try {
    const { data } = await axios.post(`/api/admin/products`,
      {
        "name": name,
        "price": price,
        "category": category,
        "quantity": quantity,
        "img_url": img_url,
        "condition": condition,
        "album_name": album_name,
        "artist": artist,
        "description": description,
        "genre": genre,
        "status": status
      },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      },
    );
    return data;
  } catch (error) {
    console.log("Error in createProduct axios!")
    console.error(error)
  }
}

export async function deactivateProduct(productId) {
  try {
    console.log("this is my productId in axios: ", productId)
    const { data } = await axios.patch(`/api/admin/products/${productId}`,
      {
          "status": "Inactive"
      },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      },
    );
    return data;
  } catch (error) {
    console.log("Error in deactivate product!!")
    console.error(error)
  }
}



export async function patchProduct(
  productId,
  name,
  price,
  category,
  quantity,
  img_url,
  condition,
  album_name,
  artist,
  description,
  genre,
  status) {

  try {
    const { data } = await axios.patch(`/api/admin/products/${productId}`,
      {
        "name": name,
        "price": price,
        "category": category,
        "quantity": quantity,
        "img_url": img_url,
        "condition": condition,
        "album_name": album_name,
        "artist": artist,
        "description": description,
        "genre": genre,
        "status": status
      },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      },
    );
    return data;
  } catch (error) {
    console.log("Error in patch product!!")
    console.error(error)
  }
}