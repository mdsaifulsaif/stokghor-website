"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState, type ReactNode } from "react";
import { FitScale } from "@/components/ui/FitScale";
import { Pop, Reveal, GrowBar, ScanLine } from "@/components/ui/motion";
import { Box, BarsIcon, Calendar, Receipt, Shield } from "@/components/ui/icons";
import { BarChart6, LineArea, Pnl, ProgRow, Ring, Sidebar, type NavGroup } from "@/components/dash/DashParts";
import { useTheme } from "@/lib/theme";

type TabId = "pos" | "stock" | "rma" | "emi" | "report";

const tabs: { id: TabId; label: string; icon: ReactNode }[] = [
  { id: "pos", label: "POS বিক্রয়", icon: <Receipt /> },
  { id: "stock", label: "প্রোডাক্ট ও স্টক", icon: <Box /> },
  { id: "rma", label: "ওয়ারেন্টি ও RMA", icon: <Shield size={18} /> },
  { id: "emi", label: "EMI কিস্তি", icon: <Calendar /> },
  { id: "report", label: "রিপোর্ট", icon: <BarsIcon /> },
];

const navLabels = ["ড্যাশবোর্ড", "POS বিক্রয়", "প্রোডাক্ট ও স্টক", "ওয়ারেন্টি ও RMA", "EMI কিস্তি", "রিপোর্ট"];

function groupsFor(tab: TabId): NavGroup[] {
  const active = tabs.findIndex((t) => t.id === tab) + 1;
  return [
    { label: "মেইন", items: navLabels.map((t, i) => ({ t, on: i === active })) },
    { label: "ব্যবসা সেটিং", items: [{ t: "ক্যাটাগরি" }, { t: "শপ ম্যানেজ" }, { t: "ইনভয়েস ডিজাইন" }] },
  ];
}

function ViewHead({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <Pop className="flex flex-wrap items-center justify-between gap-3">
      <div className="text-h4 font-extrabold">{title}</div>
      {children}
    </Pop>
  );
}

const btnDark = "rounded-sm bg-ink px-3.5 py-2 text-xs font-bold text-white";
const btnLine = "rounded-sm border border-line bg-surface px-3.5 py-2 text-xs font-bold";

