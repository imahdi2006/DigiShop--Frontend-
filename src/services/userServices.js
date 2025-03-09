import apiclient from "../utils/api-cleint";
import { jwtDecode } from "jwt-decode";

// tokens name
const tokenName = "token";

// signup
export async function signup(user, profile) {
  const body = new FormData();
  body.append("name", user.name);
  body.append("email", user.email);
  body.append("password", user.password);
  body.append("deliveryAddress", user.deliveryAddress);
  body.append("profilePic", profile);

  const { data } = await apiclient.post("/user/signup", body);
  localStorage.setItem(tokenName, data.token);
}
// login
export async function login(user) {
  const { data } = await apiclient.post("/user/login", user);
  localStorage.setItem(tokenName, data.token);
}
// logout
export function logout() {
  localStorage.removeItem(tokenName);
}
// get user
export function getUser() {
  try {
    const jwt = localStorage.getItem(tokenName);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenName);
}
