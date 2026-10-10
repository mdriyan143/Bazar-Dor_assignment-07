"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import AuthShell from "@/components/AuthShell";
import SocialButtons, { OrDivider } from "@/components/SocialButtons";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";

export default function SignInForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const toasted = useRef(false);

  useEffect(() => {
    if (params.get("redirect") && !toasted.current) {
      toasted.current = true;
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন।");
    }
  }, [params]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    if (!email || !password) {
      const msg = "ইমেইল ও পাসওয়ার্ড দুটোই দিন।";
      setError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      const msg = authErrorMessage(error);
      setError(msg);
      toast.error(msg);
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে।");
    router.push("/");
    router.refresh();
  };

  return (
    <AuthShell
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            ইমেইল
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="input w-full"/>
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            পাসওয়ার্ড
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="input w-full"/>
        </div>

        {error && (
          <p role="alert" className="text-up bg-up/10 rounded-lg px-3 py-2 text-sm">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn btn-primary w-full shadow-md">
          {loading && <span className="loading loading-spinner loading-sm" />}
          সাইন ইন
        </button>
      </form>

      <OrDivider />
      <SocialButtons />

      <p className="mt-5 text-center text-sm">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="text-primary font-medium hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </AuthShell>
  );
}