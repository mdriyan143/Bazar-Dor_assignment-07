"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";
import Avatar from "./Avatar";

const UserMenu = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleSignOut = async () => {
    setOpen(false);
    const { error } = await authClient.signOut();
    if (error) {
      toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন।");
      return;
    }
    toast.success("সফলভাবে সাইন আউট হয়েছে।");
    router.push("/");
    router.refresh();
  };

  if (isPending) {
    return <div className="skeleton h-9 w-28 rounded-lg" aria-label="লোড হচ্ছে" />;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-1 sm:gap-2">
        <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
          সাইন ইন
        </Link>
        <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="hover:bg-base-200 flex items-center gap-2 rounded-lg p-1 pr-2 transition"
      >
        <Avatar name={user.name} image={user.image} size={36} />
        <span className="hidden text-sm font-medium sm:inline">
          {user.name.split(" ")[0]}
        </span>
        <FiChevronDown
          className={`text-muted size-3.5 transition ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div
          role="menu"
          className="border-line bg-base-100 absolute right-0 z-50 mt-2 w-64 rounded-2xl border p-4 shadow-lg"
        >
          <p className="truncate font-semibold">{user.name}</p>
          <p className="text-muted truncate text-xs">{user.email}</p>
          <div className="mt-3 flex flex-col gap-1 text-sm">
            <Link
              href="/profile"
              role="menuitem"
              onClick={() => setOpen(false)}
              className="hover:bg-base-200 flex items-center gap-2 rounded-lg px-2 py-2"
            >
              <FiUser /> আমার প্রোফাইল
            </Link>
            <button
              type="button"
              role="menuitem"
              onClick={handleSignOut}
              className="text-error bg-error/10 flex items-center gap-2 rounded-lg px-2 py-2 text-left"
            >
              <FiLogOut /> সাইন আউট
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;