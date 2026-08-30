import axios from "axios";

const CategoryAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const createCategory = (data) =>
  CategoryAPI.post("/category/create", data);

export const fetchCategory = () =>
  CategoryAPI.get("/category/fetch");

export const getCategoryById = (id) =>
  CategoryAPI.get(`/category/fetch/${id}`);

export const deleteCategory = (id) =>
  CategoryAPI.delete(`/category/delete/${id}`);

export const updateCategory = (id, data) =>
  CategoryAPI.put(`/category/update/${id}`, data);

export default CategoryAPI;