/* ---------------- POS ---------------- */
function PosView() {
  const { a } = useTheme();
  const products = [
    ["স্মার্টফোন X", "৳ ২৮,৫০০", "bg-primary-soft"],
    ["ফাস্ট চার্জার", "৳ ১,২০০", "bg-info-soft"],
    ["ইয়ারবাড", "৳ ২,৩০০", "bg-violet-soft"],
    ["পাওয়ার ব্যাংক", "৳ ১,৮০০", "bg-rose-soft"],
    ["স্মার্ট ওয়াচ", "৳ ৫,৫০০", "bg-primary-soft"],
    ["ফোন কভার", "৳ ৩৫০", "bg-info-soft"],
  ];
  return (
    <>
      <ViewHead title="POS কাউন্টার">
        <div className="relative max-w-[420px] flex-1 basis-[260px] overflow-hidden rounded-md border border-line bg-surface px-3.5 py-2.5 text-sm text-muted">
          বারকোড স্ক্যান বা প্রোডাক্ট খুঁজুন…
          <motion.div
            className="absolute inset-y-0 w-0.5 bg-danger shadow-[0_0_10px_rgb(var(--danger))]"
            initial={{ left: "10%" }}
            animate={{ left: ["10%", "92%"] }}
            transition={{ duration: 2.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        </div>
      </ViewHead>
      <div className="mt-3.5 grid grid-cols-[2fr_1fr] items-start gap-3.5">
        <div className="grid grid-cols-3 gap-2.5">
          {products.map(([n, p, bg], i) => (
            <Pop key={n} delay={0.05 + i * 0.05}>
              <motion.div
                className="pnl p-3.5"
                animate={i === 1 ? { borderColor: ["rgb(var(--line-soft))", "rgb(var(--primary))", "rgb(var(--line-soft))"], backgroundColor: ["#ffffff", a("primary", 0.1), "#ffffff"] } : undefined}
                transition={i === 1 ? { duration: 4, repeat: Infinity, delay: 1 } : undefined}
              >
                <div className={`mb-2.5 h-14 rounded-sm ${bg}`} />
                <div className="text-sm font-bold">{n}</div>
                <div className="lbl">{p}</div>
              </motion.div>
            </Pop>
          ))}
        </div>
        <div className="pnl">
          <div className="pnh">কার্ট</div>
          {[
            ["স্মার্টফোন X × ১", "৳ ২৮,৫০০", 0.4],
            ["ফাস্ট চার্জার × ১", "৳ ১,২০০", 0.7],
            ["ইয়ারবাড × ১", "৳ ২,৩০০", 1],
          ].map(([l, p, d]) => (
            <Pop key={l as string} delay={d as number} className="trow grid-cols-[1fr_auto]">
              <span>{l}</span>
              <span>{p}</span>
            </Pop>
          ))}
          <div className="flex flex-col gap-3 p-3.5">
            <div className="flex justify-between text-sub font-extrabold">
              <span>মোট</span>
              <span>৳ ৩২,০০০</span>
            </div>
            <div className="flex gap-1.5 text-xs font-bold">
              <span className="tag tag-ok">ক্যাশ</span>
              <span className="tag tag-info">বিকাশ</span>
              <span className="tag tag-warn">ব্যাংক</span>
            </div>
            <motion.div
              className="rounded-md bg-primary p-3 text-center font-bold text-white"
              animate={{ boxShadow: [`0 0 0 0 ${a("primary", 0.55)}`, `0 0 0 10px ${a("primary", 0)}`] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              পেমেন্ট নিন
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ---------------- Stock ---------------- */
function StockView() {
  const rows = [
    ["স্মার্টফোন X", "মোবাইল", "84%", "৪২", false],
    ["ল্যাপটপ Pro", "ল্যাপটপ", "36%", "১৮", false],
    ["ইয়ারবাড", "এক্সেসরিজ", "12%", "৬", true],
    ["পাওয়ার ব্যাংক", "এক্সেসরিজ", "62%", "৩১", false],
    ["ফাস্ট চার্জার", "এক্সেসরিজ", "8%", "৪", true],
  ] as const;
  return (
    <>
      <ViewHead title="প্রোডাক্ট ও স্টক">
        <div className="flex gap-2">
          <span className={btnLine}>Excel আপলোড</span>
          <span className={btnDark}>বারকোড স্টিকার প্রিন্ট</span>
        </div>
      </ViewHead>
      <Pop delay={0.1} className="pnl mt-3.5">
        <div className="th grid-cols-[2fr_1.2fr_2fr_1fr]">
          <span>প্রোডাক্ট</span>
          <span>ক্যাটাগরি</span>
          <span>স্টক</span>
          <span>স্ট্যাটাস</span>
        </div>
        {rows.map(([n, c, w, q, low], i) => (
          <div key={n} className="trow grid-cols-[2fr_1.2fr_2fr_1fr]">
            <span>{n}</span>
            <span className="lbl">{c}</span>
            <span className="flex items-center gap-2">
              <span className="h-[7px] flex-1 overflow-hidden rounded-xs bg-track">
                <GrowBar width={w} className={low ? "bg-danger" : "bg-primary"} duration={1.2} delay={0.2 + i * 0.15} />
              </span>
              {q}
            </span>
            <span className={`tag ${low ? "tag-bad" : "tag-ok"}`}>{low ? "লো-স্টক" : "ঠিক আছে"}</span>
          </div>
        ))}
      </Pop>
    </>
  );
}

/* ---------------- RMA ---------------- */
function RmaCard({ imei, name, tag, tone, delay, hl = false }: { imei: string; name: string; tag: string; tone: string; delay: number; hl?: boolean }) {
  const { a } = useTheme();
  return (
    <motion.div
      className="rounded-sm border border-line-soft p-2.5 text-xs"
      initial={{ opacity: 0, y: 14, scale: 0.96 }}
      animate={
        hl
          ? { opacity: 1, y: 0, scale: 1, borderColor: ["rgb(var(--line-soft))", "rgb(var(--primary))", "rgb(var(--line-soft))"], backgroundColor: ["#ffffff", a("primary", 0.1), "#ffffff"] }
          : { opacity: 1, y: 0, scale: 1 }
      }
      transition={hl ? { duration: 4, repeat: Infinity, delay: 1.5 } : { duration: 0.5, delay }}
    >
      <b>IMEI ...{imei}</b>
      <div className="lbl">{name}</div>
      <span className={`tag mt-1.5 ${tone}`}>{tag}</span>
    </motion.div>
  );
}

function RmaView() {
  const cols: { head: string; n: string; cards: React.ComponentProps<typeof RmaCard>[] }[] = [
    { head: "১ · রিসিট", n: "২", cards: [
      { imei: "4821", name: "স্মার্টফোন X", tag: "ওয়ারেন্টি ২১০ দিন", tone: "tag-ok", delay: 0.1 },
      { imei: "9307", name: "ইয়ারবাড", tag: "ওয়ারেন্টি ১৪ দিন", tone: "tag-warn", delay: 0.25 },
    ] },
    { head: "২ · সাপ্লায়ারে", n: "১", cards: [{ imei: "1156", name: "ল্যাপটপ Pro", tag: "পাঠানো হয়েছে", tone: "tag-info", delay: 0.4, hl: true }] },
    { head: "৩ · ফেরত", n: "১", cards: [{ imei: "7740", name: "স্মার্ট ওয়াচ", tag: "নতুন সিরিয়াল সেট", tone: "tag-ok", delay: 0.55 }] },
    { head: "৪ · ডেলিভারি", n: "৩", cards: [
      { imei: "2203", name: "স্মার্টফোন X", tag: "ডেলিভারি সম্পন্ন", tone: "tag-ok", delay: 0.7 },
      { imei: "6618", name: "পাওয়ার ব্যাংক", tag: "ডেলিভারি সম্পন্ন", tone: "tag-ok", delay: 0.85 },
    ] },
  ];
  return (
    <>
      <ViewHead title="ওয়ারেন্টি ও RMA">
        <span className={btnLine}>IMEI খুঁজুন</span>
      </ViewHead>
      <div className="mt-3.5 grid grid-cols-4 gap-3">
        {cols.map((c) => (
          <div key={c.head} className="pnl">
            <div className="pnh bg-surface-3">
              {c.head}
              <span className="tag tag-info">{c.n}</span>
            </div>
            <div className="flex flex-col gap-2 p-2.5">
              {c.cards.map((card) => (
                <RmaCard key={card.imei} {...card} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ---------------- EMI ---------------- */
function EmiView() {
  const { a } = useTheme();
  const rows: [string, string, string, string][] = [
    ["অগ্রিম", "৳ ৮,০০০", "জমা", "tag-ok"],
    ["১ম কিস্তি", "৳ ৪,৫০০", "জমা", "tag-ok"],
    ["২য় কিস্তি", "৳ ৪,৫০০", "জমা", "tag-ok"],
    ["৩য় কিস্তি", "৳ ৪,৫০০", "বাকি", "tag-warn"],
    ["৪র্থ কিস্তি", "৳ ৪,৫০০", "আসছে", "tag-info"],
  ];
  return (
    <>
      <ViewHead title="EMI / কিস্তি">
        <span className={btnDark}>নতুন কিস্তি তৈরি</span>
      </ViewHead>
      <div className="mt-3.5 grid grid-cols-[2fr_1fr] items-start gap-3.5">
        <Pop delay={0.1} className="pnl">
          <div className="th grid-cols-[1.4fr_1fr_1fr]">
            <span>কিস্তি</span>
            <span>পরিমাণ</span>
            <span>স্ট্যাটাস</span>
          </div>
          {rows.map(([n, p, s, t]) => (
            <div key={n} className="trow grid-cols-[1.4fr_1fr_1fr]">
              <span>{n}</span>
              <span>{p}</span>
              <span className={`tag w-fit ${t}`}>{s}</span>
            </div>
          ))}
        </Pop>
        <Pop delay={0.3} className="pnl flex flex-col items-center gap-3 p-[18px]">
          <Ring size={120} trackClass="stroke-ok-bg" />
          <div className="text-center text-sm font-bold">অগ্রিম ও ২টি কিস্তি পরিশোধিত</div>
          <motion.div
            className="w-full rounded-md bg-primary p-2.5 text-center text-sm font-bold text-white"
            animate={{ boxShadow: [`0 0 0 0 ${a("primary", 0.55)}`, `0 0 0 10px ${a("primary", 0)}`] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            অটো মানি রিসিপ্ট
          </motion.div>
        </Pop>
      </div>
    </>
  );
}

/* ---------------- Report ---------------- */
function ReportView() {
  return (
    <>
      <ViewHead title="রিপোর্ট ও বিশ্লেষণ">
        <div className="flex gap-2">
          <span className={btnLine}>PDF সেভ</span>
          <span className={btnDark}>প্রিন্ট</span>
        </div>
      </ViewHead>
      <div className="mt-3.5 grid grid-cols-[2fr_1fr] items-start gap-3.5">
        <Pop delay={0.1}>
          <Pnl title="বিক্রয় ও নিট লাভ">
            <div className="pnb">
              <div className="lbl">নিট লাভ</div>
              <div className="text-h3 font-extrabold leading-[1.3]">৳৩৮,২০০</div>
              <LineArea tone="teal" height={150} vbH={120} line="M0 100 L40 92 L80 70 L120 84 L160 40 L200 56 L250 28 L300 18" area="M0 100 L40 92 L80 70 L120 84 L160 40 L200 56 L250 28 L300 18 L300 120 L0 120 Z" />
            </div>
          </Pnl>
        </Pop>
        <Pop delay={0.3}>
          <Pnl title="টপ প্রোডাক্ট" link={false}>
            <div className="pnb flex flex-col gap-3 text-xs font-semibold">
              <ProgRow label="MacBook Air Max" value="৪২" width="90%" bar="bg-primary" thick="h-[7px]" delay={0.3} />
              <ProgRow label="iPhone 15 Pro" value="৩৬" width="76%" bar="bg-info-500" thick="h-[7px]" delay={0.5} />
              <ProgRow label="AirPods Pro 2" value="২৮" width="60%" bar="bg-violet-500" thick="h-[7px]" delay={0.7} />
              <div className="mt-1 flex items-center justify-between">
                <span className="lbl">স্টক ভ্যালু</span>
                <span className="text-lg font-extrabold">৳৮,৪২,০০০</span>
              </div>
            </div>
          </Pnl>
        </Pop>
      </div>
    </>
  );
}

const views: Record<TabId, () => JSX.Element> = {
  pos: PosView,
  stock: StockView,
  rma: RmaView,
  emi: EmiView,
  report: ReportView,
};

export function Tour() {
  const [tab, setTab] = useState<TabId>("pos");
  const View = views[tab];
  return (
    <section id="tour" className="relative mx-auto max-w-hero px-5 pb-8 pt-[90px] text-center">
      <Reveal>
        <div className="eyebrow text-primary">প্রোডাক্ট ট্যুর</div>
        <h2 className="h2 mx-auto max-w-[760px]">প্রতিটি কাজের জন্য আলাদা স্ক্রিন, একই সফটওয়্যারে</h2>
        <p className="lede mx-auto max-w-[600px]">ট্যাব বদলে দেখুন কোন মডিউল কেমন দেখতে।</p>
      </Reveal>

      <div className="scrollx mt-[34px] overflow-x-auto px-0.5 pb-3.5 pt-1.5">
        <div className="mx-auto flex w-max gap-2.5">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`tab ${tab === t.id ? "tab-on" : ""}`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <Reveal className="relative mt-[18px] text-left">
        <FitScale width={1080}>
          <div className="absolute inset-x-[3%] -top-[22px] h-[50px] rounded-t-xl border border-line bg-surface opacity-55" />
          <div className="absolute inset-x-[1.5%] -top-[11px] h-[50px] rounded-t-xl border border-line bg-surface opacity-80" />
          <div className="win min-h-[520px]">
            <div className="wbar">
              <span className="dot bg-[#F87171]" />
              <span className="dot bg-[#FBBF24]" />
              <span className="dot bg-[#4ADE80]" />
            </div>
            <div className="flex min-h-[480px] items-stretch">
              <Sidebar groups={groupsFor(tab)} />
              <div className="min-w-0 flex-1 bg-surface-2 p-[18px]">
                <AnimatePresence mode="wait">
                  <motion.div key={tab} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15 }}>
                    <View />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </FitScale>
      </Reveal>
    </section>
  );
}
