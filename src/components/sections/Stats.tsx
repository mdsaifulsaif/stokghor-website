"use client";

import { motion } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";
import { CountUp, Lit, Reveal } from "@/components/ui/motion";
import { Doc, Grid4, Shield, Wallet } from "@/components/ui/icons";

type Card = {
  /** CSS color for this card, comes from the global tokens */
  color: string;
  iconBg: string;
  icon: ReactNode;
  tag: string;
  to: number;
  unit?: string;
  label: string;
  visual: ReactNode;
};

const times6 = [0, 0.06, 0.18, 0.86, 1];

function DotsVisual() {
  return (
    <div className="mt-auto grid grid-cols-6 gap-[5px]">
      {Array.from({ length: 12 }).map((_, i) => (
        <Lit key={i} colorText={false} duration={4.5} delay={i * 0.2} times={[0, 0.08, 0.2, 0.78, 1]} className="aspect-square rounded-xs" />
      ))}
    </div>
  );
}

function InvoiceVisual() {
  return (
    <div className="mt-auto flex flex-wrap gap-1.5">
      {["বাংলা", "A5", "80mm", "58mm"].map((t, i) => (
        <Lit key={t} duration={6} delay={i} times={times6} className="rounded-xs px-3 py-[5px] text-xs font-bold">
          {t}
        </Lit>
      ))}
    </div>
  );
}

function PayVisual() {
  return (
    <div className="relative mt-auto h-[42px]">
      <div className="absolute inset-x-[5px] top-2.5 h-0.5 bg-track" />
      <div className="absolute inset-x-0 top-0 flex h-[22px] items-center justify-between">
        {[0, 1, 2, 3].map((i) => (
          <Lit key={i} colorText={false} to="violet" duration={6} delay={i} times={times6} className="h-3 w-3 rounded-full ring-2 ring-surface" />
        ))}
      </div>
      <motion.div
        className="absolute top-[5px] h-3 w-3 rounded-[3px] bg-violet"
        initial={{ left: "0%", x: "0%" }}
        animate={{ left: ["0%", "100%"], x: ["0%", "-100%"] }}
        transition={{ duration: 3.2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      />
      <div className="absolute inset-x-0 top-[26px] flex justify-between text-2xs font-semibold text-muted">
        <span>ক্যাশ</span>
        <span>ব্যাংক</span>
        <span>বিকাশ</span>
        <span>নগদ</span>
      </div>
    </div>
  );
}

function RmaVisual() {
  return (
    <div className="mt-auto">
      <div className="grid grid-cols-4 gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-2 overflow-hidden rounded-[2px] bg-rose-soft">
            <motion.div
              className="h-full origin-left bg-rose"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: [0, 0, 1, 1, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: i * 0.6, times: [0, 0.06, 0.3, 0.85, 1] }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex justify-between text-2xs font-semibold text-muted">
        <span>রিসিট</span>
        <span>সাপ্লায়ার</span>
        <span>ফেরত</span>
        <span>ডেলিভারি</span>
      </div>
    </div>
  );
}

const cards: Card[] = [
  {
    color: "rgb(var(--primary))",
    iconBg: "bg-primary-soft text-primary",
    icon: <Grid4 />,
    tag: "মডিউল",
    to: 12,
    label: "পূর্ণাঙ্গ মডিউল, একটাই লগইনে",
    visual: <DotsVisual />,
  },
  {
    color: "rgb(var(--info))",
    iconBg: "bg-info-soft text-info",
    icon: <Doc />,
    tag: "ইনভয়েস",
    to: 16,
    unit: "+",
    label: "ইনভয়েস ডিজাইন — A5, 80mm, 58mm",
    visual: <InvoiceVisual />,
  },
  {
    color: "rgb(var(--violet))",
    iconBg: "bg-violet-soft text-violet",
    icon: <Wallet />,
    tag: "পেমেন্ট",
    to: 4,
    unit: "টি",
    label: "পেমেন্ট অ্যাকাউন্ট — ক্যাশ, ব্যাংক, বিকাশ ও নগদ",
    visual: <PayVisual />,
  },
  {
    color: "rgb(var(--rose))",
    iconBg: "bg-rose-soft text-rose",
    icon: <Shield />,
    tag: "RMA",
    to: 4,
    unit: "ধাপ",
    label: "RMA ওয়ার্কফ্লো, শুরু থেকে ডেলিভারি",
    visual: <RmaVisual />,
  },
];

export function Stats() {
  return (
    <section id="stats" className="relative mx-auto max-w-page px-5 pb-2.5 pt-[70px]">
      <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => (
          <Reveal key={c.tag} delay={i * 0.08} className="h-full">
            <motion.div
              whileHover={{ y: -6 }}
              style={{ "--c": c.color } as CSSProperties}
              className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-xl border border-line bg-surface p-[22px] shadow-card transition-[border-color,box-shadow] hover:border-[var(--c)] hover:shadow-[0_28px_50px_-26px_var(--c)]"
            >
              <motion.div
                aria-hidden
                className="absolute inset-x-0 top-0 h-[3px]"
                style={{
                  backgroundImage: "linear-gradient(90deg, var(--c), transparent, var(--c))",
                  backgroundSize: "200% 100%",
                }}
                animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -right-[60px] -top-[60px] h-[170px] w-[170px] rounded-full opacity-[.12] transition duration-500 group-hover:scale-[1.3] group-hover:opacity-[.26]"
                style={{ background: "radial-gradient(circle, var(--c), transparent 70%)" }}
              />
              <div className="relative flex items-start justify-between">
                <span className={`inline-flex h-[42px] w-[42px] items-center justify-center rounded-md ${c.iconBg}`}>{c.icon}</span>
                <span className="tag tag-mute">{c.tag}</span>
              </div>
              <div className="relative">
                <div className="text-stat font-extrabold leading-[1.1] tracking-[-.03em]" style={{ color: "var(--c)" }}>
                  <CountUp to={c.to} />
                  {c.unit && <span className="ml-1 text-[.45em] font-bold tracking-normal">{c.unit}</span>}
                </div>
                <div className="mt-0.5 font-semibold text-text">{c.label}</div>
              </div>
              <div className="relative mt-auto flex flex-col">{c.visual}</div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
