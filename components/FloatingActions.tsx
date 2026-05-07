"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type ChatMessage = {
  role: "bot" | "user";
  text: string;
  actions?: SuggestionAction[];
};

type SuggestionAction = {
  label: string;
  href: string;
};

type MeetingDraft = {
  name?: string;
  email?: string;
  purpose?: string;
};

type MeetingStep = "idle" | "name" | "email" | "purpose";

const invalidReply =
  "I focus on professional queries. You can ask about my projects, services, or book a meeting.";

const suggestionActions: SuggestionAction[] = [
  { label: "View Projects", href: "/#projects" },
  { label: "View Services", href: "/#services" },
  { label: "Contact Me", href: "/#contact" }
];

function AssistantIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      <rect x="10" y="15" width="28" height="22" rx="10" stroke="currentColor" strokeWidth="2.4" />
      <path d="M24 15V9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="19" cy="26" r="2.3" fill="currentColor" />
      <circle cx="29" cy="26" r="2.3" fill="currentColor" />
      <path d="M19 32c2.8 1.8 7.2 1.8 10 0" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M7.5 26H10M38 26h2.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function wantsMeeting(message: string) {
  return /(meeting|schedule|book|call|contact|consultation|appointment)/i.test(message);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getSmartReply(message: string): ChatMessage {
  const text = message.toLowerCase();

  if (/(about|who|intro|introduce|yourself|sufian|you)/.test(text)) {
    return {
      role: "bot",
      text:
        "I am Mohmmad Sufian, an AI Automation Engineer and Salesforce Admin. I specialize in building intelligent automation systems, scalable web solutions, and practical workflows that help businesses save time."
    };
  }

  if (/(skill|stack|tools|technology|tech)/.test(text)) {
    return {
      role: "bot",
      text:
        "Sufian works with Python, FastAPI, Flask, Salesforce Admin, n8n automation, AI tools, prompt engineering, data scraping, responsive web interfaces, and workflow integrations."
    };
  }

  if (/(project|portfolio|work|case study|built|build)/.test(text)) {
    return {
      role: "bot",
      text:
        "His projects include AI automation workflows, Python data tools, Salesforce CRM systems, dashboards, chatbot flows, and responsive web experiences. You can explore the full project section for detailed examples.",
      actions: [{ label: "View Projects", href: "/#projects" }]
    };
  }

  if (/(service|offer|help|hire|solution|automation|salesforce|website|chatbot)/.test(text)) {
    return {
      role: "bot",
      text:
        "Sufian can help with AI automation, Salesforce setup, web development, data scraping, AI chatbots, process automation, and digital workflow improvement.",
      actions: [{ label: "View Services", href: "/#services" }]
    };
  }

  if (/(email|phone|reach|connect)/.test(text)) {
    return {
      role: "bot",
      text:
        "The best way to connect is through the contact section or by booking a meeting here. I can collect your name, email, and purpose in a few quick steps.",
      actions: [{ label: "Contact Me", href: "/#contact" }]
    };
  }

  if (/(hello|hi|hey|good morning|good evening)/.test(text)) {
    return {
      role: "bot",
      text:
        "Hello, I am Sufian AI Assistant. Ask me about Sufian's skills, projects, services, or say book a meeting and I will help you schedule one."
    };
  }

  return {
    role: "bot",
    text: invalidReply,
    actions: suggestionActions
  };
}

function TypingDots() {
  return (
    <div className="chat-bubble chat-bot">
      <span className="typing-dots text-neon" />
    </div>
  );
}

export default function FloatingActions() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [meetingStep, setMeetingStep] = useState<MeetingStep>("idle");
  const [meetingDraft, setMeetingDraft] = useState<MeetingDraft>({});
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      text:
        "Hi, I am Sufian AI Assistant. Ask anything about Sufian's work, skills, projects, services, or book a meeting."
    }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const placeholder = useMemo(() => {
    if (meetingStep === "name") return "Enter your full name";
    if (meetingStep === "email") return "Enter your email address";
    if (meetingStep === "purpose") return "What should the meeting be about?";
    return "Ask about projects, services, or meetings";
  }, [meetingStep]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping, open]);

  function addBotMessage(message: ChatMessage, delay = 650) {
    setIsTyping(true);
    window.setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, message]);
    }, delay);
  }

  async function saveMeeting(purpose: string) {
    const finalData = { ...meetingDraft, purpose };

    try {
      const response = await fetch("/api/meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData)
      });

      if (!response.ok) {
        throw new Error("Meeting request failed");
      }

      addBotMessage({
        role: "bot",
        text: "✅ Your meeting request has been successfully scheduled."
      });
    } catch {
      addBotMessage({
        role: "bot",
        text:
          "I could not schedule the meeting right now. Please use the contact section and Sufian will follow up with you.",
        actions: [{ label: "Contact Me", href: "/#contact" }]
      });
    } finally {
      setMeetingStep("idle");
      setMeetingDraft({});
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const message = input.trim();
    if (!message || isTyping) return;

    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: message }]);

    if (meetingStep === "name") {
      setMeetingDraft({ name: message });
      setMeetingStep("email");
      addBotMessage({ role: "bot", text: "Great. What email address should Sufian use to contact you?" });
      return;
    }

    if (meetingStep === "email") {
      if (!isValidEmail(message)) {
        addBotMessage({ role: "bot", text: "Please enter a valid email address so the confirmation can be sent." });
        return;
      }

      setMeetingDraft((draft) => ({ ...draft, email: message }));
      setMeetingStep("purpose");
      addBotMessage({ role: "bot", text: "Perfect. What is the main purpose of the meeting?" });
      return;
    }

    if (meetingStep === "purpose") {
      await saveMeeting(message);
      return;
    }

    if (wantsMeeting(message)) {
      setMeetingStep("name");
      addBotMessage({ role: "bot", text: "Absolutely. Let us schedule it. What is your full name?" });
      return;
    }

    addBotMessage(getSmartReply(message));
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open Sufian AI Assistant"
        className="assistant-float fixed bottom-6 right-5 z-50 grid h-16 w-16 place-items-center rounded-2xl text-neon sm:right-6"
        whileHover={{ y: -4, scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <AssistantIcon />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close Sufian AI Assistant overlay"
              className="fixed inset-0 z-50 bg-black/55 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.aside
              initial={{ opacity: 0, x: 48, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ opacity: 0, x: 48, y: 18, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 210, damping: 24 }}
              className="fixed bottom-5 right-4 top-5 z-50 flex w-[calc(100%-2rem)] max-w-md flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#050509]/80 shadow-[0_30px_120px_rgba(112,215,255,.18)] backdrop-blur-2xl sm:right-6 sm:w-full"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_0%,rgba(112,215,255,.22),transparent_16rem),radial-gradient(circle_at_10%_100%,rgba(141,124,255,.18),transparent_18rem)]" />
              <div className="relative flex items-center justify-between border-b border-white/10 bg-white/[0.055] p-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl border border-neon/30 bg-neon/10 text-neon shadow-glow">
                    <AssistantIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-white">Sufian AI Assistant</h2>
                    <p className="text-sm font-medium text-silver/70">Ask anything about my work</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close Sufian AI Assistant"
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-silver transition hover:border-neon/40 hover:text-neon"
                >
                  X
                </button>
              </div>

              <div className="relative flex-1 overflow-y-auto px-4 py-5">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <motion.div
                      key={`${message.role}-${index}-${message.text}`}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.24 }}
                      className={message.role === "user" ? "flex justify-end" : "flex justify-start"}
                    >
                      <div className={message.role === "user" ? "chat-bubble chat-user" : "chat-bubble chat-bot"}>
                        <p>{message.text}</p>
                        {message.actions && (
                          <div className="mt-3 flex flex-wrap gap-2">
                            {message.actions.map((action) => (
                              <a
                                key={action.label}
                                href={action.href}
                                onClick={() => setOpen(false)}
                                className="rounded-full border border-white/15 bg-white/[0.08] px-3 py-1.5 text-xs font-bold text-white transition hover:border-neon/40 hover:text-neon"
                              >
                                {action.label}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                      <TypingDots />
                    </motion.div>
                  )}
                  <div ref={scrollRef} />
                </div>
              </div>

              <form onSubmit={handleSubmit} className="relative border-t border-white/10 bg-black/25 p-4">
                <div className="flex gap-3">
                  <input
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    placeholder={placeholder}
                    className="form-field min-h-12 flex-1 rounded-2xl"
                  />
                  <motion.button
                    type="submit"
                    className="royal-button min-w-20 rounded-2xl px-4"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    Send
                  </motion.button>
                </div>
              </form>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
