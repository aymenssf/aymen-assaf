"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { RepoLink } from "@/components/ui/RepoLink";
import type { SchoolProject } from "@/content/school";
import { pick, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";

export function SchoolBadge({ project, locale }: { project: SchoolProject; locale: Locale }) {
  const t = useTranslations("projects");
  const validated = project.status === "validated";
  const [activeMediaId, setActiveMediaId] = useState(project.media[0]?.id ?? "gameplay");

  const activeMedia = project.media.find((m) => m.id === activeMediaId) ?? project.media[0];

  return (
    <div className="border border-line bg-panel/30 p-6 md:p-8 lg:p-10">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,6fr)] lg:items-start">
        {/* Left Column: Technical Overview */}
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <span className="label-mono text-2xs text-faint">{project.code}</span>
            <span
              className={cn(
                "label-mono inline-flex items-center gap-2 text-2xs",
                validated ? "text-accent" : "text-dim",
              )}
            >
              <span
                aria-hidden
                className={cn("inline-block size-1.5 rounded-full", validated ? "bg-accent" : "bg-dim")}
              />
              {validated ? t("statusValidated") : t("statusWip")}
            </span>
          </div>

          <h3 className="mt-5 text-md font-medium text-ink md:text-lg">
            {pick(project.title, locale)}
          </h3>

          <ul className="measure mt-6 space-y-3.5">
            {project.points.map((point, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-dim">
                <span aria-hidden className="mt-0.5 select-none text-accent">
                  ▸
                </span>
                <span>{pick(point, locale)}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-line/60 pt-6">
            <p className="label-mono text-2xs text-faint">
              stack :: {project.stack.join(" · ")}
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <RepoLink url={project.githubUrl} />
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label-mono text-2xs text-faint underline decoration-line underline-offset-4 transition-colors hover:text-accent hover:decoration-accent"
            >
              github.com/aymenssf/ft_transcendence
            </a>
          </div>
        </div>

        {/* Right Column: Media Showcase (GIF + Photos) */}
        <div className="flex flex-col gap-3">
          {/* Media Switcher Tabs */}
          {project.media.length > 1 && (
            <div className="flex flex-wrap gap-1.5 border-b border-line pb-2.5">
              {project.media.map((media) => {
                const isActive = media.id === activeMedia.id;
                return (
                  <button
                    key={media.id}
                    type="button"
                    onClick={() => setActiveMediaId(media.id)}
                    className={cn(
                      "label-mono flex items-center gap-1.5 px-3 py-1.5 text-2xs transition-colors",
                      isActive
                        ? "border border-accent/40 bg-accent/10 text-accent font-medium"
                        : "border border-transparent text-dim hover:border-line hover:text-ink",
                    )}
                  >
                    {media.type === "gif" && (
                      <span
                        aria-hidden
                        className="inline-block size-1.5 rounded-full bg-accent animate-pulse"
                      />
                    )}
                    {pick(media.label, locale)}
                  </button>
                );
              })}
            </div>
          )}

          {/* Active Visual Container */}
          <div className="group relative aspect-[16/10] w-full overflow-hidden border border-line bg-black/40">
            {activeMedia && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                title={`${pick(project.title, locale)} — GitHub`}
                className="block size-full cursor-pointer"
              >
                {activeMedia.type === "gif" ? (
                  <Image
                    src={activeMedia.src}
                    alt={pick(activeMedia.caption, locale)}
                    fill
                    unoptimized
                    priority
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                ) : (
                  <Image
                    src={activeMedia.src}
                    alt={pick(activeMedia.caption, locale)}
                    fill
                    quality={85}
                    sizes="(max-width: 1024px) 100vw, 600px"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                  />
                )}

                {/* Badge Overlay for GIF */}
                {activeMedia.type === "gif" && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 border border-black/60 bg-black/80 px-2.5 py-1 backdrop-blur-sm">
                    <span className="size-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="label-mono text-3xs font-semibold uppercase tracking-wider text-accent">
                      Live GIF
                    </span>
                  </div>
                )}

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </a>
            )}
          </div>

          {/* Caption & GitHub Direct Link */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <p className="font-mono text-2xs text-dim">
              {activeMedia ? pick(activeMedia.caption, locale) : ""}
            </p>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label-mono text-2xs text-accent/80 transition-colors hover:text-accent"
            >
              repo ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
