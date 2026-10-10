import Link from "next/link";

const AuthShell = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) => (
  <div className="mx-auto w-full max-w-md py-4 sm:py-8">
    <div className="text-center">
      <h1 className="text-3xl font-extrabold">{title}</h1>
      <p className="text-muted mt-2 text-sm">{subtitle}</p>
    </div>

    <div className="border-line bg-base-100 mt-6 rounded-2xl border p-5 sm:p-6">
      {children}
    </div>

    <p className="mt-6 text-center">
      <Link href="/" className="text-muted hover:text-primary text-sm">
        ← হোম পেজে ফিরে যান
      </Link>
    </p>
  </div>
);

export default AuthShell;