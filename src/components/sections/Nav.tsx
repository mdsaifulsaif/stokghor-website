"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Btn } from "@/components/ui/Btn";
import { Cube } from "@/components/ui/icons";
import { brand } from "@/lib/data";

const links = [
  { href: "#tour", t: "প্রোডাক্ট ট্যুর" },
  { href: "#features", t: "ফিচার" },
  { href: "#modules", t: "মডিউল" },
  { href: "#pricing", t: "প্রাইসিং" },
];

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-3.5 z-50 mx-auto mt-3.5 w-[calc(100%-32px)] max-w-page">
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative flex items-center justify-between gap-3 rounded-lg border border-line bg-surface/90 px-4 py-2.5 shadow-nav backdrop-blur-md"
      >
        <a href="#top" className="flex items-center gap-3 text-h3 font-extrabold tracking-[-.02em]">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-br from-primary to-primary-400">
            <Cube className="text-white" />
          </span>
          {brand.name}
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-7 text-lg font-semibold lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-text transition-colors hover:text-primary">
              {l.t}
            </a>
          ))}
          <Btn
            href="https://stock-ghor.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            variant="dark"
            className="min-h-11 px-[22px]"
          >
            ফ্রি ডেমো
          </Btn>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-2 lg:hidden">
          <Btn
            href="https://stock-ghor.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            variant="dark"
            className="min-h-9 px-3 text-sm font-semibold"
          >
            ডেমো
          </Btn>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line bg-surface text-ink transition-colors hover:bg-surface-tint active:scale-95"
            aria-label={isOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mt-2 flex flex-col gap-1 rounded-lg border border-line bg-surface/98 p-4 shadow-xl backdrop-blur-lg lg:hidden"
          >
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setIsOpen(false)}
                className="rounded-md px-3 py-2.5 text-base font-semibold text-text transition-colors hover:bg-surface-tint hover:text-primary"
              >
                {l.t}
              </a>
            ))}
            <div className="mt-2 border-t border-line pt-3">
              <Btn
                href="https://stock-ghor.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                variant="dark"
                className="w-full justify-center min-h-11"
                onClick={() => setIsOpen(false)}
              >
                ফ্রি ডেমো দেখুন
              </Btn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
