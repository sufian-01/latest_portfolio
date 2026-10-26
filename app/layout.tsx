import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohmmad Sufian | AI Automation Engineer & Agentic AI Specialist",
  description:
    "Professional portfolio of Mohmmad Sufian — AI Automation Engineer specializing in Agentic Process Automation (APA), RAG systems, LangGraph, Python, and scalable AI workflows.",
  keywords: [
    "Mohmmad Sufian",
    "AI Automation Engineer",
    "Agentic AI",
    "LangGraph",
    "RAG",
    "LangChain",
    "FastAPI",
    "Python",
    "Generative AI"
  ],
  authors: [{ name: "Mohmmad Sufian" }],
  openGraph: {
    title: "Mohmmad Sufian | AI Automation Engineer & Agentic AI Specialist",
    description:
      "AI Engineer specializing in Agentic Process Automation, LangGraph, RAG pipelines, and intelligent autonomous workflows.",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Mohmmad Sufian AI Automation Portfolio"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohmmad Sufian | AI Automation Engineer",
    description: "AI Engineer specializing in Agentic Process Automation, LangGraph, RAG pipelines, and Python."
  }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

