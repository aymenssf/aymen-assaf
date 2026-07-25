import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

function Tick({ className }: { className: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute size-[7px] border-accent transition-all duration-300 ease-out-expo",
        "group-hover:size-[11px] group-focus-visible:size-[11px]",
        className,
      )}
    />
  );
}

/**
 * Bouton signature « coins crantés » : cadre fin + 4 ticks accent
 * qui s'étendent au hover. Rendu <a> si href, sinon <button>.
 */
export function Button({
  href,
  children,
  meta,
  className,
  download,
}: {
  href?: string;
  children: ReactNode;
  /** Suffixe mono affiché à droite, ex: "↗" ou "$ open" */
  meta?: string;
  className?: string;
  download?: boolean;
}) {
  const isExternal = href?.startsWith("http");
  const shared = cn(
    "group relative inline-flex items-center gap-3 border border-line bg-transparent",
    "px-6 py-3.5 label-mono text-ink transition-colors duration-300",
    "hover:border-accent/50 hover:text-accent focus-visible:border-accent/50",
    className,
  );
  const inner = (
    <>
      <Tick className="top-[-1px] left-[-1px] border-t border-l" />
      <Tick className="top-[-1px] right-[-1px] border-t border-r" />
      <Tick className="bottom-[-1px] left-[-1px] border-b border-l" />
      <Tick className="bottom-[-1px] right-[-1px] border-b border-r" />
      <span>{children}</span>
      {meta ? (
        <span aria-hidden className="text-accent">
          {meta}
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        data-cursor="link"
        download={download}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={shared}
      >
        {inner}
      </a>
    );
  }
  return (
    <button type="button" data-cursor="link" className={shared}>
      {inner}
    </button>
  );
}
