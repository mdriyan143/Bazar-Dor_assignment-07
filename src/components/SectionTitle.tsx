const SectionTitle = ({
  title,
  subtitle,
  tone,
  id,
}: {
  title: string;
  subtitle?: string;
  tone?: "up" | "down";
  id?: string;
}) => (
  <div id={id} className="mb-4 scroll-mt-4">
    <h2 className="flex items-center gap-2 text-xl font-bold">
      {tone && (
        <span
          aria-hidden
          className={`text-sm ${tone === "up" ? "text-up" : "text-down"}`}>
          {tone === "up" ? "▲" : "▼"}
        </span>
      )}
      {title}
    </h2>
    {subtitle && <p className="text-muted mt-1 text-sm">{subtitle}</p>}
  </div>
);

export default SectionTitle;