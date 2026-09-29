import authModel from "./authModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// =========================
// REGISTER USER
// =========================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ROLE IS NOT ACCEPTED FROM FRONTEND
    // Every normal registration is a user
    const role = "user";

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase();

    const user = await authModel.findOne({
      email: normalizedEmail,
    });

    if (user) {
      return res.status(409).json({
        message: "User already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await authModel.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      role, // ALWAYS "user"
    });

    return res.status(201).json({
      message: "User registered successfully!",
    });
  } catch (error) {
    console.error("Register error:", error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
};

// =========================
// LOGIN
// =========================
export const loginUser = async (req, res) => {
  try {
    // =========================
    // GET LOGIN DATA
    // =========================
    const { email, password, role } = req.body;

    // =========================
    // VALIDATION
    // =========================
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Email, password and role are required",
      });
    }

    // Normalize values
    const normalizedEmail = email.trim().toLowerCase();
    const selectedRole = role.trim().toLowerCase();

    // =========================
    // FIND USER
    // =========================
    const user = await authModel.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // =========================
    // PASSWORD CHECK
    // =========================
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // =========================
    // ROLE CHECK
    // =========================

    // Role stored in MongoDB
    const accountRole = String(user.role)
      .trim()
      .toLowerCase();

    console.log("========== LOGIN ROLE CHECK ==========");
    console.log("Email:", normalizedEmail);
    console.log("Selected role:", selectedRole);
    console.log("Database role:", accountRole);
    console.log("Role match:", accountRole === selectedRole);
    console.log("======================================");

    // IMPORTANT:
    // Do NOT create JWT if roles don't match
    if (accountRole !== selectedRole) {
      console.log("❌ ROLE MISMATCH - LOGIN REJECTED");

      return res.status(403).json({
        message: `This account is registered as ${accountRole}`,
      });
    }

    console.log("✅ ROLE MATCH - LOGIN ALLOWED");

    // =========================
    // JWT
    // =========================
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: accountRole,
      },
      process.env.JWT_SECRET
    );

    // =========================
    // COOKIE
    // =========================
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    // =========================
    // SUCCESS RESPONSE
    // =========================
    return res.status(200).json({
      message: "Login successful",

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: accountRole,
      },
    });
  } catch (err) {
    console.error("Login error:", err);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
// =========================
// LOGOUT
// =========================
export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

// =========================
// GET CURRENT USER
// =========================
export const getCurrentUser = async (req, res) => {
  try {
    const user = await authModel
      .findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      user,
    });
  } catch (error) {
    console.error(
      "Get current user error:",
      error
    );

    return res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// GOOGLE LOGIN
// =========================
export const googleLogin = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Google account email is required",
      });
    }

    const normalizedEmail = email.toLowerCase();

    // =========================
    // FIND USER
    // =========================
    let user = await authModel.findOne({
      email: normalizedEmail,
    });

    // =========================
    // CREATE GOOGLE USER
    // =========================
    if (!user) {
      user = await authModel.create({
        name,
        email: normalizedEmail,

        // Google users don't have
        // a normal password
        password: await bcrypt.hash(
          `google-${Date.now()}-${Math.random()}`,
          10
        ),

        // GOOGLE USERS ARE ALWAYS USERS
        role: "user",
      });
    }

    // =========================
    // JWT
    // =========================
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET
    );

    // =========================
    // COOKIE
    // =========================
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      message: "Google login successful",

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(
      "Google login error:",
      error
    );

    return res.status(500).json({
      message: "Google login failed",
    });
  }
};