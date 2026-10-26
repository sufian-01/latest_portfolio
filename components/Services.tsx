import { services } from "@/lib/data";
import { Reveal } from "./Motion";

export default function Services() {
  return (
    <section id="services" className="section-shell">
      <Reveal>
        <p className="eyebrow">Services & Capabilities</p>
        <h2 className="heading-lg">
          AI Engineering, Agentic Workflows & Enterprise Automation.
        </h2>
        <p className="muted-copy mt-3 max-w-2xl text-silver/80">
          Transforming business operations with goal-oriented AI agents, RAG knowledge systems, and scalable Python microservices.
        </p>
      </Reveal>

      <div className="services-grid mt-12">
        {services.map((service, index) => (
          <Reveal key={service.title} delay={index * 0.04} className="h-full">
            <article className="service-card group">
              <span className="service-icon">
                {service.icon}
              </span>
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
