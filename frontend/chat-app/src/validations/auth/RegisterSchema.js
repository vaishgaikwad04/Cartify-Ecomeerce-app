import * as Yup from "yup";

export const authSchema = Yup.object({
  email: Yup.string()
    .trim()
    .lowercase()
    .email("Enter a valid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must not exceed 50 characters")
    .matches(
      /[A-Z]/,
      "Password must contain at least one uppercase letter"
    )
    .matches(
      /[a-z]/,
      "Password must contain at least one lowercase letter"
    )
    .matches(
      /[0-9]/,
      "Password must contain at least one number"
    )
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),

  role: Yup.string()
    .oneOf(
      ["user", "admin"],
      "Please select a valid role"
    )
    .required("Please select a role"),
});