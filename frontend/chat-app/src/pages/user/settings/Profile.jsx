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

          ${isDark
            ? "bg-gray-950 text-white"
            : "bg-gray-50 text-gray-900"
          }
        `}
      >
        <p className="text-sm opacity-60">
          Loading profile...
        </p>
      </div>
    );
  }


  // MAIN UI
  return (
    <div
      className={`
        min-h-screen
        px-4
        sm:px-6
        py-10
        transition-colors
        duration-300

        ${isDark
          ? "bg-gray-950 text-white"
          : "bg-gray-50 text-gray-900"
        }
      `}
    >
      <div className="max-w-[1800px] mx-auto">

        {/* PAGE HEADER*/}
        <div className="mb-8">

          <p
            className={`
              text-xs
              uppercase
              tracking-[3px]
              font-medium

              ${isDark
                ? "text-gray-500"
                : "text-gray-400"
              }
            `}
          >
            Account
          </p>

          <h1
            className="
              mt-2
              text-3xl
              md:text-4xl
              font-semibold
              tracking-tight
            "
          >
            My Profile
          </h1>

          <p
            className={`
              mt-2
              text-sm

              ${isDark
                ? "text-gray-400"
                : "text-gray-500"
              }
            `}
          >
            Manage your account, orders and preferences.
          </p>

        </div>

        {/*PROFILE CARD*/}
        <div
          className={`
            rounded-2xl
            border
            p-6
            md:p-8
            mb-6
            shadow-sm

            ${isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-gray-200"
            }
          `}
        >

          <div className="flex flex-col md:flex-row md:items-center gap-6">

            {/* ==================================
                AVATAR
            ================================== */}

            <div
              className={`
                w-20
                h-20
                rounded-full
                flex
                items-center
                justify-center
                shrink-0

                text-2xl
                font-semibold
                text-white

                ${isDark
                  ? "bg-gradient-to-br from-gray-600 to-black"
                  : "bg-gray-900"
                }
              `}
            >
              {profileData?.name
                ?.charAt(0)
                ?.toUpperCase() || "U"}
            </div>

            {/* ==================================
                USER INFORMATION
            ================================== */}

            <div className="flex-1 min-w-0">

              <h2 className="text-2xl font-semibold">
                {profileData?.name || "User"}
              </h2>

              <div className="mt-3 flex flex-col gap-2">

                {/* EMAIL */}

                {profileData?.email && (
                  <div
                    className={`
                      flex
                      items-center
                      gap-2
                      text-sm
                      break-all

                      ${isDark
                        ? "text-gray-400"
                        : "text-gray-500"
                      }
                    `}
                  >
                    <FiMail className="shrink-0" />

                    <span>
                      {profileData.email}
                    </span>
                  </div>
                )}

                {/* PHONE */}

                {profileData?.phone && (
                  <div
                    className={`
                      flex
                      items-center
                      gap-2
                      text-sm

                      ${isDark
                        ? "text-gray-400"
                        : "text-gray-500"
                      }
                    `}
                  >
                    <FiPhone className="shrink-0" />

                    <span>
                      {profileData.phone}
                    </span>
                  </div>
                )}

              </div>

            </div>

            {/* ==================================
                EDIT PROFILE
            ================================== */}

            <button
              type="button"
              onClick={() => navigate("/settings")}
              className={`
                w-full
                md:w-auto

                px-5
                py-2.5
                rounded-lg
                text-sm
                font-medium
                border
                transition-all

                ${isDark
                  ? "border-gray-700 hover:bg-gray-800"
                  : "border-gray-200 hover:bg-gray-50"
                }
              `}
            >
              Edit Profile
            </button>

          </div>

        </div>

        {/* ACCOUNT MENU */}
        <div
          className={`
            rounded-2xl
            border
            overflow-hidden
            shadow-sm

            ${isDark
              ? "bg-gray-900 border-gray-800"
              : "bg-white border-gray-200"
            }
          `}
        >

          {/* ACCOUNT HEADER */}

          <div className="px-6 pt-6 pb-3">

            <h2 className="text-lg font-semibold">
              Account
            </h2>

            <p
              className={`
                mt-1
                text-sm

                ${isDark
                  ? "text-gray-400"
                  : "text-gray-500"
                }
              `}
            >
              Manage your shopping account.
            </p>

          </div>

          {/* ACCOUNT ITEMS */}

          <div className="p-4">

            {accountItems.map((item) => (

              <button
                key={item.title}
                type="button"
                onClick={() => navigate(item.path)}
                className={`
                  w-full
                  flex
                  items-center
                  gap-4
                  p-4
                  rounded-xl
                  text-left
                  transition-all
                  group

                  ${isDark
                    ? "hover:bg-gray-800"
                    : "hover:bg-gray-50"
                  }
                `}
              >

                {/* ICON */}

                <div
                  className={`
                    w-11
                    h-11
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    text-lg
                    shrink-0

                    ${isDark
                      ? "bg-gray-800 text-gray-300"
                      : "bg-gray-100 text-gray-700"
                    }
                  `}
                >
                  {item.icon}
                </div>

                {/* CONTENT */}

                <div className="flex-1 min-w-0">

                  <h3 className="font-medium">
                    {item.title}
                  </h3>

                  <p
                    className={`
                      mt-1
                      text-sm

                      ${isDark
                        ? "text-gray-500"
                        : "text-gray-500"
                      }
                    `}
                  >
                    {item.description}
                  </p>

                </div>

                {/* ARROW */}

                <FiChevronRight
                  className={`
                    text-lg
                    shrink-0
                    transition-transform
                    duration-300
                    group-hover:translate-x-1

                    ${isDark
                      ? "text-gray-600"
                      : "text-gray-400"
                    }
                  `}
                />

              </button>

            ))}

          </div>

        </div>

        {/* LOGOUT*/}
        <div
          className={`
            mt-6
            rounded-2xl
            border
            p-4

            ${isDark
              ? "bg-gray-900 border-gray-800"
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
              gap-4
              p-3
              rounded-xl
              text-left
              transition

              ${isDark
                ? "text-red-400 hover:bg-red-500/10"
                : "text-red-600 hover:bg-red-50"
              }
            `}
          >

            {/* LOGOUT ICON */}

            <div
              className={`
                w-11
                h-11
                rounded-xl
                flex
                items-center
                justify-center
                shrink-0

                ${isDark
                  ? "bg-red-500/10"
                  : "bg-red-50"
                }
              `}
            >
              <FiLogOut className="text-lg" />
            </div>

            {/* LOGOUT CONTENT */}

            <div>

              <h3 className="font-medium">
                Logout
              </h3>

              <p
                className={`
                  text-sm
                  mt-1

                  ${isDark
                    ? "text-gray-500"
                    : "text-gray-500"
                  }
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