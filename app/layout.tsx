import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Mohmmad Sufian | AI Automation Engineer",
  description:
    "Professional portfolio for AI automation, Salesforce administration, web development, chatbot systems, and digital operations.",
  keywords: ["Mohmmad Sufian", "AI Automation", "Salesforce Admin", "Next.js", "Chatbot"],
  authors: [{ name: "Mohmmad Sufian" }],
  openGraph: {
    title: "Mohmmad Sufian | AI Automation Engineer",
    description:
      "A premium AI startup inspired portfolio built with Next.js, Tailwind, and Framer Motion.",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Premium analytics interface"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohmmad Sufian | AI Automation Engineer",
    description: "Premium personal portfolio for AI automation, Salesforce, and web development."
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
