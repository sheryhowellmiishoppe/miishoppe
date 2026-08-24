"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    title: "Shop Online",
    text: "Browse groceries, produce, household essentials, health and beauty products, baby items, pet supplies, and more through the Mii Shoppe website, mobile app, or participating third-party platforms.",
  },
  {
    number: "02",
    title: "Choose Your Service",
    text: "Select curbside pickup, scheduled pickup, or delivery based on your needs and availability.",
  },
  {
    number: "03",
    title: "We Prepare Your Order",
    text: "Our fulfillment team carefully selects, packs, and prepares your items. Order updates will keep you informed throughout the process.",
  },
  {
    number: "04",
    title: "Pick Up or Get It Delivered",
    text: "Check in when you arrive for curbside pickup, or have your order delivered to your preferred location.",
  },
];

function useReveal(threshold = 0.2) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function RevealBlock({ children, delay = 0.7, className = "" }) {
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

function StepRow({ step, index, isLast }) {
  const { ref, visible } = useReveal(0.5);

  return (
    <div ref={ref} className="relative flex gap-6 max-sm:gap-4">
      {/* Rail */}
      <div className="flex flex-col items-center">
        <div
          style={{ transitionDelay: visible ? "100ms" : "0ms" }}
          className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border-2 border-[#476036] bg-white font-display text-[18px] font-extrabold text-[#476036] opacity-0 scale-50 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] max-sm:h-11 max-sm:w-11 max-sm:text-[14px] ${
            visible ? "opacity-100 scale-100" : ""
          }`}
        >
          {step.number}
        </div>
        {!isLast && (
          <div
            style={{ transitionDelay: visible ? "300ms" : "0ms" }}
            className={`mt-1 w-[2px] flex-1 origin-top scale-y-0 bg-[#c8dba0] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              visible ? "scale-y-100" : ""
            }`}
          />
        )}
      </div>

      {/* Content */}
      <div
        style={{ transitionDelay: visible ? "150ms" : "0ms" }}
        className={`mb-8 flex-1 rounded-[14px] border border-[#e7e9e5] bg-white p-6 opacity-0 translate-x-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[#c8dba0] hover:shadow-[0_10px_28px_rgba(15,41,23,.08)] max-sm:translate-x-4 ${
          visible ? "opacity-100 translate-x-0" : ""
        }`}
      >
        <p className="font-display text-[19px] font-extrabold text-[#242424] max-sm:text-[16px]">
          {step.title}
        </p>
        <p className="mt-2 text-[14.5px] leading-[1.7] text-[#4b4b47]">
          {step.text}
        </p>
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <section className="scroll-mt-[90px] py-16">
      <div className="mx-auto max-w-[900px] px-6 max-sm:px-[18px]">
        <RevealBlock className="text-center">
          <p className="text-[14px] font-bold uppercase tracking-[.08em] text-[#779f2d]">
            How It Works
          </p>
          <h2 className="mt-1 font-display text-[40px] font-extrabold leading-[1.1] text-[#242424] max-sm:text-[26px]">
            Everyday essentials,
            <br className="max-sm:hidden" /> made easier.
          </h2>
          <p className="mx-auto mt-5 max-w-[560px] text-[16px] leading-[1.7] text-[#4b4b47]">
            Mii Shoppe offers a simple, digital-first way to order groceries
            and household essentials for curbside pickup or delivery.
          </p>
        </RevealBlock>

        <div className="mt-14">
          {steps.map((step, i) => (
            <StepRow
              key={step.number}
              step={step}
              index={i}
              isLast={i === steps.length - 1}
            />
          ))}
        </div>

        <RevealBlock delay={100}>
          <div className="rounded-[14px] bg-[#476036] px-9 py-7 text-center max-sm:px-6 max-sm:py-6">
            <p className="font-display text-[20px] font-extrabold text-white max-sm:text-[16px]">
              No aisles. No long checkout lines.{" "}
              <span className="text-[#a7c96b]">
                Just convenient access to what you need.
              </span>
            </p>
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}