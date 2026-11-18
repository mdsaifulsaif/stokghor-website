"use client";

import { motion } from "framer-motion";
import { useId, type ReactNode } from "react";

/* ---------- Sidebar ---------- */
export type NavGroup = { label: string; items: { t: string; on?: boolean }[] };

export function Sidebar({ groups, search = false }: { groups: NavGroup[]; search?: boolean }) {
  return (
    <div className="w-[210px] shrink-0 border-r border-line-faint bg-surface px-3 py-4">
      <div className="flex items-center gap-2.5 px-2 pb-3.5 text-sub font-extrabold">
        <span className="inline-block h-[26px] w-[26px] rounded-sm bg-primary" />
        ShopERP
      </div>
      {search && (
        <div className="mb-1.5 rounded-md border border-line-soft px-3 py-2 text-xs text-faint">খুঁজুন…</div>
      )}
      {groups.map((g) => (
        <div key={g.label}>
          <div className="mx-3 mb-1.5 mt-4 text-2xs font-bold tracking-[.04em] text-faint">{g.label}</div>
          {g.items.map((it) => (
            <div
              key={it.t}
              className={`mb-0.5 flex items-center gap-2.5 whitespace-nowrap rounded-sm px-3 py-2.5 text-sm font-medium transition-colors ${
                it.on ? "bg-ink text-white" : "text-text-2"
              }`}
            >
              <span className="h-3.5 w-3.5 shrink-0 rounded-xs border-[1.6px] border-current opacity-80" />
              {it.t}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ---------- Panel ---------- */
export function Pnl({
  title,
  link = true,
  className = "",
  children,
}: {
  title: ReactNode;
  link?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`pnl ${className}`}>
      <div className="pnh">
        {title}
        {link && <span className="text-2xs font-semibold text-primary underline">সব দেখুন</span>}
      </div>
      {children}
    </div>
  );
}

/* ---------- Animated line + area chart ---------- */
const tones = {
  teal: { stroke: "stroke-chart-teal", stop: "[stop-color:rgb(var(--primary-400))]" },
  blue: { stroke: "stroke-info-500", stop: "[stop-color:rgb(var(--info-500))]" },
  violet: { stroke: "stroke-violet-500", stop: "[stop-color:rgb(var(--violet-500))]" },
} as const;

export function LineArea({
  line,
  area,
  tone,
  height = 76,
  vbH = 80,
  delay = 0,
  className = "",
}: {
  line: string;
  area: string;
  tone: keyof typeof tones;
  height?: number;
  vbH?: number;
  delay?: number;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const t = tones[tone];
  return (
    <svg
      viewBox={`0 0 ${vbH === 80 ? 300 : vbH === 70 ? 200 : 300} ${vbH}`}
      preserveAspectRatio="none"
      width="100%"
      height={height}
      aria-hidden
      className={className}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className={t.stop} stopOpacity=".32" />
          <stop offset="1" className={t.stop} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={area}
        fill={`url(#${id})`}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1] }}
        transition={{ duration: 3.6, repeat: Infinity, times: [0, 0.15, 0.6, 1], delay }}
      />
      <motion.path
        d={line}
        fill="none"
        className={t.stroke}
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: [0, 1, 1] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", times: [0, 0.55, 1], delay }}
      />
    </svg>
  );
}

/* ---------- Progress row ---------- */
export function ProgRow({
  label,
  value,
  width,
  bar,
  track = "bg-track",
  delay = 0,
  thick = "h-1.5",
}: {
  label: ReactNode;
  value: ReactNode;
  width: string;
  bar: string;
  track?: string;
  delay?: number;
  thick?: string;
}) {
  return (
    <div>
      <div className="flex justify-between">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className={`${thick} overflow-hidden rounded-xs ${track}`}>
        <motion.div
          className={`h-full origin-left ${bar}`}
          style={{ width }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.3, delay, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

/* ---------- Donut ---------- */
export function Donut({ className = "" }: { className?: string }) {
  const seg = [
    { len: 56, off: 0, color: "stroke-primary", d: 0 },
    { len: 26, off: -56, color: "stroke-info-500", d: 0.3 },
    { len: 18, off: -82, color: "stroke-violet-500", d: 0.6 },
  ];
  return (
    <svg width="104" height="104" viewBox="0 0 90 90" role="img" aria-label="লিড সোর্স ডোনাট চার্ট" className={className}>
      {seg.map((s) => (
        <motion.circle
          key={s.color}
          cx="45"
          cy="45"
          r="32"
          fill="none"
          strokeWidth="12"
          pathLength={100}
          className={s.color}
          strokeDashoffset={s.off}
          transform="rotate(-90 45 45)"
          initial={{ strokeDasharray: "0 100" }}
          whileInView={{ strokeDasharray: `${s.len} ${100 - s.len}` }}
          viewport={{ once: true }}
          transition={{ duration: 2, delay: s.d, ease: "easeOut" }}
        />
      ))}
      <text x="45" y="49" textAnchor="middle" fontSize="16" fontWeight="800" className="fill-ink">
        ৬৭
      </text>
    </svg>
  );
}

/* ---------- Ring (EMI progress) ---------- */
export function Ring({ size = 104, trackClass = "stroke-ok-bg", strokeClass = "stroke-primary" }: { size?: number; trackClass?: string; strokeClass?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 90 90" role="img" aria-label="কিস্তি পরিশোধের অগ্রগতি">
      <circle cx="45" cy="45" r="36" fill="none" strokeWidth="10" className={trackClass} />
      <motion.circle
        cx="45"
        cy="45"
        r="36"
        fill="none"
        strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray="226"
        className={strokeClass}
        transform="rotate(-90 45 45)"
        initial={{ strokeDashoffset: 226 }}
        animate={{ strokeDashoffset: [226, 62, 62] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.6, 1] }}
      />
    </svg>
  );
}

/* ---------- Loop bar chart (6 bars) ---------- */
export function BarChart6({ className = "", heights, colors, radius = "rounded-t-[4px] rounded-b-[2px]" }: { className?: string; heights: string[]; colors: string[]; radius?: string }) {
  return (
    <div className={`flex items-end gap-3 ${className}`}>
      {heights.map((h, i) => (
        <motion.div
          key={i}
          className={`flex-1 ${radius} ${colors[i]}`}
          style={{ height: h, transformOrigin: "bottom" }}
          animate={{ scaleY: [0.25, 1, 0.25] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
        />
      ))}
    </div>
  );
}
