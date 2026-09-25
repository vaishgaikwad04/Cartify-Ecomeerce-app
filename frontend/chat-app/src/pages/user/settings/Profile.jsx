import {
  FiPackage,
  FiHeart,
  FiMapPin,
  FiSettings,
  FiLogOut,
  FiChevronRight,
  FiMail,
  FiPhone,
} from "react-icons/fi";
import { CircleHelp } from "lucide-react";

import { useProfile } from "../../../hooks/user/useProfile";

const Profile = () => {
  // PROFILE HOOK
  const { profileData, loading, handleLogout, isDark, navigate } = useProfile();

  // ACCOUNT MENU
  const accountItems = [
    {
      title: "My Orders",
      description: "View your orders and track purchases",
      icon: <FiPackage />,
      path: "/orders",
    },
    {
      title: "Wishlist",
      description: "View products you saved for later",
      icon: <FiHeart />,
      path: "/wishListedItems",
    },
    {
      title: "Addresses",
      description: "Manage your delivery addresses",
      icon: <FiMapPin />,
      path: "/addresses",
    },
    {
      title: "Help & Support",
      description: "Get help with your orders and account",
      icon: <CircleHelp size={18} />,
      path: "/help",
    },
    {
      title: "Settings",
      description: "Manage your account preferences",
      icon: <FiSettings />,
      path: "/settings",
    },
  ];

  // LOADING STATE
  if (loading) {
    return (
      <div
        className={`
          min-h-screen
          flex
          items-center
          justify-center
          px-3
          ${isDark ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}
        `}
      >
        <p className="text-xs sm:text-sm opacity-60">Loading profile...</p>
      </div>
    );
  }

  return (
    <div
      className={`
        min-h-screen
        px-3
        sm:px-4
        py-4
        sm:py-5
        transition-colors
        duration-300
        ${isDark ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}
      `}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* ================= PAGE HEADER ================= */}
        <div className="mb-4 sm:mb-5">
          <p
            className={`
              text-[10px]
              sm:text-xs
              uppercase
              tracking-[2px]
              font-medium
              ${isDark ? "text-gray-500" : "text-gray-400"}
            `}
          >
            Account
          </p>

          <h1
            className="
              mt-1
              text-xl
              sm:text-2xl
              md:text-3xl
              font-semibold
              tracking-tight
            "
          >
            My Profile
          </h1>

          <p
            className={`
              mt-1
              text-xs
              sm:text-sm
              ${isDark ? "text-gray-400" : "text-gray-500"}
            `}
          >
            Manage your account, orders and preferences.
          </p>
        </div>

        {/* ================= PROFILE CARD ================= */}
        <div
          className={`
            rounded-xl
            border
            p-3
            sm:p-4
            mb-4
            shadow-sm
            ${
              isDark
                ? "bg-gray-800 border-gray-800"
                : "bg-white border-gray-200"
            }
          `}
        >
          <div
            className="
    grid
    grid-cols-[1fr_auto]
    sm:grid-cols-[1fr_auto]
    items-center
    gap-3
    sm:gap-4
  "
          >
            {/* AVATAR + USER INFORMATION */}
            <div
              className="
      grid
      grid-cols-[auto_1fr]
      items-center
      gap-3
      min-w-0
    "
            >
              {/* AVATAR */}
              <div
                className={`
        w-10
        h-10
        sm:w-14
        sm:h-14
        rounded-full
        flex
        items-center
        justify-center
        shrink-0
        text-lg
        sm:text-xl
        font-semibold
        text-white
        ${isDark ? "bg-gradient-to-br from-gray-600 to-black" : "bg-gray-900"}
      `}
              >
                {profileData?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              {/* USER INFORMATION */}
              <div className="min-w-0">
                <h2 className="text-base sm:text-lg font-semibold truncate">
                  {profileData?.name || "User"}
                </h2>

                <div className="mt-1.5 grid gap-1">
                  {/* EMAIL */}
                  {profileData?.email && (
                    <div
                      className={`
              grid
              grid-cols-[auto_1fr]
              items-center
              gap-1.5
              text-xs
              sm:text-sm
              break-all
              ${isDark ? "text-gray-400" : "text-gray-500"}
            `}
                    >
                      <FiMail className="text-xs" />
                      <span className="text-xs">{profileData.email}</span>
                    </div>
                  )}

                  {/* PHONE */}
                  {profileData?.phone && (
                    <div
                      className={`
              grid
              grid-cols-[auto_1fr]
              items-center
              gap-1.5
              text-xs
              sm:text-sm
              ${isDark ? "text-gray-400" : "text-gray-500"}
            `}
                    >
                      <FiPhone className="text-sm" />
                      <span>{profileData.phone}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* EDIT PROFILE */}
            <button
              type="button"
              onClick={() => navigate("/settings")}
              className={`
      w-auto
      shrink-0
      px-3
      sm:px-4
      py-1.5
      sm:py-2
      rounded-lg
      text-xs
      sm:text-sm
      font-medium
      border
      transition-all
      ${
        isDark
          ? "border-gray-700 hover:bg-gray-700"
          : "border-gray-200 hover:bg-gray-50"
      }
    `}
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* ================= ACCOUNT MENU ================= */}
        <div
          className={`
            rounded-xl
            border
            overflow-hidden
            shadow-sm
            ${
              isDark
                ? "bg-gray-800 border-gray-800"
                : "bg-white border-gray-200"
            }
          `}
        >
          {/* ACCOUNT HEADER */}
          <div className="px-4 pt-4 pb-2">
            <h2 className="text-sm sm:text-base font-semibold">Account</h2>

            <p
              className={`
                mt-0.5
                text-xs
                sm:text-sm
                ${isDark ? "text-gray-400" : "text-gray-500"}
              `}
            >
              Manage your shopping account.
            </p>
          </div>

          {/* ACCOUNT ITEMS */}
          <div className="p-2 sm:p-3">
            {accountItems.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => navigate(item.path)}
                className={`
                  w-full
                  flex
                  items-center
                  gap-2.5
                  sm:gap-3
                  p-2.5
                  sm:p-3
                  rounded-lg
                  text-left
                  transition-all
                  group
                  ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"}
                `}
              >
                {/* ICON */}
                <div
                  className={`
                    w-9
                    h-9
                    sm:w-10
                    sm:h-10
                    rounded-lg
                    flex
                    items-center
                    justify-center
                    text-base
                    shrink-0
                    ${
                      isDark
                        ? "bg-gray-700 text-gray-300"
                        : "bg-gray-100 text-gray-700"
                    }
                  `}
                >
                  {item.icon}
                </div>

                {/* CONTENT */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs sm:text-sm font-medium">
                    {item.title}
                  </h3>

                  <p
                    className={`
                      mt-0.5
                      text-[11px]
                      sm:text-xs
                      ${isDark ? "text-gray-500" : "text-gray-500"}
                    `}
                  >
                    {item.description}
                  </p>
                </div>

                {/* ARROW */}
                <FiChevronRight
                  className={`
                    text-base
                    shrink-0
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    ${isDark ? "text-gray-600" : "text-gray-400"}
                  `}
                />
              </button>
            ))}
          </div>
        </div>

        {/* ================= LOGOUT ================= */}
        <div
          className={`
            mt-4
            rounded-xl
            border
            p-2
            sm:p-3
            ${
              isDark
                ? "bg-gray-800 border-gray-800"
                : "bg-white border-gray-200"
            }
          `}
        >
          <button
            type="button"
            onClick={handleLogout}
            className={`
              w-full
              flex
              items-center
              gap-2.5
              sm:gap-3
              p-2
              rounded-lg
              text-left
              transition
              ${
                isDark
                  ? "text-red-400 hover:bg-red-500/10"
                  : "text-red-600 hover:bg-red-50"
              }
            `}
          >
            {/* LOGOUT ICON */}
            <div
              className={`
                w-9
                h-9
                sm:w-10
                sm:h-10
                rounded-lg
                flex
                items-center
                justify-center
                shrink-0
                ${isDark ? "bg-red-500/10" : "bg-red-50"}
              `}
            >
              <FiLogOut className="text-base" />
            </div>

            {/* LOGOUT CONTENT */}
            <div>
              <h3 className="text-xs sm:text-sm font-medium">Logout</h3>

              <p
                className={`
                  text-[11px]
                  sm:text-xs
                  mt-0.5
                  ${isDark ? "text-gray-500" : "text-gray-500"}
                `}
              >
                Sign out of your account
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
