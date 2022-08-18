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
    const { data } = await axios.post('/api/users/register', {
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`
    }
    }, {
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

//User Test
export async function testMe() {
  try {
      const { data } = await axios.get('/api/users/me', {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.token}`
          }});
          return data;
  } catch (error) {
    console.log("testMe did not pass//No logged in user")
    throw error;
  }
}