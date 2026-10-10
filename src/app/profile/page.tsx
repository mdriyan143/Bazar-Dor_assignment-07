"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FiEdit2, FiLogOut } from "react-icons/fi";
import Avatar from "@/components/Avatar";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await authClient.signOut();
    if (error) return toast.error("সাইন আউট করা যায়নি, আবার চেষ্টা করুন।");
    toast.success("সফলভাবে সাইন আউট হয়েছে।");
    router.push("/");
    router.refresh();
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <h1 className="text-3xl font-extrabold">আমার প্রোফাইল</h1>
      <p className="text-muted mt-1 text-sm">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

      {isPending || !user ? (
        <div className="mt-6 space-y-4">
          <div className="skeleton h-28 w-full rounded-2xl" />
          <div className="skeleton h-48 w-full rounded-2xl" />
        </div>
      ) : (
        <>
          <div className="border-line bg-base-100 mt-6 flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Avatar name={user.name} image={user.image} size={64} />
              <div className="min-w-0">
                <p className="truncate text-xl font-semibold">{user.name}</p>
                <p className="text-muted truncate text-sm">{user.email}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              className="btn btn-outline btn-error btn-sm sm:btn-md">
              <FiLogOut /> সাইন আউট
            </button>
          </div>

          <div className="border-line bg-base-100 mt-4 rounded-2xl border p-5">
            <h2 className="font-bold">তথ্য</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-muted">নাম</dt>
                <dd className="font-medium">{user.name}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-muted">ইমেইল</dt>
                <dd className="font-medium break-all">{user.email}</dd>
              </div>
            </dl>

            <Link href="/profile/update" className="btn btn-primary mt-6 w-full shadow-md">
              <FiEdit2 /> তথ্য আপডেট করুন
            </Link>
          </div>
        </>
      )}
    </div>
  );
}