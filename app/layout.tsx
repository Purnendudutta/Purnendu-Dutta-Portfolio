import type { Metadata } from "next";
import { ThemeProvider } from "@/lib/context/ThemeContext";
import { ToastProvider } from "@/lib/context/ToastContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Purnendu Dutta | AI Engineer & Full Stack Developer",
  description: "Production-quality developer portfolio showcasing intelligent systems, full-stack applications, skills, experience, and verified certifications.",
  keywords: ["AI Engineer", "Full Stack Developer", "Next.js", "React", "TypeScript", "Python", "Portfolio"],
  authors: [{ name: "Purnendu Dutta" }],
  creator: "Purnendu Dutta",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://purnendu.dev",
    title: "Purnendu Dutta | AI Engineer & Full Stack Developer",
    description: "I build intelligent systems and modern web applications that solve real-world problems.",
    siteName: "Purnendu Dutta Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Purnendu Dutta | AI Engineer & Full Stack Developer",
    description: "I build intelligent systems and modern web applications that solve real-world problems.",
    creator: "@purnendu",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" data-accent="purple" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-screen bg-surface-bg text-surface-text selection:bg-accent selection:text-white antialiased">
        <ThemeProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
