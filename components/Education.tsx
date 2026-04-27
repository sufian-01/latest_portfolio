import { education } from "@/lib/data";
import { Reveal } from "./Motion";

export default function Education() {
  return (
    <section id="education" className="section-shell">
      <Reveal>
        <p className="eyebrow">Education</p>
        <h2 className="heading-lg">Academic foundation for engineering reliable digital systems.</h2>
      </Reveal>

      <div className="relative mt-14 max-w-4xl">
        <div className="timeline-line absolute bottom-0 left-4 top-0 w-px md:left-1/2" />
        {education.map((item, index) => (
          <Reveal key={item.year} delay={index * 0.08}>
            <article className={`relative mb-8 grid gap-5 md:grid-cols-2 ${index % 2 ? "" : "md:text-right"}`}>
              <div className={index % 2 ? "md:col-start-2" : ""}>
                <div className="glass rounded-xl p-6 transition duration-300 hover:-translate-y-1 hover:border-neon/35 hover:shadow-glow">
                  <span className="text-sm font-black text-neon">{item.year}</span>
                  <h3 className="mt-2 text-2xl font-black text-white">{item.degree}</h3>
                  <p className="mt-3 text-silver/75">{item.description}</p>
                </div>
              </div>
              <span className="absolute left-2.5 top-7 h-3.5 w-3.5 rounded-full bg-neon shadow-[0_0_30px_rgba(112,215,255,.9)] md:left-[calc(50%-7px)]" />
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
