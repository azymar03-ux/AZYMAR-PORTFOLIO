import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import AdminShortcutListener from "@/components/AdminShortcutListener";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AZYMAR — Game Development & Spatial Simulation Studio",
  description:
    "Award-winning game studio crafting immersive experiences across PC, Console, Mobile & VR — creators of AZYMAR Playground, Murugan: Surasamharam, VR Surgical Sim & Verity.",
  icons: {
    icon: "/images/brand/azymar-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <AdminShortcutListener />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
