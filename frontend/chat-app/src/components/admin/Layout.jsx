
import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "../admin/Header";
import Sidebar from "../admin/Sidebar";
import { ThemeContext } from "../../context/ThemeContext";

const Layout = () => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  return (
    <div
      className={`flex h-dvh w-full overflow-hidden ${
        isDark ? "bg-gray-900" : "bg-slate-50"
      }`}
    >
      <Sidebar />

      <div className="flex min-w-0 min-h-0 flex-1 flex-col overflow-hidden">
        <Header />

        <main
          className={`min-h-0 min-w-0 flex-1 overflow-x-auto overflow-y-auto px-3 py-1 sm:p-4 ${
            isDark ? "bg-gray-900" : "bg-slate-50"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
