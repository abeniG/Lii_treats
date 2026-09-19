import type { Metadata } from "next";
import { Kaushan_Script, DM_Sans } from "next/font/google";
import "./globals.css";
import React from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";

// Logo / display headings — brush script feel
const kaushanScript = Kaushan_Script({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
});

// Body / UI — clean, modern sans-serif
const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Lii_treats | Premium Rice Bowls",
  description: "Fresh, fully customizable rice bowls crafted for premium taste. Order online with real-time tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${kaushanScript.variable} ${dmSans.variable} h-full scroll-smooth`}>
      <body className="min-h-full flex flex-col antialiased">
        <Providers>
          <Navigation />
          <main className="flex-grow flex flex-col">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
