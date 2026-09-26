import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
  categories: { name: string } | null;
  project_media: { url: string; media_type: string }[];
};

async function getProjects() {
  const { data } = await supabase
    .from("projects")
    .select("id, title, categories(name), project_media(url, media_type)")
    .order("created_at", { ascending: false });
  return (data as unknown as Project[]) || [];
}

export const revalidate = 0;

export default async function Home() {
  const projects = await getProjects();

  return (
    <main className="min-h-screen bg-mainbg text-textprimary">
      {/* NAVIGATION */}
      <nav className="flex items-center justify-between px-6 py-5 border-b border-borderc">
        <span className="text-xl font-bold tracking-wide">
          DREAZY <span className="text-accent">EMPIRE</span>
        </span>
        <div className="hidden md:flex gap-6 text-sm text-textsecondary">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="text-center px-6 py-24">
        <h1 className="text-4xl md:text-6xl font-bold">
          Dreazy <span className="text-accent">Empire</span>
        </h1>
        <p className="mt-4 text-lg text-textsecondary">
          Graphic Designer • Visual Content Creator
        </p>
        <p className="mt-6 max-w-xl mx-auto text-textsecondary">
          I create visual content for Web3, digital brands, media platforms and online communities.
        </p>
        <a
          href="#work"
          className="inline-block mt-8 px-6 py-3 rounded-full bg-accent text-mainbg font-semibold hover:bg-highlight transition"
        >
          View My Work
        </a>
      </section>

      {/* CATEGORIES */}
      <section id="work" className="px-6 py-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Portfolio Categories</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {["All Work","Web3 & Crypto","Social Media Designs","3D Designs","Branding","News & Editorial","Posters & Campaigns","Motion Graphics","Video"].map((cat) => (
            <span key={cat} className="px-4 py-2 rounded-full border border-borderc text-sm text-textsecondary hover:border-accent hover:text-accent transition cursor-pointer">
              {cat}
            </span>
          ))}
        </div>

        {/* REAL PROJECT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
          {projects.length === 0 && (
            <p className="text-textsecondary col-span-3 text-center">
              Portfolio launching soon — check back shortly.
            </p>
          )}
          {projects.map((p) => {
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

      {/* ABOUT */}
      <section id="about" className="px-6 py-20 bg-secondarybg">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <img
            src="https://res.cloudinary.com/aobufb36/image/upload/v1790401456/file_00000000827881f496906b0227b2a77f.png"
            alt="Dreazy Empire"
            className="w-48 h-48 rounded-full object-cover border-2 border-accent"
          />
          <div>
            <h2 className="text-2xl font-bold mb-4">About</h2>
            <p className="text-textsecondary leading-relaxed">
              I'm a graphic designer, content editor and media creator with a strong focus on Web3, crypto, digital media and online communities. I design visuals that help brands and creators communicate clearly and stand out.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-6 py-20">
        <h2 className="text-2xl font-bold mb-10 text-center">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            "Web3 & Crypto Visuals",
            "Social Media Design",
            "Branding & Identity",
            "Motion Graphics",
            "Posters & Campaigns",
            "News & Editorial Design",
          ].map((s) => (
            <div key={s} className="bg-card border border-borderc rounded-xl p-6 text-center hover:border-accent transition">
              {s}
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="px-6 py-20 bg-secondarybg text-center">
        <h2 className="text-2xl font-bold mb-4">Let's Work Together</h2>
        <p className="text-textsecondary mb-6">
          Interested in working with me? Reach out below.
        </p>
        <a
          href="mailto:dreazyempire@gmail.com"
          className="inline-block px-6 py-3 rounded-full bg-accent text-mainbg font-semibold hover:bg-highlight transition"
        >
          Contact Me
        </a>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-8 text-center text-textsecondary text-sm border-t border-borderc">
        © {new Date().getFullYear()} Dreazy Empire. All rights reserved.
      </footer>
    </main>
  );
}
