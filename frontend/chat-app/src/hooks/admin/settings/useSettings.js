import React, { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { updateSettings } from "../../../api/user/SettingsApi";
import { getAdminSettings } from "../../../api/user/SettingsApi";
import { NotificationContext } from "../../../context/NotificationContext";
import {logoutUser} from "../../../api/auth/AuthApi"
import { useNavigate } from "react-router-dom";

export const useSettings = () => {
const navigate = useNavigate()
      const { theme, setTheme } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState("profile");
  const [settings, setSettings] = useState({
    role: "",
    name: "",
    email: "",
    notification: true,
    theme: "Light Mode",
  });

  const isDark = theme === "Dark Mode";
  const { setAllowNotification } = useContext(NotificationContext);

 const fetchSettings = async () => {
  try {
    const res = await getAdminSettings();
    const data = res.data
     setSettings({
      name: data.name,
      email: data.email,
      role: data.role,
      notification: data.notification,
      theme: data.theme,
    });

    setTheme(data.theme);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  console.log("useEffect running");
  fetchSettings();
}, []);

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // SAVE SETTINGS
  const saveSettings = async () => {
    try {
      const res = await updateSettings(settings);
      setTheme(settings.theme);
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  }, [settings]);
  

   // LOGOUT
  const handleLogout = async () => {
    try {
      // Call logout API
      await logoutUser();

      // Navigate to authentication page
      navigate("/auth");
    } catch (error) {
      console.error(
        "Logout error:",
        error?.response?.data || error?.message
      );
    }
  };

  return {
  // Theme
  theme,
  setTheme,
  isDark,

  // Active tab
  activeTab,
  setActiveTab,

  // Settings data
  settings,
  setSettings,

  // Settings actions
  handleChange,
  saveSettings,
  fetchSettings,

  // Notification
  setAllowNotification,
  handleLogout

};
}

