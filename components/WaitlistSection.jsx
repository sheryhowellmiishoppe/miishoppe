"use client";

import { useState } from "react";
import Button from "./Button";

export default function WaitlistSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const zip = formData.get("zip");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, zip }),
      });

      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pb-16 pt-2">
      <div className="mx-auto max-w-[1120px] px-6 max-sm:px-[18px]">
        <div className="rounded-[14px] bg-[#476036] px-9 py-4 text-white max-sm:px-[22px] max-sm:py-7">
          <h3 className="font-display text-[36px] font-extrabold max-sm:text-[21px]">
            Be First to <span className="text-[#779f2d]">Know.</span>
          </h3>
          <p className="mt-2.5 max-w-[520px] text-[16px] leading-[1.6] text-white">
            Join the Mii Shoppe waitlist for launch announcements, location
            updates, early access, app news, and more.
          </p>
          {submitted ? (
            <p className="mt-6 font-semibold text-[#779f2d]">
              You&apos;re on the list. We&apos;ll be in touch.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-6 flex flex-wrap gap-3 max-sm:flex-col">
              <label className="flex min-w-[200px] flex-1 items-center gap-2.5 rounded-full border border-white/20 bg-white px-[18px] py-3">
                <span className="text-black" aria-hidden="true">✉</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  required
                  className="w-full bg-white text-sm text-[#242424] outline-none placeholder:text-black/55"
                />
              </label>
              <label className="flex min-w-[160px] items-center gap-2.5 rounded-full border border-white/20 bg-white px-[18px] py-3">
                <span className="text-black" aria-hidden="true">⌖</span>
                <input
                  type="text"
                  name="zip"
                  placeholder="ZIP Code"
                  required
                  className="w-full bg-white text-sm text-[#242424] outline-none placeholder:text-black/55"
                />
              </label>
              <Button light type="submit" disabled={loading} className="flex items-center justify-center gap-2">
                {loading && (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                )}
                {loading ? "SENDING..." : "JOIN THE WAITLIST"}
              </Button>
              {error && (
                <p className="w-full text-sm text-red-200 animate-[shake_0.4s_ease-in-out]">
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}