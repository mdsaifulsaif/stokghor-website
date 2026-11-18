"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Shine } from "./motion";

const variants = {
  primary: "bg-gradient-to-br from-primary to-primary-600 text-white shadow-btn",
  teal: "bg-gradient-to-br from-primary-400 to-primary text-white shadow-btn-glow",
  dark: "bg-ink text-white",
  light: "border border-line-strong bg-surface text-ink",
  white: "bg-white text-ink",
  whatsapp: "bg-whatsapp text-whatsapp-ink",
  outline: "border-[1.5px] border-ink text-ink",
} as const;

export type BtnVariant = keyof typeof variants;

export function Btn({
  href = "#",
  variant = "primary",
  shine = false,
  className = "",
  target,
  rel,
  onClick,
  children,
}: {
  href?: string;
  variant?: BtnVariant;
  shine?: boolean;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.98 }}
      className={`relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-md font-bold ${variants[variant]} ${className}`}
    >
      {children}
      {shine && <Shine />}
    </motion.a>
  );
}
