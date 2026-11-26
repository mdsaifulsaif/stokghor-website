"use client";

import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { Btn } from "@/components/ui/Btn";
import { Check } from "@/components/ui/icons";
import { Blob, Reveal } from "@/components/ui/motion";
import { bn } from "@/lib/bn";
import { API_BASE_URL } from "@/lib/config";

export interface PlanItem {
  _id?: string;
  name: string;
  code?: string;
  price: number | string;
  features: string[];
  description?: string;
  isPopular?: boolean;
}

// Clean features: Filter out raw module slugs if custom descriptive text exists, and deduplicate
function cleanFeatures(items: string[]): string[] {
  if (!Array.isArray(items) || items.length === 0) return [];
  const systemKeys = new Set([
    "pos",
    "orders",
    "inventory",
    "reports",
    "ledger",
    "quotations",
    "multi_warehouse",
    "advanced_audit",
  ]);

  const customFeatures = items.filter((f) => !systemKeys.has(f.trim().toLowerCase()));
  const chosen = customFeatures.length > 0 ? customFeatures : items;

  // Deduplicate while preserving order
  return Array.from(new Set(chosen.map((s) => s.trim()))).filter(Boolean);
}

// Helper to strictly sort: Basic/regular (LEFT) -> Standard/Popular (MIDDLE) -> Custom (RIGHT)
export function orderPlans(items: PlanItem[]): PlanItem[] {
  if (!items || items.length === 0) return [];

  const popular = items.filter((p) => Boolean(p.isPopular));
  const custom = items.filter(
    (p) => !p.isPopular && (Number(p.price) === 0 || p.code === "custom")
  );
  const regular = items.filter(
    (p) => !p.isPopular && Number(p.price) > 0 && p.code !== "custom"
  );

  regular.sort((a, b) => Number(a.price) - Number(b.price));

  return [...regular, ...popular, ...custom];
}

function Features({ items, box, check }: { items: string[]; box: string; check: string }) {
  const displayItems = cleanFeatures(items);
  return (
    <>
      {displayItems.map((t) => (
        <div key={t} className="pf">
          <span className={`pck ${box}`}>
            <Check size={13} className={check} />
          </span>
          {t}
        </div>
      ))}
    </>
  );
}

function Plan({ children }: { children: ReactNode }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="flex h-full flex-col gap-5 rounded-xl border border-line bg-surface px-[26px] py-[30px] shadow-card transition-[border-color,box-shadow] hover:border-primary hover:shadow-card-hover"
    >
      {children}
    </motion.div>
  );
}

