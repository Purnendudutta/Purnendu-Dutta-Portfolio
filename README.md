# Purnendu Dutta — Futuristic Developer Portfolio & CMS

A production-quality, responsive developer portfolio with a dark futuristic aesthetic (deep navy/black, neon purple & electric blue accents, glassmorphism cards, glowing borders, and particle animations), complete with real-time dynamic Typewriter animations, 6 customizable Accent Color themes, Day/Night mode, and a full-featured Admin CMS with MongoDB integration.

---

## ✨ Features

### 🌐 Public Portfolio
1. **Sticky Glassmorphic Navigation Bar**:
   - Dynamic Logo `</> PURNENDU`
   - Smooth animated underline with neon glow on hover and active section tracking
   - Day/Night Mode switcher
   - 6 Accent Color Themes (Purple/Blue, Cyan, Green, Orange, Pink, Red) with instant live site updates and `localStorage` persistence
   - Mobile slide-out glassmorphism drawer
   - Clean navigation without administrative clutter
2. **Hero Section with Typewriter Effect**:
   - Dynamic character-by-character typewriter loop with realistic cursor blink
   - Call-to-action buttons: `View My Work` and `Download CV`
   - Interactive futuristic tech illustration with orbiting nodes (Code, AI Engine, Database, Cloud, Terminal, API) and pulsing circuit lines
   - Social links (GitHub, LinkedIn, Twitter/X, Email)
3. **About Me**:
   - Professional bio, engineering narrative, and core competencies
   - 4 animated metric counters (Years of Experience, Projects, Technologies, Certificates)
4. **Categorized Skills**:
   - Grouped and filterable by category: Frontend, Backend, Database, AI / Machine Learning, DevOps & Cloud, Tools
   - Interactive skill cards with proficiency indicators, experience years, and glowing hover lift
5. **Featured Projects**:
   - Glassmorphism showcase cards with thumbnail zoom, tech stack pills, and live demo / source code links
   - Full-detail project preview modal
   - "View All Projects" toggle
6. **Certificates & Verified Badges**:
   - Showcase cards with issuing organization, date, credential ID, and verification links
   - Full credential preview modal
7. **Experience Vertical Timeline**:
   - Glowing vertical timeline with animated nodes and "Present" status indicators
   - Role title, company, location, date ranges, bullet point responsibilities, and tech chips
8. **Contact Section & Details**:
   - Interactive Contact Form with full validation, loading spinner, and success toast feedback
   - Contact Details card with email, phone, location, and social channels
   - **Admin Panel Entry point**: Dedicated `[ ⚙ Admin Panel → ]` link situated exclusively at the bottom of the contact details card
9. **Minimal Footer**:
   - Copyright notice, tech stack attribution, and back-to-top button

---

### 🛡️ Admin Panel & CMS (`/admin`)
- **Route Protection**: Next.js Middleware guarding `/admin/dashboard/*` with JWT session cookie validation
- **Modern Glassmorphic Login**: Secure authentication with bcrypt password hashing
- **Dashboard Overview**: Metrics count, quick action shortcuts, and recent inbound message alerts
- **Hero & Typewriter Roles Editor**: Add, edit, remove, and reorder typewriter phrases with instant public updates
- **About & Statistics Editor**: Update narrative bio and metric counters
- **Skills Manager**: Complete CRUD operations, category assignments, and proficiency sliders
- **Projects Manager**: Full CRUD, image uploads, tech stack tags, and featured project toggles
- **Certificates Manager**: Full CRUD, image uploads, issuer details, and credential links
- **Experience Manager**: Full CRUD for career timeline entries and "Current Position" toggles
- **Contact & Inbound Inbox**: View, manage, and delete messages submitted via the public contact form
- **Site Settings & SEO**: Manage default themes, meta titles, descriptions, and database reset triggers

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 14 (App Router)](https://nextjs.org/)
- **Frontend**: [React 18](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with centralized CSS custom properties
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/) with fallback store support
- **Authentication**: JWT cookies with [bcryptjs](https://www.npmjs.com/package/bcryptjs) & [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file (already configured by default):
```env
MONGODB_URI=mongodb://127.0.0.1:27017/portfolio
JWT_SECRET=portfolio_super_secure_jwt_secret_key_2026_x89
ADMIN_EMAIL=admin@portfolio.com
ADMIN_PASSWORD=admin123456
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the public portfolio.

### 4. Production Build
```bash
npm run build
npm start
```

---

## 🔐 Admin Credentials

- **URL**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Email**: `admin@portfolio.com`
- **Password**: `admin123456`

*(You can update your credentials or portfolio content anytime from the Admin CMS or environment variables).*

---

## 🎨 Accent Color Themes

The portfolio supports 6 dynamic color themes accessible via the palette switcher beside the theme toggle:
- **Purple / Blue** (`#8b5cf6` / `#3b82f6`)
- **Cyan** (`#06b6d4` / `#3b82f6`)
- **Green** (`#10b981` / `#06b6d4`)
- **Orange** (`#f97316` / `#eab308`)
- **Pink** (`#ec4899` / `#8b5cf6`)
- **Red** (`#ef4444` / `#f97316`)

---

## 📄 License
MIT License © 2026 Purnendu Dutta.
