import Button from "../../../components/ui/Button";
import SettingsItem from "../../../components/ui/SettingItem";
import { FiUser, FiLock, FiBell, FiMoon } from "react-icons/fi";
import ToggleSwitch from "../../../components/ui/ToggleSwitch";
import { useSettings } from "../../../hooks/user/useSettings";

const Settings = () => {
  const {
    settings,
    setSettings,
    theme,
    setTheme,
    isDark,
    activeTab,
    setActiveTab,
    handleChange,
    saveSettings,
    setAllowNotification,
  } = useSettings();

  // ============================================================
  // INPUT STYLE
  // ============================================================
  const inputClass = `
    w-full
    px-2.5
    sm:px-3
    md:px-4

    py-1.5
    sm:py-2
    md:py-2.5

    rounded-md
    sm:rounded-lg
    md:rounded-xl

    border
    outline-none
    transition-colors

    text-[10px]
    sm:text-xs
    md:text-sm

    ${
      isDark
        ? "bg-[#1f2937] border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
    }
  `;

  return (
    <div
      className={
        isDark
          ? "min-h-screen bg-gray-900 text-white"
          : "min-h-screen bg-gray-50 text-black"
      }
    >
      <div
        className={`
          min-h-screen

          p-2
          sm:p-3
          md:p-5

          ${isDark ? "bg-gray-900" : "bg-gray-50"}
        `}
      >
        <div className="max-w-[1800px] mx-auto">

          {/* =====================================================
              HEADER
          ===================================================== */}
          <div
            className={`
              rounded-lg
              sm:rounded-xl
              md:rounded-2xl

              p-2.5
              sm:p-3
              md:p-6

              shadow-sm

              mb-2
              sm:mb-3
              md:mb-5

              border

              ${
                isDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-100"
              }
            `}
          >
            <h1
              className={`
                text-sm
                sm:text-sm
                md:text-3xl

                font-bold

                ${isDark ? "text-white" : "text-gray-900"}
              `}
            >
              Settings
            </h1>

            <p
              className={`
                mt-0.5
                sm:mt-1
                md:mt-2

                text-[9px]
                sm:text-[10px]
                md:text-base

                ${isDark ? "text-gray-400" : "text-gray-500"}
              `}
            >
              Manage your account preferences and application settings.
            </p>
          </div>

          {/* =====================================================
              SETTINGS CONTAINER
          ===================================================== */}
          <div
            className={`
              rounded-lg
              sm:rounded-xl
              md:rounded-2xl

              border
              shadow-sm

              p-2
              sm:p-3
              md:p-5

              space-y-2
              sm:space-y-3
              md:space-y-4

              ${
                isDark
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-100"
              }
            `}
          >

            {/* =================================================
                PROFILE
            ================================================= */}
            <SettingsItem
              icon={<FiUser />}
              title="Profile"
              tabName="profile"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isDark={isDark}
            >
              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2

                  gap-2
                  sm:gap-2.5
                  md:gap-4

                  pt-2.5
                  sm:pt-3
                  md:pt-4
                "
              >
                {/* NAME */}
                <input
                  name="name"
                  value={settings.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={`
                    w-full

                    px-2.5
                    sm:px-3
                    md:px-4

                    py-1.5
                    sm:py-2
                    md:py-2.5

                    rounded-md
                    sm:rounded-lg
                    md:rounded-xl

                    border
                    outline-none
                    transition

                    text-[10px]
                    sm:text-xs
                    md:text-sm

                    ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-white"
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-gray-400"
                    }
                  `}
                />

                {/* EMAIL */}
                <input
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  type="email"
                  className={`
                    w-full

                    px-2.5
                    sm:px-3
                    md:px-4

                    py-1.5
                    sm:py-2
                    md:py-2.5

                    rounded-md
                    sm:rounded-lg
                    md:rounded-xl

                    border
                    outline-none
                    transition

                    text-[10px]
                    sm:text-xs
                    md:text-sm

                    ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-white"
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-gray-400"
                    }
                  `}
                />
              </div>

              <div className="flex justify-end mt-2.5 sm:mt-3 md:mt-4">
                <Button
                  label="Save Changes"
                  onClick={saveSettings}
                  variant="secondary"
                />
              </div>
            </SettingsItem>

            {/* =================================================
                PASSWORD
            ================================================= */}
            <SettingsItem
              icon={<FiLock />}
              title="Password"
              tabName="password"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isDark={isDark}
            >
              <div
                className="
                  space-y-2
                  sm:space-y-2.5
                  md:space-y-3

                  pt-2.5
                  sm:pt-3
                  md:pt-4
                "
              >
                <input
                  placeholder="Current Password"
                  type="password"
                  className={inputClass}
                />

                <input
                  placeholder="New Password"
                  type="password"
                  className={inputClass}
                />

                <input
                  placeholder="Confirm Password"
                  type="password"
                  className={inputClass}
                />
              </div>

              <div className="flex justify-end mt-2.5 sm:mt-3 md:mt-4">
                <Button
                  label="Update Password"
                  variant="secondary"
                />
              </div>
            </SettingsItem>

            {/* =================================================
                NOTIFICATIONS
            ================================================= */}
            <SettingsItem
              icon={<FiBell />}
              title="Notification"
              tabName="notification"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isDark={isDark}
            >
              <div className="pt-2.5 sm:pt-3 md:pt-4">
                <div
                  className={`
                    flex

                    flex-col
                    sm:flex-row

                    sm:items-center
                    sm:justify-between

                    gap-2
                    sm:gap-3

                    p-2
                    sm:p-2.5
                    md:p-4

                    rounded-md
                    sm:rounded-lg
                    md:rounded-xl

                    ${
                      isDark
                        ? "bg-gray-700"
                        : "bg-gray-50"
                    }
                  `}
                >
                  <div className="min-w-0">
                    <h4
                      className={`
                        font-semibold

                        text-[10px]
                        sm:text-xs
                        md:text-lg

                        ${isDark ? "text-white" : "text-gray-900"}
                      `}
                    >
                      Allow Notifications
                    </h4>

                    <p
                      className={`
                        text-[8px]
                        sm:text-[10px]
                        md:text-sm

                        mt-0.5
                        sm:mt-1

                        leading-relaxed

                        ${isDark ? "text-gray-400" : "text-gray-500"}
                      `}
                    >
                      Receive notifications about your account, orders and
                      updates.
                    </p>
                  </div>

                  <div className="shrink-0 self-end sm:self-auto">
                    <ToggleSwitch
                      checked={settings.notification}
                      onChange={() => {
                        const value = !settings.notification;

                        setSettings((prev) => ({
                          ...prev,
                          notification: value,
                        }));

                        setAllowNotification(value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-2.5 sm:mt-3 md:mt-4">
                <Button
                  label="Save Preferences"
                  onClick={saveSettings}
                  variant="secondary"
                />
              </div>
            </SettingsItem>

            {/* =================================================
                APPEARANCE
            ================================================= */}
            <SettingsItem
              icon={<FiMoon />}
              title="Appearance"
              tabName="appearance"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isDark={isDark}
            >
              <div className="pt-2.5 sm:pt-3 md:pt-4">

                <h3
                  className={`
                    font-semibold

                    mb-2
                    sm:mb-2.5
                    md:mb-4

                    text-[10px]
                    sm:text-xs
                    md:text-lg

                    ${isDark ? "text-white" : "text-gray-900"}
                  `}
                >
                  Choose Theme
                </h3>

                <div
                  className="
                    flex
                    flex-col

                    gap-1.5
                    sm:gap-2
                    md:gap-3
                  "
                >
                  {[
                    "Light Mode",
                    "Dark Mode",
                    "System Default",
                  ].map((item) => (
                    <label
                      key={item}
                      className={`
                        p-2
                        sm:p-2.5
                        md:p-4

                        rounded-md
                        sm:rounded-lg
                        md:rounded-xl

                        border
                        cursor-pointer
                        transition

                        flex
                        items-center

                        gap-2
                        sm:gap-2.5
                        md:gap-3

                        ${
                          isDark
                            ? "bg-gray-700 border-gray-600 hover:border-white"
                            : "bg-white border-gray-200 hover:border-black"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="theme"
                        value={item}
                        checked={theme === item}
                        onChange={() => {
                          setTheme(item);

                          setSettings((prev) => ({
                            ...prev,
                            theme: item,
                          }));
                        }}
                        className="
                          w-3
                          h-3
                          sm:w-3.5
                          sm:h-3.5
                          md:w-4
                          md:h-4

                          accent-black
                          shrink-0
                        "
                      />

                      <span
                        className={`
                          font-medium

                          text-[9px]
                          sm:text-[10px]
                          md:text-base

                          ${isDark ? "text-white" : "text-gray-900"}
                        `}
                      >
                        {item}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="flex justify-end mt-2.5 sm:mt-3 md:mt-4">
                  <Button
                    label="Save Appearance"
                    onClick={saveSettings}
                    variant="secondary"
                  />
                </div>

              </div>
            </SettingsItem>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;