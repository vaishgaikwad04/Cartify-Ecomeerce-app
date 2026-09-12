import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";

import { CategoryProvider } from "./context/CategoryContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NotificationProvider>
      <ThemeProvider>
        <ProductProvider>
          <CategoryProvider>
            <CartProvider>
            <App />

            <Toaster
              position="top-right"
              reverseOrder={false}
              toastOptions={{
                duration: 3000,

                style: {
                  background: "#ffffff",
                  color: "#1f2937",
                  padding: "14px 18px",
                  borderRadius: "10px",
                  fontSize: "14px",
                  fontWeight: "500",
                  boxShadow: "0 4px 15px rgba(0, 0, 0, 0.12)",
                  border: "1px solid #e5e7eb",
                },

                success: {
                  duration: 1000,
                  style: {
                    background: "#ffffff",
                    color: "#166534",
                    border: "1px solid #bbf7d0",
                  },
                  iconTheme: {
                    primary: "#22c55e",
                    secondary: "#ffffff",
                  },
                },

                error: {
                  duration: 1000,
                  style: {
                    background: "#ffffff",
                    color: "#991b1b",
                    border: "1px solid #fecaca",
                  },
                  iconTheme: {
                    primary: "#ef4444",
                    secondary: "#ffffff",
                  },
                },
              }}
            />
            </CartProvider>
          </CategoryProvider>
        </ProductProvider>
      </ThemeProvider>
    </NotificationProvider>
  </StrictMode>,
);
