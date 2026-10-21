import axios from "axios"

const api = axios.create({
  baseURL: "http://localhost:3100",
  withCredentials: true
})

export async function register({ name, email, password }) {
  try {
    const response = await api.post("/api/auth/register", {
      name,
      email,
      password
    })

    return response.data
  } catch (err) {
  console.log("REGISTER ERROR:", err.response?.data)
    throw err
  }
}


export async function login({ email, password }) {
  try {
    console.log("LOGIN REQUEST:", { email, password: "******" });

    const response = await api.post("/api/auth/login", {
      email,
      password
    });

   
    return response.data;
  } catch (err) {
    console.log("STATUS:", err.response?.status);
    console.log("BACKEND ERROR:", err.response?.data);
    console.log("REQUEST BODY:", err.config?.data);
    throw err;
  }
}



export async function logout() {
  try {
    const response = await api.get("/api/auth/logout")

    return response.data
  } catch (err) {
    console.log(err)
  }
}


export async function getMe() {
  try {
    const response = await api.get("/api/auth/get-me");
    return response.data;
  } catch (err) {
    console.log(
      "GET ME ERROR:",
      err.response?.data || err.message
    );
    throw err;
  }
}
