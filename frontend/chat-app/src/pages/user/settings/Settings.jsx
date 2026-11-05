
import React from "react";

import {
  FiUser,
  FiLock,
  FiBell,
  FiMoon,
} from "react-icons/fi";

import Button from "../../../components/ui/Button";
import SettingsItem from "../../../components/ui/SettingItem";
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

  // THEME CLASSES
  const pageBg = isDark ? "bg-gray-950" : "bg-gray-50";

  const cardClass = isDark
    ? "bg-gray-800 border-gray-700/70"
    : "bg-white border-gray-200";

  const textClass = isDark ? "text-white" : "text-gray-900";
  const mutedTextClass = isDark ? "text-gray-400" : "text-gray-500";

  // INPUT STYLING
  const inputClass = `
    w-full min-w-0
    rounded-lg border
    px-3 py-2.5
    text-xs sm:text-sm
    outline-none
    transition-colors duration-200
    focus:border-blue-500
    focus:ring-2 focus:ring-blue-500/10
    ${
      isDark
        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
        : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400"
    }
  `;

  // NOTIFICATION CHANGE
  const handleNotificationChange = () => {
    const value = !settings.notification;

    setSettings((prev) => ({
      ...prev,
      notification: value,
    }));

    setAllowNotification(value);
  };

  // THEME CHANGE
  const handleThemeChange = (item) => {
    setTheme(item);

    setSettings((prev) => ({
      ...prev,
      theme: item,
    }));
  };

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
      <div className="mx-auto w-full max-w-[1800px] space-y-4 sm:space-y-5">

        {/* PAGE HEADER */}
        <header
          className={`
            rounded-xl border
            p-4 sm:p-5
            shadow-sm
            ${cardClass}
          `}
        >
          <h1 className={`text-xl sm:text-2xl font-semibold tracking-tight ${textClass}`}>
            Settings
          </h1>

          <p className={`mt-1 text-xs sm:text-sm ${mutedTextClass}`}>
            Manage your account preferences and application settings.
          </p>
        </header>

        {/* SETTINGS SECTIONS */}
        <section
          className={`
            rounded-xl border
            p-2.5 sm:p-3 md:p-4
            shadow-sm
            ${cardClass}
          `}
        >
          <div className="space-y-1.5 sm:space-y-2">

            {/* PROFILE */}
            <SettingsItem
              icon={<FiUser />}
              title="Profile"
              tabName="profile"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isDark={isDark}
            >
              <div className="grid grid-cols-1 gap-4 pt-3 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="settings-name"
                    className={`mb-1.5 block text-xs font-medium ${mutedTextClass}`}
                  >
                    Full Name
                  </label>

                  <input
                    id="settings-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={settings.name ?? ""}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="settings-email"
                    className={`mb-1.5 block text-xs font-medium ${mutedTextClass}`}
                  >
                    Email Address
                  </label>

                  <input
                    id="settings-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={settings.email ?? ""}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button
                  label="Save Changes"
                  onClick={saveSettings}
                  variant="secondary"
                />
              </div>
            </SettingsItem>

            {/* PASSWORD */}
            <SettingsItem
              icon={<FiLock />}
              title="Password"
              tabName="password"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isDark={isDark}
            >
              <div className="space-y-3 pt-3">

                <div>
                  <label
                    htmlFor="current-password"
                    className={`mb-1.5 block text-xs font-medium ${mutedTextClass}`}
                  >
                    Current Password
                  </label>

                  <input
                    id="current-password"
                    name="currentPassword"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter current password"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="new-password"
                    className={`mb-1.5 block text-xs font-medium ${mutedTextClass}`}
                  >
                    New Password
                  </label>

                  <input
                    id="new-password"
                    name="newPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Enter new password"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="confirm-password"
                    className={`mb-1.5 block text-xs font-medium ${mutedTextClass}`}
                  >
                    Confirm Password
                  </label>

                  <input
                    id="confirm-password"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    placeholder="Confirm new password"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button
                  label="Update Password"
                  variant="secondary"
                />
              </div>
            </SettingsItem>

            {/* NOTIFICATIONS */}
            <SettingsItem
              icon={<FiBell />}
              title="Notification"
              tabName="notification"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isDark={isDark}
            >
              <div className="pt-3">
                <div
                  className={`
                    flex items-center justify-between gap-4
                    rounded-lg p-3 sm:p-4
                    ${
                      isDark
                        ? "bg-gray-700"
                        : "bg-gray-50"
                    }
                  `}
                >
                  <div className="min-w-0">
                    <h3 className={`text-xs sm:text-sm font-medium ${textClass}`}>
                      Allow Notifications
                    </h3>

                    <p className={`mt-1 text-[11px] sm:text-xs leading-relaxed ${mutedTextClass}`}>
                      Receive notifications about your account, orders and updates.
                    </p>
                  </div>

                  <div className="shrink-0">
                    <ToggleSwitch
                      checked={Boolean(settings.notification)}
                      onChange={handleNotificationChange}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button
                  label="Save Preferences"
                  onClick={saveSettings}
                  variant="secondary"
                />
              </div>
            </SettingsItem>

            {/* APPEARANCE */}
            <SettingsItem
              icon={<FiMoon />}
              title="Appearance"
              tabName="appearance"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isDark={isDark}
            >
              <div className="pt-3">
                <h3 className={`mb-3 text-xs sm:text-sm font-semibold ${textClass}`}>
                  Choose Theme
                </h3>

                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                  {[
                    "Light Mode",
                    "Dark Mode",
                    "System Default",
                  ].map((item) => (
                    <label
                      key={item}
                      className={`
                        flex items-center gap-3
                        rounded-lg border
                        px-3 py-3
                        cursor-pointer
                        transition-colors duration-200
                        ${
                          isDark
                            ? "bg-gray-700 border-gray-600 hover:border-gray-400"
                            : "bg-gray-50 border-gray-200 hover:border-gray-400"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name="theme"
                        value={item}
                        checked={theme === item}
                        onChange={() => handleThemeChange(item)}
                        className="h-3.5 w-3.5 shrink-0 accent-blue-600"
                      />

                      <span className={`text-xs sm:text-sm font-medium ${textClass}`}>
                        {item}
                      </span>
                    </label>
                  ))}
                </div>

                <div className="mt-4 flex justify-end">
                  <Button
                    label="Save Appearance"
                    onClick={saveSettings}
                    variant="secondary"
                  />
                </div>
              </div>
            </SettingsItem>

          </div>
        </section>
      </div>
    </main>
  );
};

export default Settings;
