import Image from "next/image";
import { Reveal } from "./Motion";
import TiltCard from "./TiltCard";

const skills = [
  "Python",
  "HTML",
  "CSS",
  "Flask",
  "FastAPI",
  "Automation (n8n)",
  "Canva",
  "AI Tools Usage",
  "Prompt Engineering",
  "Salesforce Admin"
];

export default function About() {
  return (
    <section id="about" className="section-shell">
      <Reveal>
        <p className="eyebrow">About Me</p>
        <h2 className="heading-lg">Focused on automation, clean systems, and practical AI solutions.</h2>
      </Reveal>

      <div className="mt-12 grid items-center gap-12 lg:grid-cols-[.82fr_1fr]">
        <Reveal>
          <TiltCard className="overflow-hidden p-3">
            <Image
              src="/front1---.png"
              alt="Professional profile portrait"
              width={1000}
              height={1000}
              className="aspect-square rounded-xl object-cover transition duration-500 group-hover:scale-[1.04]"
            />
          </TiltCard>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="muted-copy">
            I am a passionate AI Automation Engineer and Salesforce Admin with a strong focus on
            building efficient and scalable digital solutions. I enjoy working on automation
            systems, web development, and AI-powered applications that solve real-world problems.
          </p>
          <div className="mt-10">
            <h3 className="text-sm font-black uppercase tracking-[0.16em] text-white/80">Skills</h3>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {skills.map((skill) => (
              <div key={skill} className="skill-tag">
                {skill}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
