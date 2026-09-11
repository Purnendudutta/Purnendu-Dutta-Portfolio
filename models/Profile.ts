import mongoose, { Schema, Document } from "mongoose";

export interface IProfile extends Document {
  name: string;
  headline: string;
  shortDescription: string;
  longBio: string;
  dynamicRoles: string[];
  avatarUrl: string;
  heroImage: string;
  logoUrl: string;
  resumeUrl: string;
  socialLinks: {
    platform: string;
    url: string;
    icon: string;
  }[];
  stats: {
    yearsExperience: string;
    projectsCompleted: string;
    technologies: string;
    certificates: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProfileSchema = new Schema<IProfile>(
  {
    name: { type: String, required: true, default: "Purnendu Dutta" },
    headline: { type: String, default: "AI Engineer & Full Stack Developer" },
    shortDescription: { type: String, default: "I build intelligent systems and modern web applications that solve real-world problems." },
    longBio: { type: String, default: "" },
    dynamicRoles: {
      type: [String],
      default: ["AI Engineer", "Full Stack Developer", "Web Developer", "Software Engineer", "Automation Developer", "Problem Solver"],
    },
    avatarUrl: { type: String, default: "" },
    heroImage: { type: String, default: "" },
    logoUrl: { type: String, default: "/logo.png" },
    resumeUrl: { type: String, default: "/resume.pdf" },
    socialLinks: [
      {
        platform: { type: String, required: true },
        url: { type: String, required: true },
        icon: { type: String, default: "Globe" },
      },
    ],
    stats: {
      yearsExperience: { type: String, default: "4+" },
      projectsCompleted: { type: String, default: "25+" },
      technologies: { type: String, default: "30+" },
      certificates: { type: String, default: "8+" },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Profile || mongoose.model<IProfile>("Profile", ProfileSchema);
