import Link from "next/link";

const NotFoundView = ({
  title = "পেজটি খুঁজে পাওয়া যায়নি",
  message = "আপনি যে পেজটি খুঁজছেন সেটি নেই অথবা সরিয়ে নেওয়া হয়েছে।",
}: {
  title?: string;
  message?: string;
}) => (
  <div className="flex flex-col items-center justify-center py-16 text-center sm:py-24">
    <p className="text-primary text-8xl font-black sm:text-9xl">৪০৪</p>
    <h1 className="mt-4 text-2xl font-bold sm:text-3xl">{title}</h1>
    <p className="text-muted mt-2 max-w-md">{message}</p>
    <Link href="/" className="btn btn-primary mt-8">
      হোম পেজে ফিরে যান
    </Link>
  </div>
);

export default NotFoundView;