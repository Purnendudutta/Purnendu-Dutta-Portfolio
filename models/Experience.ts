import mongoose, { Schema, Document } from "mongoose";

export interface IExperience extends Document {
  title: string;
  company: string;
  companyUrl: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  technologies: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ExperienceSchema = new Schema<IExperience>(
  {
    title: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    companyUrl: { type: String, default: "" },
    location: { type: String, default: "" },
    startDate: { type: String, required: true },
    endDate: { type: String, default: "" },
    current: { type: Boolean, default: false },
    description: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Experience || mongoose.model<IExperience>("Experience", ExperienceSchema);
