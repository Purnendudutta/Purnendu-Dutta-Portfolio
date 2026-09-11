import mongoose, { Schema, Document } from "mongoose";

export interface ICertificate extends Document {
  title: string;
  issuer: string;
  image: string;
  date: string;
  credentialId: string;
  verificationUrl: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CertificateSchema = new Schema<ICertificate>(
  {
    title: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    date: { type: String, default: "" },
    credentialId: { type: String, default: "" },
    verificationUrl: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Certificate || mongoose.model<ICertificate>("Certificate", CertificateSchema);
