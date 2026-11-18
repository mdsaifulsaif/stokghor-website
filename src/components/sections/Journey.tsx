"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { PopLoop, Reveal, ScanLine } from "@/components/ui/motion";
import { LineArea } from "@/components/dash/DashParts";
import { useTheme } from "@/lib/theme";

const D = 10; // সম্পূর্ণ চক্র (সেকেন্ড)
const T = [0, 0.02, 0.18, 0.22, 1];

function Step({ n, i, visual, title, text }: { n: string; i: number; visual: ReactNode; title: string; text: string }) {
  const { c } = useTheme();
  const delay = i * 2;
  const off = "0 0 0 0 rgba(15,118,110,0)";
  const on = "0 24px 44px -26px rgba(15,118,110,.6)";
  return (
    <motion.div
      className="relative flex flex-col gap-3.5 overflow-hidden rounded-lg border bg-surface px-5 py-[22px]"
      initial={{ borderColor: c.line, boxShadow: off, y: 0 }}
      animate={{
        borderColor: [c.line, c.primary, c.primary, c.line, c.line],
        boxShadow: [off, on, on, off, off],
        y: [0, -6, -6, 0, 0],
      }}
      transition={{ duration: D, delay, repeat: Infinity, ease: "easeInOut", times: T }}
    >
      <motion.div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[3px] origin-left bg-primary"
        initial={{ scaleX: 0, opacity: 1 }}
        animate={{ scaleX: [0, 0, 1, 1, 0, 0], opacity: [1, 1, 1, 0, 0, 0] }}
        transition={{ duration: D, delay, repeat: Infinity, ease: "linear", times: [0, 0.01, 0.18, 0.24, 0.25, 1] }}
      />
      <motion.div
        className="inline-flex h-[34px] w-[34px] items-center justify-center rounded-md font-extrabold"
        initial={{ backgroundColor: c.track, color: c["text-2"] }}
        animate={{
          backgroundColor: [c.track, c.primary, c.primary, c.track, c.track],
          color: [c["text-2"], c.surface, c.surface, c["text-2"], c["text-2"]],
        }}
        transition={{ duration: D, delay, repeat: Infinity, ease: "easeInOut", times: T }}
      >
        {n}
      </motion.div>
      <div className="relative flex h-[108px] items-center justify-center overflow-hidden rounded-md bg-surface-3">{visual}</div>
      <div>
        <h3 className="text-[19px] leading-[1.4]">{title}</h3>
        <p className="mt-1.5 text-base leading-[1.55] text-text-2">{text}</p>
      </div>
    </motion.div>
  );
}

export function Journey() {
  return (
    <section id="journey" className="section">
      <Reveal className="max-w-[720px]">
        <div className="eyebrow text-primary">একটা বিক্রয়ের যাত্রা</div>
        <h2 className="h2">স্ক্যান থেকে রিপোর্ট, সবকিছু অটো</h2>
        <p className="lede">একটা বিক্রয় করলেই বাকি কাজগুলো নিজে নিজে হয়ে যায়। পাঁচটা ধাপ এক নজরে দেখুন।</p>
      </Reveal>

      <Reveal className="mt-11 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <Step
          n="১"
          i={0}
          title="বারকোড স্ক্যান"
          text="স্ক্যান করলেই প্রোডাক্ট আর দাম কার্টে বসে যায়।"
          visual={
            <>
              <div className="barcode h-[52px] w-24" />
              <ScanLine className="inset-x-3.5" />
            </>
          }
        />
        <Step
          n="২"
          i={1}
          title="পেমেন্ট নিন"
          text="একাধিক অ্যাকাউন্টে ভাগ করে পেমেন্ট নেওয়া যায়।"
          visual={
            <div className="flex flex-col items-center gap-2.5">
              <div className="text-h3 font-extrabold tracking-[-.01em]">৳ ৩২,০০০</div>
              <div className="flex gap-1.5">
                <span className="tag tag-ok">ক্যাশ</span>
                <span className="tag tag-info">বিকাশ</span>
                <span className="tag tag-warn">ব্যাংক</span>
              </div>
            </div>
          }
        />
        <Step
          n="৩"
          i={2}
          title="ইনভয়েস ও SMS"
          text="কাস্টমার পায় অটো SMS, এক ক্লিকে WhatsApp।"
          visual={
            <div className="flex w-full flex-col justify-center gap-2 px-3.5">
              <PopLoop duration={5} className="self-start rounded-lg rounded-bl-[2px] bg-surface px-3 py-1.5 text-xs font-semibold shadow-bubble">
                পেমেন্ট গৃহীত হয়েছে
              </PopLoop>
              <PopLoop duration={5} delay={1} className="self-end rounded-lg rounded-br-[2px] bg-whatsapp px-3 py-1.5 text-xs font-bold text-whatsapp-ink">
                ইনভয়েস PDF পাঠানো হয়েছে
              </PopLoop>
            </div>
          }
        />
        <Step
          n="৪"
          i={3}
          title="ওয়ারেন্টি এন্ট্রি"
          text="সিরিয়াল/IMEI সহ বিক্রয়ের ইতিহাস জমা থাকে।"
          visual={
            <div className="flex w-full flex-col items-stretch gap-2 px-3.5">
              <div className="flex flex-wrap items-center justify-between gap-1 rounded-sm bg-surface px-3 py-2 text-xs font-bold">
                <span className="whitespace-nowrap">IMEI ...4821</span>
                <span className="tag tag-ok">ওয়ারেন্টি সক্রিয়</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-xs bg-track">
                <motion.div
                  className="h-full origin-left bg-primary"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: [0, 1, 1] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", times: [0, 0.7, 1] }}
                />
              </div>
            </div>
          }
        />
        <Step
          n="৫"
          i={4}
          title="রিপোর্টে যোগ"
          text="বিক্রয়, লাভ ও স্টক সাথে সাথে আপডেট হয়।"
          visual={
            <div className="h-full w-full px-3.5 py-3">
              <LineArea
                tone="teal"
                vbH={70}
                height={84}
                line="M0 56 L30 48 L60 52 L95 26 L130 36 L165 14 L200 8"
                area="M0 56 L30 48 L60 52 L95 26 L130 36 L165 14 L200 8 L200 70 L0 70 Z"
              />
            </div>
          }
        />
      </Reveal>
    </section>
  );
}
