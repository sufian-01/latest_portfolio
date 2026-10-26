import { NextResponse } from "next/server";

type AssistantResponse = {
  reply: string;
  action?: "meeting" | "projects" | "services";
  suggestions?: string[];
};

function getRuleBasedReply(message: string): AssistantResponse {
  const text = message.toLowerCase().trim();

  // ===== ABOUT =====
  if (/(who|about|sufian|intro|introduce|yourself)/.test(text)) {
    return {
      reply:
        "Mohmmad Sufian is an AI Automation Engineer and Generative AI Developer focused on building Agentic Process Automation (APA) pipelines, RAG systems, multi-agent workflows, and scalable Python microservices.",
      suggestions: ["View Projects", "Services", "Book Meeting"],
    };
  }

  // ===== EDUCATION =====
  if (/(education|college|university|study|btech|12th|degree)/.test(text)) {
    return {
      reply:
        "Sufian is in his final year of B.Tech in Computer Science Engineering from Jamia Hamdard University (2023–2027) and completed 12th from BSEB Board.",
      suggestions: ["Experience", "Skills", "Projects"],
    };
  }

  // ===== EXPERIENCE =====
  if (/(experience|job|work|intern|internship|multiply|tamizhan|edunet)/.test(text)) {
    return {
      reply:
        "Sufian is currently an AI Engineer Intern at Multiply Tech India (Noida), building Agentic Process Automation (APA) pipelines with LangGraph and FastAPI. He is also a Freelance AI & Python Developer and former Technical Lead at NSDC Jamia Hamdard.",
      suggestions: ["Projects", "Skills", "Book Meeting"],
    };
  }

  // ===== SKILLS =====
  if (
    /(skill|skills|tech|stack|tools|technology|framework|languages)/.test(text)
  ) {
    return {
      reply:
        "Core skills: LangGraph, LangChain, Agentic AI (APA), RAG systems, Python, FastAPI, Google Gemini API, OpenAI GPT, FAISS, ChromaDB, Prompt Engineering, Human-in-the-Loop (HITL), Docker, and WhatsApp/Telegram automation.",
      suggestions: ["Agentic AI", "RAG Systems", "Services"],
    };
  }

  // ===== PROJECTS =====
  if (
    /(project|projects|portfolio|work|built|create|develop|made)/.test(text)
  ) {
    return {
      reply:
        "Sufian's top projects include: Multi-Agent Scheduling Assistant (LangGraph + FastAPI), AI Telegram Secretary, AI Stock Market Assistant with HITL, YouTube RAG Assistant, and AI Interview System.",
      action: "projects",
      suggestions: [
        "Agentic AI Projects",
        "RAG Projects",
        "Python Projects",
      ],
    };
  }

  // ===== SERVICES =====
  if (
    /(service|services|offer|hire|freelance|client|business|help)/.test(text)
  ) {
    return {
      reply:
        "Available services include: Agentic Process Automation (APA), Custom RAG pipelines & Vector Search, AI WhatsApp/Telegram bots, FastAPI microservices, and Full-Stack AI web applications.",
      action: "services",
      suggestions: ["Book Meeting", "View Projects", "Contact"],
    };
  }

  // ===== MEETING =====
  if (
    /(meeting|schedule|call|appointment|consultation|book|zoom|google meet)/.test(
      text
    )
  ) {
    return {
      reply:
        "I can help you schedule a meeting with Sufian. Please share your name, email address, and preferred discussion topic to continue the booking process.",
      action: "meeting",
      suggestions: ["15 Min Meeting", "Project Discussion", "Consultation"],
    };
  }

  // ===== GREETING =====
  if (/(hi|hello|hey|hlo)/.test(text)) {
    return {
      reply:
        "Hello 👋 I’m Sufian AI Assistant. You can ask about my AI projects, agentic workflows, technical skills, services, or schedule a meeting.",
      suggestions: ["Projects", "Skills", "Book Meeting"],
    };
  }

  // ===== USELESS / RANDOM QUESTIONS =====
  if (
    /(girlfriend|boyfriend|love|crush|kiss|marry|religion|politics|adult|18\+)/.test(
      text
    )
  ) {
    return {
      reply:
        "I focus on professional conversations related to AI engineering, agentic automation, RAG pipelines, and technical collaboration.",
      suggestions: ["View Projects", "Services", "Book Meeting"],
    };
  }

  // ===== DEFAULT =====
  return {
    reply:
      "Please ask something related to Sufian's AI projects, Agentic automation, LangGraph, RAG pipelines, backend development, or meeting scheduling.",
    suggestions: ["Projects", "Services", "Book Meeting"],
  };
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const message = String(body.message || "").trim();

    if (!message) {
      return NextResponse.json({
        reply: "Please type a message so I can help you.",
        suggestions: ["Projects", "Services", "Book Meeting"],
      });
    }

    const response = getRuleBasedReply(message);

    return NextResponse.json(response);
  } catch (error) {
    console.error("Assistant API Error:", error);

    return NextResponse.json(
      {
        reply:
          "Something went wrong while processing your request. Please try again.",
      },
      { status: 500 }
    );
  }
}
