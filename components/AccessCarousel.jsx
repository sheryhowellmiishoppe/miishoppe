"use client";

import { useEffect, useState } from "react";

export default function AccessCarousel({
  slides,
  alt = "Mii Shoppe team member",
}) {
  const [index, setIndex] = useState(0);

  const changeSlide = (step) => {
    setIndex((current) => (current + step + slides.length) % slides.length);
  };

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      changeSlide(1);
    }, 4200);

    return () => clearInterval(timer);
  }, [slides.length]);

  if (!slides?.length) return null;

  return (
    <div className="relative flex w-full flex-col items-center">
      {/* Image + arrows */}
      <div className="relative w-full max-w-[350px] sm:max-w-[340px] lg:w-[515px] lg:max-w-none">
        {/* Image */}
        <div className="relative mx-auto h-[300px] w-[300px] overflow-hidden rounded-[11px] bg-[#f3f4f1] sm:h-[320px] sm:w-[330px] lg:h-[400px] lg:w-[415px]">
          {slides.map((slide, i) => (
            <img
              key={slide}
              src={slide}
              alt={`${alt} ${i + 1}`}
              className={`absolute inset-0 h-full w-full object-fill transition-opacity duration-700 ease-in-out ${
                i === index ? "opacity-100" : "opacity-0"
              }`}
              draggable={false}
            />
          ))}
        </div>

        {/* Previous */}
        {slides.length > 1 && (
          <button
            type="button"
            onClick={() => changeSlide(-1)}
            aria-label="Previous slide"
            className="absolute left-[-40px] sm:left-[-6px] top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#e4e7e3] bg-white shadow-[0_2px_8px_rgba(0,0,0,.08)] transition hover:scale-105 hover:bg-[#f7f8f5] sm:h-9 sm:w-9 lg:left-[-10px] lg:h-10 lg:w-10"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#476036"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sm:h-6 sm:w-6 lg:h-7 lg:w-7"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {/* Next */}
        {slides.length > 1 && (
          <button
            type="button"
            onClick={() => changeSlide(1)}
            aria-label="Next slide"
            className="absolute right-[-60px] sm:right-[-6px] top-1/2 z-20 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-[#e4e7e3] bg-white shadow-[0_2px_8px_rgba(0,0,0,.08)] transition hover:scale-105 hover:bg-[#f7f8f5] sm:h-9 sm:w-9 lg:right-[-10px] lg:h-10 lg:w-10"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#476036"
              strokeWidth="2.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="sm:h-6 sm:w-6 lg:h-7 lg:w-7"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>

      {/* Dots */}
      {slides.length > 1 && (
        <div className="mt-3 flex justify-center gap-2">
          {slides.map((slide, dotIndex) => (
            <button
              key={slide}
              type="button"
              onClick={() => setIndex(dotIndex)}
              aria-label={`Go to slide ${dotIndex + 1}`}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                dotIndex === index ? "bg-[#173820]" : "bg-[#d9d9d9]"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}