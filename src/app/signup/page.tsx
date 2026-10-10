"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import AuthShell from "@/components/AuthShell";
import SocialButtons, { OrDivider } from "@/components/SocialButtons";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fail = (msg: string) => {
    setError(msg);
    toast.error(msg);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");

    if (!name || !email || !password) return fail("সবগুলো ঘর পূরণ করুন।");
    if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।");
    if (password !== confirm) return fail("দুটি পাসওয়ার্ড মিলছে না।");

    setLoading(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (error) return fail(authErrorMessage(error));

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন।");
    router.push("/signin");
  };

  return (
    <AuthShell
      title="অ্যাকাউন্ট তৈরি করুন"
      subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।"
    >
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium">
            নাম
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="যেমন: রহিম উদ্দিন"
            className="input w-full"
          />
        </div>
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
            className="input w-full"
          />
        </div>
        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            পাসওয়ার্ড
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="input w-full"
          />
        </div>
        <div>
          <label htmlFor="confirm" className="mb-1 block text-sm font-medium">
            পাসওয়ার্ড নিশ্চিত করুন
          </label>
          <input
            id="confirm"
            name="confirm"
            type="password"
            autoComplete="new-password"
            placeholder="আবার লিখুন"
            className="input w-full"
          />
        </div>

        {error && (
          <p role="alert" className="text-up bg-up/10 rounded-lg px-3 py-2 text-sm">
            {error}
          </p>
        )}

        <button type="submit" disabled={loading} className="btn btn-primary w-full shadow-md">
          {loading && <span className="loading loading-spinner loading-sm" />}
          অ্যাকাউন্ট তৈরি করুন
        </button>
      </form>

      <OrDivider />
      <SocialButtons />

      <p className="mt-5 text-center text-sm">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="text-primary font-medium hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </AuthShell>
  );
}