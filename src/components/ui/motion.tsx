"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { bn } from "@/lib/bn";
import { useTheme } from "@/lib/theme";

const EASE = [0.2, 0.7, 0.2, 1] as const;

/** স্ক্রলে নিচ থেকে ভেসে ওঠা */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 30,
  id,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  id?: string;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** পেজ লোডে ভেসে ওঠা (হিরো) */
export function Rise({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "h1" | "p";
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/** ছোট pop-in (ট্যাব বদলানো, তালিকার আইটেম) */
export function Pop({
  children,
  className,
  delay = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** সবসময় ভাসতে থাকা চিপ/কার্ড */
export function Float({
  children,
  className,
  delay = 0,
  amount = 12,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -amount, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}

/** ব্যাকগ্রাউন্ডের নরম গ্লো ব্লব */
export function Blob({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute rounded-full ${className ?? ""}`}
      animate={{ x: [0, 50, 0], y: [0, -34, 0], scale: [1, 1.18, 1] }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: -delay }}
    />
  );
}

/** পালস করা ছোট ডট */
export function PingDot() {
  return (
    <span className="relative inline-block h-2.5 w-2.5">
      <span className="absolute inset-0 rounded-full bg-primary" />
      <motion.span
        className="absolute inset-0 rounded-full bg-primary"
        animate={{ scale: [0.8, 2.6], opacity: [0.9, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
      />
    </span>
  );
}

/** স্ক্রলে ইন-ভিউ হলে ০ থেকে গুনে ওঠা সংখ্যা (বাংলা ডিজিট) */
export function CountUp({
  to,
  duration = 1.8,
  className,
}: {
  to: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [v, setV] = useState(to);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (x) => setV(Math.round(x)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref} className={className}>
      {bn(v)}
    </span>
  );
}

type LitProps = {
  children?: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  from?: string;
  to?: string;
  textFrom?: string;
  textTo?: string;
  times?: number[];
  colorText?: boolean;
};

/** একটা সময়ে "জ্বলে ওঠা" রঙ-সাইকেল (ধাপ/ট্যাগ হাইলাইট) */
export function Lit({
  children,
  className,
  duration = 8,
  delay = 0,
  from = "track",
  to = "primary",
  textFrom = "text-2",
  textTo = "surface",
  times = [0, 0.06, 0.18, 0.86, 1],
  colorText = true,
}: LitProps) {
  const { c } = useTheme();
  const bg = [c[from], c[from], c[to], c[to], c[from]];
  const fg = [c[textFrom], c[textFrom], c[textTo], c[textTo], c[textFrom]];
  return (
    <motion.div
      className={className}
      initial={{ backgroundColor: c[from], ...(colorText ? { color: c[textFrom] } : {}) }}
      animate={{ backgroundColor: bg, ...(colorText ? { color: fg } : {}) }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut", times }}
    >
      {children}
    </motion.div>
  );
}

/** পপ-আপ হয়ে মিলিয়ে যাওয়া (চ্যাট বাবল, ব্যাজ) */
export function PopLoop({
  children,
  className,
  duration = 7,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 14, scale: 0.92 }}
      animate={{
        opacity: [0, 1, 1, 0, 0],
        y: [14, 0, 0, -8, -8],
        scale: [0.92, 1, 1, 1, 1],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut", times: [0, 0.08, 0.7, 0.85, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** স্ক্যান লাইন (উপর-নিচ) */
export function ScanLine({ className = "" }: { className?: string }) {
  return (
    <motion.div
      aria-hidden
      className={`absolute h-0.5 bg-danger shadow-[0_0_14px_rgb(var(--danger))] ${className}`}
      initial={{ top: "6%" }}
      animate={{ top: ["6%", "88%"] }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
    />
  );
}

/** ধীরে ঘোরা লাইনের বার (লুপ), নিচ থেকে বড় হয় */
export function LoopBar({
  className,
  delay = 0,
  style,
}: {
  className?: string;
  delay?: number;
  style?: CSSProperties;
}) {
  return (
    <motion.div
      className={className}
      style={{ transformOrigin: "bottom", ...style }}
      animate={{ scaleY: [0.25, 1, 0.25] }}
      transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

/** একবার ডান দিকে ভরে ওঠা প্রোগ্রেস বার */
export function GrowBar({
  width,
  className,
  delay = 0,
  duration = 1.3,
}: {
  width: string;
  className: string;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.div
      className={`h-full origin-left ${className}`}
      style={{ width }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration, delay, ease: "easeOut" }}
    />
  );
}

/** শাইন সোয়াইপ (বাটনের ওপর) */
export function Shine() {
  return (
    <motion.span
      aria-hidden
      className="pointer-events-none absolute inset-y-0 w-2/5 bg-gradient-to-r from-transparent via-white/40 to-transparent"
      initial={{ left: "-60%" }}
      animate={{ left: ["-60%", "140%", "140%"] }}
      transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", times: [0, 0.55, 1] }}
    />
  );
}
