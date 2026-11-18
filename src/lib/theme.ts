"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * Framer Motion দিয়ে রঙ অ্যানিমেট করতে হলে আসল রঙের মান লাগে।
 * এই হুক globals.css এর CSS variable পড়ে রঙ দেয়, তাই রঙ এক জায়গা (globals.css) থেকেই বদলায়।
 */
const defaults: Record<string, string> = {
  primary: "15 118 110",
  "primary-400": "20 184 166",
  "primary-300": "94 234 212",
  "primary-200": "127 235 220",
  info: "35 71 200",
  violet: "109 40 217",
  rose: "190 18 60",
  danger: "225 29 72",
  ink: "11 31 42",
  text: "59 79 75",
  "text-2": "75 95 91",
  muted: "94 114 110",
  surface: "255 255 255",
  track: "225 233 231",
  "track-2": "213 224 221",
  line: "217 227 224",
  "line-soft": "227 234 232",
  "rose-soft": "255 228 234",
  "ok-bg": "214 243 233",
};

const names = Object.keys(defaults);

const rgb = (ch: string) => `rgb(${ch.trim().split(/\s+/).join(", ")})`;
const rgba = (ch: string, a: number) => `rgba(${ch.trim().split(/\s+/).join(", ")}, ${a})`;

export type Theme = {
  c: Record<string, string>;
  a: (name: string, alpha: number) => string;
};

function build(raw: Record<string, string>): Theme {
  const c: Record<string, string> = {};
  names.forEach((n) => {
    c[n] = rgb(raw[n] || defaults[n]);
  });
  return {
    c,
    a: (name, alpha) => rgba(raw[name] || defaults[name], alpha),
  };
}

export function useTheme(): Theme {
  const [raw, setRaw] = useState<Record<string, string>>(defaults);

  useEffect(() => {
    const cs = getComputedStyle(document.documentElement);
    const next: Record<string, string> = {};
    names.forEach((n) => {
      const v = cs.getPropertyValue(`--${n}`);
      next[n] = v && v.trim() ? v : defaults[n];
    });
    setRaw(next);
  }, []);

  return useMemo(() => build(raw), [raw]);
}
