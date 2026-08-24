"use client";

import { useEffect, useState } from "react";
import Button from "./Button";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "About Us", href: "#about-us" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Contact", href: "#contact" },
  ];

  // Lock body scroll while drawer is open + allow Escape to close
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white">
        <div className="mx-auto flex max-w-[1120px] items-center justify-between px-6 py-0">
          <a href="#top" aria-label="Mii Shoppe home">
            <img
              src="/images/logo.png"
              alt="Mii Shoppe"
              className="h-[90px] w-auto"
            />
          </a>
          <div className="flex items-center gap-3.5">
            <Button className="text-[8px]">JOIN THE WAITLIST</Button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-[#e7e9e5] bg-transparent transition hover:bg-[#f7f8f5]"
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--ink)"
                strokeWidth="2.2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop — always mounted so opacity transition can run, but
          pointer-events/visibility gated so it's inert when closed */}
      <div
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Drawer panel — slides in from the right */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className={`fixed right-0 top-0 z-50 flex h-dvh w-full flex-col bg-white shadow-2xl transition-transform duration-300 ease-out sm:w-80 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-[#e7e9e5] px-6 py-4">
          <a
            href="#top"
            aria-label="Mii Shoppe home"
            onClick={() => setMobileMenuOpen(false)}
          >
            <img
              src="/images/logo.png"
              alt="Mii Shoppe"
              className="h-12 w-auto"
            />
          </a>
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#e7e9e5] bg-transparent transition hover:bg-[#f7f8f5]"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="2.2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-1 flex-col overflow-y-auto">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="border-b border-[#e7e9e5] px-6 py-4 text-[15px] font-medium text-[#16201a] transition hover:bg-[#f7f8f5]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Footer CTA inside the drawer
        <div className="border-t border-[#e7e9e5] px-6 py-5">
          <Button
            className="w-full text-[11px]"
            onClick={() => setMobileMenuOpen(false)}
          >
            JOIN THE WAITLIST
          </Button>
        </div> */}
      </div>
    </>
  );
}
