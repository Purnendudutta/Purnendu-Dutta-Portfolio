import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Skill from "@/models/Skill";
import { fallbackStore, saveStore } from "@/lib/dataStore";
import { getAuthFromRequest } from "@/lib/auth";

export async function GET() {
  try {
    const db = await connectDB();
    if (db) {
      const skills = await Skill.find().sort({ order: 1, createdAt: 1 });
      if (skills && skills.length > 0) {
        return NextResponse.json({ skills });
      }
    }
    return NextResponse.json({ skills: fallbackStore.skills });
  } catch (error) {
    return NextResponse.json({ skills: fallbackStore.skills });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = getAuthFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    const newSkillData = {
      name: body.name || "New Skill",
      category: body.category || "Frontend",
      icon: body.icon || "Code2",
      proficiency: Number(body.proficiency) || 80,
      years: Number(body.years) || 1,
      order: Number(body.order) || fallbackStore.skills.length + 1,
      isActive: body.isActive !== undefined ? body.isActive : true,
    };

    const db = await connectDB();
    if (db) {
      const skill = await Skill.create(newSkillData);
      fallbackStore.skills.push({ ...newSkillData, _id: skill._id.toString() });
      saveStore();
      revalidatePath("/", "layout");
      return NextResponse.json({ success: true, skill });
    }

    const memorySkill = { ...newSkillData, _id: `skill_${Date.now()}` };
    fallbackStore.skills.push(memorySkill);
    saveStore();
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true, skill: memorySkill });
  } catch (error: any) {
    console.error("Create skill error:", error);
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 });
  }
}
