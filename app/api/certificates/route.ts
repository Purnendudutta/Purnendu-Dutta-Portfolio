import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Certificate from "@/models/Certificate";
import { fallbackStore, saveStore } from "@/lib/dataStore";
import { getAuthFromRequest } from "@/lib/auth";

export async function GET() {
  try {
    const db = await connectDB();
    if (db) {
      const certificates = await Certificate.find().sort({ order: 1, createdAt: 1 });
      if (certificates && certificates.length > 0) {
        return NextResponse.json({ certificates });
      }
    }
    return NextResponse.json({ certificates: fallbackStore.certificates });
  } catch (error) {
    return NextResponse.json({ certificates: fallbackStore.certificates });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = getAuthFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    const newCertData = {
      title: body.title || "New Certificate",
      issuer: body.issuer || "Issuing Organization",
      image: body.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
      date: body.date || new Date().getFullYear().toString(),
      credentialId: body.credentialId || "",
      verificationUrl: body.verificationUrl || "",
      order: Number(body.order) || fallbackStore.certificates.length + 1,
      isActive: body.isActive !== undefined ? body.isActive : true,
    };

    const db = await connectDB();
    if (db) {
      const cert = await Certificate.create(newCertData);
      fallbackStore.certificates.push({ ...newCertData, _id: cert._id.toString() });
      saveStore();
      return NextResponse.json({ success: true, certificate: cert });
    }

    const memoryCert = { ...newCertData, _id: `cert_${Date.now()}` };
    fallbackStore.certificates.push(memoryCert);
    saveStore();
    return NextResponse.json({ success: true, certificate: memoryCert });
  } catch (error: any) {
    console.error("Create certificate error:", error);
    return NextResponse.json({ error: "Failed to create certificate" }, { status: 500 });
  }
}
