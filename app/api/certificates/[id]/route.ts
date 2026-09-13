import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Certificate from "@/models/Certificate";
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

    const idx = fallbackStore.certificates.findIndex((c) => c._id === id);
    if (idx !== -1) {
      fallbackStore.certificates[idx] = { ...fallbackStore.certificates[idx], ...body };
      saveStore();
    }

    const db = await connectDB();
    if (db && id.match(/^[0-9a-fA-F]{24}$/)) {
      const certificate = await Certificate.findByIdAndUpdate(id, body, { new: true });
      return NextResponse.json({ success: true, certificate });
    }

    return NextResponse.json({
      success: true,
      certificate: idx !== -1 ? fallbackStore.certificates[idx] : body,
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update certificate" }, { status: 500 });
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
    fallbackStore.certificates = fallbackStore.certificates.filter((c) => c._id !== id);
    saveStore();

    const db = await connectDB();
    if (db && id.match(/^[0-9a-fA-F]{24}$/)) {
      await Certificate.findByIdAndDelete(id);
    }

    return NextResponse.json({ success: true, message: "Certificate deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete certificate" }, { status: 500 });
  }
}
