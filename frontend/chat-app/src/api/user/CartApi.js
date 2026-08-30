import axios from "axios";

const CartAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const addToCart = (data) =>
  CartAPI.post("/addToCart/add", data);

export const getOrderData = () =>
  CartAPI.get("/addToCart/order");

export const getCart = () =>
  CartAPI.get("/addToCart/get");

export const updateCart = (data) =>
  CartAPI.put("/addToCart/update", data);

export const removeFromCart = (productId) =>
  CartAPI.delete(`/addToCart/remove/${productId}`);

export default CartAPI;