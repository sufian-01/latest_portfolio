"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useMemo, useRef, useState } from "react";

type ChatMessage = {
  role: "bot" | "user";
  text: string;
};

type MeetingDraft = {
  name?: string;
  email?: string;
  purpose?: string;
};

type MeetingStep = "idle" | "name" | "email" | "purpose";

function AssistantIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8">
      <rect x="11" y="14" width="26" height="22" rx="9" stroke="currentColor" strokeWidth="2" />
      <circle cx="19" cy="25" r="2" fill="currentColor" />
      <circle cx="29" cy="25" r="2" fill="currentColor" />
    </svg>
  );
}

function wantsMeeting(msg: string) {
  return /(meeting|schedule|book|call|contact)/i.test(msg);
}

function getReply(msg: string) {
  const m = msg.toLowerCase();

  if (m.includes("who") || m.includes("about"))
    return "I am Mohmmad Sufian, AI Automation Engineer & Salesforce Admin.";

  if (m.includes("education"))
    return "B.Tech CS (2023–2027) - Jamia Hamdard | 12th - BSEB Board";

  if (m.includes("skills"))
    return "Python, Flask, FastAPI, HTML, CSS, n8n Automation, AI Tools, Prompt Engineering, Salesforce";

  if (m.includes("services"))
    return "AI Automation, Web Dev, Salesforce Admin, Data Scraping, AI Chatbots, Social Media";

  return null;
}

export default function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "bot", text: "Hi! Ask me about Sufian or type 'meeting'" }
  ]);

  const [meetingStep, setMeetingStep] = useState<MeetingStep>("idle");
  const [meetingDraft, setMeetingDraft] = useState<MeetingDraft>({});

  const placeholder = useMemo(() => {
    if (meetingStep === "name") return "Enter your name";
    if (meetingStep === "email") return "Enter your email";
    if (meetingStep === "purpose") return "Meeting purpose";
    return "Ask something...";
  }, [meetingStep]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input) return;

    const msg = input;
    setInput("");

    setMessages((prev) => [...prev, { role: "user", text: msg }]);

    // meeting flow
    if (meetingStep === "name") {
      setMeetingDraft({ name: msg });
      setMeetingStep("email");
      setMessages((p) => [...p, { role: "bot", text: "Enter email" }]);
      return;
    }

    if (meetingStep === "email") {
      setMeetingDraft((d) => ({ ...d, email: msg }));
      setMeetingStep("purpose");
      setMessages((p) => [...p, { role: "bot", text: "Meeting purpose?" }]);
      return;
    }

    if (meetingStep === "purpose") {
      const finalData = { ...meetingDraft, purpose: msg };

      await fetch("/api/meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData)
      });

      setMeetingStep("idle");
      setMeetingDraft({});

      setMessages((p) => [
        ...p,
        { role: "bot", text: "✅ Meeting Scheduled & Email Sent!" }
      ]);
      return;
    }

    // start meeting
    if (wantsMeeting(msg)) {
      setMeetingStep("name");
      setMessages((p) => [...p, { role: "bot", text: "Your Name?" }]);
      return;
    }

    // normal reply
    const reply = getReply(msg);

    if (reply) {
      setMessages((p) => [...p, { role: "bot", text: reply }]);
    } else {
      setMessages((p) => [
        ...p,
        { role: "bot", text: "❌ Not relevant. Ask about skills, services, or meeting." }
      ]);
    }
  }

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="fixed right-6 top-[90%] z-50 h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-lg flex items-center justify-center"
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        🤖
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed right-0 top-0 h-full w-full max-w-md bg-black/80 backdrop-blur-xl p-5 z-50 h-full bg-black p-4">
            <button onClick={() => setOpen(false)}>X</button>

            <div className="mt-4 flex-1 overflow-y-auto space-y-3 pr-2">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "text-right" : ""}>
                  {m.text}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholder}
                className="form-field w-full"
              />
              <button type="submit" className="royal-button mt-3">
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}