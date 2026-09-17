import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";
import { fallbackStore, saveStore } from "@/lib/dataStore";
import { getAuthFromRequest } from "@/lib/auth";

export async function GET() {
  try {
    const db = await connectDB();
    if (db) {
      const settings = await SiteSettings.findOne().sort({ createdAt: -1 });
      if (settings) {
        return NextResponse.json({ settings });
      }
    }
    return NextResponse.json({ settings: fallbackStore.siteSettings });
  } catch (error) {
    return NextResponse.json({ settings: fallbackStore.siteSettings });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = getAuthFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    fallbackStore.siteSettings = { ...fallbackStore.siteSettings, ...body };
    saveStore();

    const db = await connectDB();
    if (db) {
      let settings = await SiteSettings.findOne();
      if (!settings) {
        settings = await SiteSettings.create(body);
      } else {
        Object.assign(settings, body);
        await settings.save();
      }
      revalidatePath("/");
      return NextResponse.json({ success: true, settings });
    }

    revalidatePath("/");
    return NextResponse.json({ success: true, settings: fallbackStore.siteSettings });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
