import About from "@/components/About";
import Achievements from "@/components/Achievements";
import ContactSection from "@/components/ContactSection";
import Education from "@/components/Education";
import FloatingActions from "@/components/FloatingActions";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Services from "@/components/Services";

export default function Home() {
  return (
    <>
      <div className="noise" aria-hidden="true" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Projects />
        <Services />
        <Achievements />
        <ContactSection />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
