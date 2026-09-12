import React, { useState, useEffect, useContext } from "react";
import { FiBell, FiSearch } from "react-icons/fi";
import { ThemeContext } from "../../context/ThemeContext";
import { getAdminSettings } from "../../api/user/SettingsApi";
import { getSearchItem } from "../../api/user/DashboardApi";

const Header = () => {
  const [profileData, setProfileData] = useState(null);
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const fetchSettings = async () => {
    try {
      const res = await getAdminSettings();
      setProfileData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSearch = async (value) => {
    setSearch(value);

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setIsSearching(true);

      const res = await getSearchItem(value);

      setSearchResults(res.data.products);
      console.log(res.data.products)
    } catch (error) {
      console.log(error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <header
      className={`
                px-6 py-4 flex items-center justify-between border-b
                ${
                  isDark
                    ? "bg-gray-900 border-gray-700"
                    : "bg-white border-gray-200"
                }
            `}
    >
      {/* Left */}

      <div>
        <h1
          className={`
                        text-2xl font-bold
                        ${isDark ? "text-white" : "text-gray-900"}
                    `}
        >
          Products
        </h1>

        <p
          className={`
                        text-sm
                        ${isDark ? "text-gray-400" : "text-gray-500"}
                    `}
        >
          Manage inventory and product listings
        </p>
      </div>

      {/* Right */}

      <div className="flex items-center gap-4">
        {/* Search */}

        <div className="relative">
          <FiSearch
            className="
                            absolute left-3 top-1/2
                            -translate-y-1/2
                            text-gray-400
                        "
          />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className={`
    pl-10 pr-4 py-2 rounded-xl w-64 border
    focus:outline-none focus:ring-2

    ${
      isDark
        ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:ring-white"
        : "bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:ring-black"
    }
  `}
          />
        </div>

        {/* Notification */}

        <button
          className={`
                        relative p-3 rounded-xl border transition

                        ${
                          isDark
                            ? "border-gray-600 text-white hover:bg-gray-800"
                            : "border-gray-200 text-gray-900 hover:bg-gray-50"
                        }
                    `}
        >
          <FiBell size={20} />

          <span
            className="
                            absolute top-2 right-2
                            w-2 h-2
                            bg-red-500
                            rounded-full
                        "
          />
        </button>

        {/* Profile */}

        <div
          className={`
                        flex items-center gap-3
                        rounded-xl px-3 py-2
                        cursor-pointer border transition

                        ${
                          isDark
                            ? "border-gray-600 hover:bg-gray-800"
                            : "border-gray-200 hover:bg-gray-50"
                        }
                    `}
        >
          <div
            className="
                            w-9 h-9
                            bg-black text-white
                            rounded-full
                            flex items-center justify-center
                            font-semibold
                        "
          >
            {profileData?.name?.charAt(0).toUpperCase()}
          </div>

          <div className="hidden md:block">
            <p
              className={`
                                text-sm font-medium
                                ${isDark ? "text-white" : "text-gray-800"}
                            `}
            >
              {profileData?.name}
            </p>

            <p
              className={`
                                text-xs
                                ${isDark ? "text-gray-400" : "text-gray-500"}
                            `}
            >
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
