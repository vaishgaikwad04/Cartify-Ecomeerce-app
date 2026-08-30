import axios from "axios";

const ReviewAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  withCredentials: true,
});

export const fetchAllReviews = () =>
  ReviewAPI.get("/review/all");

export const createReview = (data) =>
  ReviewAPI.post("/review/create", data);

export const fetchReview = (productId) =>
  ReviewAPI.get(`/review/${productId}`);

export const fetchSingleReview = (id) =>
  ReviewAPI.get(`/review/singleReview/${id}`);

export const updateReview = (id, data) =>
  ReviewAPI.put(`/review/${id}`, data);

export const deleteReview = (id) =>
  ReviewAPI.delete(`/review/${id}`);

export default ReviewAPI;