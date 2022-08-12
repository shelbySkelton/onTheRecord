import axios from "axios"

// Log In
export async function loginUser({ email, password }){
  try {
    const { data } = await axios.post('/api/users/login', {
      email,
      password
    })

    return data;
  } catch (error) {
    console.log("Error in loginUser")
    throw error
  }
}

// Register
export async function registerUser({ email, password, first_name, last_name }){
  try {
    const { data } = await axios.post('/api/users/resgister', {
      email,
      password,
      first_name,
      last_name
    })
    return data;
  } catch (error) {
    console.log("Error in registerUser");
    throw error;
  }
}