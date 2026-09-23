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
}

declare global {
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = (global as any).mongooseCache || {
  conn: null,
  promise: null,
  isSeeded: false,
};

if (!(global as any).mongooseCache) {
  (global as any).mongooseCache = cached;
}

export async function connectDB() {
  // If already connected and ready, return existing connection
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // If connection is dead or not yet initiated, reconnect
  if (!cached.promise || mongoose.connection.readyState === 0) {
    const opts = {
      bufferCommands: true,
      serverSelectionTimeoutMS: 5000,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongooseInstance) => {
        return mongooseInstance;
      })
      .catch((err) => {
        cached.promise = null;
        cached.conn = null;
        console.error("[MongoDB Connection Error]:", err?.message || err);
        throw err;
      });
  }

  try {
    cached.conn = await cached.promise;
    if (cached.conn && !cached.isSeeded) {
      await autoSeedInitialData();
      cached.isSeeded = true;
    }
  } catch (e) {
    cached.promise = null;
    cached.conn = null;
    return null;
  }

  return cached.conn;
}

export async function autoSeedInitialData() {
  try {
    const adminEmail = (process.env.ADMIN_EMAIL || "admin@portfolio.com").trim().toLowerCase();
    const adminPassword = (process.env.ADMIN_PASSWORD || "admin123456").trim();

    // Helper to strip dummy _id strings (like 'skill_1') so Mongoose generates valid ObjectIds
    const sanitizeDoc = (doc: any) => {
      const clone = { ...doc };
      if (clone._id && !String(clone._id).match(/^[0-9a-fA-F]{24}$/)) {
        delete clone._id;
      }
      return clone;
    };

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
      await Profile.create(sanitizeDoc(fallbackStore.profile));
      console.log("[Seed] Profile seeded into MongoDB");
    }

    // 3. Seed Skills
    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      const sanitizedSkills = fallbackStore.skills.map(sanitizeDoc);
      await Skill.insertMany(sanitizedSkills);
      console.log("[Seed] Skills seeded into MongoDB");
    }

    // 4. Seed Projects
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      const sanitizedProjects = fallbackStore.projects.map(sanitizeDoc);
      await Project.insertMany(sanitizedProjects);
      console.log("[Seed] Projects seeded into MongoDB");
    }

    // 5. Seed Certificates
    const certificateCount = await Certificate.countDocuments();
    if (certificateCount === 0) {
      const sanitizedCerts = fallbackStore.certificates.map(sanitizeDoc);
      await Certificate.insertMany(sanitizedCerts);
      console.log("[Seed] Certificates seeded into MongoDB");
    }

    // 6. Seed Experience
    const experienceCount = await Experience.countDocuments();
    if (experienceCount === 0) {
      const sanitizedExp = fallbackStore.experience.map(sanitizeDoc);
      await Experience.insertMany(sanitizedExp);
      console.log("[Seed] Experience seeded into MongoDB");
    }

    // 7. Seed SiteSettings
    const settingsCount = await SiteSettings.countDocuments();
    if (settingsCount === 0) {
      await SiteSettings.create(sanitizeDoc(fallbackStore.siteSettings));
      console.log("[Seed] SiteSettings seeded into MongoDB");
    }
  } catch (error) {
    console.warn("[Seed Error]:", error);
  }
}
