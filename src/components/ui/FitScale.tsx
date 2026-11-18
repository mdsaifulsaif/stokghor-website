"use client";

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * ডেস্কটপ মাপের (width px) লেআউট আঁকে, তারপর স্ক্রিনের প্রস্থ অনুযায়ী ছোট (scale) করে।
 * ফোনে ড্যাশবোর্ড লম্বা না হয়ে এক পেজে ছোট হয়ে দেখায়।
 */
export function FitScale({ width = 1080, children }: { width?: number; children: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useIsoLayoutEffect(() => {
    const w = wrap.current;
    const i = inner.current;
    if (!w || !i) return;
    const fit = () => {
      const s = Math.min(1, w.clientWidth / width);
      setScale(s);
      setHeight(Math.round(i.offsetHeight * s));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(w);
    ro.observe(i);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div ref={wrap} className="relative w-full" style={{ height }}>
      <div
        ref={inner}
        className="relative mx-auto origin-top-left"
        style={{ width, transform: scale < 1 ? `scale(${scale})` : undefined }}
      >
        {children}
      </div>
    </div>
  );
}
