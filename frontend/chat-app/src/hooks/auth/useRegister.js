
import React, { useState } from "react";
import { registerUser } from "../../api/auth/AuthApi";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../Firebase";

export const useRegister = () => {
  // Router hook for navigation after successful registration
  const navigate = useNavigate();

  // State management for error and success messages
  const [error, setError] = useState(""); // Error message from API or auth failure
  const [sucess, setSucess] = useState(""); // Success message after successful registration

  // Form data state containing user registration information
  const [formData, setFormData] = useState({
    name: "", // User's full name
    email: "", // User email address
    password: "", // User password
    role: "", // User role (user/admin)
  });

  
  //Handler for form input changes
  const handleChange = (e) => {
    // Update specific field in formData while preserving other fields
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  
  //Handler for email/password form submission
  const handleSubmit = async (e) => {
    // Prevent default form submission behavior
    e.preventDefault();

    try {
      // Call backend API to register new user with form data
      const res = await registerUser(formData);

      // Set success message from API response
      setSucess(res.data.message);

      // Navigate to home page after successful registration
      navigate("/auth?mode=login");

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


  //Authenticates user via Firebase Google provider
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

  
  //Return hook state and handlers for use in register component
  return {
    handleChange, // Form input change handler
    handleSubmit, // Form submission handler
    handleLogin, // Google OAuth login handler
    formData, // Current form data state
    error, // Error message state
    sucess, // Success message state
  };
};
