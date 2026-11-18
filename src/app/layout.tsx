import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Providers } from "@/components/ui/Providers";

export const metadata: Metadata = {
  title: "ShopERP — মোবাইল ও ইলেকট্রনিক্স শপের সম্পূর্ণ ERP",
  description:
    "বারকোড POS, IMEI ও ওয়ারেন্টি, EMI কিস্তি, সার্ভিস, হিসাব ও রিপোর্ট — পুরো দোকান একটাই ড্যাশবোর্ডে।",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Inter:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
