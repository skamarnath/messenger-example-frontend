import axios from "axios";

const baseUrl = process.env.VUE_APP_API_BASE;

function buildAuthHeader() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  return user == null ? {} : { Authorization: `Bearer ${user.jwt}` };
}

export async function signUp(nickname, password) {
  const response = await axios.post(`${baseUrl}/auth/signup`, {
    nickname,
    password
  });
  return response.data;
}

export async function login(nickname, password) {
  const response = await axios.post(`${baseUrl}/auth/login`, {
    nickname,
    password
  });
  return response.data;
}

export async function getUsers() {
  const response = await axios.get(`${baseUrl}/users`, {
    headers: buildAuthHeader()
  });
  return response.data;
}
