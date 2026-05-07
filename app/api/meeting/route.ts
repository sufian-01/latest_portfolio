import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import nodemailer from "nodemailer";

type MeetingRequest = {
  name: string;
  email: string;
  purpose: string;
  date: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function readMeetings(filePath: string): Promise<MeetingRequest[]> {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function saveMeeting(meeting: MeetingRequest) {
  const dataDir = path.join(process.cwd(), "data");
  const filePath = path.join(dataDir, "meetings.json");
  const meetings = await readMeetings(filePath);

  await fs.mkdir(dataDir, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify([...meetings, meeting], null, 2));
}

async function sendMeetingEmails(meeting: MeetingRequest) {
  const user = process.env.GMAIL_USER || process.env.SMTP_USER;
  const pass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;
  const ownerEmail = process.env.SUFIAN_EMAIL || process.env.CONTACT_EMAIL || user;

  if (!user || !pass || !ownerEmail) {
    return {
      sent: false,
      reason: "Email is not configured. Set GMAIL_USER, GMAIL_APP_PASSWORD, and SUFIAN_EMAIL."
    };
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass
    }
  });

  await transporter.sendMail({
    from: user,
    to: meeting.email,
    subject: "Meeting Confirmation",
    text: `Hi ${meeting.name}, your meeting request has been received.`
  });

  await transporter.sendMail({
    from: user,
    to: ownerEmail,
    subject: "New Meeting Request",
    text: `Name: ${meeting.name}\nEmail: ${meeting.email}\nPurpose: ${meeting.purpose}\nDate: ${meeting.date}`
  });

  return { sent: true };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const purpose = String(body.purpose || "").trim();

    if (!name || !email || !purpose) {
      return NextResponse.json({ success: false, error: "Name, email, and purpose are required." }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ success: false, error: "A valid email address is required." }, { status: 400 });
    }

    const meeting: MeetingRequest = {
      name,
      email,
      purpose,
      date: new Date().toISOString()
    };

    await saveMeeting(meeting);
    const emailResult = await sendMeetingEmails(meeting);

    return NextResponse.json({
      success: true,
      message: "Your meeting request has been successfully scheduled.",
      email: emailResult
    });
  } catch {
    return NextResponse.json({ success: false, error: "Unable to schedule meeting." }, { status: 500 });
  }
}
