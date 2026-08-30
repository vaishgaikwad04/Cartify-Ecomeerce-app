import axios from "axios";

const SettingsApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const getUserSettings = () =>
  SettingsApi.get("/settings/user");

export const getAdminSettings = () =>
  SettingsApi.get("/settings/admin");

export const updateSettings = (data) =>
  SettingsApi.put("/settings", data);

export default SettingsApi;