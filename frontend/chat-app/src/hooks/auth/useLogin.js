import React, { useState } from "react";
import { loginUser } from "../../api/auth/AuthApi";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../Firebase";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  // Router hook for navigation after successful login
  const navigate = useNavigate();

  // State management for error and success messages
  const [error, setError] = useState(""); // Error message from API or auth failure
  const [sucess, setSucess] = useState(""); // Success message after successful login

  // Form data state containing login credentials and user role
  const [formData, setFormData] = useState({
    email: "", // User email address
    password: "", // User password
    role: "", // User role (user/admin)
  });

  //Updates formData state whenever user types in any input field
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //handleSubmit for submitting form data
  const handleSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    try {
      // Call backend API to authenticate user with email and password
      const res = await loginUser(formData);
      console.log(res.data);

      // Set success message from API response
      setSucess(res.data.message);

      // Navigate to home page after successful login
      // Navigate based on user role
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      // Clear any previous errors
      setError("");
    } catch (error) {
      // Handle errors from API response or network issues
      if (error.response) {
        // API returned an error response with message
        setError(error.response.data.message);
      } else {
        // Network error or server not responding
        setError("Server not responding");
      }
    }
  };

  //Handler for Google OAuth login via Firebase Google provider
  const handleLogin = async () => {
    // Initialize Google authentication provider
    const provider = new GoogleAuthProvider();

    try {
      // Trigger Google sign-in popup
      const result = await signInWithPopup(auth, provider);

      // Get authenticated user information from Firebase
      const user = result.user;
      console.log("Google User:", user);
      // TODO: Send Google user data to backend for registration/login
    } catch (error) {
      // Log any authentication errors
      console.log(error.message);
    }
  };

  //Return hook state and handlers for use in login component
  return {
    handleChange, // Form input change handler
    handleSubmit, // Form submission handler
    handleLogin, // Google OAuth login handler
    error, // Error message state
    sucess, // Success message state
    formData, // Current form data state
  };
};
