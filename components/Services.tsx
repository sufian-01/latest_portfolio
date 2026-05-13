import { services } from "@/lib/data";
import { Reveal } from "./Motion";

export default function Services() {
  return (
    <section id="services" className="section-shell">
      <Reveal>
        <p className="eyebrow">Services</p>
        <h2 className="heading-lg">Premium digital services for automation, growth, and operations.</h2>
      </Reveal>

      <div className="services-grid mt-12">
        {services.map((service, index) => (
          <Reveal key={service.title} delay={index * 0.05} className="h-full">
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
