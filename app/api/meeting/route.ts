import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const data = await req.json();

  const filePath = path.join(process.cwd(), "data", "meetings.json");

  let existing = [];
  if (fs.existsSync(filePath)) {
    existing = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  }

  existing.push({
    ...data,
    date: new Date().toISOString()
  });

  fs.writeFileSync(filePath, JSON.stringify(existing, null, 2));

  // EMAIL
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "YOUR_EMAIL",
      pass: "APP_PASSWORD"
    }
  });

  await transporter.sendMail({
    from: "YOUR_EMAIL",
    to: data.email,
    subject: "Meeting Confirmed",
    text: "Your meeting request has been received."
  });

  await transporter.sendMail({
    from: "YOUR_EMAIL",
    to: "YOUR_EMAIL",
    subject: "New Meeting",
    text: JSON.stringify(data)
  });

  return NextResponse.json({ success: true });
}