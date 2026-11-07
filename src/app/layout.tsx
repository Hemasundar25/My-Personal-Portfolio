import type { Metadata, Viewport } from "next";
import { Anton, Caveat_Brush, Geist, Geist_Mono } from "next/font/google";
import AgentBuilder from "@/components/agent-builder";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveatBrush = Caveat_Brush({
  variable: "--font-caveat-brush",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Guggilla Hemasundar Reddy — AI & Cloud Engineering",
  description:
    "Portfolio of Guggilla Hemasundar Reddy, a Computer Science undergraduate specializing in Artificial Intelligence and Machine Learning.",
  metadataBase: new URL("https://my-portfolio-coral-xi-45.vercel.app"),
  openGraph: {
    title: "Guggilla Hemasundar Reddy — AI & Cloud Engineering",
    description:
      "Projects, experience, and technical skills in AI, machine learning, and cloud-connected applications.",
    url: "https://my-portfolio-coral-xi-45.vercel.app",
    siteName: "Guggilla Hemasundar Reddy",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

const agentBootstrap = `
  (() => {
    const root = document.documentElement;
    const params = new URLSearchParams(location.search);
    let saved = null;
    try { saved = localStorage.getItem("portfolio-agents"); } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const enabled = params.get("agents") === "on" ||
      (params.get("agents") !== "off" && (saved === "on" || (saved !== "off" && !reduced)));
    root.dataset.agents = enabled ? "on" : "off";
    if (enabled) root.classList.add("build-mode");
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${anton.variable} ${geist.variable} ${geistMono.variable} ${caveatBrush.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: agentBootstrap }} />
      </head>
      <body>
        {children}
        <AgentBuilder />
      </body>
    </html>
  );
}
