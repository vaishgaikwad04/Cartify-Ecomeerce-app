import axios from "axios";

const ProductAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

export const createProduct = (data) =>
  ProductAPI.post("/products/create", data);

export const fetchProduct = () =>
  ProductAPI.get("/products/fetch");

export const fetchSingleProduct = (id) =>
  ProductAPI.get(`/products/getSingleProduct/${id}`);

export const updateProduct = (id, data) =>
  ProductAPI.put(`/products/update/${id}`, data);

export const deleteProduct = (id) =>
  ProductAPI.delete(`/products/delete/${id}`);

export const getDashboardStats = () =>
  ProductAPI.get("/products/stats");

export const handleToggle = (id) =>
  ProductAPI.get(`/products/toggle/${id}`);

export const categoryData = (category) =>
  ProductAPI.get(`/products/fetch/${category}`);

export const searchProducts = (query) =>
  ProductAPI.get(`/products/search?q=${query}`);

export const getProductsByBrandName = (brand) =>
  ProductAPI.get(`/products/brand?brand=${brand}`);

export default ProductAPI;