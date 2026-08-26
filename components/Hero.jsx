"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          headingRef.current,
          { scale: 2.4, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1.1,
            ease: "back.out(1.5)",
            overwrite: "auto", // kill/replace any in-flight tween on this target instead of stacking
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "bottom top",
              toggleActions: "restart none restart none",
              fastScrollEnd: true,   // if the user (or a programmatic jump) blows past this trigger quickly, resolve it immediately instead of queuing a full replay
              preventOverlaps: true, // don't let this tween collide with another one firing on the same target a moment later
              invalidateOnRefresh: true,
            },
          }
        );
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(headingRef.current, { scale: 1, opacity: 1 });
      });

      return () => mm.revert();
    }, sectionRef);

    // Re-sync ScrollTrigger's measurements after mount/layout settles
    // (images, fonts, and Lenis's own init can all shift positions after first paint)
    const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(refreshId);
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="scroll-mt-[90px] overflow-hidden md:h-[450px] h-[650px]"
    >
      <div className="mx-auto flex max-w-[1120px] justify-between  px-6  max-sm:flex-col max-sm:px-[18px] ">
        <div className="mt-10 z-10 flex-1 max-w-[540px]">
          <h1
            ref={headingRef}
            className="font-display text-[56px] font-extrabold leading-[1.1] tracking-tight m-0 max-sm:text-[36px] max-sm:leading-[1.15] will-change-transform"
          >
            Access
            <span className="block text-[#779f2d]">Within Reach.</span>
          </h1>
          <p className="mt-6 max-w-[480px] text-[16px] leading-[1.65] text-[#5b6660] max-sm:mt-4 max-sm:text-[15px] max-sm:leading-[1.6]">
            A neighborhood-first, technology-enabled grocery retailer built
            around curbside, pickup, and delivery services to improve food
            access in underserved communities.
          </p>
          <div className="mt-8 max-sm:mt-6">
            <Button>JOIN THE WAITLIST</Button>
          </div>
        </div>
        <div className="relative flex flex-1 ml-16 sm:ml-0 justify-center max-sm:w-full max-sm:justify-center max-sm:mt-0">
          <div className="relative w-full sm:w-[300px] mt-10 drop-shadow-[0_30px_40px_rgba(15,41,23,.12)] motion-safe:animate-[floaty_6s_ease-in-out_infinite] max-sm:w-[95%] max-sm:max-w-[300px]">
            <img
              src="/images/mobile.png"
              alt="Mii Shoppe mobile app mockup"
              className="sm:w-full h-[330px] sm:h-[400px] sm:rounded-[40px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}