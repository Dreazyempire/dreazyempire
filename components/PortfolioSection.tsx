"use client";

import { useState } from "react";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
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

export default function PortfolioSection({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState("All Work");

  const filtered =
    active === "All Work"
      ? projects
      : projects.filter((p) => p.categories?.name === active);

  return (
    <section id="work" className="px-6 py-16">
      <h2 className="text-2xl font-bold mb-6 text-center">Portfolio Categories</h2>
      <div className="flex flex-wrap justify-center gap-3">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-4 py-2 rounded-full border text-sm transition ${
              active === cat
                ? "border-accent text-accent bg-secondarybg"
                : "border-borderc text-textsecondary hover:border-accent hover:text-accent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
        {filtered.length === 0 && (
          <p className="text-textsecondary col-span-3 text-center">
            No projects in this category yet.
          </p>
        )}
        {filtered.map((p) => {
          const cover = p.project_media?.[0];
          return (
            <Link
              key={p.id}
              href={`/project/${p.id}`}
              className="bg-card border border-borderc rounded-xl aspect-square overflow-hidden relative group"
            >
              {cover ? (
                cover.media_type === "image" ? (
                  <img src={cover.url} alt={p.title} className="w-full h-full object-cover group-hover:opacity-80 transition" />
                ) : (
                  <video src={cover.url} className="w-full h-full object-cover group-hover:opacity-80 transition" muted />
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center text-textsecondary">No media</div>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-mainbg/80 px-3 py-2">
                <p className="text-sm font-semibold truncate">{p.title}</p>
                <p className="text-xs text-textsecondary truncate">{p.categories?.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
