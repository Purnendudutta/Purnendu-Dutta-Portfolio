import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Experience from "@/models/Experience";
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

    const idx = fallbackStore.experience.findIndex((e) => e._id === id);
    if (idx !== -1) {
      fallbackStore.experience[idx] = { ...fallbackStore.experience[idx], ...body };
      saveStore();
    }

    const db = await connectDB();
    if (db && id.match(/^[0-9a-fA-F]{24}$/)) {
      const experience = await Experience.findByIdAndUpdate(id, body, { new: true });
      revalidatePath("/", "layout");
      return NextResponse.json({ success: true, experience });
    }

    revalidatePath("/", "layout");
    return NextResponse.json({
      success: true,
      experience: idx !== -1 ? fallbackStore.experience[idx] : body,
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 });
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
    fallbackStore.experience = fallbackStore.experience.filter((e) => e._id !== id);
    saveStore();

    const db = await connectDB();
    if (db && id.match(/^[0-9a-fA-F]{24}$/)) {
      await Experience.findByIdAndDelete(id);
    }

    revalidatePath("/", "layout");
    return NextResponse.json({ success: true, message: "Experience deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 });
  }
}
