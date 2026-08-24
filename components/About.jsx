"use client";

import { useEffect, useRef, useState } from "react";

const values = [
  {
    title: "Access",
    text: "Everyday necessities should be within reach.",
  },
  {
    title: "Convenience",
    text: "Shopping should fit into people's lives.",
  },
  {
    title: "Affordability",
    text: "Convenience should remain attainable.",
  },
  {
    title: "Opportunity",
    text: "Employees, vendors, and neighborhoods should grow alongside us.",
  },
  {
    title: "Purposeful Innovation",
    text: "Technology should remove barriers and improve everyday life.",
  },
];

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function RevealBlock({ children, delay = 0, className = "" }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`opacity-0 translate-y-4 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        visible ? "opacity-100 translate-y-0" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

function ValueCard({ value, index }) {
  const { ref, visible } = useReveal();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${index * 100}ms` : "0ms" }}
      className={`group h-full rounded-[14px] border border-[#e7e9e5] bg-white p-6 opacity-0 translate-y-6 scale-95 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:border-[#c8dba0] hover:shadow-[0_10px_28px_rgba(15,41,23,.1)] ${
        visible ? "opacity-100 translate-y-0 scale-100" : ""
      }`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eaf3de] font-display text-[15px] font-extrabold text-[#476036] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-6 group-hover:scale-110">
        {String(index + 1).padStart(2, "0")}
      </span>
      <p className="mt-4 font-display text-[17px] font-extrabold text-[#242424]">
        {value.title}
      </p>
      <p className="mt-1.5 text-[14px] leading-[1.6] text-[#4b4b47]">
        {value.text}
      </p>
    </div>
  );
}

export default function AboutSection() {
  return (
    <section className="scroll-mt-[90px] py-16">
      <div className="mx-auto max-w-[1120px] px-6 max-sm:px-[18px]">
        {/* Intro */}
        <RevealBlock>
          <p className="text-[14px] font-bold uppercase tracking-[.08em] text-[#779f2d]">
            About Mii Shoppe
          </p>
          <h2 className="mt-1 font-display text-[40px] font-extrabold leading-[1.1] text-[#242424] max-sm:text-[26px]">
            Groceries, made easier
            <br className="max-sm:hidden" /> to reach.
          </h2>
          <p className="mt-5 max-w-[700px] text-[16px] leading-[1.7] text-[#4b4b47]">
            Mii Shoppe is a neighborhood-first, technology-enabled grocery
            retailer built to make groceries and everyday essentials easier
            to access.
          </p>
          <p className="mt-4 max-w-[700px] text-[16px] leading-[1.7] text-[#4b4b47]">
            Through online ordering, curbside pickup, and delivery, customers
            will be able to shop for produce, meat and seafood, dairy, pantry
            staples, household necessities, baby products, health and beauty
            essentials, pet supplies, and more.
          </p>
        </RevealBlock>

        {/* Mission / Vision */}
        <div className="mt-12 grid grid-cols-2 gap-6 max-sm:grid-cols-1">
          <RevealBlock delay={80}>
            <div className="h-full rounded-[14px] border border-[#e7e9e5] bg-[#f7f8f5] p-8 shadow-[0_2px_10px_rgba(15,41,23,.06)] max-sm:p-6">
              <p className="text-[13px] font-bold uppercase tracking-[.08em] text-[#779f2d]">
                Our Mission
              </p>
              <p className="mt-3 font-display text-[26px] font-extrabold leading-[1.2] text-[#242424] max-sm:text-[20px]">
                Putting everyday needs within reach.
              </p>
            </div>
          </RevealBlock>

          <RevealBlock delay={160}>
            <div className="h-full rounded-[14px] border border-[#e7e9e5] bg-[#476036] p-8 text-white shadow-[0_2px_10px_rgba(15,41,23,.06)] max-sm:p-6">
              <p className="text-[13px] font-bold uppercase tracking-[.08em] text-[#a7c96b]">
                Our Vision
              </p>
              <p className="mt-3 font-display text-[26px] font-extrabold leading-[1.2] max-sm:text-[20px]">
                To redefine the future of{" "}
                <span className="text-[#a7c96b]">neighborhood retail.</span>
              </p>
              <p className="mt-4 text-[14.5px] leading-[1.6] text-white/85">
                Mii Shoppe envisions neighborhood retail that is more
                accessible, convenient, and responsive to how people live.
              </p>
            </div>
          </RevealBlock>
        </div>

        {/* Values */}
        <RevealBlock delay={100} className="mt-16">
          <p className="text-[14px] font-bold uppercase tracking-[.08em] text-[#779f2d]">
            Our Values
          </p>
          <h3 className="mt-1 font-display text-[32px] font-extrabold text-[#242424] max-sm:text-[22px]">
            What guides us.
          </h3>
        </RevealBlock>

        <div className="mt-8 grid grid-cols-3 gap-5 max-sm:grid-cols-1">
          {values.map((value, i) => (
            <ValueCard key={value.title} value={value} index={i} />
          ))}
        </div>

        {/* More than a grocery company */}
        <RevealBlock delay={100} className="mt-16">
          <div className="rounded-[14px] bg-[#476036] px-9 py-10 text-white max-sm:px-6 max-sm:py-8">
            <p className="text-[13px] font-bold uppercase tracking-[.08em] text-[#a7c96b]">
              Beyond the basics
            </p>
            <h3 className="mt-1 font-display text-[30px] font-extrabold leading-[1.15] max-sm:text-[21px]">
              More than a grocery company.
            </h3>
            <p className="mt-4 max-w-[680px] text-[15px] leading-[1.7] text-white/85">
              Mii Shoppe&apos;s fulfillment model is designed without
              traditional in-store shopping. Customers order digitally, our
              team prepares their items, and orders are provided through
              pickup or delivery.
            </p>
            <p className="mt-4 max-w-[680px] text-[15px] leading-[1.7] text-white/85">
              As Mii Shoppe expands, each location will be designed to
              improve access, create employment opportunities, support local
              vendors, and strengthen neighborhood partnerships.
            </p>
            <p className="mt-6 font-display text-[20px] font-extrabold text-[#779f2d] max-sm:text-[16px]">
              Mii Shoppe — Access Within Reach.
            </p>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}