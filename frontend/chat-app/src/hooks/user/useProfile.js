import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// API
import { logoutUser } from "../../api/auth/AuthApi";
import { getUserSettings } from "../../api/user/SettingsApi";

// Context
import { ThemeContext } from "../../context/ThemeContext";

export const useProfile = () => {
  // NAVIGATION
  const navigate = useNavigate();

  // THEME
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  // PROFILE STATE
  const [profileData, setProfileData] = useState(null);

  // Controls profile loading state
  const [loading, setLoading] = useState(true);


  // FETCH USER PROFILE
  const fetchProfile = async () => {
    try {
      setLoading(true);

      // Fetch logged-in user's profile/settings
      const res = await getUserSettings();

      // Extract profile data from API response
      const data = res?.data?.data;

      // If no profile data is returned
      if (!data) {
        setProfileData(null);
        return;
      }

      // Store only the data required by Profile page
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
      // Stop loading after API request completes
      setLoading(false);
    }
  };


  // FETCH PROFILE ON MOUNT
  useEffect(() => {
    fetchProfile();
  }, []);


  // LOGOUT
  // const handleLogout = async () => {
  //   try {
  //     // Call logout API
  //     await logoutUser();

  //     // Navigate to authentication page
  //     navigate("/auth");
  //   } catch (error) {
  //     console.error(
  //       "Logout error:",
  //       error?.response?.data || error?.message
  //     );
  //   }
  // };

    const handleLogout = async () => {
    try {
      // Clear Cartify JWT cookie
      await logoutUser();

      // Clear Firebase/Google authentication
      await signOut(auth);

      // Clear React user state
      setUser(null);

      toast.success("Logged out successfully");
      navigate("/auth?mode=login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };

  return { handleLogout };
};

  // RETURN
  return {
    profileData,
    loading,
    handleLogout,
    isDark,
    navigate,
  };
