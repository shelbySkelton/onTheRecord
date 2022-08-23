import axios from "axios"

// Log In
export async function loginUser({ email, password }) {
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


//Edit My Account
export async function updateAccount(id, email, first_name, last_name) {
  console.log("AXIOS: id, email fname lname: ", id, email, first_name, last_name)

  try {
    const { data } = await axios.patch(`/api/users/${id}`,
      {
        "id": id,
        "email": email,
        "first_name": first_name,
        "last_name": last_name
      },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.token}`
        }
      }
    );
    console.log("data from axios call: ", data)
    return data;
  } catch (error) {
    console.log("Error in updating account")
    throw error;
  }
}

//View My Orders
export async function viewOrders(userId) {  
  try {
    const { data } = await axios.get(`/api/users/${userId}/orders`, {
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    });
    return data;
  } catch (error) {
    console.log("Error in viewOrders")
    throw error;
  }
}


// Register
export async function registerUser({ email, password, first_name, last_name }) {
  try {
    const { data } = await axios.post('/api/users/register', {
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
      }
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getMyAccount() {
  try {
    const { data } = await axios.get(`/api/users/me`, {
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