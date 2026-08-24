"use client";

import { useEffect, useRef, useState } from "react";
import AccessCarousel from "./AccessCarousel";

const items = [
  ["ORDER ONLINE", "Browse and add what you need."],
  ["IN-STORE PICKUP", "We prepare your order with care."],
  ["CURBSIDE PICKUP", "You pick up or we deliver to your car."],
  ["DELIVERY", "Pick up curbside or we'll deliver to your door."],
  ["THIRD-PARTY ORDERING", "Order on your favorite app."],
];

const symbols = [
  "/images/Customer/app.png",
  "/images/Customer/store.png",
  "/images/Customer/car.png",
  "/images/Customer/truck.png",
  "/images/Customer/bag.png",
];

export default function AccessSection() {
  const carouselSlides = [
    "/employees/1.jfif",
    "/employees/2.jfif",
    "/employees/3.jfif",
    "/employees/4.jfif",
    "/employees/5.jfif",
  ];

  const listRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

useEffect(() => {
    const node = listRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className="scroll-mt-[90px] py-3 pb-14 max-sm:py-11 max-sm:pb-12 overflow-x-hidden"
    >
      <div className="mx-auto max-w-[1120px] px-6 max-sm:px-[18px]">
        <div className="flex items-start justify-between gap-16 max-[860px]:flex-col max-[860px]:gap-10">
          {/* LEFT CONTENT */}
          <div className="flex-1">
            <p className="text-[18px] font-bold uppercase tracking-[0.08em] text-[#242424]">
              Built Around Access.
            </p>

            <h2 className=" font-display text-[36px] font-extrabold leading-[1.15] max-sm:text-[22px]">
              Redefine the future
              <br />
              of neighborhood retail.
            </h2>

            {/* Access Items */}
            <div ref={listRef} className="mt-[18px]">
              {items.map(([label, desc], index) => (
                <div
                  key={label}
                  className={`flex items-center gap-3 py-[7px] last:border-b-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    isInView
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-5"
                  }`}
                  style={{
                    transitionDelay: isInView ? `${index * 120}ms` : "0ms",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="flex h-[32px] w-[32px] shrink-0 items-center justify-center text-[23px] leading-none text-[#173820] transition-all ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                    style={{
                      transitionDuration: "800ms",
                      transitionDelay: isInView ? `${index * 120 + 100}ms` : "0ms",
                      opacity: isInView ? 1 : 0,
                      transform: isInView
                        ? "scale(1) rotate(0deg)"
                        : "scale(0.3) rotate(-35deg)",
                    }}
                  >
                    <img
                      src={symbols[index]}
                      alt={`Icon for ${label}`}
                      className="h-full w-full object-contain animate-[icon-float_3.5s_ease-in-out_infinite]"
                      style={{
                        animationDelay: `${index * 200 + 900}ms`,
                      }}
                    />
                  </div>

                  {/* Text */}
                  <div className="min-w-0">
                    <p className="text-[18px] font-bold leading-[1.15] tracking-[0.02em] text-[#17221b]">
                      {label}
                    </p>

                    <p className="mt-[2px] text-[14px] leading-[1.2] text-[#5b6660]">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT CAROUSEL */}
          <div className="w-full max-w-[280px] mx-auto justify-items-center shrink-0 pt-0 sm:max-w-[400px] max-[1000px]:sm:max-w-[580px] min-[1000px]:w-[50%] min-[1000px]:max-w-none min-[1000px]:mx-0">
            <AccessCarousel
              slides={carouselSlides}
              alt="Mii Shoppe team member"
            />
          </div>
        </div>
      </div>
    </section>
  );
}