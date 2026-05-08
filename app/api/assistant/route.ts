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
        "Mohmmad Sufian is an AI Automation Engineer, Web Developer, and Salesforce Admin focused on building modern automation systems, AI-powered tools, CRM workflows, and scalable digital solutions.",
      suggestions: ["View Projects", "Services", "Book Meeting"],
    };
  }

  // ===== EDUCATION =====
  if (/(education|college|university|study|btech|12th|degree)/.test(text)) {
    return {
      reply:
        "Sufian completed 12th from the BSEB Board and is currently pursuing B.Tech in Computer Science Engineering from Jamia Hamdard University (2023–2027).",
      suggestions: ["Skills", "Projects", "Book Meeting"],
    };
  }

  // ===== SKILLS =====
  if (
    /(skill|skills|tech|stack|tools|technology|framework|languages)/.test(text)
  ) {
    return {
      reply:
        "Core skills include Python, FastAPI, Flask, HTML, CSS, JavaScript, AI automation, n8n workflows, Prompt Engineering, Salesforce Admin, API integration, Canva, and modern web development.",
      suggestions: ["Python Projects", "AI Projects", "Services"],
    };
  }

  // ===== PROJECTS =====
  if (
    /(project|projects|portfolio|work|built|create|develop|made)/.test(text)
  ) {
    return {
      reply:
        "Sufian has worked on AI automation systems, Salesforce workflows, portfolio platforms, chatbot systems, scraping dashboards, resume analyzers, and modern responsive web applications.",
      action: "projects",
      suggestions: [
        "Python Projects",
        "Salesforce Projects",
        "AI Projects",
      ],
    };
  }

  // ===== SERVICES =====
  if (
    /(service|services|offer|hire|freelance|client|business|help)/.test(text)
  ) {
    return {
      reply:
        "Available services include AI chatbot development, workflow automation, Salesforce setup, CRM optimization, portfolio websites, web apps, API integrations, automation systems, and business tools.",
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
        "Hello 👋 I’m Sufian AI Assistant. You can ask about projects, skills, services, automation systems, or schedule a meeting.",
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
        "I focus on professional conversations related to projects, automation, AI systems, services, and meetings. Please ask something related to work or collaboration.",
      suggestions: ["View Projects", "Services", "Book Meeting"],
    };
  }

  // ===== DEFAULT =====
  return {
    reply:
      "Please ask something related to Sufian's projects, AI automation, development services, Salesforce, or meeting scheduling.",
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