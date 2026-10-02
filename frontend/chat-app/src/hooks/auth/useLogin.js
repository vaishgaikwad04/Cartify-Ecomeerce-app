import React, { useContext, useState } from "react";
import { loginUser, googleLogin } from "../../api/auth/AuthApi";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../Firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { useFormik } from "formik";
import { authSchema } from "../../validations/auth/RegisterSchema";

const initialValues = {
  email: "",
  password: "",
  role: "",
};

export const useLogin = ({ setIsOpen }) => {
  const navigate = useNavigate();

  const { setUser } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [sucess, setSucess] = useState("");

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: authSchema,

      onSubmit: async (values, actions) => {
        console.log("FORM VALUES:", values);

        try {
          const res = await loginUser(values);

          setUser(res.data.user);

          setSucess(res.data.message);
          setError("");

          toast.success(res.data.message);

          if (res.data.user.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
          setIsOpen(false);
          actions.resetForm();
        } catch (error) {
          console.log("LOGIN ERROR:", error.response?.data);

          if (error.response) {
            setError(error.response.data.message);

            toast.error(error.response?.data?.message || "Login failed");
          } else {
            setError("Server not responding");
            toast.error("Server not responding");
          }
        }
      },
    });

  // Google Login
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);

      const googleUser = result.user;

      const res = await googleLogin({
        name: googleUser.displayName,
        email: googleUser.email,
      });

      setUser(res.data.user);

      toast.success(res.data.message);

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
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    handleLogin,
    error,
    sucess,
  };
};
