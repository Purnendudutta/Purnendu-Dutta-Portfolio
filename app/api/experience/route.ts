import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Experience from "@/models/Experience";
import { fallbackStore, saveStore } from "@/lib/dataStore";
import { getAuthFromRequest } from "@/lib/auth";

export async function GET() {
  try {
    const db = await connectDB();
    if (db) {
      const experience = await Experience.find().sort({ order: 1, startDate: -1 });
      if (experience && experience.length > 0) {
        return NextResponse.json({ experience });
      }
    }
    return NextResponse.json({ experience: fallbackStore.experience });
  } catch (error) {
    return NextResponse.json({ experience: fallbackStore.experience });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = getAuthFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    const newExpData = {
      title: body.title || "Software Engineer",
      company: body.company || "Company Name",
      companyUrl: body.companyUrl || "",
      location: body.location || "",
      startDate: body.startDate || new Date().toISOString().substring(0, 10),
      endDate: body.endDate || "",
      current: Boolean(body.current),
      description: Array.isArray(body.description) ? body.description : [body.description || ""],
      technologies: Array.isArray(body.technologies) ? body.technologies : [],
      order: Number(body.order) || fallbackStore.experience.length + 1,
    };

    const db = await connectDB();
    if (db) {
      const exp = await Experience.create(newExpData);
      fallbackStore.experience.push({ ...newExpData, _id: exp._id.toString() });
      saveStore();
      return NextResponse.json({ success: true, experience: exp });
    }

    const memoryExp = { ...newExpData, _id: `exp_${Date.now()}` };
    fallbackStore.experience.push(memoryExp);
    saveStore();
    return NextResponse.json({ success: true, experience: memoryExp });
  } catch (error: any) {
    console.error("Create experience error:", error);
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 });
  }
}
