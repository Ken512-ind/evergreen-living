import bcrypt from "bcryptjs";
import User from "../models/User.js";

const seedAdmin = async () => {
  try {
    const admin = await User.findOne({
      where: {
        email: "admin@evergreen.com",
      },
    });

    if (admin) {
      console.log("✅ Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Administrator",
      email: "admin@evergreen.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("✅ Admin created successfully");
  } catch (err) {
    console.error(err);
  }
};

export default seedAdmin;