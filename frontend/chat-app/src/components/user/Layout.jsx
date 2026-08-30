import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ThemeContext } from "../../context/ThemeContext";

const Layout = () => {
  //thme
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  return (
    //main container
    <div
      className={`
        min-h-screen transition-colors duration-300
        ${isDark ? "bg-gray-950 text-white" : "bg-white text-gray-900"}
      `}
    >
      {/*header*/}
      <Header />
      {/*outlet*/}
      <main>
        <Outlet />
      </main>
      {/*footer*/}
      <Footer />
    </div>
  );
};

export default Layout;
