import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Skill from "@/models/Skill";
import { fallbackStore, saveStore } from "@/lib/dataStore";
import { getAuthFromRequest } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = getAuthFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();

    // Update in-memory fallback
    const idx = fallbackStore.skills.findIndex((s) => s._id === id);
    if (idx !== -1) {
      fallbackStore.skills[idx] = { ...fallbackStore.skills[idx], ...body };
      saveStore();
    }

    const db = await connectDB();
    if (db && id.match(/^[0-9a-fA-F]{24}$/)) {
      const skill = await Skill.findByIdAndUpdate(id, body, { new: true });
      revalidatePath("/", "layout");
      return NextResponse.json({ success: true, skill });
    }

    revalidatePath("/", "layout");
    return NextResponse.json({
      success: true,
      skill: idx !== -1 ? fallbackStore.skills[idx] : body,
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = getAuthFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { id } = await params;

    fallbackStore.skills = fallbackStore.skills.filter((s) => s._id !== id);
    saveStore();

    const db = await connectDB();
    if (db && id.match(/^[0-9a-fA-F]{24}$/)) {
      await Skill.findByIdAndDelete(id);
    }

    revalidatePath("/", "layout");
    return NextResponse.json({ success: true, message: "Skill deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 });
  }
}
