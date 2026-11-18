"use client";

import { motion } from "framer-motion";
import { marqueeA, marqueeB } from "@/lib/data";

function Row({ items, reverse = false, dot, textClass }: { items: string[]; reverse?: boolean; dot: string; textClass: string }) {
  const list = [...items, ...items];
  return (
    <motion.div
      className="flex w-max"
      animate={{ x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
      transition={{ duration: reverse ? 52 : 42, repeat: Infinity, ease: "linear" }}
    >
      {list.map((t, i) => (
        <span
          key={i}
          aria-hidden={i >= items.length}
          className={`mr-[34px] inline-flex items-center gap-3.5 whitespace-nowrap ${textClass}`}
        >
          <span className={`h-2 w-2 ${dot}`} />
          {t}
        </span>
      ))}
    </motion.div>
  );
}

export function Marquee() {
  return (
    <div className="relative mt-[70px] flex flex-col gap-3 overflow-hidden border-y border-line bg-surface py-3.5">
      <Row items={marqueeA} dot="rounded-xs bg-primary" textClass="text-sub font-bold text-text" />
      <Row items={marqueeB} reverse dot="rounded-full bg-info-500" textClass="text-lg font-semibold text-muted" />
    </div>
  );
}
