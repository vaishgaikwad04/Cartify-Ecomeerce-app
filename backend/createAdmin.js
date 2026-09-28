import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import authModel from "./modules/auth/authModel.js";

dotenv.config();

const createAdmin = async () => {
  try {
    // CONNECT TO MONGODB
    await mongoose.connect(process.env.MONGO_DB);

    console.log("MongoDB connected successfully");

    // CHECK IF ADMIN ALREADY EXISTS
    const existingAdmin = await authModel.findOne({
      role: "admin",
    });

    if (existingAdmin) {
      console.log("Admin already exists!");
      console.log("Admin email:", existingAdmin.email);

      await mongoose.disconnect();
      process.exit(0);
    }

    // ADMIN DETAILS FROM .env
    const name = process.env.ADMIN_NAME;
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    // CHECK ADMIN ENV VARIABLES
    if (!name || !email || !password) {
      throw new Error(
        "ADMIN_NAME, ADMIN_EMAIL or ADMIN_PASSWORD is missing from .env"
      );
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // CREATE ADMIN
    const admin = await authModel.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "admin",
    });

    console.log("=================================");
    console.log("Admin created successfully!");
    console.log("Name:", admin.name);
    console.log("Email:", admin.email);
    console.log("Role:", admin.role);
    console.log("=================================");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Admin creation failed:", error);

    await mongoose.disconnect();
    process.exit(1);
  }
};

createAdmin();