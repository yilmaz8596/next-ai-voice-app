"use client";

import React, { useEffect, useRef, useState } from "react";

interface AnimateOnViewProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  delay?: number; // ms
}

export default function AnimateOnView({
  children,
  className = "",
  threshold = 0.15,
  rootMargin = "0px",
  delay = 0,
}: AnimateOnViewProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, rootMargin]);

  return (
    <div
      ref={ref}
      className={`${className} animate-section ${visible ? "animate-in" : ""}`}
      style={{ ["--delay" as any]: `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
