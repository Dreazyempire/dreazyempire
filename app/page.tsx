import { supabase } from "@/lib/supabaseClient";
import PortfolioSection from "@/components/PortfolioSection";

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
        <a href="#contact" className="text-sm border border-borderc rounded-full px-4 py-2 hover:border-accent hover:text-accent transition">
          Let's work
        </a>
      </nav>

      {/* HERO */}
      <section className="text-center px-6 py-20 relative overflow-hidden">
        <p className="text-accent text-xs tracking-widest font-semibold mb-4">
          WEB3 · GRAPHIC DESIGN · MEDIA · CRYPTO
        </p>
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          I turn ideas into <br />
          <span className="text-accent">visual stories.</span>
        </h1>
        <p className="mt-6 max-w-xl mx-auto text-textsecondary">
          I'm Dreazy — a graphic designer, content editor and media creator focused on Web3, digital brands, media platforms and online communities.
        </p>
        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          <a
            href="#work"
            className="px-6 py-3 rounded-full bg-accent text-mainbg font-semibold hover:bg-highlight transition"
          >
            Explore my work →
          </a>
          <a
            href="#contact"
            className="px-6 py-3 rounded-full border border-borderc hover:border-accent hover:text-accent transition"
          >
            Start a project
          </a>
        </div>

        {/* ANIMATED CIRCLE GRAPHIC */}
        <div className="relative w-64 h-64 mx-auto mt-16">
          <div className="absolute inset-0 rounded-full border border-accent/30 animate-pulse" />
          <div className="absolute inset-6 rounded-full border border-accent/50" />
          <div className="absolute inset-16 rounded-full bg-accent/20 blur-xl" />
          <div className="absolute inset-20 rounded-full bg-accent flex items-center justify-center text-mainbg font-bold text-lg shadow-[0_0_40px_theme(colors.accent)]">
            Dreazy
          </div>
        </div>
      </section>

      {/* PORTFOLIO (filterable) */}
      <PortfolioSection projects={projects} />

      {/* ABOUT */}
      <section id="about" className="px-6 py-20 bg-secondarybg">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
          <img
            src="https://res.cloudinary.com/aobufb36/image/upload/v1790401456/file_00000000827881f496906b0227b2a77f.png"
            alt="Dreazy Empire"
            className="w-48 h-48 rounded-full object-cover border-2 border-accent flex-shrink-0"
          />
          <div>
            <h2 className="text-2xl font-bold mb-4">About Me</h2>
            <p className="text-textsecondary leading-relaxed mb-4">
              I'm a Content Editor, Media Host, and Graphic Designer working at the intersection of media, design, technology, and Web3.
            </p>
            <p className="text-textsecondary leading-relaxed mb-4">
              I create content, host conversations, and design visual experiences that help ideas, brands, and projects communicate clearly and connect with their audience.
            </p>
            <p className="text-textsecondary leading-relaxed mb-4">
              I'm passionate about storytelling, creativity, emerging technology, and building things that have real-world impact.
            </p>
            <p className="text-textsecondary leading-relaxed">
              Founder of Asset Oracle, a project exploring the intersection of real-world information, decentralized verification, and on-chain intelligence.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-6 py-20">
        <h2 className="text-2xl font-bold mb-10 text-center">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {[
            { title: "WEB3 & CRYPTO", desc: "Brand storytelling for on-chain projects" },
            { title: "SOCIAL MEDIA", desc: "Scroll-stopping content design" },
            { title: "BRANDING", desc: "Identity systems that stand out" },
            { title: "MOTION", desc: "Cinematic motion graphics" },
            { title: "POSTERS", desc: "Campaign & event visuals" },
            { title: "EDITORIAL", desc: "News & editorial layouts" },
          ].map((s) => (
            <div key={s.title} className="border border-borderc rounded-xl p-6 hover:border-accent transition text-left">
              <p className="text-accent font-bold text-sm tracking-wide">{s.title}</p>
              <p className="text-textsecondary text-sm mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CLOSING CTA */}
      <section id="contact" className="px-6 py-24 text-center">
        <p className="text-accent text-xs tracking-widest font-semibold mb-4">HAVE AN IDEA?</p>
        <h2 className="text-3xl md:text-5xl font-bold leading-tight">
          Let's make something <br />
          <span className="text-accent">people remember.</span>
        </h2>
        <p className="text-textsecondary mt-6 max-w-lg mx-auto">
          Have a project, campaign or story you want brought to life? Let's create something meaningful.
        </p>

        <div className="flex justify-center gap-4 mt-8 flex-wrap">
          <a
            href="mailto:dreazyempire@gmail.com"
            className="px-6 py-3 rounded-full bg-accent text-mainbg font-semibold hover:bg-highlight transition"
          >
            Email Me
          </a>
          <a
            href="https://x.com/dreazyempire"
            target="_blank"
            className="px-6 py-3 rounded-full border border-borderc hover:border-accent hover:text-accent transition"
          >
            X / Twitter
          </a>
          <a
            href="https://t.me/dreazyempire"
            target="_blank"
            className="px-6 py-3 rounded-full border border-borderc hover:border-accent hover:text-accent transition"
          >
            Telegram
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-8 text-center text-textsecondary text-sm border-t border-borderc">
        © {new Date().getFullYear()} Dreazy Empire. All rights reserved.
      </footer>
    </main>
  );
}
