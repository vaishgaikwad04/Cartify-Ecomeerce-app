import axios from "axios";

const CategoryAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

// Create category
export const createCategory = (data) =>
  CategoryAPI.post("/category/create", data);

// Fetch all categories
export const fetchCategory = () =>
  CategoryAPI.get("/category/fetch");

// Fetch products by category with pagination
export const categoryData = (
  category,
  page = 1,
  limit = 8
) => {
  return CategoryAPI.get(
    `/api/products/fetch/${category}?page=${page}&limit=${limit}`
  );
};

// Get category by ID
export const getCategoryById = (id) =>
  CategoryAPI.get(`/category/fetch/${id}`);

// Delete category
export const deleteCategory = (id) =>
  CategoryAPI.delete(`/category/delete/${id}`);

// Update category
export const updateCategory = (id, data) =>
  CategoryAPI.put(`/category/update/${id}`, data);

export default CategoryAPI;