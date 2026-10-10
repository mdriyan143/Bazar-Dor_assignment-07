"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { authErrorMessage } from "@/lib/auth-errors";

function UpdateForm({ currentName }: { currentName: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const name = String(new FormData(e.currentTarget).get("name") ?? "").trim();
    if (!name) {
      const msg = "নাম খালি রাখা যাবে না।";
      setError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    const { error } = await authClient.updateUser({ name });
    setLoading(false);

    if (error) {
      const msg = authErrorMessage(error);
      setError(msg);
      toast.error(msg);
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে।");
    router.push("/profile");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium">
          নাম
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={currentName}
          autoComplete="name"
          placeholder="আপনার নাম"
          className="input w-full"
        />
      </div>

      {error && (
        <p role="alert" className="text-error bg-error/10 rounded-lg px-3 py-2 text-sm">
          {error}
        </p>
      )}

      <button type="submit" disabled={loading} className="btn btn-primary w-full shadow-md">
        {loading && <span className="loading loading-spinner loading-sm" />}
        তথ্য আপডেট করুন
      </button>
    </form>
  );
}

export default function UpdateProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="mx-auto w-full max-w-md">
      <h1 className="text-3xl font-extrabold">তথ্য আপডেট</h1>
      <p className="text-muted mt-1 text-sm">আপনার প্রোফাইলের নাম পরিবর্তন করুন।</p>

      <div className="border-line bg-base-100 mt-6 rounded-2xl border p-5 sm:p-6">
        {isPending || !user ? (
          <div className="space-y-4">
            <div className="skeleton h-4 w-16" />
            <div className="skeleton h-10 w-full" />
            <div className="skeleton h-10 w-full" />
          </div>
        ) : (
          <UpdateForm key={user.id} currentName={user.name} />
        )}
      </div>

      <p className="mt-6 text-center">
        <Link href="/profile" className="text-muted hover:text-primary text-sm">
          ← প্রোফাইলে ফিরে যান
        </Link>
      </p>
    </div>
  );
}