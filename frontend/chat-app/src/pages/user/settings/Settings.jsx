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

  const inputClass = `
    w-full
    px-3 sm:px-4
    py-2.5 sm:py-3
    rounded-lg
    border
    outline-none
    transition-colors
    text-xs sm:text-sm md:text-base
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
        className={`min-h-screen p-3 sm:p-4 md:p-5 ${
          isDark ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="max-w-[1400px] mx-auto">

          {/* ================= HEADER ================= */}
          <div
            className={`rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm mb-4 sm:mb-5 border ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-100"
            }`}
          >
            <h1
              className={`text-xl sm:text-2xl md:text-3xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Settings
            </h1>

            <p
              className={`mt-1 sm:mt-2 text-xs sm:text-sm md:text-base ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Manage your account preferences and application settings.
            </p>
          </div>

          {/* ================= SETTINGS CONTAINER ================= */}
          <div
            className={`rounded-2xl border shadow-sm p-3 sm:p-4 md:p-5 space-y-3 sm:space-y-4 ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-100"
            }`}
          >

            {/* ================= PROFILE ================= */}
            <SettingsItem
              icon={<FiUser />}
              title="Profile"
              tabName="profile"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isDark={isDark}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 pt-4">
                <input
                  name="name"
                  value={settings.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={`
                    w-full
                    px-3 sm:px-4
                    py-2.5 sm:py-3
                    rounded-xl
                    border
                    outline-none
                    transition
                    text-xs sm:text-sm md:text-base
                    ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-white"
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-gray-400"
                    }
                  `}
                />

                <input
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  type="email"
                  className={`
                    w-full
                    px-3 sm:px-4
                    py-2.5 sm:py-3
                    rounded-xl
                    border
                    outline-none
                    transition
                    text-xs sm:text-sm md:text-base
                    ${
                      isDark
                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-white"
                        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-gray-400"
                    }
                  `}
                />
              </div>

              <div className="flex justify-end mt-4">
                <Button
                  label="Save Changes"
                  onClick={saveSettings}
                  variant="secondary"
                />
              </div>
            </SettingsItem>

            {/* ================= PASSWORD ================= */}
            <SettingsItem
              icon={<FiLock />}
              title="Password"
              tabName="password"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isDark={isDark}
            >
              <div className="space-y-3 pt-4">
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

              <div className="flex justify-end mt-4">
                <Button
                  label="Update Password"
                  variant="secondary"
                />
              </div>
            </SettingsItem>

            {/* ================= NOTIFICATIONS ================= */}
            <SettingsItem
              icon={<FiBell />}
              title="Notification"
              tabName="notification"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isDark={isDark}
            >
              <div className="pt-4">
                <div
                  className={`
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-3
                    p-3 sm:p-4
                    rounded-xl
                    ${
                      isDark
                        ? "bg-gray-700"
                        : "bg-gray-50"
                    }
                  `}
                >
                  <div className="min-w-0">
                    <h4
                      className={`font-semibold text-sm sm:text-base md:text-lg ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Allow Notifications
                    </h4>

                    <p
                      className={`text-xs sm:text-sm md:text-base mt-1 ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Receive notifications about your account, orders and
                      updates.
                    </p>
                  </div>

                  <div className="shrink-0">
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

              <div className="flex justify-end mt-4">
                <Button
                  label="Save Preferences"
                  onClick={saveSettings}
                  variant="secondary"
                />
              </div>
            </SettingsItem>

            {/* ================= APPEARANCE ================= */}
            <SettingsItem
              icon={<FiMoon />}
              title="Appearance"
              tabName="appearance"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isDark={isDark}
            >
              <div className="pt-4">
                <h3
                  className={`font-semibold mb-3 sm:mb-4 text-sm sm:text-base md:text-lg ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Choose Theme
                </h3>

                <div className="flex flex-col gap-2 sm:gap-3">
                  {[
                    "Light Mode",
                    "Dark Mode",
                    "System Default",
                  ].map((item) => (
                    <label
                      key={item}
                      className={`
                        p-3 sm:p-4
                        rounded-xl
                        border
                        cursor-pointer
                        transition
                        flex
                        items-center
                        gap-3
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
                        className="w-4 h-4 accent-black shrink-0"
                      />

                      <span
                        className={`font-medium text-xs sm:text-sm md:text-base ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {item}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="flex justify-end mt-4">
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