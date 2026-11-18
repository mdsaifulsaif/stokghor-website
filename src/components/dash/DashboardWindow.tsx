"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/ui/motion";
import { Bell } from "@/components/ui/icons";
import { useTheme } from "@/lib/theme";
import { Donut, LineArea, Pnl, ProgRow, Sidebar, type NavGroup } from "./DashParts";

const groups: NavGroup[] = [
  {
    label: "মেইন",
    items: [{ t: "ড্যাশবোর্ড", on: true }, { t: "POS বিক্রয়" }, { t: "প্রোডাক্ট" }, { t: "রিপোর্ট" }],
  },
  {
    label: "ব্যবসা সেটিং",
    items: [{ t: "ক্যাটাগরি" }, { t: "শপ ম্যানেজ" }, { t: "ইনভয়েস ডিজাইন" }],
  },
  { label: "রোল ও পারমিশন", items: [{ t: "ইউজার" }] },
];

function Kpi({ icon, label, children, sub }: { icon: string; label: string; children: React.ReactNode; sub: string }) {
  return (
    <div className="rounded-md border border-line-soft p-3.5">
      <div className="flex items-center gap-2 text-xs font-semibold text-text">
        <span className="flex h-[22px] w-[22px] items-center justify-center rounded-full border-[1.5px] border-muted/60 text-2xs font-bold text-text-2">
          {icon}
        </span>
        {label}
      </div>
      <div className="mb-0.5 mt-2.5 text-h3 font-extrabold leading-[1.3] tracking-[-.01em]">{children}</div>
      <div className="text-xs font-semibold text-ok-fg">{sub}</div>
    </div>
  );
}

