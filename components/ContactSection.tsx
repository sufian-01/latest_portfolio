"use client";

import { useState } from "react";
import { Reveal } from "./Motion";
import { socialLinks, personalInfo } from "@/lib/data";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setLoading(true);
    // Smooth simulated submission for client-side feedback
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    }, 800);
  };

  return (
    <section id="contact" className="section-shell pb-36">
      <div className="grid gap-10 lg:grid-cols-[.95fr_1.05fr]">
        <Reveal>
          <p className="eyebrow">Let&apos;s Connect</p>
          <h2 className="heading-lg">
            Have an AI automation project, RAG pipeline, or custom agent to build?
          </h2>
          <p className="muted-copy mt-6">
            Share what you are building, what repetitive workflows need to be automated, or where your current systems feel slow. I will help architect and deploy a robust, production-grade AI solution.
          </p>

          <div className="mt-8 space-y-3.5 border-t border-white/10 pt-6">
            <div className="flex items-center gap-3 text-sm text-silver/90">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-neon">
                ✉️
              </span>
              <div>
                <span className="block text-xs uppercase tracking-wider text-silver/60">Email</span>
                <a href={`mailto:${personalInfo.email}`} className="font-bold text-white hover:text-neon transition">
                  {personalInfo.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-silver/90">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-neon">
                📞
              </span>
              <div>
                <span className="block text-xs uppercase tracking-wider text-silver/60">Phone / WhatsApp</span>
                <a href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`} className="font-bold text-white hover:text-neon transition">
                  {personalInfo.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm text-silver/90">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-neon">
                📍
              </span>
              <div>
                <span className="block text-xs uppercase tracking-wider text-silver/60">Location</span>
                <span className="font-bold text-white">{personalInfo.location}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="grid h-11 w-11 place-items-center rounded-xl border border-white/15 bg-white/[0.07] p-2.5 transition hover:-translate-y-1 hover:border-neon/40 hover:bg-white/[0.12] hover:text-neon"
              >
                <img src={item.icon} alt={item.label} className="h-5 w-5 object-contain" />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="glass grid gap-4 rounded-2xl p-6 md:p-8">
            <h3 className="text-xl font-black text-white">Send a Message</h3>

            {submitted ? (
              <div className="rounded-xl border border-neon/40 bg-neon/10 p-5 text-center">
                <p className="text-base font-bold text-white">Message sent successfully! 🚀</p>
                <p className="mt-1 text-xs text-silver/80">
                  Thank you for reaching out. Sufian will get back to you shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-bold text-neon underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <label className="grid gap-2 text-sm font-bold text-white">
                  Name
                  <input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-field"
                    placeholder="Your full name"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold text-white">
                  Email
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="form-field"
                    placeholder="you@example.com"
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold text-white">
                  Message
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="form-field min-h-32 resize-y"
                    placeholder="Tell me about your project, automation goals, or requirements"
                  />
                </label>
                <button className="royal-button mt-2" type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
