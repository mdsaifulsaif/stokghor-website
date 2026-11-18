"use client";

import { MotionConfig } from "framer-motion";

/** ব্যবহারকারী "reduce motion" চালু রাখলে সব অ্যানিমেশন নিজে থেকেই কমে যায়। */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
