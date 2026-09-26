import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Firebase
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase";

// Toast
import toast from "react-hot-toast";

// API
import { logoutUser } from "../../api/auth/AuthApi";
import { getUserSettings } from "../../api/user/SettingsApi";

// Context
import { ThemeContext } from "../../context/ThemeContext";
import { AuthContext } from "../../context/AuthContext";

export const useProfile = () => {
  // NAVIGATION
  const navigate = useNavigate();

  // THEME
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  // AUTH
  const { setUser } = useContext(AuthContext);

  // PROFILE STATE
  const [profileData, setProfileData] = useState(null);

  const [loading, setLoading] = useState(true);

  // FETCH USER PROFILE
  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await getUserSettings();

      const data = res?.data?.data;

      if (!data) {
        setProfileData(null);
        return;
      }

      setProfileData({
        name: data.name || "User",
        email: data.email || "",
        phone: data.phone || "",
      });
    } catch (error) {
      console.error(
        "Profile fetch error:",
        error?.response?.data || error?.message
      );

      setProfileData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // LOGOUT
  const handleLogout = async () => {
    try {
      // 1. Clear Cartify JWT cookie
      await logoutUser();

      // 2. Clear Firebase / Google authentication
      await signOut(auth);

      // 3. Clear React authentication state
      setUser(null);

      // 4. Show success message
      toast.success("Logged out successfully");

      // 5. Go to login page
      navigate("/auth?mode=login");
    } catch (error) {
      console.error("Logout error:", error);

      toast.error("Logout failed");
    }
  };

  return {
    profileData,
    loading,
    handleLogout,
    isDark,
    navigate,
  };
};