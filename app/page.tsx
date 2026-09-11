import Navbar from "@/components/navbar/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import AboutSection from "@/components/about/AboutSection";
import SkillsSection from "@/components/skills/SkillsSection";
import ProjectsSection from "@/components/projects/ProjectsSection";
import CertificatesSection from "@/components/certificates/CertificatesSection";
import ExperienceSection from "@/components/experience/ExperienceSection";
import ContactSection from "@/components/contact/ContactSection";
import Footer from "@/components/footer/Footer";

import { connectDB } from "@/lib/mongodb";
import Profile from "@/models/Profile";
import Skill from "@/models/Skill";
import Project from "@/models/Project";
import Certificate from "@/models/Certificate";
import Experience from "@/models/Experience";
import { fallbackStore } from "@/lib/dataStore";

export const dynamic = "force-dynamic";

async function getPortfolioData() {
  try {
    const db = await connectDB();
    if (db) {
      const [profileDoc, skillsDocs, projectsDocs, certsDocs, expDocs] = await Promise.all([
        Profile.findOne().sort({ createdAt: -1 }).lean(),
        Skill.find({ isActive: true }).sort({ order: 1, createdAt: 1 }).lean(),
        Project.find().sort({ order: 1, createdAt: 1 }).lean(),
        Certificate.find({ isActive: true }).sort({ order: 1, createdAt: 1 }).lean(),
        Experience.find().sort({ order: 1, startDate: -1 }).lean(),
      ]);

      return {
        profile: profileDoc
          ? JSON.parse(JSON.stringify(profileDoc))
          : fallbackStore.profile,
        skills: skillsDocs && skillsDocs.length > 0
          ? JSON.parse(JSON.stringify(skillsDocs))
          : fallbackStore.skills,
        projects: projectsDocs && projectsDocs.length > 0
          ? JSON.parse(JSON.stringify(projectsDocs))
          : fallbackStore.projects,
        certificates: certsDocs && certsDocs.length > 0
          ? JSON.parse(JSON.stringify(certsDocs))
          : fallbackStore.certificates,
        experience: expDocs && expDocs.length > 0
          ? JSON.parse(JSON.stringify(expDocs))
          : fallbackStore.experience,
      };
    }
  } catch (error) {
    console.warn("Falling back to in-memory store for public portfolio view.");
  }

  return {
    profile: fallbackStore.profile,
    skills: fallbackStore.skills,
    projects: fallbackStore.projects,
    certificates: fallbackStore.certificates,
    experience: fallbackStore.experience,
  };
}

export default async function HomePage() {
  const { profile, skills, projects, certificates, experience } = await getPortfolioData();

  return (
    <main className="min-h-screen bg-surface-bg text-surface-text selection:bg-accent selection:text-white relative">
      {/* Top Fixed / Sticky Navigation */}
      <Navbar logoUrl={profile?.logoUrl || "/logo.png"} />

      {/* 1. Hero Section */}
      <HeroSection profile={profile} />

      {/* 2. About Section */}
      <AboutSection profile={profile} />

      {/* 3. Categorized Skills Section */}
      <SkillsSection skills={skills} />

      {/* 4. Featured Projects Section */}
      <ProjectsSection projects={projects} />

      {/* 5. Certificates Section */}
      <CertificatesSection certificates={certificates} />

      {/* 6. Experience Vertical Timeline */}
      <ExperienceSection experience={experience} />

      {/* 7. Contact Form & Details Section (Admin link at bottom) */}
      <ContactSection profile={profile} />

      {/* 8. Minimal Footer */}
      <Footer profile={profile} />
    </main>
  );
}
