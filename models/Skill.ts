import mongoose, { Schema, Document } from "mongoose";

export interface ISkill extends Document {
  name: string;
  category: "Frontend" | "Backend" | "Database" | "AI / Machine Learning" | "DevOps & Cloud" | "Tools & Others";
  icon: string;
  proficiency: number;
  years: number;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ["Frontend", "Backend", "Database", "AI / Machine Learning", "DevOps & Cloud", "Tools & Others"],
      default: "Frontend",
    },
    icon: { type: String, default: "Code2" },
    proficiency: { type: Number, default: 85, min: 0, max: 100 },
    years: { type: Number, default: 1 },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Skill || mongoose.model<ISkill>("Skill", SkillSchema);
