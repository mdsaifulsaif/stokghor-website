"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Pop, Reveal } from "@/components/ui/motion";
import { Check } from "@/components/ui/icons";
import { modules } from "@/lib/data";
import { bn } from "@/lib/bn";

export function Modules() {
  const [sel, setSel] = useState(0);
  const m = modules[sel];

  return (
    <section id="modules" className="section">
      <Reveal className="max-w-[700px]">
        <div className="eyebrow text-info">সব মডিউল</div>
        <h2 className="h2">১২টি মডিউল, একটাই সফটওয়্যার</h2>
        <p className="lede">একটা মডিউল বেছে নিন, ভেতরে কী কী আছে দেখুন।</p>
      </Reveal>

      <div className="scrollx mt-[34px] flex gap-2.5 overflow-x-auto px-0.5 pb-3.5 pt-1.5">
        {modules.map((mod, i) => (
          <button
            key={mod.title}
            type="button"
            aria-pressed={sel === i}
            onClick={() => setSel(i)}
            className={`chip ${sel === i ? "chip-on" : ""}`}
          >
            <span className="text-xs font-bold opacity-65">{bn(i + 1)}</span>
            {mod.title}
          </button>
        ))}
      </div>

      <div className="mt-3.5 min-h-[430px] rounded-xl border border-line bg-surface p-[clamp(20px,4vw,40px)] shadow-[0_30px_70px_-44px_rgb(var(--primary)/.5)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={sel}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex flex-wrap items-stretch gap-x-11 gap-y-[34px]"
          >
            <div className="min-w-0 flex-[1.4_1_360px]">
              <Pop className="text-md font-bold text-primary">মডিউল {bn(sel + 1)} / ১২</Pop>
              <Pop delay={0.05}>
                <h3 className="mt-1.5 text-[clamp(26px,3.4vw,38px)] font-bold leading-[1.35]">{m.title}</h3>
              </Pop>
              <div className="mt-[22px] flex flex-col gap-1.5">
                {m.items.map((t, j) => (
                  <Pop key={t} delay={0.12 + j * 0.08} className="flex items-start gap-3.5 rounded-md bg-surface-3 px-3.5 py-3">
                    <span className="mt-px flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-sm bg-ok-bg text-ok">
                      <Check size={14} />
                    </span>
                    <span className="text-body font-medium leading-normal">{t}</span>
                  </Pop>
                ))}
              </div>
            </div>

            <div className="flex min-w-0 flex-[1_1_260px]">
              <div className="relative flex min-h-[280px] w-full flex-col justify-end overflow-hidden rounded-lg bg-gradient-to-br from-primary via-primary-600 to-navy p-[26px] text-white">
                <motion.div
                  aria-hidden
                  className="absolute -right-[70px] -top-[70px] h-[240px] w-[240px] rounded-full border-2 border-dashed border-white/45"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                />
                <div aria-hidden className="absolute -right-5 -top-5 h-[140px] w-[140px] rounded-full border-2 border-white/30" />
                <div className="text-[clamp(84px,12vw,124px)] font-extrabold leading-[1.05] tracking-[-.03em] opacity-95">{bn(sel + 1)}</div>
                <div className="text-lg font-semibold opacity-90">এই মডিউলে {bn(m.items.length)}টি মূল সুবিধা</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
