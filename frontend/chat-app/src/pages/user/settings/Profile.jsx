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
  const {
    profileData,
    loading,
    handleLogout,
    isDark,
    navigate,
  } = useProfile();

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
      icon: <CircleHelp size={16} />,
      path: "/help",
    },
    {
      title: "Settings",
      description: "Manage your account preferences",
      icon: <FiSettings />,
      path: "/settings",
    },
  ];

  // ============================================================
  // LOADING STATE
  // ============================================================
  if (loading) {
    return (
      <div
        className={`
          min-h-screen
          flex
          items-center
          justify-center
          px-2
          sm:px-3
          ${isDark ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}
        `}
      >
        <p className="text-[10px] sm:text-xs opacity-60">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div
      className={`
        min-h-screen

        px-2
        sm:px-3
        md:px-4

        py-3
        sm:py-4
        md:py-5

        transition-colors
        duration-300

        ${isDark ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"}
      `}
    >
      {/* =====================================================
          MAIN CONTAINER

          Mobile / tablet:
          Original responsive width.

          Large desktop:
          Compact centered profile.
      ===================================================== */}
      <div
        className="
          w-full
          max-w-[1800px]
          mx-auto

          lg:w-[720px]
          lg:max-w-[720px]

          xl:w-[760px]
          xl:max-w-[760px]
        "
      >
        {/* =====================================================
            PAGE HEADER
        ===================================================== */}
        <div
          className="
            mb-3
            sm:mb-4
            md:mb-5

            lg:mb-3
            xl:mb-3
          "
        >
          <p
            className={`
              text-[8px]
              sm:text-[9px]
              md:text-[10px]

              lg:text-[8px]
              xl:text-[9px]

              uppercase
              tracking-[1.5px]
              sm:tracking-[2px]

              font-medium

              ${isDark ? "text-gray-500" : "text-gray-400"}
            `}
          >
            Account
          </p>

          <h1
            className="
              mt-0.5
              sm:mt-1

              text-base
              sm:text-lg
              md:text-3xl

              lg:text-lg
              xl:text-lg

              font-semibold
              tracking-tight
            "
          >
            My Profile
          </h1>

          <p
            className={`
              mt-0.5
              sm:mt-1

              text-[9px]
              sm:text-[10px]
              md:text-sm

              lg:text-[10px]
              xl:text-[10px]

              ${isDark ? "text-gray-400" : "text-gray-500"}
            `}
          >
            Manage your account, orders and preferences.
          </p>
        </div>

        {/* =====================================================
            PROFILE CARD
        ===================================================== */}
        <div
          className={`
            rounded-lg
            sm:rounded-xl

            border

            p-2.5
            sm:p-3
            md:p-4

            lg:p-3
            xl:p-3

            mb-3
            sm:mb-4

            lg:mb-3
            xl:mb-3

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

              items-center

              gap-2
              sm:gap-3
              md:gap-4

              lg:gap-3
              xl:gap-3
            "
          >
            {/* =================================================
                AVATAR + USER INFORMATION
            ================================================= */}
            <div
              className="
                grid
                grid-cols-[auto_1fr]

                items-center

                gap-2
                sm:gap-2.5
                md:gap-3

                lg:gap-2.5
                xl:gap-2.5

                min-w-0
              "
            >
              {/* AVATAR */}
              <div
                className={`
                  w-8
                  h-8

                  sm:w-11
                  sm:h-11

                  md:w-14
                  md:h-14

                  lg:w-10
                  lg:h-10

                  xl:w-10
                  xl:h-10

                  rounded-full

                  flex
                  items-center
                  justify-center

                  shrink-0

                  text-sm
                  sm:text-base
                  md:text-xl

                  lg:text-sm
                  xl:text-sm

                  font-semibold
                  text-white

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
                <h2
                  className="
                    text-xs
                    sm:text-sm
                    md:text-lg

                    lg:text-sm
                    xl:text-sm

                    font-semibold
                    truncate
                  "
                >
                  {profileData?.name || "User"}
                </h2>

                <div
                  className="
                    mt-1
                    sm:mt-1.5

                    lg:mt-0.5
                    xl:mt-0.5

                    grid
                    gap-0.5
                    sm:gap-1

                    lg:gap-0.5
                    xl:gap-0.5
                  "
                >
                  {/* EMAIL */}
                  {profileData?.email && (
                    <div
                      className={`
                        grid
                        grid-cols-[auto_1fr]

                        items-center

                        gap-1
                        sm:gap-1.5

                        lg:gap-1
                        xl:gap-1

                        text-[9px]
                        sm:text-[10px]
                        md:text-xs

                        lg:text-[9px]
                        xl:text-[9px]

                        break-all

                        ${
                          isDark
                            ? "text-gray-400"
                            : "text-gray-500"
                        }
                      `}
                    >
                      <FiMail className="text-[9px] sm:text-[10px]" />

                      <span>
                        {profileData.email}
                      </span>
                    </div>
                  )}

                  {/* PHONE */}
                  {profileData?.phone && (
                    <div
                      className={`
                        grid
                        grid-cols-[auto_1fr]

                        items-center

                        gap-1
                        sm:gap-1.5

                        lg:gap-1
                        xl:gap-1

                        text-[9px]
                        sm:text-[10px]
                        md:text-xs

                        lg:text-[9px]
                        xl:text-[9px]

                        ${
                          isDark
                            ? "text-gray-400"
                            : "text-gray-500"
                        }
                      `}
                    >
                      <FiPhone className="text-[9px] sm:text-[10px]" />

                      <span>
                        {profileData.phone}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* =================================================
                EDIT PROFILE
            ================================================= */}
            <button
              type="button"
              onClick={() => navigate("/settings")}
              className={`
                w-auto
                shrink-0

                px-2
                sm:px-2.5
                md:px-4

                lg:px-2.5
                xl:px-2.5

                py-1
                sm:py-1.5
                md:py-2

                lg:py-1
                xl:py-1

                rounded-md
                sm:rounded-lg

                text-[9px]
                sm:text-[10px]
                md:text-xs

                lg:text-[10px]
                xl:text-[10px]

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

        {/* =====================================================
            ACCOUNT MENU
        ===================================================== */}
        <div
          className={`
            rounded-lg
            sm:rounded-xl

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
          <div
            className="
              px-3
              sm:px-3.5
              md:px-4

              lg:px-3
              xl:px-3

              pt-3
              sm:pt-3.5
              md:pt-4

              lg:pt-3
              xl:pt-3

              pb-1.5
              sm:pb-2

              lg:pb-1
              xl:pb-1
            "
          >
            <h2
              className="
                text-xs
                sm:text-sm
                md:text-base

                lg:text-sm
                xl:text-sm

                font-semibold
              "
            >
              Account
            </h2>

            <p
              className={`
                mt-0.5

                text-[9px]
                sm:text-[10px]
                md:text-xs

                lg:text-[9px]
                xl:text-[9px]

                ${isDark ? "text-gray-400" : "text-gray-500"}
              `}
            >
              Manage your shopping account.
            </p>
          </div>

          {/* ACCOUNT ITEMS */}
          <div
            className="
              p-1.5
              sm:p-2
              md:p-3

              lg:p-1.5
              xl:p-1.5
            "
          >
            {accountItems.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => navigate(item.path)}
                className={`
                  w-full

                  flex
                  items-center

                  gap-2
                  sm:gap-2.5
                  md:gap-3

                  lg:gap-2
                  xl:gap-2

                  p-2
                  sm:p-2.5
                  md:p-3

                  lg:p-2
                  xl:p-2

                  rounded-md
                  sm:rounded-lg

                  text-left

                  transition-all
                  group

                  ${isDark ? "hover:bg-gray-700" : "hover:bg-gray-50"}
                `}
              >
                {/* ICON */}
                <div
                  className={`
                    w-7
                    h-7

                    sm:w-8
                    sm:h-8

                    md:w-10
                    md:h-10

                    lg:w-8
                    lg:h-8

                    xl:w-8
                    xl:h-8

                    rounded-md
                    sm:rounded-lg

                    flex
                    items-center
                    justify-center

                    text-xs
                    sm:text-sm
                    md:text-base

                    lg:text-sm
                    xl:text-sm

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
                  <h3
                    className="
                      text-[10px]
                      sm:text-xs
                      md:text-sm

                      lg:text-[11px]
                      xl:text-[11px]

                      font-medium
                    "
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`
                      mt-0.5

                      text-[8px]
                      sm:text-[10px]
                      md:text-xs

                      lg:text-[9px]
                      xl:text-[9px]

                      truncate

                      text-gray-500
                    `}
                  >
                    {item.description}
                  </p>
                </div>

                {/* ARROW */}
                <FiChevronRight
                  className={`
                    text-xs
                    sm:text-sm
                    md:text-base

                    lg:text-sm
                    xl:text-sm

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

        {/* =====================================================
            LOGOUT
        ===================================================== */}
        <div
          className={`
            mt-3
            sm:mt-4
            md:mt-4

            lg:mt-3
            xl:mt-3

            rounded-lg
            sm:rounded-xl

            border

            p-1.5
            sm:p-2
            md:p-3

            lg:p-1.5
            xl:p-1.5

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

              gap-2
              sm:gap-2.5
              md:gap-3

              lg:gap-2
              xl:gap-2

              p-1.5
              sm:p-2

              lg:p-1.5
              xl:p-1.5

              rounded-md
              sm:rounded-lg

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
                w-7
                h-7

                sm:w-8
                sm:h-8

                md:w-10
                md:h-10

                lg:w-8
                lg:h-8

                xl:w-8
                xl:h-8

                rounded-md
                sm:rounded-lg

                flex
                items-center
                justify-center

                shrink-0

                text-xs
                sm:text-sm
                md:text-base

                lg:text-sm
                xl:text-sm

                ${isDark ? "bg-red-500/10" : "bg-red-50"}
              `}
            >
              <FiLogOut />
            </div>

            {/* LOGOUT CONTENT */}
            <div>
              <h3
                className="
                  text-[10px]
                  sm:text-xs
                  md:text-sm

                  lg:text-[11px]
                  xl:text-[11px]

                  font-medium
                "
              >
                Logout
              </h3>

              <p
                className="
                  text-[8px]
                  sm:text-[10px]
                  md:text-xs

                  lg:text-[9px]
                  xl:text-[9px]

                  mt-0.5

                  text-gray-500
                "
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