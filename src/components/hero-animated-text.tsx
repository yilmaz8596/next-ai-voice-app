"use client";

import React from "react";

interface HeroAnimatedTextProps {
  before: string;
  highlight?: string;
  className?: string;
  step?: number;
  baseDelay?: number;
}

export default function HeroAnimatedText({
  before,
  highlight = "",
  className = "",
  step = 40,
  baseDelay = 0,
}: HeroAnimatedTextProps) {
  const beforeChars = Array.from(before);
  const highlightChars = Array.from(highlight);

  const underlineDelay =
    baseDelay + (beforeChars.length + highlightChars.length) * step + 60;

  return (
    <span className={`hero-animated ${className}`}>
      <span className="hero-before" aria-hidden="true">
        {beforeChars.map((ch, i) => (
          <span
            key={`b-${i}`}
            className="hero-char"
            style={{ ["--delay" as any]: `${baseDelay + i * step}ms` }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </span>
      {highlight && (
        <span
          className="hero-highlight ml-2"
          style={
            {
              ["--underline-delay" as any]: `${underlineDelay}ms`,
            } as React.CSSProperties
          }
          aria-hidden="true"
        >
          {highlightChars.map((ch, i) => (
            <span
              key={`h-${i}`}
              className="hero-char hero-highlight-char"
              style={{
                ["--delay" as any]: `${baseDelay + (beforeChars.length + i) * step}ms`,
              }}
            >
              {ch === " " ? "\u00A0" : ch}
            </span>
          ))}
        </span>
      )}
    </span>
  );
}
