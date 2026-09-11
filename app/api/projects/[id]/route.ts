import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { fallbackStore, saveStore } from "@/lib/dataStore";
import { getAuthFromRequest } from "@/lib/auth";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = getAuthFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { id } = params;
    const body = await req.json();

    // Update in fallback store
    const idx = fallbackStore.projects.findIndex((p) => p._id === id);
    if (idx !== -1) {
      fallbackStore.projects[idx] = { ...fallbackStore.projects[idx], ...body };
      saveStore();
    }

    const db = await connectDB();
    if (db && id.match(/^[0-9a-fA-F]{24}$/)) {
      const project = await Project.findByIdAndUpdate(id, body, { new: true });
      return NextResponse.json({ success: true, project });
    }

    return NextResponse.json({
      success: true,
      project: idx !== -1 ? fallbackStore.projects[idx] : body,
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = getAuthFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { id } = params;
    fallbackStore.projects = fallbackStore.projects.filter((p) => p._id !== id);
    saveStore();

    const db = await connectDB();
    if (db && id.match(/^[0-9a-fA-F]{24}$/)) {
      await Project.findByIdAndDelete(id);
    }

    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
