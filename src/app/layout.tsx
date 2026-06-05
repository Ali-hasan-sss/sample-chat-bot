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
    default: "HotelMind — AI-Powered Hospitality Technology",
    template: "%s | HotelMind",
  },
  description:
    "Intelligent AI assistants for hotels. Reduce staff workload, deliver 24/7 guest support, and provide consistent multilingual answers from your knowledge base.",
  keywords: [
    "hotel AI",
    "hospitality technology",
    "guest support chatbot",
    "hotel chatbot",
    "RAG",
    "knowledge base",
  ],
  authors: [{ name: "HotelMind" }],
  openGraph: {
    title: "HotelMind — AI-Powered Hospitality Technology",
    description:
      "Elevate every guest experience with intelligent AI assistants for hotels.",
    type: "website",
    locale: "en_US",
    siteName: "HotelMind",
  },
  twitter: {
    card: "summary_large_image",
    title: "HotelMind — AI-Powered Hospitality Technology",
    description:
      "Elevate every guest experience with intelligent AI assistants for hotels.",
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
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
        <ChatbotLoader />
      </body>
    </html>
  );
}
