
import React, { useState } from "react";
import { registerUser } from "../../api/auth/AuthApi";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../Firebase";
import toast from "react-hot-toast";

// Custom hook for handling user registration and Google authentication
export const useRegister = () => {
  // Navigate user to another page after successful registration
  const navigate = useNavigate();

  // Store registration error and success messages
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Store registration form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  // Handle changes in registration form inputs
  const handleChange = (e) => {
    // Update the changed field while keeping the existing form data
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle registration form submission
  const handleSubmit = async (e) => {
    // Prevent the browser from refreshing the page
    e.preventDefault();

    try {
      // Send registration data to the backend API
      const res = await registerUser(formData);

      // Store and display the success message
      setSuccess(res.data.message);
     toast.success(res.data.message);

      // Redirect the user to the login page
      navigate("/auth?mode=login");

      // Clear any previous error message
      setError("");
    } catch (error) {
      // Handle errors returned by the backend
      if (error.response) {
        // Display the backend error message
        setError(error.response.data.message);
        toast.error(error.response.data.message);
        console.log(error);
      } else {
        // Handle server or network connection errors
        setError("Server not responding");
        toast.error("Server not responding");
      }
    }
  };

  // Handle Google authentication using Firebase
  const handleLogin = async () => {
    // Create a Google authentication provider
    const provider = new GoogleAuthProvider();

    try {
      // Open the Google sign-in popup
      const result = await signInWithPopup(auth, provider);

      // Get the authenticated Google user
      const user = result.user;

      // Display Google user information for testing
      console.log("Google User:", user);

      // TODO: Send Firebase user information/token to the backend
    } catch (error) {
      // Handle Google authentication errors
      console.log(error.message);
    }
  };

  // Return state and functions so the register component can use them
  return {
    handleChange,
    handleSubmit,
    handleLogin,
    formData,
    error,
    success,
  };
};

