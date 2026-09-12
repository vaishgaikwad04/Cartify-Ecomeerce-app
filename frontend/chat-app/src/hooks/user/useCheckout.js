import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";

import { createCheckoutSession } from "../../api/user/OrderApi";

import { useAddress } from "./useAddress";
import { useCart } from "../../context/CartContext";

export const useCheckout = () => {
  // Used to navigate between pages.
  const navigate = useNavigate();

  // Get the current theme.
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "Dark Mode";

  // Get addresses from the address hook.
  const { addresses = [] } = useAddress();

  // Get cart products from the shared CartContext.
  const { cartData = [] } = useCart();

  // Store the selected address.
  const [selectedAddressId, setSelectedAddressId] = useState(null);

  // Store payment loading state.
  const [paymentLoading, setPaymentLoading] = useState(false);

  // Automatically select the default address.
  useEffect(() => {
    if (!addresses.length) {
      setSelectedAddressId(null);
      return;
    }

    const defaultAddress = addresses.find(
      (address) => address.isDefault
    );

    // Select default address or first address.
    setSelectedAddressId(
      defaultAddress?._id || addresses[0]._id
    );
  }, [addresses]);

  // Select an address manually.
  const handleSelectAddress = (id) => {
    setSelectedAddressId(id);
  };

  // Start the payment process.
  const handlePayment = async () => {
    // Check whether an address is selected.
    if (!selectedAddressId) {
      alert("Please select a delivery address.");
      return;
    }

    // Check whether the cart has products.
    if (!cartData.length) {
      alert("Your cart is empty.");
      return;
    }

    try {
      setPaymentLoading(true);

      // Prepare cart products for the payment API.
      const products = cartData.map((item) => ({
        productId: item.productId,
        name: item.productName,
        img: item.productImage,
        price: Number(item.productPrice),
        quantity: Number(item.quantity),
        size: item.size,
      }));

      console.log("Checkout products:", products);
      console.log("Selected address:", selectedAddressId);

      // Create Stripe checkout session.
      const res = await createCheckoutSession(
        products,
        selectedAddressId
      );

      console.log("Stripe response:", res.data);

      // Redirect to Stripe payment page.
      if (res.data?.url) {
        window.location.href = res.data.url;
        return;
      }

      alert("Unable to start payment.");
    } catch (error) {
      console.error(
        "Checkout error:",
        error?.response?.data || error?.message
      );

      alert(
        error?.response?.data?.message ||
          "Unable to start payment."
      );
    } finally {
      setPaymentLoading(false);
    }
  };

  // Return checkout state and actions.
  return {
    isDark,
    navigate,
    selectedAddressId,
    handleSelectAddress,
    paymentLoading,
    handlePayment,
  };
};