import { services } from "@/lib/data";
import { Reveal } from "./Motion";

export default function Services() {
  return (
    <section id="services" className="section-shell">
      <Reveal>
        <p className="eyebrow">Services</p>
        <h2 className="heading-lg">Premium digital services for automation, growth, and operations.</h2>
      </Reveal>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {services.map((service, index) => (
          <Reveal key={service.title} delay={index * 0.05}>
            <article className="service-card group">
              <span className="service-icon">
                {service.icon}
              </span>
              <h3 className="mt-8 text-lg font-black text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-silver/75">{service.description}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
