import axios from "axios";
const API_URL = 'http://localhost:4000/api'

export async function getAllProducts() {
  try {
    const { data } = await axios.get(`/api/products`);
    return data;
    // console.log(data)
  } catch (err) {
    console.error(err);
  }
}