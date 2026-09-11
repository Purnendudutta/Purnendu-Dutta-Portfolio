import mongoose, { Schema, Document } from "mongoose";

export interface ISiteSettings extends Document {
  defaultTheme: "dark" | "light";
  defaultAccent: "purple" | "cyan" | "green" | "orange" | "pink" | "red";
  seoTitle: string;
  seoDescription: string;
  favicon: string;
  ogImage: string;
  createdAt: Date;
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettings>(
  {
    defaultTheme: { type: String, enum: ["dark", "light"], default: "dark" },
    defaultAccent: {
      type: String,
      enum: ["purple", "cyan", "green", "orange", "pink", "red"],
      default: "purple",
    },
    seoTitle: { type: String, default: "Purnendu Dutta | AI Engineer & Full Stack Developer" },
    seoDescription: { type: String, default: "Professional developer portfolio showcasing projects, skills, experience and certifications." },
    favicon: { type: String, default: "/favicon.ico" },
    ogImage: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.SiteSettings || mongoose.model<ISiteSettings>("SiteSettings", SiteSettingsSchema);
