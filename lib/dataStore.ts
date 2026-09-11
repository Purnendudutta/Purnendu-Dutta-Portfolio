import fs from "fs";
import path from "path";
import {
  initialProfile,
  initialSkills,
  initialProjects,
  initialCertificates,
  initialExperience,
  initialSiteSettings,
  ProfileData,
  SkillData,
  ProjectData,
  CertificateData,
  ExperienceData,
  SiteSettingsData,
} from "./seedData";

export interface MessageData {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface StoreData {
  profile: ProfileData;
  skills: SkillData[];
  projects: ProjectData[];
  certificates: CertificateData[];
  experience: ExperienceData[];
  siteSettings: SiteSettingsData;
  messages: MessageData[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "content.json");

function getInitialStore(): StoreData {
  return {
    profile: JSON.parse(JSON.stringify(initialProfile)),
    skills: initialSkills.map((s, idx) => ({ ...s, _id: s._id || `skill_${idx + 1}` })),
    projects: initialProjects.map((p, idx) => ({ ...p, _id: p._id || `proj_${idx + 1}` })),
    certificates: initialCertificates.map((c, idx) => ({ ...c, _id: c._id || `cert_${idx + 1}` })),
    experience: initialExperience.map((e, idx) => ({ ...e, _id: e._id || `exp_${idx + 1}` })),
    siteSettings: JSON.parse(JSON.stringify(initialSiteSettings)),
    messages: [
      {
        _id: "msg_1",
        name: "Sarah Chen",
        email: "sarah.chen@innovatech.io",
        subject: "Exciting Senior AI Role Collaboration",
        message:
          "Hi Purnendu, I came across your autonomous AI agent projects and was deeply impressed by your architectural design. We would love to discuss a senior engineering role on our AI Core team.",
        read: false,
        createdAt: new Date().toISOString(),
      },
    ],
  };
}

function loadStoreFromDisk(): StoreData {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const fileData = fs.readFileSync(DATA_FILE, "utf-8");
      if (fileData.trim()) {
        const parsed = JSON.parse(fileData);
        const defaults = getInitialStore();
        return {
          profile: { ...defaults.profile, ...(parsed.profile || {}) },
          skills: Array.isArray(parsed.skills) && parsed.skills.length > 0 ? parsed.skills : defaults.skills,
          projects: Array.isArray(parsed.projects) && parsed.projects.length > 0 ? parsed.projects : defaults.projects,
          certificates: Array.isArray(parsed.certificates) && parsed.certificates.length > 0 ? parsed.certificates : defaults.certificates,
          experience: Array.isArray(parsed.experience) && parsed.experience.length > 0 ? parsed.experience : defaults.experience,
          siteSettings: { ...defaults.siteSettings, ...(parsed.siteSettings || {}) },
          messages: Array.isArray(parsed.messages) ? parsed.messages : defaults.messages,
        };
      }
    }
  } catch (err) {
    console.warn("[DataStore] Failed to read from disk, creating fresh store:", err);
  }

  const initial = getInitialStore();
  saveStoreToDisk(initial);
  return initial;
}

export function saveStoreToDisk(data: StoreData) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("[DataStore] Error saving store to disk:", err);
  }
}

// Persistent Store Instance with automatic save helper
export class PersistentStore {
  profile: ProfileData;
  skills: SkillData[];
  projects: ProjectData[];
  certificates: CertificateData[];
  experience: ExperienceData[];
  siteSettings: SiteSettingsData;
  messages: MessageData[];

  constructor() {
    const loaded = loadStoreFromDisk();
    this.profile = loaded.profile;
    this.skills = loaded.skills;
    this.projects = loaded.projects;
    this.certificates = loaded.certificates;
    this.experience = loaded.experience;
    this.siteSettings = loaded.siteSettings;
    this.messages = loaded.messages;
  }

  save() {
    saveStoreToDisk({
      profile: this.profile,
      skills: this.skills,
      projects: this.projects,
      certificates: this.certificates,
      experience: this.experience,
      siteSettings: this.siteSettings,
      messages: this.messages,
    });
  }
}

declare global {
  var memoryStore: PersistentStore | undefined;
}

export const fallbackStore: PersistentStore = global.memoryStore || new PersistentStore();
if (!global.memoryStore) {
  global.memoryStore = fallbackStore;
}

export function saveStore() {
  fallbackStore.save();
}
