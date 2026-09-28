"use client";

import { useState } from "react";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
  description: string | null;
  categories: { name: string } | null;
  project_media: { url: string; media_type: string }[];
};

const CATEGORIES = [
  "All Work",
  "Web3 & Crypto",
  "Social Media Designs",
  "3D Designs",
  "Branding",
  "News & Editorial",
  "Posters & Campaigns",
  "Motion Graphics",
  "Video",
];

// Hides projects that still have a placeholder-style name like "Logo 4" or "Untitled"
const PLACEHOLDER = /^(logo|project|untitled|test|image|video|design)\s*\d*$/i;

export default function PortfolioSection({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("All Work");

  const visible = projects.filter((p) => !PLACEHOLDER.test(p.title.trim()));
  const filtered =
    active === "All Work"
      ? visible
      : visible.filter((p) => p.categories?.name === active);

  return (
    <section id="work" className="px-6 py-20 md:py-28 border-t border-borderc">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Selected Work</h2>
        <p className="text-textsecondary mt-3 max-w-md">
          A selection of projects across design, Web3, media and digital content.
        </p>

        <div className="no-scrollbar flex gap-2 overflow-x-auto -mx-6 px-6 mt-8 md:flex-wrap md:mx-0 md:px-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`shrink-0 px-4 py-2.5 rounded-full border text-sm transition ${
                active === cat
                  ? "bg-accent text-mainbg border-accent font-semibold"
                  : "border-borderc text-textsecondary hover:border-accent hover:text-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 mt-10">
          {filtered.length === 0 && (
            <p className="text-textsecondary sm:col-span-2 lg:col-span-3">
              No projects in this category yet.
            </p>
          )}
          {filtered.map((p) => {
            const cover = p.project_media?.[0];
            return (
              <Link key={p.id} href={`/project/${p.id}`} className="group block">
                <div className="relative aspect-square overflow-hidden rounded-xl bg-card border border-borderc">
                  {cover ? (
                    cover.media_type === "image" ? (
                      <img
                        src={cover.url}
                        alt={p.title}
                        loading="lazy"
                        className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <>
                        <video
                          src={cover.url}
                          muted
                          playsInline
                          preload="metadata"
                          className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <span className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-mainbg/80 flex items-center justify-center">
                          <svg viewBox="0 0 24 24" className="w-4 h-4 fill-accent">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </span>
                      </>
                    )
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-textsecondary text-sm">
                      Media coming soon
                    </div>
                  )}
                </div>
                <h3 className="mt-4 font-semibold text-lg group-hover:text-accent transition">
                  {p.title}
                </h3>
                <p className="text-sm text-textsecondary">{p.categories?.name}</p>
                {p.description && (
                  <p className="text-sm text-textsecondary mt-1 line-clamp-1">{p.description}</p>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
