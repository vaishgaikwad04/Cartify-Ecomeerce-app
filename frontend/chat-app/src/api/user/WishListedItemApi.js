import axios from "axios";

const WishListedItemApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const createWishList = (productId) =>
  WishListedItemApi.post("/wishListedItem/create", {
    productId,
  });

export const fetchWishListedItem = () =>
  WishListedItemApi.get("/wishListedItem");

export const removeWishListedItem = (id) =>
  WishListedItemApi.delete(`/wishListedItem/delete/${id}`);

export default WishListedItemApi;