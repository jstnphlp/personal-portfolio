import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Personal Portfolio",
  description: "A sleek, minimalist personal portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("h-screen overflow-hidden", "antialiased", inter.variable, "font-sans", geist.variable)}>
      <body className="h-screen overflow-y-auto snap-y snap-mandatory">{children}</body>
    </html>
  );
}
