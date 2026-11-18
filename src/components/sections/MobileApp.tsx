"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { Bell, Check, Warn } from "@/components/ui/icons";
import { Float, Blob, GrowBar, LoopBar, Pop, Reveal } from "@/components/ui/motion";
import { LineArea } from "@/components/dash/DashParts";
import { useTheme } from "@/lib/theme";

type Id = "sales" | "report" | "stock";

const tabs: { id: Id; label: string }[] = [
  { id: "sales", label: "বিক্রয়" },
  { id: "report", label: "রিপোর্ট" },
  { id: "stock", label: "স্টক অ্যালার্ট" },
];

const points = [
  "দৈনিক রিপোর্ট ও নিট লাভ এক নজরে",
  "লো-স্টক হলেই অ্যালার্ট, আগেই অর্ডার করে ফেলুন",
  "রোল অনুযায়ী মেনু — স্টাফ শুধু অনুমতি পাওয়া অংশ দেখবে",
  "রিপোর্ট PDF সেভ ও শেয়ার",
];

function BeatBtn({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  const { a } = useTheme();
  return (
    <motion.div
      className={`mt-3.5 rounded-md p-3 text-center text-md font-bold text-white ${dark ? "bg-ink" : "bg-primary"}`}
      animate={dark ? undefined : { boxShadow: [`0 0 0 0 ${a("primary", 0.55)}`, `0 0 0 10px ${a("primary", 0)}`] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      {children}
    </motion.div>
  );
}

function SalesScreen() {
  const rows: [string, string, string, string][] = [
    ["স্মার্টফোন X", "৳ ২৮,৫০০", "ক্যাশ", "tag-ok"],
    ["ফাস্ট চার্জার", "৳ ১,২০০", "বিকাশ", "tag-info"],
    ["ইয়ারবাড", "৳ ২,৩০০", "ব্যাংক", "tag-warn"],
  ];
  return (
    <div>
      <div className="lbl">আজকের বিক্রয়</div>
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="text-num-lg font-extrabold leading-[1.3] tracking-[-.02em]">৳ ৪৮,২০০</span>
        <span className="tag tag-ok">১২টি অর্ডার</span>
      </div>
      <LineArea
        tone="teal"
        vbH={60}
        height={60}
        className="mt-1.5"
        line="M0 46 L40 40 L80 44 L120 22 L160 30 L210 12 L260 8"
        area="M0 46 L40 40 L80 44 L120 22 L160 30 L210 12 L260 8 L260 60 L0 60 Z"
      />
      <div className="mt-3 text-xs font-bold text-text">সাম্প্রতিক বিক্রয়</div>
      <div className="mt-2 flex flex-col gap-2">
        {rows.map(([n, p, t, tone], i) => (
          <Pop key={n} delay={0.1 + i * 0.15} className="phr">
            <span>{n}</span>
            <span className="flex items-center gap-2">
              {p}
              <span className={`tag ${tone}`}>{t}</span>
            </span>
          </Pop>
        ))}
      </div>
      <BeatBtn>নতুন বিক্রয়</BeatBtn>
    </div>
  );
}

function ReportScreen() {
  return (
    <div>
      <div className="lbl">এই মাসের নিট লাভ</div>
      <div className="text-num-lg font-extrabold leading-[1.3] tracking-[-.02em]">৳ ৩৮,২০০</div>
      <div className="mt-2.5 flex h-[110px] items-end gap-2 rounded-md border border-line-soft bg-surface p-3">
        {["50%", "72%", "44%", "90%", "62%", "100%"].map((h, i) => (
          <LoopBar
            key={i}
            delay={i * 0.25}
            style={{ height: h }}
            className={`flex-1 rounded-t-[3px] rounded-b-[1px] ${["bg-primary-300", "bg-primary-400", "bg-primary-300", "bg-primary", "bg-primary-400", "bg-primary"][i]}`}
          />
        ))}
      </div>
      <div className="mt-3.5 text-xs font-bold text-text">টপ প্রোডাক্ট</div>
      <div className="mt-2 flex flex-col gap-2.5 text-xs font-semibold">
        {[
          ["MacBook Air Max", "৪২", "90%", 0.2],
          ["iPhone 15 Pro", "৩৬", "76%", 0.4],
          ["AirPods Pro 2", "২৮", "60%", 0.6],
        ].map(([n, v, w, d]) => (
          <div key={n as string}>
            <div className="flex justify-between">
              <span>{n}</span>
              <span>{v}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-xs bg-track">
              <GrowBar width={w as string} delay={d as number} className="bg-primary" duration={1.3} />
            </div>
          </div>
        ))}
      </div>
      <BeatBtn dark>PDF সেভ করুন</BeatBtn>
    </div>
  );
}

function StockScreen() {
  const items: [string, string, string][] = [
    ["MacBook Air", "০৮", "30%"],
    ["Samsung Galaxy S24", "০৬", "22%"],
    ["Sony WH-1000XM5", "০৪", "14%"],
  ];
  return (
    <div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-extrabold">লো-স্টক আইটেম</span>
        <span className="tag tag-bad">৩টি</span>
      </div>
      <div className="mt-3 flex flex-col gap-2.5">
        {items.map(([n, s, w], i) => (
          <Pop key={n} delay={0.1 + i * 0.15} className="phr !flex-col !items-stretch !gap-2">
            <div className="flex justify-between">
              <span>{n}</span>
              <span className="tag tag-bad">স্টক {s}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-xs bg-bad-bg">
              <GrowBar width={w} delay={0.2 + i * 0.2} className="bg-danger" duration={1.2} />
            </div>
          </Pop>
        ))}
      </div>
      <div className="mt-3.5 rounded-md bg-warn-bg p-3 text-xs font-semibold leading-normal text-warn-fg">
        অ্যালার্ট কোয়ান্টিটির নিচে নামলেই আপনাকে জানানো হবে।
      </div>
      <BeatBtn>ক্রয় অর্ডার দিন</BeatBtn>
    </div>
  );
}

export function MobileApp() {
  const [id, setId] = useState<Id>("sales");
  const Screen = id === "sales" ? SalesScreen : id === "report" ? ReportScreen : StockScreen;
  const nav = (t: Id, label: string) => (
    <div className={`flex flex-1 flex-col items-center gap-1 py-2 text-2xs font-bold ${id === t ? "text-primary" : "text-faint"}`}>
      <i className={`block h-5 w-5 rounded-sm border-[1.8px] border-current ${id === t ? "bg-primary-soft" : ""}`} />
      {label}
    </div>
  );

  return (
    <section id="mobile" className="section">
      <div className="flex flex-wrap items-center gap-x-[60px] gap-y-14">
        <Reveal className="min-w-0 flex-[1_1_400px]">
          <div className="eyebrow text-primary">যেকোনো জায়গা থেকে</div>
          <h2 className="h2">দোকানে না থাকলেও, ব্যবসা আপনার হাতে</h2>
          <p className="lede">ফোনের স্ক্রিনেই দেখুন আজকের বিক্রয়, লাভ আর কোন প্রোডাক্ট শেষ হয়ে আসছে।</p>

          <div className="mt-7 flex flex-wrap gap-2.5">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={id === t.id}
                onClick={() => setId(t.id)}
                className={`tab ${id === t.id ? "tab-on" : ""}`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-[30px] flex flex-col gap-2.5">
            {points.map((p) => (
              <div key={p} className="pf">
                <span className="pck">
                  <Check size={13} />
                </span>
                {p}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="flex min-w-0 flex-[1_1_340px] justify-center">
          <div className="relative w-[300px] max-w-full py-2.5">
            <Blob className="inset-x-[-14%] inset-y-[6%] bg-[radial-gradient(circle,rgb(var(--primary-400)/.32),transparent_70%)]" />

            <Float amount={12} className="relative h-[600px] w-full rounded-phone bg-ink p-2.5 shadow-phone">
              <div className="absolute left-1/2 top-[18px] z-[4] h-5 w-[78px] -translate-x-1/2 rounded-xl bg-ink" />
              <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[30px] bg-surface-2">
                <div className="flex items-center justify-between border-b border-line-faint bg-surface px-4 pb-2.5 pt-11">
                  <div className="flex items-center gap-2 text-base font-extrabold">
                    <span className="inline-block h-[22px] w-[22px] rounded-sm bg-primary" />
                    ShopERP
                  </div>
                  <span className="relative inline-flex h-[30px] w-[30px] items-center justify-center rounded-full bg-line-faint">
                    <Bell size={14} className="text-text" />
                    <motion.span
                      className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-danger"
                      animate={{ scale: [1, 1.35, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </span>
                </div>

                <div className="min-h-0 flex-1 overflow-hidden p-3.5">
                  <AnimatePresence mode="wait">
                    <motion.div key={id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                      <Screen />
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="flex border-t border-line-faint bg-surface px-1.5 pb-1.5">
                  {nav("sales", "বিক্রয়")}
                  {nav("report", "রিপোর্ট")}
                  {nav("stock", "স্টক")}
                  <div className="flex flex-1 flex-col items-center gap-1 py-2 text-2xs font-bold text-faint">
                    <i className="block h-5 w-5 rounded-sm border-[1.8px] border-current" />
                    আরও
                  </div>
                </div>
              </div>
            </Float>

            <Float delay={-2} className="absolute -left-9 top-24 z-[6] hidden items-center gap-2.5 rounded-md border border-line bg-surface px-3.5 py-[9px] text-sm font-bold shadow-float sm:flex">
              <span className="flex h-[26px] w-[26px] items-center justify-center rounded-sm bg-ok-bg">
                <Check size={14} strokeWidth={3} className="text-ok" />
              </span>
              নতুন বিক্রয়
            </Float>
            <Float delay={-4} className="absolute -right-9 bottom-[120px] z-[6] hidden items-center gap-2.5 rounded-md border border-line bg-surface px-3.5 py-[9px] text-sm font-bold shadow-float sm:flex">
              <span className="flex h-[26px] w-[26px] items-center justify-center rounded-sm bg-bad-bg">
                <Warn size={14} className="text-bad-fg" />
              </span>
              লো-স্টক অ্যালার্ট
            </Float>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
