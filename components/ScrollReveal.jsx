"use client";

import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from "react";

export default function ScrollReveal({ children, direction = "left", stagger = true }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal-direction={direction}
      className={`scroll-reveal ${isVisible ? "is-visible" : ""}`}
    >
      {stagger ? staggerChildren(children) : children}
    </div>
  );
}

function staggerChildren(children) {
  const kids = Children.toArray(children);
  if (kids.length !== 1 || !isValidElement(kids[0])) return children;

  const wrapped = Children.map(kids[0].props.children, (child, i) =>
    isValidElement(child) ? cloneElement(child, { style: { ...child.props.style, "--i": i } }) : child
  );

  return cloneElement(kids[0], {}, wrapped);
}