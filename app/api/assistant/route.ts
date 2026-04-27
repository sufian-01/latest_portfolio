import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type MeetingRequest = {
  name: string;
  email: string;
  purpose: string;
  createdAt: string;
};

type AssistantRequest = {
  message: string;
  meeting?: Partial<MeetingRequest>;
};

const globalStore = globalThis as typeof globalThis & {
  meetingRequests?: MeetingRequest[];
};

function getRuleBasedReply(message: string) {
  const text = message.toLowerCase();

  if (/(who|about|sufian|intro|introduce)/.test(text)) {
    return "Mohmmad Sufian is an AI Automation Engineer and Salesforce Admin who builds intelligent automation systems, scalable web solutions, and practical AI-powered workflows for businesses.";
  }

  if (/(education|college|university|study|btech|12th)/.test(text)) {
    return "Education: Bachelor of Technology in Computer Science at Jamia Hamdard University from 2023 to 2027. He also completed 12th from BSEB Board.";
  }

  if (/(skill|tech|stack|tools)/.test(text)) {
    return "Core skills include Python, HTML, CSS, Flask, FastAPI, n8n automation, Canva, AI tools usage, prompt engineering, and Salesforce Admin.";
  }

  if (/(service|offer|work|help|build)/.test(text)) {
    return "Services include AI automation, Salesforce Admin, web development, WordPress websites, data scraping, data analysis, ads campaigns, social media management, AI chatbot development, and Flipkart or Meesho seller setup and management.";
  }

  if (/(contact|meeting|schedule|call|book|email)/.test(text)) {
    return "I can schedule a meeting request for you. Please share your name to begin.";
  }

  return "I can help with questions about Sufian, education, skills, services, projects, or meeting scheduling. Try asking about services or say schedule meeting.";
}

async function sendMeetingEmails(meeting: MeetingRequest) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user;
  const to = process.env.CONTACT_EMAIL || process.env.SUFIAN_EMAIL;

  if (!host || !user || !pass || !from || !to) {
    return { sent: false, reason: "Email is not configured. Add SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, and CONTACT_EMAIL." };
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass }
  });

  await transporter.sendMail({
    from,
    to,
    subject: `New meeting request from ${meeting.name}`,
    text: `Name: ${meeting.name}\nEmail: ${meeting.email}\nPurpose: ${meeting.purpose}\nCreated: ${meeting.createdAt}`
  });

  await transporter.sendMail({
    from,
    to: meeting.email,
    subject: "Your meeting request has been scheduled",
    text: `Hi ${meeting.name},\n\nYour meeting request has been scheduled. Sufian will review your request and contact you soon.\n\nPurpose: ${meeting.purpose}`
  });

  return { sent: true };
}

export async function POST(request: Request) {
  const body = (await request.json()) as AssistantRequest;
  const message = body.message?.trim() || "";

  if (!message) {
    return NextResponse.json({ reply: "Please type a message so I can help." });
  }

  const meeting = body.meeting;
  if (meeting?.name && meeting.email && meeting.purpose) {
    const meetingRequest: MeetingRequest = {
      name: meeting.name,
      email: meeting.email,
      purpose: meeting.purpose,
      createdAt: new Date().toISOString()
    };

    globalStore.meetingRequests = [...(globalStore.meetingRequests || []), meetingRequest];
    const emailResult = await sendMeetingEmails(meetingRequest);

    return NextResponse.json({
      reply: "Your meeting request has been scheduled. A confirmation email will be sent if email is configured.",
      meetingSaved: true,
      email: emailResult
    });
  }

  return NextResponse.json({ reply: getRuleBasedReply(message) });
}
