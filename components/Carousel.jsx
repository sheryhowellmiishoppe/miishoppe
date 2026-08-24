"use client";

import { useEffect, useRef, useState } from "react";

export default function Carousel({ slides, alt, className = "" }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const changeSlide = (step) => {
    setIndex((current) => (current + step + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!slides || slides.length < 2 || isPaused) return;

    timerRef.current = setInterval(() => {
      changeSlide(1);
    }, 4200);

    return () => clearInterval(timerRef.current);
  }, [slides?.length, isPaused]);

  if (!slides?.length) return null;

  // Shortest signed distance from `index`, accounting for wrap-around.
  const relativeDiff = (i) => {
    let diff = i - index;
    const half = slides.length / 2;
    if (diff > half) diff -= slides.length;
    if (diff < -half) diff += slides.length;
    return diff;
  };

  return (
    <div className={`mt-8 flex items-center justify-center gap-6 sm:gap-10 lg:gap-20 ${className}`}>
      {/* Carousel stage */}
      <div
        className="relative h-[300px] w-[260px] shrink-0 sm:h-[300px] sm:w-[340px] md:h-[360px] md:w-[400px] lg:h-[402px] lg:w-[400px]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Previous Arrow */}
        <button
          onClick={() => changeSlide(-1)}
          aria-label="Previous slide"
          className="absolute left-1 top-1/2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#e4e7e3] bg-white shadow-sm transition hover:scale-105 hover:bg-[#f7f8f5] sm:h-12 sm:w-12 lg:left-[-100px] lg:h-14 lg:w-14"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#173820" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="sm:h-5 sm:w-5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Layered slides */}
        {slides.map((slide, i) => {
          const diff = relativeDiff(i);
          const isCurrent = diff === 0;
          const isLeft = diff === -1;
          const isRight = diff === 1;
          const isVisible = isCurrent || isLeft || isRight;

          // Shift is a % of the slide's own width, so the 30% peek
          // stays proportional at every breakpoint automatically.
          const shift = isCurrent ? 0 : diff * 30;

          return (
            <div
              key={slide + i}
              onClick={() => !isCurrent && isVisible && setIndex(i)}
              className={`absolute top-0 h-full w-full overflow-hidden rounded-[12px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isCurrent ? "z-30" : isVisible ? "z-10 cursor-pointer" : "z-0"
              }`}
              style={{
                left: "50%",
                transform: `translateX(calc(-50% + ${shift}%)) scale(${
                  isCurrent ? 1 : 0.92
                })`,
                opacity: isCurrent ? 1 : isVisible ? 0.1 : 0,
                pointerEvents: isVisible ? "auto" : "none",
              }}
            >
              <img
                src={slide}
                alt={`${alt} ${i + 1}`}
                className="h-full w-full object-fill"
                draggable={false}
              />
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-16 sm:h-20"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.08) 60%, rgba(0,0,0,0) 100%)",
                }}
              />
            </div>
          );
        })}

        {/* Next Arrow */}
        <button
          onClick={() => changeSlide(1)}
          aria-label="Next slide"
          className="absolute right-1 top-1/2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#e4e7e3] bg-white shadow-sm transition hover:scale-105 hover:bg-[#f7f8f5] sm:h-12 sm:w-12 lg:right-[-100px] lg:h-14 lg:w-14"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#173820" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" className="sm:h-5 sm:w-5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Dots */}
        <div className="absolute -bottom-8 left-1/2 z-40 flex -translate-x-1/2 justify-center gap-2 sm:-bottom-10">
          {slides.map((slide, dotIndex) => (
            <button
              key={slide}
              onClick={() => setIndex(dotIndex)}
              aria-label={`Go to slide ${dotIndex + 1}`}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                dotIndex === index ? "bg-[#173820]" : "bg-[#d9d9d9]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Watermark — hidden below lg (covers mobile + tablet), unchanged on desktop */}
      <img
        src="/images/grocery-bag.png"
        alt=""
        aria-hidden="true"
        className="hidden h-[300px] w-[300px] ml-20 shrink-0 object-contain opacity-[0.19] lg:block"
      />
    </div>
  );
}