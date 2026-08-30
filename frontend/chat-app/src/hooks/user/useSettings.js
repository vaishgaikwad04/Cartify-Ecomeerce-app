import React, { useState, useEffect, useContext } from "react";

// Context
import { ThemeContext } from "../../context/ThemeContext";
import { NotificationContext } from "../../context/NotificationContext";

// API
import { updateSettings, getUserSettings } from "../../api/user/SettingsApi";

export const useSettings = () => {
  // THEME CONTEXT
  const { theme, setTheme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  // NOTIFICATION CONTEXT
  const { setAllowNotification } = useContext(NotificationContext);

  // ACTIVE TAB
  const [activeTab, setActiveTab] = useState("profile");

  // SETTINGS STATE
  const [settings, setSettings] = useState({
    role: "",
    name: "",
    email: "",
    phone: "",
    notification: true,
    theme: "Light Mode",
  });

  //Used to take the user's input and store it in settings state:
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings((prev) => ({
      ...prev,

      // Checkbox uses checked instead of value
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // FETCH SETTINGS
  const fetchSettings = async () => {
    try {
      const res = await getUserSettings();

      const data = res?.data?.data;

      if (!data) {
        return;
      }

      setSettings({
        role: data.role || "",
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        notification: data.notification ?? false,
        theme: data.theme || "Light Mode",
      });

      // Keep ThemeContext synchronized with API data
      if (data.theme) {
        setTheme(data.theme);
      }

      // Keep NotificationContext synchronized with API data
      if (typeof data.notification === "boolean") {
        setAllowNotification(data.notification);
      }

      console.log("User settings loaded");
    } catch (error) {
      console.error(
        "Settings fetch error:",
        error?.response?.data || error?.message,
      );
    }
  };

  // Fetch settings when component using this hook mounts
  useEffect(() => {
    fetchSettings();
  }, []);
  0;

  // SAVE SETTINGS
  const saveSettings = async () => {
    try {
      const res = await updateSettings(settings);

      console.log("Settings updated:", res?.data);

      // Make sure global contexts match saved settings
      setTheme(settings.theme);
      setAllowNotification(settings.notification);

      return res;
    } catch (error) {
      console.error(
        "Settings update error:",
        error?.response?.data || error?.message,
      );

      throw error;
    }
  };

  // Updatestheme setting in local state and global themeContext
  const handleThemeChange = (newTheme) => {
    setSettings((prev) => ({
      ...prev,
      theme: newTheme,
    }));

    // Update global ThemeContext immediately
    setTheme(newTheme);
  };

  // Updates notification setting in local state and global NotificationContext
  const handleNotificationChange = (value) => {
    setSettings((prev) => ({
      ...prev,
      notification: value,
    }));

    // Updates notification setting in local state and global NotificationContext
    setAllowNotification(value);
  };

  // RETURN
  return {
    settings,
    setSettings,
    theme,
    setTheme,
    isDark,
    handleThemeChange,
    handleNotificationChange,
    setAllowNotification,
    activeTab,
    setActiveTab,
    handleChange,
    fetchSettings,
    saveSettings,
  };
};
