"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

const stats = [
  {
    number: 59,
    suffix: "%",
    label: "of Cleveland residents lived in areas identified as food deserts",
    icon: "1.svg",
  },
  {
    number: 230700,
    suffix: "+",
    label: "Cleveland residents were affected",
    icon: "2.svg",
  },
  {
    number: 22,
    suffix: "%",
    label: "low-access households have no vehicle",
    icon: "3.svg",
  },
  {
    number: 30.8,
    suffix: "%",
    decimals: 1,
    label: "Cleveland poverty rate",
    icon: "4.svg",
  },
];

function StatIcon({ type }) {
  return (
    <img
      src={`/images/svgs/${type}`}
      alt="stat icon"
      className="h-12 w-16 object-fill"
    />
  );
}

function AnimatedNumber({ number, suffix, decimals = 0, delay = 0 }) {
  const [value, setValue] = useState(0);
  const [punch, setPunch] = useState(false);

  useEffect(() => {
    let frame;
    const timeout = setTimeout(() => {
      const began = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - began) / 1400, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setValue(number * eased);
        if (progress < 1) {
          frame = requestAnimationFrame(tick);
        } else {
          setPunch(true);
          setTimeout(() => setPunch(false), 220);
        }
      };
      frame = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
    };
  }, [number, delay]);

  return (
    <p
      className={`font-display text-[40px] font-extrabold transition-transform duration-200 ease-out max-sm:text-2xl ${
        punch ? "scale-[1.08]" : "scale-100"
      }`}
    >
      {decimals
        ? value.toFixed(decimals)
        : Math.round(value).toLocaleString("en-US")}
      {suffix}
    </p>
  );
}

function Row({ stat, index }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Wait a frame so the browser paints the hidden state first —
    // this is what guarantees the transition actually plays every remount.
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      style={{ transitionDelay: visible ? `${index * 90}ms` : "0ms" }}
      className={`grid grid-cols-[56px_190px_1fr] items-center gap-20 border-t border-[#e7e9e5] px-1 py-5 opacity-0 translate-y-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] first:border-t-0 max-sm:grid-cols-[40px_1fr] max-sm:grid-rows-[auto_auto] max-sm:gap-x-4 max-sm:gap-y-0 max-sm:py-4 ${
        visible ? "opacity-100 translate-y-0" : ""
      }`}
    >
      <Icon
        className={`transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] max-sm:h-9 max-sm:w-9 ${
          visible ? "scale-100 rotate-0" : "scale-75 -rotate-6"
        }`}
      >
        <StatIcon type={stat.icon} />
      </Icon>
      <AnimatedNumber {...stat} delay={index * 90} />
      <p className="text-[14.5px] leading-[1.4] text-[#242424] w-[220px] max-sm:col-start-2">
        {stat.label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.4 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView) setAnimKey((k) => k + 1);
  }, [inView]);

  return (
    <div className="mx-auto max-w-[1120px] px-6 max-sm:px-[18px]">
      <div
        ref={ref}
        className="scroll-mt-[90px] rounded-[14px] border border-[#e7e9e5] bg-[#f7f8f5] p-9 shadow-[0_2px_10px_rgba(15,41,23,.06)] max-sm:p-[22px]"
      >
        <p className="text-[18px] font-bold uppercase tracking-[.08em] text-[#242424]">
          Demand is not the issue.
        </p>
        <h2 className=" font-display text-[40px] font-extrabold max-sm:text-[22px]">
          ACCESS IS.
        </h2>
        <div className="mt-7 flex flex-col">
          {stats.map((stat, i) => (
            // key includes animKey so React fully remounts each row every time
            // the section re-enters view — guarantees the animation replays.
            <Row key={`${stat.label}-${animKey}`} stat={stat} index={i} />
          ))}
        </div>
      </div>
      <div className="mt-10">
        <p className="text-center text-[24px] font-semibold max-sm:text-[14.5px]">
          Putting everyday needs within reach.
        </p>
      </div>
      <div className="mb-10 flex items-center justify-center gap-4">
        <span className="h-px flex-1 bg-[#779f2d]" />
        <img
          src="/images/leaf.png"
          alt="leaf"
          className="h-10 w-10 flex-shrink-0"
        />
        <span className="h-px flex-1 bg-[#779f2d]" />
      </div>
    </div>
  );
}
