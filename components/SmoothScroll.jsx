"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 4), // expo-out — cinematic decel
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    // Keep ScrollTrigger's measurements in sync with Lenis's virtual scroll,
    // instead of relying on the native (throttled) "scroll" event.
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis off GSAP's ticker instead of its own rAF loop, so both
    // systems update scroll position on the exact same frame.
    const update = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(update);

    // Prevent GSAP from "catching up" with a burst of skipped frames after
    // a long task or a fast programmatic scroll jump — this is what causes
    // the violent stutter you're seeing when the waitlist button fires.
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return children;
}