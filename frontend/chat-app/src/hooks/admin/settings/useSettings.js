import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ThemeContext } from "../../../context/ThemeContext";
import {
  updateSettings,
  getAdminSettings,
} from "../../../api/user/SettingsApi";

import { NotificationContext } from "../../../context/NotificationContext";
import { logoutUser } from "../../../api/auth/AuthApi";

export const useSettings = () => {
  const navigate = useNavigate();

  // Theme context
  const { theme, setTheme } = useContext(ThemeContext);

  // Notification context
  const { setAllowNotification } = useContext(NotificationContext);

  // Active settings tab
  const [activeTab, setActiveTab] = useState("profile");

  // Settings data
  const [settings, setSettings] = useState({
    role: "",
    name: "",
    email: "",
    notification: true,
    theme: "Light Mode",
  });

  // Check if current theme is dark
  const isDark = theme === "Dark Mode";

  // FETCH SETTINGS
  const fetchSettings = async () => {
    try {
      const res = await getAdminSettings();

      const data = res.data.data;

      console.log("Settings from API:", data);

      // Fill form with saved settings
      setSettings({
        name: data.name ?? "",
        email: data.email ?? "",
        role: data.role ?? "",
        notification: data.notification ?? true,
        theme: data.theme ?? "Light Mode",
      });


      // Apply saved theme
      setTheme(data.theme ?? "Light Mode");

      // Apply saved notification setting
      setAllowNotification(data.notification ?? true);
    } catch (error) {
      console.log(
        "Fetch settings error:",
        error?.response?.data || error?.message
      );
    }
  };

  // Fetch saved settings when Settings page opens
  useEffect(() => {
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
      await updateSettings(settings);

      // Apply theme immediately
      setTheme(settings.theme);

      // Apply notification immediately
      setAllowNotification(settings.notification);

      console.log("Settings saved successfully");
    } catch (error) {
      console.log(
        "Update settings error:",
        error?.response?.data || error?.message
      );
    }
  };

  // LOGOUT
  const handleLogout = async () => {
    try {
      // Logout API
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

    // Logout
    handleLogout,
  };
};