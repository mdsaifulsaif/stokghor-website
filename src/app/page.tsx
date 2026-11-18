import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Stats } from "@/components/sections/Stats";
import { Tour } from "@/components/sections/Tour";
import { Features } from "@/components/sections/Features";
import { Modules } from "@/components/sections/Modules";
import { Journey } from "@/components/sections/Journey";
import { MobileApp } from "@/components/sections/MobileApp";
import { Calculator } from "@/components/sections/Calculator";
import { How } from "@/components/sections/How";
import { Pricing, PlanItem } from "@/components/sections/Pricing";
import { Cta, Footer } from "@/components/sections/CtaFooter";
import { API_BASE_URL } from "@/lib/config";

// ⚡ Next.js ISR: Revalidate static cache every 60 seconds
export const revalidate = 60;

async function getPricingPlans(): Promise<PlanItem[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/public/plans`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data;
    }
  } catch (err) {
    console.warn("ISR pricing fetch fallback:", err);
  }
  return null;
}

export default async function Page() {
  const plans = await getPricingPlans();

  return (
    <>
      <Nav />
      <main className="relative w-full overflow-x-clip">
        <Hero />
        <Marquee />
        <Stats />
        <Tour />
        <Features />
        <Modules />
        <Journey />
        <MobileApp />
        <Calculator />
        <How />
        <Pricing initialPlans={plans} />
        <Cta />
        <Footer />
      </main>
    </>
  );
}
