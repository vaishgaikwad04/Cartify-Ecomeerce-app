import authModel from "./authModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// REGISTER
export const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const user = await authModel.findOne({ email });

    if (user) {
      return res.status(409).json({
        message: "User already exists!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await authModel.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: "User registered successfully!",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
};

// LOGIN
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
         message: "Email and password are required",
      });
    }

    const user = await authModel.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
         message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET
    );

    // Production: frontend and backend are on different sites
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);

    return res.status(500).json({
       message: "Server error",
    });
  }
};

// LOGOUT
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

// GET CURRENT USER
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
    console.error("Get current user error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};



// GOOGLE LOGIN
export const googleLogin = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Google account email is required",
      });
    }

    const normalizedEmail = email.toLowerCase();

    // Check whether this Google user already exists
    let user = await authModel.findOne({
      email: normalizedEmail,
    });

    // Create account if user doesn't exist
    if (!user) {
      user = await authModel.create({
        name,
        email: normalizedEmail,

        // Google users don't have a normal password
        password: await bcrypt.hash(
          `google-${Date.now()}-${Math.random()}`,
          10
        ),

        role: "user",
      });
    }

    // Create YOUR application's JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET
    );

    // Store YOUR JWT in the same cookie
    // used by normal login
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
    console.error("Google login error:", error);

    return res.status(500).json({
      message: "Google login failed",
    });
  }
};