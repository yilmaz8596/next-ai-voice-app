"use client";

import React, { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  className?: string;
}

export default function AnimatedCounter({
  target,
  duration = 1500,
  decimals = 0,
  suffix = "",
  className = "",
}: AnimatedCounterProps) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const from = 0;
            const delta = target - from;
            const step = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const current = from + delta * progress;
              setValue(current);
              if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.4 },
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  const fmt = () => {
    if (decimals > 0) return value.toFixed(decimals);
    return Math.round(value).toString();
  };

  return (
    <div ref={ref} className={className}>
      {fmt()}
      {suffix}
    </div>
  );
}
