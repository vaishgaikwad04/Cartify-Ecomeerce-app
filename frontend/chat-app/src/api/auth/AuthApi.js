import axios from "axios";

const AuthAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const registerUser = (data) => AuthAPI.post("/auth/register", data);

export const loginUser = (data) => AuthAPI.post("/auth/login", data);

export const logoutUser = () => AuthAPI.post("/auth/logout");

export const getCurrentUser = () =>
  AuthAPI.get("/auth/me");

export const getUsers = () => AuthAPI.get("/auth/users");

export const getUserById = (id) => AuthAPI.get(`/auth/${id}`);

export const deleteUser = (id) => AuthAPI.delete(`/auth/delete/${id}`);

export const updataUser = (id, data) =>
  AuthAPI.put(`/auth/update/${id}`, data);

export const getSettings = () => AuthAPI.get("/auth/settings");

export const updateSettings = (data) =>
  AuthAPI.put("/auth/settings", data);

export const googleLogin = (userData) => {
  return axios.post(
    `${import.meta.env.VITE_API_URL}/auth/google`,
    userData,
    {
      withCredentials: true,
    }
  );
};

export default AuthAPI;