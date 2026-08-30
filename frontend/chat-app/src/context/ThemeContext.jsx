import { createContext, useEffect, useState } from "react";
import { getAdminSettings } from "../api/user/SettingsApi";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("Light Mode");

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const res = await getAdminSettings();
        const user = res.data.data;

        setTheme(user.theme);
      } catch (err) {
        console.log(err);
      }
    };

    loadTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};