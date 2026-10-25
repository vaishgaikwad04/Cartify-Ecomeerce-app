import { useState } from "react";
import { useFormik } from "formik";

import { authSchema} from "../../validations/auth/RegisterSchema";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { auth } from "../../Firebase";
import { registerUser, googleLogin } from "../../api/auth/AuthApi";
import toast from "react-hot-toast";

const initialValues = {
  name: "",
  email: "",
  password: "",
  role: "",
};

export const useRegister = ({ setIsLogin }) => {
 

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const formik = useFormik({
    initialValues,
    validationSchema: authSchema,

    validateOnBlur: true,
    validateOnChange: true,

    onSubmit: async (values, actions) => {
      try {
        setError("");
        setSuccess("");

        console.log("Registration values:", values);

        const res = await registerUser(values);

        const message = res.data?.message || "Registration successful";

        setSuccess(message);
        toast.success(message);

        actions.resetForm();

       setIsLogin(true)
      } catch (error) {
        console.error("Registration error:", error);

        if (error.response) {
          const message = error.response.data?.message || "Registration failed";

          setError(message);
          toast.error(message);
        } else {
          setError("Server not responding");
          toast.error("Server not responding");
        }
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

 const handleLogin = async () => {
  const provider = new GoogleAuthProvider();

  try {
    setError("");

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    if (!user.email) {
      throw new Error("Google account email is required");
    }

    const idToken = await user.getIdToken();

    const res = await googleLogin({
      idToken,
      name: user.displayName || "",
      email: user.email,
    });

    const message =
      res.data?.message || "Google registration successful";

    setSuccess(message);
    toast.success(message);

    setIsLogin(true);
  } catch (error) {
    console.error("Google registration error:", error);

    const message =
      error.response?.data?.message ||
      error.message ||
      "Google registration failed";

    setError(message);
    toast.error(message);
  }
};
  return {
    formik,
    error,
    success,
    handleLogin,
  };
};
