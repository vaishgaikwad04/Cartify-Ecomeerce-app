import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// API
import { getUserSettings } from "../../api/user/SettingsApi";
import { searchProducts } from "../../api/user/ProductApi";

// Context
import { ThemeContext } from "../../context/ThemeContext";
import { NotificationContext } from "../../context/NotificationContext";

export const useHeader = () => {
  // ==========================================
  // NAVIGATION
  // ==========================================

  const navigate = useNavigate();

  // ==========================================
  // THEME
  // ==========================================

  const { theme } = useContext(ThemeContext);

  const isDark = theme === "Dark Mode";

  // ==========================================
  // NOTIFICATIONS
  // ==========================================

  const { allowNotification, unreadCount } = useContext(NotificationContext);

  // ==========================================
  // MOBILE MENU
  // ==========================================

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [openMobileMenu, setOpenMobileMenu] = useState(null);

  // ==========================================
  // PROFILE
  // ==========================================

  const [profileData, setProfileData] = useState(null);

  // ==========================================
  // CART DRAWER
  // ==========================================

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // ==========================================
  // SEARCH
  // ==========================================

  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [results, setResults] = useState([]);

  const [searchLoading, setSearchLoading] = useState(false);

  // ==========================================
  // FETCH PROFILE
  // ==========================================

  const fetchProfile = async () => {
    try {
      const res = await getUserSettings();

      const data = res?.data?.data;

      if (!data) {
        setProfileData(null);
        return;
      }

      setProfileData({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
      });
    } catch (error) {
      console.error(
        "Profile fetch error:",
        error?.response?.data || error?.message,
      );

      setProfileData(null);
    }
  };

  // ==========================================
  // FETCH PROFILE ON MOUNT
  // ==========================================

  useEffect(() => {
    fetchProfile();
  }, []);

  // ==========================================
  // SEARCH PRODUCTS
  // ==========================================

  const handleSearch = async (value) => {
    setSearchTerm(value);

    // Clear results when input is empty
    if (!value.trim()) {
      setResults([]);
      return;
    }

    try {
      setSearchLoading(true);

      const res = await searchProducts(value);

      setResults(res?.data?.data || []);
    } catch (error) {
      console.error("Search error:", error?.response?.data || error?.message);

      setResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  // ==========================================
  // CLOSE SEARCH
  // ==========================================

  const closeSearch = () => {
    setIsSearchModalOpen(false);
    setSearchTerm("");
    setResults([]);
  };

  // ==========================================
  // PRODUCT CLICK
  // ==========================================

  const handleProductClick = (id) => {
    navigate(`/description/${id}`);

    closeSearch();
  };

  // ==========================================
  // CLOSE MOBILE MENU
  // ==========================================

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileMenu(null);
  };

  // ==========================================
  // BODY SCROLL LOCK
  // ==========================================

  useEffect(() => {
    const shouldLockScroll =
      isCartDrawerOpen || isSearchModalOpen || isMobileMenuOpen;

    document.body.style.overflow = shouldLockScroll ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isCartDrawerOpen, isSearchModalOpen, isMobileMenuOpen]);

  // ==========================================
  // ESCAPE KEY
  // ==========================================

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key !== "Escape") return;

      closeSearch();

      setIsCartDrawerOpen(false);

      closeMobileMenu();
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  // ==========================================
  // RETURN
  // ==========================================

  return {
    // Navigation
    navigate,

    // Theme
    theme,
    isDark,

    // Notifications
    allowNotification,
    unreadCount,

    // Profile
    profileData,

    // Mobile menu
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    openMobileMenu,
    setOpenMobileMenu,
    closeMobileMenu,

    // Cart
    isCartDrawerOpen,
    setIsCartDrawerOpen,

    // Search
    isSearchModalOpen,
    setIsSearchModalOpen,
    searchTerm,
     setSearchTerm,
    results,
   

    searchLoading,
    handleSearch,
    closeSearch,
    handleProductClick,
  };
};
