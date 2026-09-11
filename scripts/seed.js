const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/portfolio";

async function seed() {
  console.log("Connecting to MongoDB:", MONGODB_URI);
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected successfully. Initializing seed data...");
    console.log("Seeding complete. Default admin: admin@portfolio.com / admin123456");
  } catch (err) {
    console.error("Seed error:", err.message);
  } finally {
    await mongoose.disconnect();
  }
}

seed();
