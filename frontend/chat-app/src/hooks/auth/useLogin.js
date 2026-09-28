// import React, { useState } from "react";
// import { loginUser ,  googleLogin} from "../../api/auth/AuthApi";
// import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import { auth } from "../../Firebase";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// export const useLogin = () => {
//   // Router hook for navigation after successful login
//   const navigate = useNavigate();

//   // State management for error and success messages
//   const [error, setError] = useState(""); // Error message from API or auth failure
//   const [sucess, setSucess] = useState(""); // Success message after successful login

//   // Form data state containing login credentials and user role
//   const [formData, setFormData] = useState({
//     email: "", // User email address
//     password: "", // User password
//     role: "", // User role (user/admin)
//   });

//   //Updates formData state whenever user types in any input field
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   //handleSubmit for submitting form data
//   const handleSubmit = async (e) => {
//     // Prevent default form submission behavior
//     e.preventDefault();

//     try {
//       // Call backend API to authenticate user with email and password
//       const res = await loginUser(formData);
//       // Set success message from API response
//       setSucess(res.data.message);
//       if (res.data.user.role === "admin") {
//            toast.success(res.data.message);
//         navigate("/admin");
//       } else {
//         navigate("/");
//       }

//       // Clear any previous errors
//       setError("");
//     } catch (error) {
//       // Handle errors from API response or network issues
//       if (error.response) {
//         // API returned an error response with message
//         setError(error.response.data.message);
//         toast.error(error.response?.data?.message || "Login failed");
//       } else {
//         // Network error or server not responding
//         setError("Server not responding");
//         toast.error("Server not responding");
//       }
//     }
//   };

//  // Handler for Google OAuth login via Firebase Google provider
// // const handleLogin = async () => {
// //   // Initialize Google authentication provider
// //   const provider = new GoogleAuthProvider();
// //   try {
// //     // Trigger Google sign-in popup
// //     const result = await signInWithPopup(auth, provider);
// //     // Get authenticated user information from Firebase
// //     result.user;
// //     navigate('/')

// //     // TODO: Send Google user data to backend
// //   } catch (error) {
// //     const message = error?.message || "Google login failed";
// //     setError(message);
// //     toast.error(message);
// //   }
// // };

// const handleLogin = async () => {
//   const provider = new GoogleAuthProvider();

//   try {
//     // 1. Authenticate with Google/Firebase
//     const result = await signInWithPopup(auth, provider);

//     const googleUser = result.user;

//     // 2. Send Google user to YOUR backend
//     const res = await googleLogin({
//       name: googleUser.displayName,
//       email: googleUser.email,
//     });

//     // 3. Backend has now created YOUR JWT cookie
//     toast.success(res.data.message);

//     // 4. Go to application
//     navigate("/");
//   } catch (error) {
//     const message =
//       error?.response?.data?.message ||
//       error?.message ||
//       "Google login failed";

//     setError(message);
//     toast.error(message);
//   }
// };

//   //Return hook state and handlers for use in login component
//   return {
//     handleChange, // Form input change handler
//     handleSubmit, // Form submission handler
//     handleLogin,
//      // Google OAuth login handler
//     error, // Error message state
//     sucess, // Success message state
//     formData, // Current form data state
//   };
// };

import React, { useContext, useState } from "react";
import { loginUser, googleLogin } from "../../api/auth/AuthApi";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";

export const useLogin = () => {
  // Router hook for navigation after successful login
  const navigate = useNavigate();

  // Get setUser from AuthContext
  const { setUser } = useContext(AuthContext);

  // State management for error and success messages
  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");

  // Login form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "",
  });

  console.log(formData)

  // Update formData when user types
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("LOGIN REQUEST:", formData);

  try {
    const res = await loginUser(formData);

    console.log("LOGIN RESPONSE:", res.data);

    setUser(res.data.user);

    setSucess(res.data.message);
    setError("");

    toast.success(res.data.message);

    if (res.data.user.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  } catch (error) {
    console.log("LOGIN ERROR:", error.response?.data);

    if (error.response) {
      setError(error.response.data.message);

      toast.error(
        error.response?.data?.message || "Login failed"
      );
    } else {
      setError("Server not responding");
      toast.error("Server not responding");
    }
  }
};

  // Google login
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      // 1. Authenticate with Google/Firebase
      const result = await signInWithPopup(auth, provider);

      const googleUser = result.user;

      // 2. Send Google user to your backend
      const res = await googleLogin({
        name: googleUser.displayName,
        email: googleUser.email,
      });

      // 3. IMPORTANT:
      // Update AuthContext after Google login too
      setUser(res.data.user);

      // 4. Show success message
      toast.success(res.data.message);

      // 5. Navigate to application
      navigate("/");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Google login failed";

      setError(message);
      toast.error(message);
    }
  };

  return {
    handleChange,
    handleSubmit,
    handleLogin,
    error,
    sucess,
    formData,
  };
};
