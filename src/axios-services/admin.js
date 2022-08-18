import axios from "axios"
const API_URL = 'http://localhost:4000/api'




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

//   try {
//     const { data } = await axios.patch(`/api/admin/products/${productId}`,
//       {
//         headers: {
//           'Authorization': `Bearer ${localStorage.token}`
//         }
//       },
//     );
//     return data;
//   } catch (error) {
//     console.log("Error in patch product!!")
//     console.error(error)
//   }
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