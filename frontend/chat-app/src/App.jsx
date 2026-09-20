import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeContext } from "./context/ThemeContext";

// User Layout
import Layout from "./components/user/Layout";
import PrivateRoute from "./components/route/PrivateRoute";
import AdminRoute from "./components/route/AdminRoute";

// User Pages
import Description from "./pages/user/productDescription/Description";
import Auth from "./pages/auth/Auth";
import Category from "./pages/user/productDescription/Category";
import Home from "./pages/user/home/Home";
import WishListedItem from "./pages/user/productWishList/WishListedItem";
import SettingsPage from "./pages/user/settings/Settings";
import BrandPage from "./pages/user/home/Brand";
import CartPrev from "./pages/user/cart/CartPrev";
import Success from "./pages/user/cart/Sucess";
import Cancel from "./pages/user/cart/Cancel";
import Orders from "./pages/user/order/Order";
import Address from "./pages/user/order/Address";
import Checkout from "./pages/user/order/Checkout";
import ProfilePage from "./pages/user/settings/Profile";
import Notifications from "./pages/user/notification/Notification";

// Help
import Help from "./pages/user/help/Help";

// Admin Pages
import AdminLayout from "./components/admin/Layout";
import Products from "./pages/admin/product/Products";
import Categories from "./pages/admin/Category/Category";
import Customers from "./pages/admin/customers/Customers";
import Coupon from "./pages/admin/coupon/Coupon";
import Review from "./pages/admin/review/Review";
import Settings from "./pages/admin/settings/Settings";
import Order from "./pages/admin/order/Order";
import Dashboard from "./pages/admin/Dashboard/Dashboard";

import ScrollToTop from "./components/ui/ScrollToTop";
import Notification from "./pages/admin/notification/Notification";

const App = () => {
  const { theme } = useContext(ThemeContext);

  const isDark = theme === "dark";

  return (
    <div className={isDark ? "dark" : ""}>
      <Router>
        {/* Scroll position handler */}
        <ScrollToTop />

        {/* Routes */}
        <Routes>
          {/* =========================
              USER ROUTES
          ========================= */}

          <Route path="/" element={<Layout />}>
            {/* PUBLIC ROUTES */}

            <Route index element={<Home />} />

            <Route path="description/:id" element={<Description />} />

            <Route path=":category" element={<Category />} />

            <Route path="brand/:brand" element={<BrandPage />} />

            {/* =========================
                HELP ROUTES
            ========================= */}

            <Route path="help" element={<Help type="faqs" />} />

            <Route path="help/faq" element={<Help type="faqs" />} />

            <Route path="help/returns" element={<Help type="returns" />} />

            <Route path="help/shipping" element={<Help type="shipping" />} />

            <Route path="help/orders" element={<Help type="orders" />} />

            {/* =========================
                PROTECTED ROUTES
            ========================= */}

            <Route element={<PrivateRoute />}>
              <Route path="wishListedItems" element={<WishListedItem />} />

              <Route path="settings" element={<SettingsPage />} />

              <Route path="cart" element={<CartPrev />} />

              <Route path="addresses" element={<Address />} />

              <Route path="checkout" element={<Checkout />} />

              <Route path="orders" element={<Orders />} />

              <Route path="profile" element={<ProfilePage />} />

              <Route path="notifications" element={<Notifications />} />
            </Route>

            {/* PAYMENT RESULT ROUTES */}

            <Route path="success" element={<Success />} />

            <Route path="cancel" element={<Cancel />} />
          </Route>

          {/* =========================
              AUTH
          ========================= */}

          <Route path="/auth" element={<Auth />} />

          {/* =========================
              ADMIN
          ========================= */}

          <Route element={<PrivateRoute />}>
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />

                <Route path="products" element={<Products />} />

                <Route path="categories" element={<Categories />} />

                <Route path="customers" element={<Customers />} />

                <Route path="coupons" element={<Coupon />} />

                <Route path="reviews" element={<Review />} />

                <Route path="orders" element={<Order />} />

                <Route path="settings" element={<Settings />} />

                <Route path="notifications" element={<Notification />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
