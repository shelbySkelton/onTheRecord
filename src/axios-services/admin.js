import axios from "axios"
const API_URL = 'http://localhost:4000/api'




export async function getAllProducts() {
  try {
    const { data } = await axios.get(`/api/admin/products`);
    return data;
    console.log('admin product data: ', data)
  } catch (err) {
    console.error(err);
  }
}