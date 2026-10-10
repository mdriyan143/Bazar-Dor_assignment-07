import type { Metadata } from "next";
import { Noto_Sans_Bengali } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import PriceTicker from "@/components/PriceTicker";
import "./globals.css";

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["latin", "bengali"],
  display: "swap",
});

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: {
    default: "বাজার দর | BazarDor",
    template: "%s | বাজার দর",
  },
  description: "প্রয়োজনীয় পণ্যের দৈনিক বাজার দর এক নজরে।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" data-theme="bazar" data-scroll-behavior="smooth" className={notoSansBengali.className}>
      <body className="flex min-h-screen flex-col antialiased">
        <Header />
        <PriceTicker />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
          {children}
        </main>
        <Footer />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}