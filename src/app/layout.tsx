import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ChatbotLoader } from "@/components/chatbot/ChatbotLoader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "FU.life Berlin | Co-Living Redefined",
    template: "%s | FU.life",
  },
  description:
    "Fully furnished co-living at Ku'damm 69, Berlin. Community, convenience, and private rooms — book your stay at FU.life.",
  keywords: [
    "FU.life",
    "co-living Berlin",
    "Kurfürstendamm",
    "furnished apartments Berlin",
    "coliving",
  ],
  authors: [{ name: "FU.life" }],
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "FU.life Berlin | Co-Living Redefined",
    description:
      "Your friends will love your new place. Fully furnished co-living at Ku'damm 69.",
    type: "website",
    locale: "en_US",
    siteName: "FU.life",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-[#2B2B2B]">
        {children}
        <ChatbotLoader />
      </body>
    </html>
  );
}
