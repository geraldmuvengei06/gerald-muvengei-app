// src/services/authService.js

import axios from "axios";

const API_URL =
  "https://kcb-boma-yangu-backend-kcb-boma-yangu.apps.dev.aro.kcbgroup.com"; // Replace with your API endpoint


// Logout service
export function logoutUser() {
  localStorage.removeItem("jwt_token");
  localStorage.removeItem("user");
}

export function getToken() {
  return localStorage.getItem("jwt_token");
}


export function getUser() {
  return localStorage.getItem("user");
}
