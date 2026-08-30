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
        flex h-screen overflow-hidden
        ${isDark ? "bg-gray-900" : "bg-slate-50"}
      `}
    >

      <Sidebar />


      <div className="flex flex-1 flex-col">

        <Header />


        <main
          className={`
            flex-1 p-6
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