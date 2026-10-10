"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

type Provider = "google" | "github";

const SocialButtons = ({ callbackURL = "/" }: { callbackURL?: string }) => {
  const [loading, setLoading] = useState<Provider | null>(null);

  const handleSocial = async (provider: Provider) => {
    setLoading(provider);
    const { error } = await authClient.signIn.social({ provider, callbackURL });
    if (error) {
      toast.error("সোশ্যাল লগইন করা যায়নি, আবার চেষ্টা করুন।");
      setLoading(null);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <button
        type="button"
        onClick={() => handleSocial("google")}
        disabled={loading !== null}
        className="btn btn-outline border-line">
        {loading === "google" ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          <FcGoogle className="size-5" />
        )}
        Google দিয়ে চালিয়ে যান
      </button>
      <button
        type="button"
        onClick={() => handleSocial("github")}
        disabled={loading !== null}
        className="btn btn-outline border-line">
        {loading === "github" ? (
          <span className="loading loading-spinner loading-sm" />
        ) : (
          <FaGithub className="size-5" />
        )}
        GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
};

export const OrDivider = () => (
  <div className="text-muted my-5 flex items-center gap-3 text-xs">
    <span className="bg-line h-px flex-1" />
    অথবা
    <span className="bg-line h-px flex-1" />
  </div>
);

export default SocialButtons;