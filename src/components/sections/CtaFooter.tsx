"use client";

import { motion } from "framer-motion";
import { Btn } from "@/components/ui/Btn";
import { ArrowUp, Cube, Mail, Phone, Video, Chat } from "@/components/ui/icons";
import { Blob, Float, Reveal } from "@/components/ui/motion";
import { brand } from "@/lib/data";

export function Cta() {
  return (
    <section id="cta" className="section !pb-10 !pt-20">
      <Reveal className="relative rounded-2xl p-0.5">
        <div className="absolute inset-0 overflow-hidden rounded-2xl">
          <motion.div
            aria-hidden
            className="conic absolute left-1/2 top-1/2 h-[300%] w-[300%]"
            style={{ x: "-50%", y: "-50%" }}
            animate={{ rotate: 360 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="relative overflow-hidden rounded-xl bg-ink px-[clamp(24px,5vw,70px)] py-[clamp(36px,6vw,80px)] text-center text-white">
          <Blob className="-left-[100px] -top-[140px] h-[420px] w-[420px] bg-[radial-gradient(circle,rgb(var(--primary-400)/.6),transparent_70%)]" />
          <Blob delay={6} className="-bottom-40 -right-20 h-[460px] w-[460px] bg-[radial-gradient(circle,rgb(var(--info-500)/.55),transparent_70%)]" />
          <div className="relative">
            <h2 className="mx-auto max-w-[760px] text-cta font-bold">আপনার ব্যবসাকে গুছিয়ে নেওয়ার সময় এখনই</h2>
            <p className="mx-auto mt-[18px] max-w-[600px] text-lead text-on-dark-2">ফ্রি ডেমোতে নিজের দোকানের মতো করে সবকিছু দেখে নিন। কোনো বাধ্যবাধকতা নেই।</p>
            <div className="mt-[34px] flex flex-wrap justify-center gap-3.5">
              <Btn href="https://stock-ghor.vercel.app" target="_blank" rel="noopener noreferrer" variant="white" shine className="min-h-14 px-8 text-sub font-extrabold">ফ্রি ডেমো বুক করুন</Btn>
              <Btn href="https://wa.me/8801700000000" target="_blank" rel="noopener noreferrer" variant="whatsapp" className="min-h-14 px-[30px] text-sub font-extrabold">WhatsApp-এ কথা বলুন</Btn>
            </div>
            <div className="mt-[22px] text-lg text-on-dark-2">কল করুন: {brand.phone}</div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

const colLink = "block py-[5px] text-base text-on-dark transition hover:translate-x-1 hover:text-white";

function Social({ label, href, children }: { label: string; href?: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href || "#"}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      whileHover={{ y: -3 }}
      className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-md border border-white/[.18] text-white transition-colors hover:border-primary hover:bg-primary"
    >
      {children}
    </motion.a>
  );
}

export function Footer() {
  return (
    <footer className="relative mt-[50px] overflow-hidden bg-ink-deep text-on-dark">
      <Blob className="-left-[120px] -top-[180px] h-[480px] w-[480px] bg-[radial-gradient(circle,rgb(var(--primary-400)/.22),transparent_70%)]" />
      <Blob delay={7} className="-right-40 top-10 h-[460px] w-[460px] bg-[radial-gradient(circle,rgb(var(--info-500)/.2),transparent_70%)]" />

      <div className="relative mx-auto max-w-page px-5 pt-16">
        <div className="flex flex-wrap justify-between gap-x-10 gap-y-11">
          <div className="min-w-0 max-w-[400px] flex-[1.6_1_300px]">
            <div className="flex items-center gap-3 text-[24px] font-extrabold tracking-[-.02em] text-white">
              <span className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-md bg-gradient-to-br from-primary to-primary-400">
                <Cube className="text-white" />
              </span>
              {brand.name}
            </div>
            <p className="mt-4 text-lg leading-[1.7]">মোবাইল ও ইলেকট্রনিক্স দোকানের বিক্রয়, স্টক, ওয়ারেন্টি, কিস্তি আর হিসাবের সবকিছু একটাই সফটওয়্যারে।</p>
            <div className="mt-[22px] flex gap-2.5">
              <Social label="WhatsApp" href="https://wa.me/8801700000000"><Chat size={19} strokeWidth={2} /></Social>
              <Social label="ফোন" href={`tel:${brand.phone}`}><Phone /></Social>
              <Social label="ইমেইল" href={`mailto:${brand.email}`}><Mail /></Social>
              <Social label="ভিডিও"><Video /></Social>
            </div>
          </div>

          <div className="min-w-0 flex-[1_1_150px]">
            <div className="mb-3 text-lg font-bold text-white">প্রোডাক্ট</div>
            {["POS বিক্রয়", "প্রোডাক্ট ও স্টক", "ওয়ারেন্টি ও RMA", "EMI কিস্তি", "রিপোর্ট"].map((t) => (
              <a key={t} href="#tour" className={colLink}>{t}</a>
            ))}
          </div>

          <div className="min-w-0 flex-[1_1_150px]">
            <div className="mb-3 text-lg font-bold text-white">রিসোর্স</div>
            <a href="#features" className={colLink}>ফিচার</a>
            <a href="#modules" className={colLink}>সব মডিউল</a>
            <a href="#pricing" className={colLink}>প্রাইসিং</a>
            <a href="#how" className={colLink}>কীভাবে চলে</a>
            <a href="#" className={colLink}>ইউজার ম্যানুয়াল</a>
          </div>

          <div className="min-w-0 flex-[1.2_1_200px]">
            <div className="mb-3 text-lg font-bold text-white">যোগাযোগ</div>
            <div className="py-[5px] text-base">ফোন: {brand.phone}</div>
            <div className="py-[5px] text-base">ইমেইল: {brand.email}</div>
            <div className="py-[5px] text-base">ঠিকানা: {brand.address}</div>
            <Btn href="https://stock-ghor.vercel.app" target="_blank" rel="noopener noreferrer" variant="teal" shine className="mt-3.5 min-h-[46px] px-[22px] text-base">ফ্রি ডেমো নিন</Btn>
          </div>
        </div>

        <div className="mt-[54px] flex flex-wrap items-center justify-between gap-3.5 border-t border-white/[.12] py-[22px] text-md">
          <span>© ২০২৬ {brand.name}। সর্বস্বত্ব সংরক্ষিত।</span>
          <span className="flex gap-[22px]">
            <a href="#" className="transition hover:text-white">প্রাইভেসি পলিসি</a>
            <a href="#" className="transition hover:text-white">শর্তাবলী</a>
          </span>
          <a href="#top" className="inline-flex items-center gap-2 font-semibold text-white">
            উপরে যান
            <Float amount={4} className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-sm border border-white/25">
              <ArrowUp />
            </Float>
          </a>
        </div>
      </div>

      <motion.div
        aria-hidden
        className="relative -mb-[.14em] mt-1.5 select-none text-center text-display font-extrabold tracking-[-.05em]"
        style={{
          backgroundImage: "linear-gradient(90deg, rgba(255,255,255,.04), rgb(var(--primary-400) / .55), rgba(255,255,255,.04))",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: "transparent",
        }}
        animate={{ backgroundPosition: ["0% 50%", "200% 50%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        {brand.name}
      </motion.div>
    </footer>
  );
}
