import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import Profile from "@/models/Profile";
import Skill from "@/models/Skill";
import Project from "@/models/Project";
import Certificate from "@/models/Certificate";
import Experience from "@/models/Experience";
import SiteSettings from "@/models/SiteSettings";
import { fallbackStore } from "./dataStore";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/portfolio";

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
  isSeeded: boolean;
  lastFailedTime: number;
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || {
  conn: null,
  promise: null,
  isSeeded: false,
  lastFailedTime: 0,
};

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

// 30-second backoff cooldown to prevent blocking requests when MongoDB is offline
const OFFLINE_RETRY_COOLDOWN_MS = 30000;

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  const now = Date.now();
  // If MongoDB failed recently, don't freeze requests; return fallback immediately
  if (cached.lastFailedTime && now - cached.lastFailedTime < OFFLINE_RETRY_COOLDOWN_MS) {
    return null;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 1200, // Fast 1.2s timeout instead of 4+ seconds
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        cached.lastFailedTime = 0;
        return mongooseInstance;
      })
      .catch((err) => {
        cached.lastFailedTime = Date.now();
        cached.promise = null;
        return null as any;
      });
  }

  try {
    cached.conn = await cached.promise;
    if (cached.conn && !cached.isSeeded) {
      await autoSeedInitialData();
      cached.isSeeded = true;
    }
  } catch (e) {
    cached.lastFailedTime = Date.now();
    cached.promise = null;
  }

  return cached.conn;
}

export async function autoSeedInitialData() {
  try {
    const adminEmail = (process.env.ADMIN_EMAIL || "admin@portfolio.com").trim().toLowerCase();
    const adminPassword = (process.env.ADMIN_PASSWORD || "admin123456").trim();

    // 1. Seed Admin User
    const existingUser = await User.findOne({ email: adminEmail });
    if (!existingUser) {
      const passwordHash = await bcrypt.hash(adminPassword, 10);
      await User.create({
        email: adminEmail,
        passwordHash,
        name: "Purnendu Dutta",
        role: "admin",
      });
      console.log(`[Seed] Admin created: ${adminEmail}`);
    }

    // 2. Seed Profile
    const profileCount = await Profile.countDocuments();
    if (profileCount === 0) {
      await Profile.create(fallbackStore.profile);
    }

    // 3. Seed Skills
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      await Skill.insertMany(fallbackStore.skills);
    }

    // 4. Seed Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany(fallbackStore.projects);
    }

    // 5. Seed Certificates
    const certificateCount = await Certificate.countDocuments();
    if (certificateCount === 0) {
      await Certificate.insertMany(fallbackStore.certificates);
    }

    // 6. Seed Experience
    const experienceCount = await Experience.countDocuments();
    if (experienceCount === 0) {
      await Experience.insertMany(fallbackStore.experience);
    }

    // 7. Seed SiteSettings
    const settingsCount = await SiteSettings.countDocuments();
    if (settingsCount === 0) {
      await SiteSettings.create(fallbackStore.siteSettings);
    }
  } catch (error) {
    console.warn("[Seed Error]:", error);
  }
}
