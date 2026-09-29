import React, { useContext } from "react";
import Header from "../admin/Header";
import { Outlet } from "react-router-dom";
import Sidebar from "../admin/Sidebar";
import { ThemeContext } from "../../context/ThemeContext";

const Layout = () => {
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "Dark Mode";

  return (
    <div
      className={`
        flex
        h-screen
        w-full
        overflow-hidden
        ${isDark ? "bg-gray-900" : "bg-slate-50"}
      `}
    >
      {/* SIDEBAR */}
      <Sidebar />

    <div className="flex min-w-0 min-h-0 flex-1 flex-col overflow-hidden">
  <Header />

  <main
    className={`
      min-w-0
      min-h-0
      flex-1
      overflow-y-hidden
      overflow-x-hidden
      p-3 sm:p-4 lg:p-6
      ${isDark ? "bg-gray-900" : "bg-slate-50"}
    `}
  >
    <Outlet />
  </main>
</div>
    </div>
  );
};

export default Layout;