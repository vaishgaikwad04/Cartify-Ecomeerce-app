
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
      icon: <CircleHelp size={17} />,
      path: "/help",
    },
    {
      title: "Settings",
      description: "Manage your account preferences",
      icon: <FiSettings />,
      path: "/settings",
    },
  ];

  // THEME CLASSES
  const pageBg = isDark
    ? "bg-gray-950 text-white"
    : "bg-gray-50 text-gray-900";

  const cardBg = isDark
    ? "bg-gray-800 border-gray-700/70"
    : "bg-white border-gray-200";

  const secondaryText = isDark ? "text-gray-400" : "text-gray-500";

  // LOADING
  if (loading) {
    return (
      <div
        className={`
          min-h-screen flex items-center justify-center
          px-4 ${pageBg}
        `}
      >
        <p className="text-xs opacity-60">Loading profile...</p>
      </div>
    );
  }

  return (
    <main
      className={`
        min-h-screen w-full
        px-3 py-6
        sm:px-5 sm:py-7
        lg:px-8 lg:py-8
        transition-colors duration-300
        ${pageBg}
      `}
    >
      <div className="mx-auto w-full max-w-[1800px]">

        {/* PAGE HEADER */}
        <header className="mb-5 sm:mb-6">
          <p
            className={`
              text-[9px] sm:text-[10px]
              uppercase tracking-[2px] font-medium
              ${isDark ? "text-gray-500" : "text-gray-400"}
            `}
          >
            Account
          </p>

          <h1 className="mt-1 text-xl sm:text-2xl font-semibold tracking-tight">
            My Profile
          </h1>

          <p className={`mt-1 text-xs sm:text-sm ${secondaryText}`}>
            Manage your account, orders and preferences.
          </p>
        </header>

        {/* PROFILE CARD */}
        <section
          className={`
            mb-4 sm:mb-5
            rounded-xl border
            p-3 sm:p-4 md:p-5
            shadow-sm
            transition-colors duration-300
            ${cardBg}
          `}
        >
          <div className="flex items-center justify-between gap-3">

            {/* AVATAR + USER DETAILS */}
            <div className="flex min-w-0 items-center gap-3 sm:gap-4">

              {/* AVATAR */}
              <div
                className={`
                  flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14
                  shrink-0 items-center justify-center
                  rounded-full
                  text-base sm:text-lg font-semibold text-white
                  ${
                    isDark
                      ? "bg-gradient-to-br from-gray-600 to-black"
                      : "bg-gray-900"
                  }
                `}
              >
                {profileData?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              {/* USER INFORMATION */}
              <div className="min-w-0">
                <h2 className="truncate text-sm sm:text-base font-semibold">
                  {profileData?.name || "User"}
                </h2>

                <div className={`mt-1.5 grid gap-1 text-[10px] sm:text-xs ${secondaryText}`}>

                  {profileData?.email && (
                    <div className="flex min-w-0 items-center gap-1.5">
                      <FiMail className="shrink-0" />
                      <span className="break-all">{profileData.email}</span>
                    </div>
                  )}

                  {profileData?.phone && (
                    <div className="flex items-center gap-1.5">
                      <FiPhone className="shrink-0" />
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
                shrink-0 rounded-lg border
                px-2.5 py-2 sm:px-4
                text-[10px] sm:text-xs font-medium
                transition-colors duration-200
                ${
                  isDark
                    ? "border-gray-700 text-gray-300 hover:bg-gray-700"
                    : "border-gray-200 text-gray-700 hover:bg-gray-50"
                }
              `}
            >
              Edit Profile
            </button>
          </div>
        </section>

        {/* ACCOUNT MENU */}
        <section
          className={`
            overflow-hidden rounded-xl border
            shadow-sm
            transition-colors duration-300
            ${cardBg}
          `}
        >
          {/* SECTION HEADER */}
          <div className="px-4 pt-4 pb-2 sm:px-5 sm:pt-5">
            <h2 className="text-sm sm:text-base font-semibold">
              Account
            </h2>

            <p className={`mt-1 text-[11px] sm:text-xs ${secondaryText}`}>
              Manage your shopping account.
            </p>
          </div>

          {/* MENU ITEMS */}
          <div className="p-2 sm:p-3">
            {accountItems.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => navigate(item.path)}
                className={`
                  group flex w-full items-center gap-3
                  rounded-lg p-2.5 sm:p-3
                  text-left
                  transition-colors duration-200
                  ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"}
                `}
              >
                {/* ICON */}
                <div
                  className={`
                    flex h-9 w-9 sm:h-10 sm:w-10
                    shrink-0 items-center justify-center
                    rounded-lg text-base
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
                <div className="min-w-0 flex-1">
                  <h3 className="text-xs sm:text-sm font-medium">
                    {item.title}
                  </h3>

                  <p className={`mt-0.5 truncate text-[10px] sm:text-xs ${secondaryText}`}>
                    {item.description}
                  </p>
                </div>

                {/* ARROW */}
                <FiChevronRight
                  className={`
                    shrink-0 text-sm
                    transition-transform duration-200
                    group-hover:translate-x-1
                    ${isDark ? "text-gray-500" : "text-gray-400"}
                  `}
                />
              </button>
            ))}
          </div>
        </section>

        {/* LOGOUT */}
        <section
          className={`
            mt-4 sm:mt-5
            rounded-xl border
            p-2 sm:p-3
            shadow-sm
            transition-colors duration-300
            ${cardBg}
          `}
        >
          <button
            type="button"
            onClick={handleLogout}
            className={`
              flex w-full items-center gap-3
              rounded-lg p-2.5
              text-left
              transition-colors duration-200
              ${
                isDark
                  ? "text-red-400 hover:bg-red-500/10"
                  : "text-red-600 hover:bg-red-50"
              }
            `}
          >
            {/* ICON */}
            <div
              className={`
                flex h-9 w-9 sm:h-10 sm:w-10
                shrink-0 items-center justify-center
                rounded-lg text-base
                ${isDark ? "bg-red-500/10" : "bg-red-50"}
              `}
            >
              <FiLogOut />
            </div>

            {/* CONTENT */}
            <div>
              <h3 className="text-xs sm:text-sm font-medium">
                Logout
              </h3>

              <p className={`mt-0.5 text-[10px] sm:text-xs ${secondaryText}`}>
                Sign out of your account
              </p>
            </div>
          </button>
        </section>
      </div>
    </main>
  );
};

export default Profile;
