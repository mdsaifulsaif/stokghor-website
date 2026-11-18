"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Btn } from "@/components/ui/Btn";
import { Blob, Reveal } from "@/components/ui/motion";
import { bn, money } from "@/lib/bn";

function Slider({
  id, label, valueText, valueClass, min, max, step, value, onChange, minText, maxText,
}: {
  id: string; label: string; valueText: string; valueClass: string;
  min: number; max: number; step: number; value: number; onChange: (v: number) => void;
  minText: string; maxText: string;
}) {
  return (
    <div>
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <label htmlFor={id} className="font-semibold">{label}</label>
        <span className={`text-num font-extrabold ${valueClass}`}>{valueText}</span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="my-1.5 mb-0.5 block h-[30px] w-full cursor-pointer"
      />
      <div className="flex justify-between text-xs font-semibold text-muted">
        <span>{minText}</span>
        <span>{maxText}</span>
      </div>
    </div>
  );
}

export function Calculator() {
  const [sales, setSales] = useState(30000);
  const [margin, setMargin] = useState(12);
  const [now, setNow] = useState(90);
  const [erp, setErp] = useState(20);

  const monthSales = sales * 26;
  const profit = (monthSales * margin) / 100;
  const saved = (Math.max(0, now - erp) * 26) / 60;
  const savedT = bn(String(Math.round(saved * 10) / 10));

  return (
    <section id="calc" className="section">
      <Reveal className="max-w-[720px]">
        <div className="eyebrow text-primary">লাভ ক্যালকুলেটর</div>
        <h2 className="h2">নিজের দোকানের হিসাব নিজেই দেখুন</h2>
        <p className="lede">স্লাইডার টেনে দৈনিক বিক্রি আর মার্জিন দিন। মাসিক লাভ ও হিসাবের সময় সাথে সাথে দেখুন।</p>
      </Reveal>

      <Reveal className="mt-11 flex flex-wrap items-stretch gap-5">
        <div className="flex min-w-0 flex-[1.1_1_420px] flex-col gap-[26px] rounded-xl border border-line bg-surface p-[clamp(22px,3vw,34px)]">
          <div className="text-sub font-extrabold">আপনার সংখ্যা দিন</div>
          <Slider id="r1" label="দিনে কত টাকার বিক্রি" valueText={`৳ ${money(sales)}`} valueClass="text-primary" min={5000} max={500000} step={1000} value={sales} onChange={setSales} minText="৳ ৫,০০০" maxText="৳ ৫,০০,০০০" />
          <Slider id="r2" label="গড় মার্জিন (বিক্রয়ের ওপর)" valueText={`${bn(String(margin))}%`} valueClass="text-info" min={1} max={40} step={0.5} value={margin} onChange={setMargin} minText="১%" maxText="৪০%" />
          <Slider id="r3" label="এখন প্রতিদিন হিসাবে কত সময় যায়" valueText={`${bn(String(now))} মিনিট`} valueClass="text-rose" min={10} max={240} step={5} value={now} onChange={setNow} minText="১০ মিনিট" maxText="৪ ঘণ্টা" />
          <Slider id="r4" label="ShopERP-এ আপনার অনুমান" valueText={`${bn(String(erp))} মিনিট`} valueClass="text-violet" min={5} max={120} step={5} value={erp} onChange={setErp} minText="৫ মিনিট" maxText="২ ঘণ্টা" />
        </div>

        <div className="relative flex min-w-0 flex-[1_1_380px] flex-col gap-[22px] overflow-hidden rounded-xl bg-ink p-[clamp(22px,3vw,34px)] text-white">
          <Blob className="-right-[100px] -top-[120px] h-[340px] w-[340px] bg-[radial-gradient(circle,rgb(var(--primary-400)/.45),transparent_70%)]" />

          <div className="relative">
            <div className="text-md font-semibold text-on-dark-3">আনুমানিক মাসিক মোট লাভ</div>
            <div className="mt-1 text-[clamp(40px,6vw,60px)] font-extrabold leading-[1.15] tracking-[-.03em] text-primary-200">৳ {money(profit)}</div>
          </div>

          <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-white/10 bg-white/[.07] px-4 py-3.5">
              <div className="text-sm font-semibold text-on-dark-3">মাসিক বিক্রয়</div>
              <div className="mt-0.5 text-h4 font-extrabold">৳ {money(monthSales)}</div>
            </div>
            <div className="rounded-md border border-white/10 bg-white/[.07] px-4 py-3.5">
              <div className="text-sm font-semibold text-on-dark-3">বছরে মোট লাভ</div>
              <div className="mt-0.5 text-h4 font-extrabold">৳ {money(profit * 12)}</div>
            </div>
          </div>

          <div className="relative h-px bg-white/[.14]" />

          <div className="relative">
            <div className="text-md font-semibold text-on-dark-3">হিসাবের সময় বাঁচবে</div>
            <div className="mt-1 flex flex-wrap items-baseline gap-2">
              <span className="text-[clamp(34px,5vw,46px)] font-extrabold leading-[1.2] tracking-[-.02em]">{savedT}</span>
              <span className="text-sub font-bold text-on-dark-2">ঘণ্টা প্রতি মাসে</span>
            </div>
            <div className="mt-3.5 flex flex-col gap-2.5 text-sm font-semibold text-on-dark-2">
              {[
                { l: "এখন", v: now, bar: "bg-bar-red" },
                { l: "ShopERP-এ", v: erp, bar: "bg-primary-400" },
              ].map((r) => (
                <div key={r.l}>
                  <div className="mb-[5px] flex justify-between">
                    <span>{r.l}</span>
                    <span>{bn(String(r.v))} মিনিট/দিন</span>
                  </div>
                  <div className="h-3 rounded-xs bg-white/10">
                    <motion.div className={`h-full rounded-xs ${r.bar}`} animate={{ width: `${Math.round((r.v / 240) * 100)}%` }} transition={{ duration: 0.35, ease: "easeOut" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative mt-auto flex flex-col gap-3.5">
            <Btn href="https://stock-ghor.vercel.app" target="_blank" rel="noopener noreferrer" variant="teal" shine className="min-h-[54px] text-body">
              এই হিসাব নিয়ে ফ্রি ডেমো বুক করুন
            </Btn>
            <p className="m-0 text-xs leading-[1.6] text-on-dark-3">
              মাসে ২৬ কর্মদিবস ধরে আনুমানিক হিসাব। মার্জিন মানে বিক্রয়ের ওপর মোট লাভ, খরচ বাদ দেওয়ার আগে। ShopERP-এর সময়টা আপনার নিজের অনুমান, কোনো নিশ্চয়তা নয়।
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
