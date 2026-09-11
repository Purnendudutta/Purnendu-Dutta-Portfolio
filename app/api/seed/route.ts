import { NextRequest, NextResponse } from "next/server";
import { connectDB, autoSeedInitialData } from "@/lib/mongodb";
import { fallbackStore } from "@/lib/dataStore";
import {
  initialProfile,
  initialSkills,
  initialProjects,
  initialCertificates,
  initialExperience,
  initialSiteSettings,
} from "@/lib/seedData";
import { getAuthFromRequest } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const session = getAuthFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    // Reset fallback store
    fallbackStore.profile = JSON.parse(JSON.stringify(initialProfile));
    fallbackStore.skills = initialSkills.map((s, idx) => ({ ...s, _id: `skill_${idx + 1}` }));
    fallbackStore.projects = initialProjects.map((p, idx) => ({ ...p, _id: `proj_${idx + 1}` }));
    fallbackStore.certificates = initialCertificates.map((c, idx) => ({ ...c, _id: `cert_${idx + 1}` }));
    fallbackStore.experience = initialExperience.map((e, idx) => ({ ...e, _id: `exp_${idx + 1}` }));
    fallbackStore.siteSettings = JSON.parse(JSON.stringify(initialSiteSettings));

    const db = await connectDB();
    if (db) {
      await autoSeedInitialData();
    }

    return NextResponse.json({ success: true, message: "Database re-seeded successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to re-seed database" }, { status: 500 });
  }
}
