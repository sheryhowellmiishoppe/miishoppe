"use client";

import { useEffect, useRef, useState } from "react";

const categories = [
  {
    icon: "support",
    title: "Customer Support",
    text: "For questions about accounts, orders, pickup, delivery, products, or general assistance.",
  },
  {
    icon: "partners",
    title: "Investors and Partnerships",
    text: "Connect with Mii Shoppe regarding investment opportunities, strategic partnerships, economic development, and organizational collaborations.",
  },
  {
    icon: "vendor",
    title: "Local Vendors",
    text: "Interested in offering your products through Mii Shoppe? Contact us to learn more about the Local Vendor Partner Program.",
  },
  {
    icon: "media",
    title: "Media and General Inquiries",
    text: "For media requests, company information, events, and other business inquiries.",
  },
];

const icons = {
  support: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21c-4.97-1-9-4.5-9-9V6l9-3 9 3v6c0 4.5-4.03 8-9 9z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  partners: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 21h18M6 21V9l6-4 6 4v12M9 21v-6h6v6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  vendor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 8h16l-1.5 11a2 2 0 0 1-2 2H7.5a2 2 0 0 1-2-2L4 8z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 8V6a4 4 0 0 1 8 0v2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  media: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 8h18M8 12h4M8 15h6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

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

function CategoryRow({ item, index }) {
  const { ref, visible } = useReveal(0.25);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${index * 90}ms` : "0ms" }}
      className={`group flex items-start gap-5 border-t border-[#e7e9e5] py-6 opacity-0 -translate-x-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] first:border-t-0 max-sm:gap-3.5 max-sm:py-5 ${
        visible ? "opacity-100 translate-x-0" : ""
      }`}
    >
      <span
        className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#eaf3de] text-[#476036] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:bg-[#476036] group-hover:text-white max-sm:h-10 max-sm:w-10 ${
          visible ? "scale-100 rotate-0" : "scale-75 -rotate-12"
        }`}
      >
        <span className="h-5 w-5">{icons[item.icon]}</span>
      </span>
      <div>
        <p className="font-display text-[18px] font-extrabold text-[#242424] max-sm:text-[15px]">
          {item.title}
        </p>
        <p className="mt-1.5 max-w-[520px] text-[14.5px] leading-[1.65] text-[#4b4b47] max-sm:text-[13.5px]">
          {item.text}
        </p>
      </div>
    </div>
  );
}

export default function ContactSection() {
  return (
    <section className="scroll-mt-[90px] py-16">
      <div className="mx-auto max-w-[1120px] px-6 max-sm:px-[18px]">
        <div className="grid grid-cols-[1fr_1.1fr] gap-14 max-sm:grid-cols-1 max-sm:gap-8">
          {/* Left: intro + categories */}
          <div>
            <RevealBlock>
              <p className="text-[14px] font-bold uppercase tracking-[.08em] text-[#779f2d]">
                Contact Us
              </p>
              <h2 className="mt-1 font-display text-[40px] font-extrabold leading-[1.1] text-[#242424] max-sm:text-[26px]">
                Let&apos;s connect.
              </h2>
              <p className="mt-5 max-w-[480px] text-[16px] leading-[1.7] text-[#4b4b47]">
                Have a question, need assistance, or want to learn more about
                Mii Shoppe? Our team is here to help.
              </p>
            </RevealBlock>

            <div className="mt-8">
              {categories.map((item, i) => (
                <CategoryRow key={item.title} item={item} index={i} />
              ))}
            </div>
          </div>

          {/* Right: contact card */}
          <RevealBlock delay={150}>
            <div className="sticky top-24 rounded-[14px] bg-[#476036] p-9 text-white max-sm:static max-sm:p-7">
              <p className="text-[13px] font-bold uppercase tracking-[.08em] text-[#a7c96b]">
                Contact Mii Shoppe
              </p>
              <p className="mt-3 font-display text-[26px] font-extrabold leading-[1.25] max-sm:text-[20px]">
                Email all inquiries to:
              </p>

              <a
                href="mailto:support@miishoppe.com"
                className="group mt-6 flex items-center justify-between gap-3 rounded-full bg-white px-6 py-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(0,0,0,.18)] max-sm:px-5 max-sm:py-3.5"
              >
                <span className="truncate font-display text-[16px] font-extrabold text-[#242424] max-sm:text-[13.5px]">
                  support@miishoppe.com
                </span>
                <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#eaf3de] text-[#476036] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-1 group-hover:bg-[#476036] group-hover:text-white">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>

              <p className="mt-5 text-[14px] leading-[1.6] text-white/80">
                We&apos;ll respond as soon as possible.
              </p>

              <div className="mt-8 border-t border-white/15 pt-6">
                <p className="font-display text-[18px] font-extrabold text-[#a7c96b] max-sm:text-[15px]">
                  Mii Shoppe — Access Within Reach.
                </p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </div>
    </section>
  );
}