"use client";

import { motion } from "framer-motion";
import { Btn } from "@/components/ui/Btn";
import { FitScale } from "@/components/ui/FitScale";
import { Arrow, Chat, Check, Warn } from "@/components/ui/icons";
import { Blob, Float, PingDot, Rise } from "@/components/ui/motion";
import { DashboardWindow } from "@/components/dash/DashboardWindow";

function FloatChip({
  className,
  delay,
  iconBg,
  icon,
  children,
}: {
  className: string;
  delay: number;
  iconBg: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Float
      delay={delay}
      className={`absolute z-[6] hidden items-center gap-2.5 rounded-md border border-line bg-surface px-4 py-2.5 text-md font-bold shadow-float md:flex ${className}`}
    >
      <span className={`flex h-7 w-7 items-center justify-center rounded-sm ${iconBg}`}>{icon}</span>
      {children}
    </Float>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative">
      {/* animated grid */}
      <motion.div
        aria-hidden
        className="grid-bg pointer-events-none absolute inset-0"
        animate={{ backgroundPosition: ["0px 0px", "48px 48px"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <Blob className="left-[8%] top-[-120px] h-[520px] w-[520px] bg-[radial-gradient(circle,rgb(var(--primary-400)/.3),transparent_70%)]" />
      <Blob delay={6} className="right-[4%] top-[60px] h-[480px] w-[480px] bg-[radial-gradient(circle,rgb(var(--info-500)/.22),transparent_70%)]" />

      <div className="relative mx-auto max-w-hero px-5 pt-9 text-center">
        <Rise>
          <div className="inline-flex items-center gap-3 rounded-sm border border-line bg-surface py-[7px] pl-3 pr-4 text-base font-semibold text-text">
            <PingDot />
            মোবাইল ও ইলেকট্রনিক্স শপের সম্পূর্ণ ERP
          </div>
        </Rise>

        <Rise as="h1" delay={0.12} className="mx-auto mt-[22px] max-w-[900px] text-h1 font-bold tracking-[-.01em]">
          আপনার পুরো দোকান, <span className="text-primary">একটাই ড্যাশবোর্ডে</span>
        </Rise>

        <Rise as="p" delay={0.24} className="mx-auto mt-5 max-w-[640px] text-lead text-text">
          বিক্রয়, স্টক, ওয়ারেন্টি, কিস্তি আর হিসাব — সব এক স্ক্রিনে। রিপোর্ট দেখুন, দ্রুত সিদ্ধান্ত নিন।
        </Rise>

        <Rise delay={0.36} className="mt-[30px] flex flex-wrap justify-center gap-3.5">
          <Btn href="https://stock-ghor.vercel.app" target="_blank" rel="noopener noreferrer" shine className="min-h-[54px] px-[30px] text-lead">
            ফ্রি ডেমো দেখুন <Arrow className="text-white" />
          </Btn>
          <Btn href="#tour" variant="light" className="min-h-[54px] px-7 text-lead">
            প্রোডাক্ট ট্যুর
          </Btn>
        </Rise>

        {/* dashboard visual */}
        <Rise delay={0.5} className="relative mx-auto mt-14 max-w-mock text-left">
          <FitScale width={1080}>
            <div className="absolute inset-x-[3%] -top-[34px] h-[60px] rounded-t-xl border border-line bg-surface opacity-55" />
            <div className="absolute inset-x-[1.5%] -top-[17px] h-[60px] rounded-t-xl border border-line bg-surface opacity-80" />
            <DashboardWindow />
          </FitScale>

          <FloatChip className="-left-3.5 top-[70px]" delay={-1} iconBg="bg-ok-bg" icon={<Check size={15} strokeWidth={3} className="text-ok" />}>
            SMS পাঠানো হয়েছে
          </FloatChip>
          <FloatChip className="-right-3 top-[44%]" delay={-3} iconBg="bg-whatsapp" icon={<Chat size={15} className="text-white" />}>
            WhatsApp-এ ইনভয়েস
          </FloatChip>
          <FloatChip className="-left-2.5 bottom-[30px]" delay={-5} iconBg="bg-bad-bg" icon={<Warn size={15} className="text-bad-fg" />}>
            লো-স্টক অ্যালার্ট
          </FloatChip>
        </Rise>
      </div>
    </section>
  );
}
