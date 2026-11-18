"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/ui/motion";

const steps = [
  { n: "১", box: "bg-primary-soft text-primary", t: "প্রোডাক্ট ও স্টক সাজান", d: "Excel (XLSX) দিয়ে একসাথে অনেক প্রোডাক্ট আপলোড করুন, বারকোড অটো তৈরি হয়ে যাবে।" },
  { n: "২", box: "bg-info-soft text-info", t: "POS-এ বিক্রি শুরু করুন", d: "স্ক্যান করুন, ইনভয়েস দিন, কাস্টমার পেয়ে যাবে SMS বা WhatsApp-এ।" },
  { n: "৩", box: "bg-violet-soft text-violet", t: "রিপোর্টে লাভ-লস দেখুন", d: "দৈনিক রিপোর্ট, নিট লাভ ও স্টক ভ্যালু এক নজরে — আর ডাটার ব্যাকআপ সবসময় আপনার হাতে।" },
];

export function How() {
  return (
    <section id="how" className="section">
      <Reveal className="max-w-[680px]">
        <div className="eyebrow text-violet">কীভাবে চলে</div>
        <h2 className="h2">তিন ধাপেই চালু</h2>
      </Reveal>
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
        {steps.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.1} className="h-full">
            <motion.div
              whileHover={{ y: -6 }}
              className="h-full rounded-xl border border-line bg-surface p-7 shadow-card transition-[border-color,box-shadow] hover:border-primary hover:shadow-card-hover"
            >
              <div className={`flex h-[54px] w-[54px] items-center justify-center rounded-lg text-num-lg font-extrabold ${s.box}`}>{s.n}</div>
              <h3 className="mt-[18px] text-h3 leading-[1.4]">{s.t}</h3>
              <p className="mt-2 text-lg text-text-2">{s.d}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
