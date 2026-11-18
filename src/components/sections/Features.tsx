"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Lit, LoopBar, PopLoop, Reveal, ScanLine } from "@/components/ui/motion";
import { Check } from "@/components/ui/icons";
import { Ring } from "@/components/dash/DashParts";

function Card({ wash, visual, title, text, delay }: { wash: string; visual: ReactNode; title: string; text: string; delay: number }) {
  return (
    <Reveal delay={delay} className="h-full">
      <motion.div
        whileHover={{ y: -6 }}
        className="flex h-full flex-col gap-[18px] rounded-xl border border-line bg-surface p-5 shadow-card transition-[border-color,box-shadow] hover:border-primary hover:shadow-card-hover"
      >
        <div className={`relative h-[190px] overflow-hidden rounded-md ${wash}`}>{visual}</div>
        <div>
          <h3 className="text-h3 leading-[1.4]">{title}</h3>
          <p className="mt-2 text-lg text-text-2">{text}</p>
        </div>
      </motion.div>
    </Reveal>
  );
}

const stepTimes = [0, 0.06, 0.18, 0.86, 1];

export function Features() {
  return (
    <section id="features" className="section">
      <Reveal className="max-w-[680px]">
        <div className="eyebrow text-primary">হাইলাইট</div>
        <h2 className="h2">যা যা লাগে, সব হাতের নাগালে</h2>
        <p className="lede">দোকানের প্রতিদিনের কাজ — বিক্রি, ওয়ারেন্টি, কিস্তি, পেমেন্ট, বার্তা — চোখের সামনে চলতে দেখুন।</p>
      </Reveal>

      <div className="mt-11 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {/* 1 barcode */}
        <Card
          delay={0}
          wash="bg-gradient-to-br from-wash-teal to-wash-blue"
          title="বারকোড স্ক্যান, দ্রুত বিক্রয়"
          text="স্ক্যান করলেই প্রোডাক্ট বসে যায়। ফুল-স্ক্রিন POS কাউন্টার থেকে রিসিট অটো প্রিন্ট।"
          visual={
            <div className="flex h-full items-center justify-center">
              <div className="relative flex h-[100px] w-[170px] items-center justify-center rounded-md bg-surface shadow-[0_10px_30px_-12px_rgb(var(--primary)/.5)]">
                <div className="barcode h-[62px] w-[120px]" />
                <ScanLine className="-inset-x-2" />
              </div>
              <PopLoop duration={4} className="absolute bottom-3.5 right-4 inline-flex items-center gap-2 rounded-sm bg-ink px-3.5 py-[7px] text-sm font-bold text-white">
                <Check size={14} strokeWidth={3} className="text-primary-300" />
                স্ক্যান সম্পন্ন
              </PopLoop>
            </div>
          }
        />

        {/* 2 RMA */}
        <Card
          delay={0.08}
          wash="bg-gradient-to-br from-wash-sky to-wash-mint"
          title="ওয়ারেন্টি ও ৪ ধাপের RMA"
          text="প্রতিটি সিরিয়াল ও IMEI-এর ইতিহাস, ওয়ারেন্টির বাকি দিন আর কুরিয়ার খরচসহ পূর্ণ হিসাব।"
          visual={
            <div className="flex h-full items-center px-[22px]">
              <div className="relative w-full">
                <div className="absolute inset-x-[8%] top-5 h-1 overflow-hidden rounded-xs bg-track-2">
                  <motion.div
                    className="h-full origin-left bg-primary"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: [0, 1, 1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", times: [0, 0.7, 1] }}
                  />
                </div>
                <div className="relative flex justify-between">
                  {["রিসিট", "সাপ্লায়ারে পাঠানো", "ফেরত", "ডেলিভারি"].map((t, i) => (
                    <div key={t} className="w-1/4 text-center">
                      <Lit duration={8} delay={i * 0.9} times={stepTimes} className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg font-extrabold">
                        {["১", "২", "৩", "৪"][i]}
                      </Lit>
                      <div className="mt-2.5 text-sm font-bold leading-[1.35]">{t}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }
        />

        {/* 3 EMI */}
        <Card
          delay={0.16}
          wash="bg-gradient-to-br from-wash-green to-wash-sky"
          title="যেকোনো বিক্রয় এখন কিস্তিতে"
          text="মাসিক বা সাপ্তাহিক EMI, পূর্ণ সময়সূচি আর কিস্তি পেমেন্টে অটো মানি রিসিপ্ট।"
          visual={
            <div className="flex h-full items-center justify-center gap-[22px] px-5">
              <Ring />
              <div className="flex flex-col gap-2 text-sm font-bold">
                {[
                  ["অক্টোবর · জমা", "bg-primary"],
                  ["নভেম্বর · জমা", "bg-primary"],
                  ["ডিসেম্বর · বাকি", "border-[3px] border-amber"],
                ].map(([t, c]) => (
                  <div key={t} className="flex items-center gap-2 rounded-sm bg-surface px-3 py-1.5">
                    <span className={`h-4 w-4 rounded-xs ${c}`} />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          }
        />

        {/* 4 payment */}
        <Card
          delay={0}
          wash="bg-gradient-to-br from-wash-sky to-wash-mint"
          title="সব পেমেন্ট এক হিসাবে"
          text="আলাদা অ্যাকাউন্ট, ব্যালেন্স ট্রান্সফার আর চেক ম্যানেজমেন্ট — সবকিছুর হিসাব এক জায়গায়।"
          visual={
            <div className="flex h-full items-center px-[22px]">
              <div className="grid w-full grid-cols-2 gap-3">
                {["ক্যাশ", "ব্যাংক", "বিকাশ", "নগদ"].map((t, i) => (
                  <Lit key={t} duration={8} delay={i * 1.2} times={stepTimes} className="rounded-md p-3.5 text-center font-extrabold">
                    {t}
                  </Lit>
                ))}
              </div>
            </div>
          }
        />

        {/* 5 chat */}
        <Card
          delay={0.08}
          wash="bg-gradient-to-br from-wash-green to-wash-mint"
          title="SMS ও WhatsApp অটোমেশন"
          text="বিক্রয় ও পেমেন্টে অটো SMS, এক ক্লিকে WhatsApp-এ ইনভয়েস আর বাকির রিমাইন্ডার।"
          visual={
            <div className="flex h-full flex-col justify-center gap-3 px-[22px]">
              <PopLoop delay={0} className="max-w-[88%] self-start rounded-lg rounded-bl-[2px] bg-surface px-4 py-2.5 text-md font-semibold shadow-bubble">
                ধন্যবাদ! আপনার পেমেন্ট গৃহীত হয়েছে।
              </PopLoop>
              <PopLoop delay={1.3} className="max-w-[88%] self-end rounded-lg rounded-br-[2px] bg-whatsapp px-4 py-2.5 text-md font-bold text-whatsapp-ink">
                ইনভয়েস পাঠানো হয়েছে (PDF)
              </PopLoop>
              <PopLoop delay={2.6} className="max-w-[88%] self-start rounded-lg rounded-bl-[2px] bg-surface px-4 py-2.5 text-md font-semibold shadow-bubble">
                বাকির রিমাইন্ডার পাঠানো হয়েছে।
              </PopLoop>
            </div>
          }
        />

        {/* 6 bars */}
        <Card
          delay={0.16}
          wash="bg-gradient-to-br from-wash-violet to-wash-mint"
          title="লাভ-লস এক নজরে"
          text="নিট লাভ, টপ প্রোডাক্ট, টপ কাস্টমার ও স্টক ভ্যালু — সব রিপোর্ট PDF সেভ ও প্রিন্টসহ।"
          visual={
            <div className="flex h-full items-end gap-3 px-7 py-[26px]">
              {["50%", "72%", "44%", "90%", "62%", "100%"].map((h, i) => (
                <LoopBar
                  key={i}
                  delay={i * 0.25}
                  style={{ height: h }}
                  className={`flex-1 rounded-t-[4px] rounded-b-[2px] ${["bg-primary-300", "bg-primary-400", "bg-primary-300", "bg-primary", "bg-primary-400", "bg-primary"][i]}`}
                />
              ))}
            </div>
          }
        />
      </div>
    </section>
  );
}
