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

export async function getAllRecords() {
  try {
    const { data } = await axios.get(`/api/products/records`);
    return data;
    // console.log(data)
  } catch (err) {
    console.error(err);
  }
}

export async function getAllAccessories() {
  try {
    const { data } = await axios.get(`/api/products/accessories`);
    return data;
  } catch (err) {
    console.error(err);
  }
}

export async function getProductById(productId) {
  try {
    const { data } = await axios.get(`/api/products/${productId}`);
    return data;
  } catch (err) {
    console.error(err)    
  }
}

