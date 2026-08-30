import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.jsx";

import { CategoryProvider } from "./context/CategoryContext.jsx";
import { ProductProvider } from "./context/ProductContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";

import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NotificationProvider>
      <ThemeProvider>
        <ProductProvider>
          <CategoryProvider>
            <App />

            <Toaster position="top-right" reverseOrder={false} />
          </CategoryProvider>
        </ProductProvider>
      </ThemeProvider>
    </NotificationProvider>
  </StrictMode>,
);