/** হিরোর ড্যাশবোর্ড ওভারভিউ উইন্ডো (ডেস্কটপ লেআউট, FitScale দিয়ে ছোট হয়) */
export function DashboardWindow() {
  const { a } = useTheme();
  return (
    <div className="win">
      {/* sweep shine */}
      <div className="pointer-events-none absolute inset-0 z-[5] overflow-hidden">
        <motion.div
          className="absolute inset-y-0 w-[18%] bg-gradient-to-r from-transparent via-white/65 to-transparent"
          initial={{ x: "-120%", skewX: -20 }}
          animate={{ x: ["-120%", "320%", "320%"] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", times: [0, 0.6, 1] }}
        />
      </div>

      <div className="wbar">
        <span className="dot bg-[#F87171]" />
        <span className="dot bg-[#FBBF24]" />
        <span className="dot bg-[#4ADE80]" />
      </div>

      <div className="flex items-stretch">
        <Sidebar groups={groups} search />

        <div className="min-w-0 flex-1 bg-surface-2 p-[18px]">
          <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2.5">
            <div className="text-h4 font-extrabold">ড্যাশবোর্ড</div>
            <div className="flex items-center gap-3 text-sm font-semibold">
              আপনার শপ
              <span className="rounded-sm border border-line bg-surface px-3 py-1.5">শপ দেখুন</span>
              <motion.span
                className="relative inline-flex h-[34px] w-[34px] items-center justify-center rounded-full bg-track"
                animate={{ rotate: [0, 0, -14, 12, 0, 0] }}
                transition={{ duration: 5, repeat: Infinity, times: [0, 0.9, 0.93, 0.96, 0.98, 1] }}
              >
                <Bell size={16} className="text-text" />
                <motion.span
                  className="absolute -right-1 -top-1 inline-flex h-[17px] w-[17px] items-center justify-center rounded-full bg-danger text-2xs font-bold text-white"
                  animate={{ boxShadow: [`0 0 0 0 ${a("danger", 0.5)}`, `0 0 0 8px ${a("danger", 0)}`] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                >
                  ৫
                </motion.span>
              </motion.span>
            </div>
          </div>

          <div className="pnl">
            <div className="flex flex-wrap items-center justify-between gap-2.5 px-3.5 pb-1 pt-3.5">
              <div>
                <div className="text-lg font-extrabold">ওভারভিউ</div>
                <div className="lbl">বিক্রয়, অর্ডার, কাস্টমার ও পুরো দোকানের পারফরম্যান্স</div>
              </div>
              <div className="flex gap-2 text-xs font-semibold">
                <span className="rounded-sm border border-line px-3 py-1.5">১ - ৩০ নভেম্বর, ২০২৬</span>
                <span className="rounded-sm bg-ink px-3.5 py-1.5 text-white">এক্সপোর্ট</span>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3 px-3.5 pb-3.5 pt-2.5">
              <Kpi icon="৳" label="মোট বিক্রয়" sub="নির্বাচিত সময়">৳১,২৫,৪০০</Kpi>
              <Kpi icon="#" label="মোট অর্ডার" sub="১২টি পেন্ডিং"><CountUp to={248} /></Kpi>
              <Kpi icon="+" label="নতুন কাস্টমার" sub="নিবন্ধিত কাস্টমার"><CountUp to={86} /></Kpi>
              <Kpi icon="%" label="কনভার্সন রেট" sub="প্রতি কাস্টমারে অর্ডার">৪.২%</Kpi>
            </div>
          </div>

          <div className="mt-3.5 grid grid-cols-3 gap-3.5">
            <Pnl title="কাস্টমার গ্রোথ">
              <div className="pnb">
                <div className="lbl">নতুন কাস্টমার</div>
                <div className="text-sub font-extrabold">৮৬</div>
                <LineArea tone="teal" line="M0 62 L40 58 L80 20 L120 50 L160 56 L200 40 L240 34 L300 22" area="M0 62 L40 58 L80 20 L120 50 L160 56 L200 40 L240 34 L300 22 L300 80 L0 80 Z" />
              </div>
            </Pnl>
            <Pnl title="রেভিনিউ গ্রোথ">
              <div className="pnb">
                <div className="lbl">মোট বিক্রয়</div>
                <div className="text-sub font-extrabold">৳১,২৫,৪০০</div>
                <LineArea tone="blue" delay={0.3} line="M0 60 L40 52 L80 18 L130 50 L180 54 L230 46 L300 36" area="M0 60 L40 52 L80 18 L130 50 L180 54 L230 46 L300 36 L300 80 L0 80 Z" />
              </div>
            </Pnl>
            <Pnl title="সেলস গ্রোথ">
              <div className="pnb">
                <div className="lbl">মোট অর্ডার</div>
                <div className="text-sub font-extrabold">২৪৮</div>
                <LineArea tone="violet" delay={0.6} line="M0 64 L50 52 L90 48 L130 14 L170 44 L220 52 L260 40 L300 34" area="M0 64 L50 52 L90 48 L130 14 L170 44 L220 52 L260 40 L300 34 L300 80 L0 80 Z" />
              </div>
            </Pnl>
          </div>

          <div className="mt-3.5 grid grid-cols-2 gap-3.5">
            <Pnl title="লিড সোর্স">
              <div className="pnb flex items-center gap-[18px]">
                <Donut className="shrink-0" />
                <div className="flex flex-1 flex-col gap-2.5 text-xs font-semibold">
                  <ProgRow label="ডাইরেক্ট" value="৪২" width="84%" bar="bg-primary" track="bg-line-faint" />
                  <ProgRow label="সোশ্যাল" value="১২" width="30%" bar="bg-info-500" track="bg-line-faint" delay={0.2} />
                  <ProgRow label="বিজ্ঞাপন" value="৮" width="20%" bar="bg-violet-500" track="bg-line-faint" delay={0.4} />
                </div>
              </div>
            </Pnl>
            <Pnl title="লো স্টক আইটেম">
              {[
                ["MacBook Air", "০৮"],
                ["Samsung Galaxy S24", "০৬"],
                ["Sony WH-1000XM5", "০৪"],
              ].map(([n, s]) => (
                <div key={n} className="trow grid-cols-[1fr_auto]">
                  <span>{n}</span>
                  <span className="tag tag-bad">স্টক {s}</span>
                </div>
              ))}
            </Pnl>
          </div>
        </div>
      </div>
    </div>
  );
}
