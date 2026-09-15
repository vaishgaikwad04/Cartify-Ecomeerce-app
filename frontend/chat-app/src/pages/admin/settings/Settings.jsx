import Button from "../../../components/ui/Button";
import SettingsItem from "../../../components/ui/SettingItem";
import { FiUser, FiLock, FiBell, FiMoon, FiLogOut } from "react-icons/fi";
import ToggleSwitch from "../../../components/ui/ToggleSwitch";

import { useSettings } from "../../../hooks/admin/settings/useSettings";

const Settings = () => {
  const {
    // Theme
    setTheme,
    isDark,

    // Active tab
    activeTab,
    setActiveTab,

    // Settings data
    settings,
    setSettings,

    // Settings actions
    handleChange,
    saveSettings,

    // Notification
    setAllowNotification,

    // Logout
    handleLogout,
  } = useSettings();

  // Common input styling
  const inputClass = `w-full px-4 py-3 rounded-lg border outline-none transition-colors ${
    isDark
      ? "bg-[#1f2937] border-gray-700 text-white placeholder-gray-400 focus:border-blue-500"
      : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
  }`;

  return (
    <div
      className={
        isDark
          ? "min-h-screen bg-gray-900 text-white"
          : "min-h-screen bg-gray-50 text-black"
      }
    >
      <div
        className={`min-h-screen p-6 ${
          isDark ? "bg-gray-900" : "bg-gray-50"
        }`}
      >
        <div className="w-full mx-auto">

          {/* PAGE HEADER */}
          <div
            className={`rounded-2xl p-8 shadow-sm mb-6 border ${
              isDark
                ? "bg-gray-800 border-gray-700"
                : "bg-white border-gray-100"
            }`}
          >
            <h1
              className={`text-3xl font-bold ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Settings
            </h1>

            <p
              className={`mt-2 ${
                isDark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Manage your account preferences and application settings.
            </p>
          </div>

          {/* SETTINGS CONTAINER */}
          <div
            className={`rounded-2xl border shadow-sm p-6 space-y-5 ${
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
              <div className="grid md:grid-cols-2 gap-5 pt-6">

                {/* NAME */}
                <input
                  name="name"
                  value={settings.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-white"
                      : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-gray-400"
                  }`}
                />

                {/* EMAIL */}
                <input
                  name="email"
                  value={settings.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  type="email"
                  className={`w-full px-4 py-3 rounded-xl border outline-none transition ${
                    isDark
                      ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-white"
                      : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-gray-400"
                  }`}
                />
              </div>

              <div className="flex justify-end mt-6">
                <Button
                  label="Save Changes"
                  onClick={saveSettings}
                  variant={isDark ? "secondary" : "primary"}
                  className="w-1/8"
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
              <div className="space-y-4 pt-6">

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

              <div className="flex justify-end mt-6">
                <Button
                  label="Update Password"
                  variant={isDark ? "secondary" : "primary"}
                  className="w-1/8"
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
              <div className="pt-6">

                <div
                  className={`flex items-center justify-between p-4 rounded-xl ${
                    isDark ? "bg-gray-700" : "bg-gray-50"
                  }`}
                >
                  <div>

                    <h4
                      className={`font-semibold ${
                        isDark ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Allow Notifications
                    </h4>

                    <p
                      className={`text-sm ${
                        isDark ? "text-gray-400" : "text-gray-500"
                      }`}
                    >
                      Receive notifications about your account, orders and
                      updates.
                    </p>

                  </div>

                  <ToggleSwitch
                    checked={settings.notification}
                    onChange={() => {
                      const value = !settings.notification;

                      // Update settings form
                      setSettings((prev) => ({
                        ...prev,
                        notification: value,
                      }));

                      // Update notification context
                      setAllowNotification(value);
                    }}
                  />

                </div>

              </div>

              <div className="flex justify-end mt-6">
                <Button
                  label="Save Preferences"
                  onClick={saveSettings}
                  variant={isDark ? "secondary" : "primary"}
                  className="w-1/8"
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
              <div className="pt-6">

                <h3
                  className={`font-semibold mb-4 ${
                    isDark ? "text-white" : "text-gray-900"
                  }`}
                >
                  Choose Theme
                </h3>

                <div className="flex flex-col gap-4">

                  {["Light Mode", "Dark Mode", "System Default"].map(
                    (item) => (
                      <label
                        key={item}
                        className={`p-5 rounded-2xl border cursor-pointer transition flex items-center gap-3 ${
                          isDark
                            ? "bg-gray-700 border-gray-600 hover:border-white"
                            : "bg-white border-gray-200 hover:border-black"
                        }`}
                      >

                        <input
                          type="radio"
                          name="theme"
                          value={item}
                          checked={settings.theme === item}
                          onChange={() => {
                            // Change theme immediately
                            setTheme(item);

                            // Update settings state
                            setSettings((prev) => ({
                              ...prev,
                              theme: item,
                            }));
                          }}
                          className="w-4 h-4 accent-black"
                        />

                        <span
                          className={`font-medium ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          {item}
                        </span>

                      </label>
                    )
                  )}

                </div>

                <div className="flex justify-end mt-6">
                  <Button
                    label="Save Appearance"
                    onClick={saveSettings}
                    variant={isDark ? "secondary" : "primary"}
                    className="w-1/8"
                  />
                </div>

              </div>
            </SettingsItem>

            {/* ================= LOGOUT ================= */}
            <SettingsItem
              icon={<FiLogOut />}
              title="Logout"
              tabName="logout"
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              isDark={isDark}
            >
              <div className="pt-6">

                <div
                  className={`rounded-2xl border p-5 ${
                    isDark
                      ? "bg-gray-900 border-gray-800"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >

                  <div className="flex items-center justify-between gap-4">

                    <div className="flex items-center gap-4 min-w-0">

                      <div
                        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                          isDark
                            ? "bg-red-500/10 text-red-400"
                            : "bg-red-50 text-red-600"
                        }`}
                      >
                        <FiLogOut className="text-lg" />
                      </div>

                      <div className="min-w-0">

                        <h3
                          className={`font-semibold ${
                            isDark ? "text-white" : "text-gray-900"
                          }`}
                        >
                          Logout
                        </h3>

                        <p
                          className={`mt-1 text-sm ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          Sign out securely from your account
                        </p>

                      </div>

                    </div>

                    <Button
                      label="Logout"
                      onClick={handleLogout}
                      variant="danger"
                      className="w-1/8"
                    />

                  </div>

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