import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import Project from "@/models/Project";
import { fallbackStore, saveStore } from "@/lib/dataStore";
import { getAuthFromRequest } from "@/lib/auth";

export async function GET() {
  try {
    const db = await connectDB();
    if (db) {
      const projects = await Project.find().sort({ order: 1, createdAt: 1 });
      if (projects && projects.length > 0) {
        return NextResponse.json({ projects });
      }
    }
    return NextResponse.json({ projects: fallbackStore.projects });
  } catch (error) {
    return NextResponse.json({ projects: fallbackStore.projects });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = getAuthFromRequest(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const body = await req.json();
    const slug = (body.title || "new-project")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const newProjectData = {
      title: body.title || "New Project",
      slug: slug || `project-${Date.now()}`,
      description: body.description || "",
      longDescription: body.longDescription || "",
      image: body.image || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      technologies: Array.isArray(body.technologies) ? body.technologies : [],
      githubUrl: body.githubUrl || "",
      liveUrl: body.liveUrl || "",
      featured: Boolean(body.featured),
      order: Number(body.order) || fallbackStore.projects.length + 1,
    };

    const db = await connectDB();
    if (db) {
      const project = await Project.create(newProjectData);
      fallbackStore.projects.push({ ...newProjectData, _id: project._id.toString() });
      saveStore();
      revalidatePath("/", "layout");
      return NextResponse.json({ success: true, project });
    }

    const memoryProject = { ...newProjectData, _id: `proj_${Date.now()}` };
    fallbackStore.projects.push(memoryProject);
    saveStore();
    revalidatePath("/", "layout");
    return NextResponse.json({ success: true, project: memoryProject });
  } catch (error: any) {
    console.error("Create project error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