export function Pricing({ initialPlans }: { initialPlans?: PlanItem[] | null }) {
  const [plans, setPlans] = useState<PlanItem[]>(() =>
    initialPlans && initialPlans.length > 0 ? orderPlans(initialPlans) : []
  );

  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    initialPlans && initialPlans.length > 0 ? "ready" : "loading"
  );
  const [attempt, setAttempt] = useState(0);

  // Background refresh to keep client in sync (retries twice before showing an error)
  useEffect(() => {
    let isMounted = true;
    async function fetchPricingPlans() {
      for (let i = 0; i < 3 && isMounted; i++) {
        try {
          const res = await fetch(`${API_BASE_URL}/public/plans`, { cache: "no-store" });
          if (res.ok) {
            const json = await res.json();
            if (json.success && Array.isArray(json.data) && json.data.length > 0) {
              if (isMounted) {
                setPlans(orderPlans(json.data));
                setStatus("ready");
              }
              return;
            }
          }
        } catch (err) {
          console.warn("Pricing client sync:", err);
        }
        await new Promise((r) => setTimeout(r, 800 * (i + 1)));
      }
      // keep showing server-rendered plans if we had them
      if (isMounted) setStatus((st) => (st === "ready" ? st : "error"));
    }

    fetchPricingPlans();
    return () => {
      isMounted = false;
    };
  }, [attempt]);

  // Compute lowest numeric price for the headline
  const numericPrices = plans
    .map((p) => Number(p.price))
    .filter((pr) => !isNaN(pr) && pr > 0);
  const minPrice = numericPrices.length > 0 ? Math.min(...numericPrices) : 200;

  return (
    <section id="pricing" className="relative mt-[70px] bg-band">
      <div className="mx-auto max-w-page px-5 pb-[100px] pt-[90px]">
        <Reveal className="mx-auto max-w-[700px] text-center">
          <div className="eyebrow text-primary">প্রাইসিং</div>
          <h2 className="h2">আপনার ব্যবসার মাপে প্ল্যান</h2>
          <p className="lede">
            মাত্র ৳{bn(minPrice)} থেকে শুরু। ব্যবসা বড় হলে যেকোনো সময় আপগ্রেড করুন।
          </p>
        </Reveal>

        {plans.length === 0 && status === "loading" && (
          <div className="mt-[60px] grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3" aria-busy="true">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-[420px] animate-pulse rounded-2xl border border-black/5 bg-white/70" />
            ))}
          </div>
        )}

        {plans.length === 0 && status === "error" && (
          <div className="mx-auto mt-[60px] max-w-[520px] rounded-2xl border border-black/5 bg-white p-8 text-center">
            <p className="text-lg font-bold">প্ল্যানগুলো এই মুহূর্তে লোড করা যাচ্ছে না</p>
            <p className="mt-2 text-base opacity-70">
              ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন, অথবা সরাসরি ফ্রি ডেমো বুক করুন।
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setStatus("loading");
                  setAttempt((a) => a + 1);
                }}
                className="rounded-lg bg-ink px-5 py-2.5 text-base font-bold text-white"
              >
                আবার চেষ্টা করুন
              </button>
              <Btn href="#cta" className="min-h-[44px] px-5 text-base">
                ফ্রি ডেমো
              </Btn>
            </div>
          </div>
        )}

        <div className="mt-[60px] grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((p, idx) => {
            const isCustom = Number(p.price) === 0 || p.code === "custom";
            const isPopular = Boolean(p.isPopular);

            // 1. Standard / Most Popular Card (MIDDLE - Conic rotating dark theme)
            if (isPopular) {
              return (
                <Reveal
                  key={p._id || p.code || idx}
                  delay={0.08}
                  className="relative h-full md:order-first lg:order-none"
                >
                  <span className="absolute left-1/2 top-[-15px] z-10 -translate-x-1/2 whitespace-nowrap rounded-sm bg-gradient-to-br from-primary to-primary-400 px-4 py-1.5 text-sm font-bold text-white shadow-btn-glow">
                    সবচেয়ে জনপ্রিয়
                  </span>
                  <div className="relative h-full rounded-2xl p-0.5">
                    <div className="absolute inset-0 overflow-hidden rounded-2xl">
                      <motion.div
                        aria-hidden
                        className="conic absolute left-1/2 top-1/2 h-[220%] w-[220%]"
                        style={{ x: "-50%", y: "-50%" }}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                      />
                    </div>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="relative flex h-full flex-col gap-5 overflow-hidden rounded-xl bg-ink px-[26px] pb-[30px] pt-9 text-white"
                    >
                      <Blob className="-right-20 -top-20 h-60 w-60 bg-[radial-gradient(circle,rgb(var(--primary-400)/.5),transparent_70%)]" />
                      <div className="relative">
                        <span className="tag bg-primary-400/20 px-3.5 py-[5px] text-sm text-primary-200">
                          {p.name}
                        </span>
                        {p.description && (
                          <p className="mt-3.5 text-lg text-on-dark-2">{p.description}</p>
                        )}
                      </div>
                      <div className="relative flex flex-wrap items-baseline gap-1.5">
                        <span className="text-num font-bold text-on-dark-2">৳</span>
                        <span className="text-price font-extrabold leading-[1.1] tracking-[-.03em]">
                          {bn(p.price)}
                        </span>
                        <span className="text-lg font-semibold text-on-dark-3">/মাস</span>
                      </div>
                      <Btn href="#cta" variant="teal" shine className="relative min-h-[52px] text-body">
                        {p.name} শুরু করুন
                      </Btn>
                      <div className="relative h-px bg-white/[.14]" />
                      <div className="relative flex flex-col gap-[13px]">
                        <div className="text-md font-bold text-primary-200">
                          বেসিকের সবকিছু, সাথে:
                        </div>
                        <Features
                          items={p.features || []}
                          box="!bg-primary-400/20"
                          check="text-primary-200"
                        />
                      </div>
                    </motion.div>
                  </div>
                </Reveal>
              );
            }

            // 2. Custom Pricing Card (RIGHT - Violet tag)
            if (isCustom) {
              return (
                <Reveal
                  key={p._id || p.code || idx}
                  delay={0.16}
                  className="h-full md:col-span-2 lg:col-span-1"
                >
                  <Plan>
                    <div>
                      <span className="tag bg-violet-soft px-3.5 py-[5px] text-sm text-violet">
                        {p.name}
                      </span>
                      {p.description && (
                        <p className="mt-3.5 text-lg text-text-2">{p.description}</p>
                      )}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-big font-extrabold leading-[1.3] tracking-[-.02em]">
                        কাস্টম
                      </span>
                      <span className="text-lg font-semibold text-muted">
                        আপনার চাহিদা অনুযায়ী দাম
                      </span>
                    </div>
                    <Btn href="#cta" variant="dark" className="min-h-[52px] text-body">
                      যোগাযোগ করুন
                    </Btn>
                    <div className="h-px bg-line-soft" />
                    <div className="flex flex-col gap-[13px]">
                      <div className="text-md font-bold text-violet">
                        স্ট্যান্ডার্ডের সবকিছু, সাথে:
                      </div>
                      <Features
                        items={p.features || []}
                        box="!bg-violet-soft"
                        check="text-violet"
                      />
                    </div>
                  </Plan>
                </Reveal>
              );
            }

            // 3. Basic / Regular Surface Card (LEFT)
            return (
              <Reveal key={p._id || p.code || idx} className="h-full">
                <Plan>
                  <div>
                    <span className="tag bg-primary-soft px-3.5 py-[5px] text-sm text-primary">
                      {p.name}
                    </span>
                    {p.description && (
                      <p className="mt-3.5 text-lg text-text-2">{p.description}</p>
                    )}
                  </div>
                  <div className="flex flex-wrap items-baseline gap-1.5">
                    <span className="text-num font-bold text-text-2">৳</span>
                    <span className="text-price font-extrabold leading-[1.1] tracking-[-.03em]">
                      {bn(p.price)}
                    </span>
                    <span className="text-lg font-semibold text-muted">/মাস থেকে</span>
                  </div>
                  <Btn href="#cta" variant="outline" className="min-h-[52px] text-body">
                    {p.name} শুরু করুন
                  </Btn>
                  <div className="h-px bg-line-soft" />
                  <div className="flex flex-col gap-[13px]">
                    <Features items={p.features || []} box="" check="" />
                  </div>
                </Plan>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
