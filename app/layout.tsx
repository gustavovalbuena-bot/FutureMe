import type { Metadata } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Kindred Tomorrow — Help a dream become a next step",
  description: "An evidence-informed family ritual that connects a child’s future letter to one goal, one plan, and gentle weekly check-ins.",
  icons: { icon: `${basePath}/favicon.svg`, shortcut: `${basePath}/favicon.svg` },
  openGraph: {
    title: "Kindred Tomorrow",
    description: "One Sunday. One dream. One small step.",
    images: [{ url: `${basePath}/og.png`, width: 1536, height: 1024, alt: "Kindred Tomorrow family future-letter ritual" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
