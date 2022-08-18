import axios from 'axios';
const API_URL = 'http://localhost:4000/api'


export async function getMyCart() {
    try {
        const { data } = await axios.get(`/api/cart/`, {
            headers: {
                'Authorization': `Bearer ${localStorage.token}`
            }
        });
        console.log("Data from getMyCart: ", data)
        return data;
    } catch (error) {
        console.error(error)
    }
}