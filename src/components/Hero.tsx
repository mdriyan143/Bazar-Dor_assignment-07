import Image from "next/image";
import { banglaDate } from "@/lib/format";

const Hero = () => (
  <section className="border-line bg-base-100 grid items-center gap-6 rounded-3xl border p-6 sm:p-8 md:grid-cols-[1fr_auto]">
    <div>
      <span className="bg-primary/10 text-primary inline-block rounded-full px-3 py-1 text-xs font-semibold">
        {banglaDate()}
      </span>
      <h1 className="mt-3 text-3xl leading-tight font-extrabold sm:text-4xl">
        আজকের বাজারের দাম এক নজরে
      </h1>
      <p className="text-muted mt-4 max-w-xl leading-relaxed">
        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত,
        গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
      </p>
      <a href="#সব-পণ্য" className="btn btn-primary mt-6 shadow-md">
        সব পণ্য দেখুন
      </a>
    </div>
    <Image
      src="/bazar-hero.png"
      alt="সবজি ও ফলের ঝুড়ি"
      width={315}
      height={263}
      priority
      className="mx-auto h-auto w-56 md:mr-8 md:w-72"
    />
  </section>
);

export default Hero;