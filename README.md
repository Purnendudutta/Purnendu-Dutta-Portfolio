# Purnendu Dutta — Futuristic Developer Portfolio & CMS

A production-quality, responsive developer portfolio with a dark futuristic aesthetic (deep navy/black, neon purple & electric blue accents, glassmorphism cards, glowing borders, and particle animations), complete with real-time dynamic Typewriter animations, 6 customizable Accent Color themes, Day/Night mode, and a full-featured Admin CMS with MongoDB integration.


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
