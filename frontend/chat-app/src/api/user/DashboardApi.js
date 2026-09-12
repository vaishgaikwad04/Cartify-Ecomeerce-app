import axios from "axios";

const DashboardAPI = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const getSearchItem = (search) =>
  DashboardAPI.get(`/dashboard/search?q=${search}`);

export default DashboardAPI;
