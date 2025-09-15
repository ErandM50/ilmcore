"use client";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  align?: "center" | "left";
  className?: string;
};

export default function SectionHeader({ eyebrow, title, align = "center", className = "" }: SectionHeaderProps) {
  const containerAlign = align === "center" ? "text-center" : "text-left";
  const ruleAlign = align === "center" ? "justify-center" : "justify-start";

  return (
    <div className={`${containerAlign} ${className}`}>
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.3em] text-white/40 mb-3">{eyebrow}</p>
      ) : null}
      <h2 className="text-5xl font-extralight text-white mb-2">{title}</h2>
      <div className={`mt-4 flex ${ruleAlign}`}>
        <div className="relative h-px w-28">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 shadow-[0_0_14px_rgba(255,255,255,0.5)]" aria-hidden></div>
        </div>
      </div>
    </div>
  );
} 