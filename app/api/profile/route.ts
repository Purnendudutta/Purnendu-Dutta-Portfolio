import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Profile from "@/models/Profile";
import { fallbackStore, saveStore } from "@/lib/dataStore";
import { getAuthFromRequest } from "@/lib/auth";

export async function GET() {
  try {
    const db = await connectDB();
    if (db) {
      const profile = await Profile.findOne().sort({ createdAt: -1 });
      if (profile) {
        return NextResponse.json({ profile });
      }
    }
    return NextResponse.json({ profile: fallbackStore.profile });
  } catch (error: any) {
    return NextResponse.json({ profile: fallbackStore.profile });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = getAuthFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();

    // Update persistent store & disk file
    fallbackStore.profile = { ...fallbackStore.profile, ...body };
    saveStore();

    const db = await connectDB();
    if (db) {
      let profile = await Profile.findOne();
      if (!profile) {
        profile = await Profile.create(body);
      } else {
        Object.assign(profile, body);
        await profile.save();
      }
      return NextResponse.json({ success: true, profile });
    }

    return NextResponse.json({ success: true, profile: fallbackStore.profile });
  } catch (error: any) {
    console.error("Profile update error:", error);
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
