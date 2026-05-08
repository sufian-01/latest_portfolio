"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

type MeetingDuration = 15 | 30;

type AvailableSlot = {
  id: string;
  start: string;
  label: string;
};

type ChatAction =
  | { type: "link"; label: string; href: string }
  | { type: "booking"; label: string }
  | { type: "duration"; label: string; duration: MeetingDuration }
  | { type: "slot"; label: string; slot: AvailableSlot };

type ChatMessage = {
  role: "bot" | "user";
  text: string;
  actions?: ChatAction[];
};

type BookingDraft = {
  duration?: MeetingDuration;
  slot?: AvailableSlot;
  name?: string;
  email?: string;
  purpose?: string;
};

type BookingStep = "idle" | "type" | "slot" | "name" | "email" | "purpose";

const invalidReply =
  "I focus on professional queries related to Sufian's work, services, projects, and meetings.";

const quickActions: ChatAction[] = [
  { type: "link", label: "View Projects", href: "/#projects" },
  { type: "link", label: "Services", href: "/#services" },
  { type: "booking", label: "Book Meeting" }
];

const meetingTypes: ChatAction[] = [
  { type: "duration", label: "15 min meeting", duration: 15 },
  { type: "duration", label: "30 min consultation", duration: 30 }
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
  return /\b(meeting|schedule|book|call|consultation|appointment)\b/i.test(message);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getPortfolioReply(message: string): ChatMessage {
  const text = message.toLowerCase();

  if (/(hello|hi|hey|good morning|good evening)/.test(text)) {
    return {
      role: "bot",
      text: "Hi, I am Sufian AI Assistant. I can help with skills, services, projects, education, or booking a meeting.",
      actions: quickActions
    };
  }

  if (/(who are you|about|intro|introduce|sufian|yourself|profile)/.test(text)) {
    return {
      role: "bot",
      text:
        "Mohmmad Sufian is an AI Automation Engineer and Salesforce Admin focused on smart automation, CRM systems, and practical AI-powered web solutions."
    };
  }

  if (/(education|college|university|degree|b\.?tech|study)/.test(text)) {
    return {
      role: "bot",
      text:
        "Sufian completed 12th from BSEB Board and is pursuing B.Tech Computer Science at Jamia Hamdard University, 2023-2027."
    };
  }

  if (/(skill|stack|technology|tools|tech)/.test(text)) {
    return {
      role: "bot",
      text:
        "His skills include Python, FastAPI, Flask, HTML, CSS, n8n automation, AI tools, prompt engineering, Salesforce Admin, and Canva."
    };
  }

  if (/(service|offer|hire|solution|automation|salesforce|website|chatbot|crm|scraping|ads|wordpress|e-?commerce)/.test(text)) {
    return {
      role: "bot",
      text:
        "Sufian can help with AI automation, AI chatbots, web development, Salesforce setup, CRM automation, data scraping, social media, ads, WordPress, and e-commerce seller management.",
      actions: [
        { type: "link", label: "Services", href: "/#services" },
        { type: "booking", label: "Book Meeting" }
      ]
    };
  }

  if (/(project|portfolio|work|case study|built|build)/.test(text)) {
    return {
      role: "bot",
      text:
        "You can explore AI workflow automation, Salesforce admin setup, web solutions, dashboards, chatbot systems, and Python automation projects in the portfolio.",
      actions: [{ type: "link", label: "View Projects", href: "/#projects" }]
    };
  }

  if (/(contact|email|reach|connect)/.test(text)) {
    return {
      role: "bot",
      text: "The fastest path is to book a meeting here, or use the contact section for a direct message.",
      actions: [
        { type: "booking", label: "Book Meeting" },
        { type: "link", label: "Contact", href: "/#contact" }
      ]
    };
  }

  return {
    role: "bot",
    text: invalidReply,
    actions: quickActions
  };
}

function TypingDots() {
  return (
    <div className="chat-bubble chat-bot">
      <span className="typing-dots text-neon" />
    </div>
  );
}

export default function SufianAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingStep, setBookingStep] = useState<BookingStep>("idle");
  const [bookingDraft, setBookingDraft] = useState<BookingDraft>({});
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "bot",
      text: "Hi, I am Sufian AI Assistant. Ask about Sufian's work, services, projects, or book a meeting.",
      actions: quickActions
    }
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const placeholder = useMemo(() => {
    if (bookingStep === "name") return "Enter your full name";
    if (bookingStep === "email") return "Enter your email address";
    if (bookingStep === "purpose") return "What should the meeting be about?";
    if (bookingStep === "type") return "Choose a meeting type below";
    if (bookingStep === "slot") return "Select an available slot";
    return "Ask about projects, services, or meetings";
  }, [bookingStep]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping, isLoading, open]);

  function addUserMessage(text: string) {
    setMessages((prev) => [...prev, { role: "user", text }]);
  }

  function addBotMessage(message: ChatMessage, delay = 520) {
    setIsTyping(true);
    window.setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, message]);
    }, delay);
  }

  function startBookingFlow() {
    setBookingStep("type");
    setBookingDraft({});
    addBotMessage({
      role: "bot",
      text: "What type of meeting would you like?",
      actions: meetingTypes
    });
  }

  async function loadSlots(duration: MeetingDuration) {
    setBookingStep("slot");
    setBookingDraft({ duration });
    setIsLoading(true);

    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata";
      const response = await fetch(`/api/book-meeting?duration=${duration}&timeZone=${encodeURIComponent(timeZone)}`);
      const result = await response.json();

      if (!response.ok || !result.success || !Array.isArray(result.slots) || result.slots.length === 0) {
        throw new Error(result.error || "No slots are available right now.");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: result.demo
            ? "Demo slots are shown until real Cal.com credentials are added. Choose a time to preview the booking flow."
            : "Here are the available Cal.com slots. Please choose one.",
          actions: result.slots.map((slot: AvailableSlot) => ({
            type: "slot",
            label: slot.label,
            slot
          }))
        }
      ]);
    } catch (error) {
      setBookingStep("idle");
      addBotMessage({
        role: "bot",
        text: error instanceof Error ? error.message : "I could not load slots right now.",
        actions: quickActions
      });
    } finally {
      setIsLoading(false);
    }
  }

  function selectSlot(slot: AvailableSlot) {
    setBookingDraft((draft) => ({ ...draft, slot }));
    setBookingStep("name");
    addBotMessage({ role: "bot", text: "Great choice. What is your full name?" });
  }

  async function createBooking(purpose: string) {
    const finalDraft = { ...bookingDraft, purpose };
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata";

    if (!finalDraft.duration || !finalDraft.slot || !finalDraft.name || !finalDraft.email) {
      addBotMessage({ role: "bot", text: "Something is missing. Please start the booking again.", actions: quickActions });
      setBookingStep("idle");
      setBookingDraft({});
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/book-meeting", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          duration: finalDraft.duration,
          slotStart: finalDraft.slot.start,
          name: finalDraft.name,
          email: finalDraft.email,
          purpose,
          timeZone
        })
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "Unable to schedule the meeting.");
      }

      addBotMessage({
        role: "bot",
        text: "Your meeting has been scheduled successfully. Please check your email for confirmation."
      });
    } catch (error) {
      addBotMessage({
        role: "bot",
        text:
          error instanceof Error
            ? error.message
            : "I could not schedule the meeting right now. Please try again shortly.",
        actions: quickActions
      });
    } finally {
      setIsLoading(false);
      setBookingStep("idle");
      setBookingDraft({});
    }
  }

  async function handleAction(action: ChatAction) {
    if (isTyping || isLoading) return;

    if (action.type === "link") {
      setOpen(false);
      return;
    }

    addUserMessage(action.label);

    if (action.type === "booking") {
      startBookingFlow();
      return;
    }

    if (action.type === "duration") {
      await loadSlots(action.duration);
      return;
    }

    if (action.type === "slot") {
      selectSlot(action.slot);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const message = input.trim();
    if (!message || isTyping || isLoading) return;

    setInput("");
    addUserMessage(message);

    if (bookingStep === "name") {
      setBookingDraft((draft) => ({ ...draft, name: message }));
      setBookingStep("email");
      addBotMessage({ role: "bot", text: "Thanks. What email should Cal.com send the confirmation to?" });
      return;
    }

    if (bookingStep === "email") {
      if (!isValidEmail(message)) {
        addBotMessage({ role: "bot", text: "Please enter a valid email address." });
        return;
      }

      setBookingDraft((draft) => ({ ...draft, email: message }));
      setBookingStep("purpose");
      addBotMessage({ role: "bot", text: "Perfect. What is the main purpose of the meeting?" });
      return;
    }

    if (bookingStep === "purpose") {
      await createBooking(message);
      return;
    }

    if (wantsMeeting(message)) {
      startBookingFlow();
      return;
    }

    addBotMessage(getPortfolioReply(message));
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
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
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
              className="fixed bottom-4 right-3 top-4 z-50 flex w-[calc(100%-1.5rem)] max-w-[27rem] flex-col overflow-hidden rounded-2xl border border-white/15 bg-[#050509]/82 shadow-[0_30px_120px_rgba(112,215,255,.18)] backdrop-blur-2xl sm:bottom-5 sm:right-6 sm:top-auto sm:h-[min(720px,calc(100vh-2.5rem))] sm:w-full"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_0%,rgba(112,215,255,.24),transparent_15rem),radial-gradient(circle_at_0%_100%,rgba(141,124,255,.2),transparent_17rem)]" />
              <div className="relative flex items-center justify-between border-b border-white/10 bg-white/[0.055] p-4 sm:p-5">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-neon/30 bg-neon/10 text-neon shadow-glow">
                    <AssistantIcon className="h-6 w-6" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="truncate text-base font-black text-white sm:text-lg">Sufian AI Assistant</h2>
                    <p className="truncate text-xs font-medium text-silver/70 sm:text-sm">Portfolio guide and meeting scheduler</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close Sufian AI Assistant"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[0.06] text-sm font-black text-silver transition hover:border-neon/40 hover:text-neon"
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
                            {message.actions.map((action) =>
                              action.type === "link" ? (
                                <a
                                  key={`${action.type}-${action.label}`}
                                  href={action.href}
                                  onClick={() => setOpen(false)}
                                  className="assistant-chip"
                                >
                                  {action.label}
                                </a>
                              ) : (
                                <button
                                  key={`${action.type}-${action.label}`}
                                  type="button"
                                  disabled={isTyping || isLoading}
                                  onClick={() => handleAction(action)}
                                  className="assistant-chip disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  {action.label}
                                </button>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {(isTyping || isLoading) && (
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
                    disabled={isLoading || bookingStep === "type" || bookingStep === "slot"}
                    className="form-field min-h-12 min-w-0 flex-1 rounded-2xl disabled:cursor-not-allowed disabled:opacity-60"
                  />
                  <motion.button
                    type="submit"
                    disabled={isTyping || isLoading || bookingStep === "type" || bookingStep === "slot"}
                    className="royal-button min-w-20 rounded-2xl px-4 disabled:cursor-not-allowed disabled:opacity-55"
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
