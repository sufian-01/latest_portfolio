import { Reveal } from "./Motion";
import { socialLinks } from "@/lib/data";

export default function ContactSection() {
  return (
    <section id="contact" className="section-shell pb-36">
      <div className="grid gap-10 lg:grid-cols-[.9fr_1fr]">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="heading-lg">Have an automation idea or Salesforce workflow to improve?</h2>
          <p className="muted-copy mt-6">
            Share what you are building, what needs to be automated, or where your current process
            feels slow. I will help shape it into a clear digital solution.
          </p>
          <div className="mt-8 flex gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="grid h-12 w-12 place-items-center rounded-lg border border-white/15 bg-white/[0.07] font-black uppercase transition hover:-translate-y-1 hover:border-neon/40 hover:text-neon"
              >
                <img src={item.icon} alt={item.label} />
              </a>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form className="glass grid gap-4 rounded-xl p-5 md:p-7">
            <label className="grid gap-2 font-bold text-white">
              Name
              <input className="form-field" placeholder="Your full name" />
            </label>
            <label className="grid gap-2 font-bold text-white">
              Email
              <input type="email" className="form-field" placeholder="you@example.com" />
            </label>
            <label className="grid gap-2 font-bold text-white">
              Message
              <textarea className="form-field min-h-36 resize-y" placeholder="Tell me about your project" />
            </label>
            <button className="royal-button" type="button">
              Send Message
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
