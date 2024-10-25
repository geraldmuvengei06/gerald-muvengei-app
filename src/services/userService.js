// src/services/userService.js

import api from "@/axiosInstance";

import { getToken } from "./apiService";
    const token = getToken();


// CREATE: Add a new user
export async function createUser(userData) {
  const response = await api.post("/users/create", {
    payload: userData,
    token: token,
  });
  return response.data;
}

// READ: Get user details by username
export async function getUsers() {
  const response = await api.post(`/users/listAll`, {
    token: token,
  });
  
  return response.data.payload.content;
}

// UPDATE: Update user details
export async function editUser(userData) {
  const response = await api.post("/users/edit", {
    payload: userData,
    token: token,
  });
  return response.data;
}

// DELETE: Remove a user by username
export async function deleteUser(username) {
  const response = await api.delete(`/users/${username}`);
  return response.data;
}


// Search
export async function searchUser(usrUsername) {
  const response = await api.post(`/users/search`, {
    token: token,
    payload: {
      usrUsername: usrUsername,
    },
  });
  
  return response.data.payload;
}