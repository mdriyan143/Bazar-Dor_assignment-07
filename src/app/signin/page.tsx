import { Suspense } from "react";
import type { Metadata } from "next";
import SignInForm from "./SignInForm";

export const metadata: Metadata = { title: "সাইন ইন" };

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="skeleton mx-auto h-96 w-full max-w-md rounded-2xl" />}>
      <SignInForm />
    </Suspense>
  );
}