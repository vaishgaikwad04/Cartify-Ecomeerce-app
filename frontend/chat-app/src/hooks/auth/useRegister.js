import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

import { authSchema} from "../../validations/auth/RegisterSchema";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { auth } from "../../Firebase";
import { registerUser } from "../../api/auth/AuthApi";
import toast from "react-hot-toast";

const initialValues = {
  name: "",
  email: "",
  password: "",
  role: "",
};

export const useRegister = () => {
  const navigate = useNavigate();

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

        navigate("/auth?mode=login");
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
      const result = await signInWithPopup(auth, provider);

      const user = result.user;

      console.log("Google User:", user);

      // Later:
      // const token = await user.getIdToken();
      // await googleRegister(token);
    } catch (error) {
      console.error("Google authentication error:", error);

      toast.error("Google authentication failed");
    }
  };

  return {
    formik,
    error,
    success,
    handleLogin,
  };
};
