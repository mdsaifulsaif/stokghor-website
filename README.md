# ShopERP Landing Page

Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
```

## কোথায় কী বদলাবেন

| কী বদলাবেন | কোথায় |
| --- | --- |
| **রঙ** (primary, accent, ইত্যাদি) | `src/app/globals.css` → `:root` (RGB চ্যানেল, যেমন `--primary: 15 118 110`) |
| **ফন্ট-সাইজ** (h1, h2, বডি, ছোট লেখা) | `src/app/globals.css` → `--fs-*` ভ্যারিয়েবল |
| **ফন্ট ফ্যামিলি** | `--font-sans` + `src/app/layout.tsx` এর Google Fonts লিংক |
| **রাউন্ড কর্নার** | `--radius-*` ভ্যারিয়েবল |
| **কনটেন্ট** (মডিউল, প্রাইস, ফিচার লিস্ট, ফোন নম্বর) | `src/lib/data.ts` |
| বাটন/ট্যাগ/প্যানেলের কমন স্টাইল | `src/app/globals.css` → `@layer components` |

Tailwind কনফিগ (`tailwind.config.ts`) সব টোকেন CSS variable থেকে পড়ে, তাই `globals.css` বদলালেই পুরো সাইটে বদলে যায়।
অ্যানিমেশনে রঙ লাগলে `src/lib/theme.ts` একই CSS variable পড়ে নেয়।

## স্ট্রাকচার

```
src/
  app/              layout, globals.css (টোকেন), page.tsx
  lib/              data.ts (কনটেন্ট), bn.ts (বাংলা সংখ্যা), theme.ts (রঙ হুক)
  components/
    ui/             motion.tsx (Reveal, Float, CountUp, Lit...), Btn, FitScale, icons
    dash/           ড্যাশবোর্ড উইন্ডোর অংশ
    sections/       Nav, Hero, Marquee, Stats, Tour, Features, Modules,
                    Journey, MobileApp, Calculator, How, Pricing, CtaFooter
```

`FitScale` ড্যাশবোর্ড উইন্ডো ডেস্কটপ মাপে (১০৮০px) এঁকে মোবাইলে ছোট করে বসায়।
