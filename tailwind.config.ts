import type { Config } from "tailwindcss";

/**
 * সব রঙ, ফন্ট-সাইজ ও রেডিয়াস এখানে CSS variable থেকে আসে।
 * মান বদলাতে হলে শুধু src/app/globals.css এর :root এডিট করুন।
 */
const rgb = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const colorNames = [
  "primary", "primary-600", "primary-400", "primary-300", "primary-200", "primary-soft",
  "info", "info-500", "info-soft",
  "violet", "violet-500", "violet-soft",
  "rose", "rose-soft", "danger", "chart-teal", "navy",
  "whatsapp", "whatsapp-ink",
  "ink", "ink-deep", "ink-line",
  "text", "text-2", "muted", "faint",
  "bg", "surface", "surface-2", "surface-3", "band",
  "line", "line-strong", "line-soft", "line-faint", "track", "track-2",
  "ok-bg", "ok-fg", "ok", "warn-bg", "warn-fg", "amber", "bad-bg", "bad-fg",
  "tag-info-bg", "tag-info-fg",
  "on-dark", "on-dark-2", "on-dark-3",
  "wash-teal", "wash-blue", "wash-green", "wash-violet", "wash-sky", "wash-mint",
  "bar-red",
] as const;

const colors = Object.fromEntries(colorNames.map((n) => [n, rgb(n)]));

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors,
      fontFamily: { sans: ["var(--font-sans)"] },
      fontSize: {
        "2xs": "var(--fs-2xs)",
        xs: "var(--fs-xs)",
        sm: "var(--fs-sm)",
        md: "var(--fs-md)",
        base: "var(--fs-base)",
        lg: "var(--fs-lg)",
        body: "var(--fs-body)",
        sub: "var(--fs-sub)",
        lead: "var(--fs-lead)",
        h4: "var(--fs-h4)",
        h3: "var(--fs-h3)",
        num: "var(--fs-num)",
        "num-lg": "var(--fs-num-lg)",
        stat: "var(--fs-stat)",
        price: "var(--fs-price)",
        h2: ["var(--fs-h2)", { lineHeight: "1.3" }],
        h1: ["var(--fs-h1)", { lineHeight: "1.25" }],
        cta: ["var(--fs-cta)", { lineHeight: "1.3" }],
        display: ["var(--fs-display)", { lineHeight: "0.9" }],
        big: "var(--fs-big)",
      },
      borderRadius: {
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)",
        md: "var(--radius)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        phone: "var(--radius-phone)",
      },
      maxWidth: {
        page: "var(--maxw)",
        hero: "1180px",
        mock: "1120px",
      },
      boxShadow: {
        card: "0 1px 2px rgb(var(--ink) / .05), 0 14px 30px -22px rgb(var(--ink) / .2)",
        "card-hover": "0 30px 60px -30px rgb(var(--primary) / .55)",
        win: "0 1px 2px rgb(var(--ink) / .06), 0 50px 100px -44px rgb(var(--ink) / .55)",
        float: "0 18px 40px -16px rgb(var(--ink) / .4)",
        btn: "0 16px 36px -14px rgb(var(--primary) / .85)",
        "btn-glow": "0 16px 34px -14px rgb(var(--primary-400) / .9)",
        nav: "0 1px 2px rgb(var(--ink) / .05), 0 12px 30px -20px rgb(var(--ink) / .25)",
        phone: "0 50px 90px -40px rgb(var(--ink) / .7), inset 0 0 0 2px rgb(var(--ink-line))",
        bubble: "0 8px 20px -12px rgb(var(--ink) / .4)",
      },
    },
  },
  plugins: [],
};

export default config;
