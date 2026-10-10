import Image from "next/image";
import Link from "next/link";
import { banglaDate } from "@/lib/format";


const Logo = () => (
  <Link href="/" className="flex items-center gap-3" aria-label="বাজার দর - হোম">
    <span className="bg-primary grid size-10 place-items-center rounded-xl">
      <Image src="/logo-icon.png" alt="" width={22} height={22} priority />
    </span>
    <span className="flex flex-col leading-tight">
      <span className="text-xl font-extrabold">বাজার দর</span>
      <span className="text-muted text-[11px]">{banglaDate()}</span>
    </span>
  </Link>
);

export default Logo;