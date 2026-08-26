// page.jsx
import Header from "../components/Header";
import Hero from "../components/Hero";
import StatsSection from "../components/StatsSection";
import CustomersSection from "../components/CustomersSection";
import AccessSection from "../components/AccessSection";
import WaitlistSection from "../components/WaitlistSection";
import Footer from "../components/Footer";
import ScrollReveal from "../components/ScrollReveal";
import AboutSection from "../components/About";
import HowItWorksSection from "../components/HowItWorks";
import ContactSection from "../components/Contact";
export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      <Header />
      <>
        <ScrollReveal direction="left">
          <Hero />
        </ScrollReveal>

        <div id="stats" className="scroll-mt-[90px]" />
        <ScrollReveal direction="right">
          <StatsSection />
        </ScrollReveal>

        <ScrollReveal direction="left">
          <CustomersSection />
        </ScrollReveal>

        <div id="access" className="scroll-mt-[90px]" />
        <ScrollReveal direction="right">
          <AccessSection />
        </ScrollReveal>

        <div id="how-it-works" className="scroll-mt-[90px]" />
        <ScrollReveal direction="right">
          <HowItWorksSection />
        </ScrollReveal>
        <div id="about-us" className="scroll-mt-[90px]" />
        <ScrollReveal direction="right">
          <AboutSection />
        </ScrollReveal>

        <div id="contact" className="scroll-mt-[90px]" />
        <ScrollReveal direction="right">
          <ContactSection />
        </ScrollReveal>
        <div id="waitlist" className="scroll-mt-[90px]" />
        <ScrollReveal direction="up">
          <WaitlistSection />
        </ScrollReveal>
      </>

      <div id="footer" className="scroll-mt-[90px]" />
      <ScrollReveal direction="right">
        <Footer />
      </ScrollReveal>
    </div>
  );
}