import axios from "axios";

// get users
export const loadUsersApi = async () =>
  await axios.get("http://localhost:5000/users");

// create user
export const createUsersApi = async (user) =>
  await axios.post("http://localhost:5000/users", user);

// delete user
export const deleteUsersApi = async (userId) =>
  await axios.delete(`http://localhost:5000/users/${userId}`);

// update user
export const updateUsersApi = async (userId, userInfo) =>
  await axios.put(`http://localhost:5000/users/${userId}`, userInfo);
