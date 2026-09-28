import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import PortfolioSection from "@/components/PortfolioSection";

type Project = {
  id: string;
  title: string;
  description: string | null;
  categories: { name: string } | null;
  project_media: { url: string; media_type: string }[];
};

async function getProjects() {
  const { data } = await supabase
    .from("projects")
    .select("id, title, description, categories(name), project_media(url, media_type)")
    .order("created_at", { ascending: false });
  return (data as unknown as Project[]) || [];
}

export const revalidate = 0;

// Paste your Asset Oracle website link between the quotes to show the button
const ASSET_ORACLE_URL = "https://assetoracleapp.xyz";
const services = [
  { name: "Content Editing", desc: "Turning raw ideas into clear, engaging content." },
  { name: "Media Hosting", desc: "Hosting AMAs, X Spaces and conversations for digital communities." },
  { name: "Web3 & Crypto Design", desc: "Visuals for protocols, communities, campaigns and crypto brands." },
  { name: "Social Media Design", desc: "Scroll-stopping graphics designed for digital platforms." },
  { name: "Branding & Identity", desc: "Building visual identities that make brands recognizable." },
  { name: "Motion Graphics", desc: "Short-form animations and visual content for digital campaigns." },
];

export default async function Home() {
  const projects = await getProjects();

  return (
    <main id="top" className="min-h-screen bg-mainbg text-textprimary">
      <Navbar />

      {/* HERO */}
      <section className="px-6 pt-16 pb-20 md:pt-28 md:pb-28">
        <div className="max-w-6xl mx-auto">
          <h1 className="fade-up font-bold tracking-tight leading-[0.95] text-[17vw] md:text-9xl">
            Dreazy
            <br />
            Empire
          </h1>
          <p className="fade-up-2 mt-6 text-2xl md:text-4xl font-semibold text-accent">
            Content. Media. Design.
          </p>
          <p className="fade-up-3 mt-5 max-w-lg text-textsecondary text-lg leading-relaxed">
            I create content, design visual experiences and host conversations for digital brands, Web3 projects and online communities.
          </p>
          <div className="fade-up-3 flex flex-wrap gap-3 mt-8">
            <a
              href="#work"
              className="px-6 py-3.5 bg-accent text-mainbg font-semibold rounded-full hover:bg-highlight transition"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-6 py-3.5 border border-borderc rounded-full hover:border-accent hover:text-accent transition"
            >
              Start a Project
            </a>
          </div>
        </div>
      </section>

      {/* SELECTED WORK + FILTERS */}
      <PortfolioSection projects={projects} />

      {/* SERVICES */}
      <section id="services" className="px-6 py-20 md:py-28 border-t border-borderc">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">What I Do</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
            {services.map((s) => (
              <div
                key={s.name}
                className="bg-card border border-borderc rounded-xl p-6 hover:border-accent transition"
              >
                <h3 className="font-semibold text-lg">{s.name}</h3>
                <p className="text-textsecondary text-sm mt-2 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-6 py-20 md:py-28 bg-secondarybg">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16 items-start">
          <img
            src="https://res.cloudinary.com/aobufb36/image/upload/v1790401456/file_00000000827881f496906b0227b2a77f.png"
            alt="Dreazy Empire"
            className="w-full max-w-xs md:w-72 rounded-xl object-cover border border-borderc"
          />
          <div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">About Me</h2>
            <div className="mt-6 space-y-4 text-textsecondary leading-relaxed max-w-xl">
              <p>
                I'm a Content Editor, Media Host and Graphic Designer working across media, design, technology and Web3.
              </p>
              <p>
                I create content, design visual experiences and host conversations that help brands and projects communicate clearly with their audiences.
              </p>
              <p>
                I'm passionate about creativity, emerging technology and building ideas with real-world impact.
              </p>
              <p>
                I'm also the founder of Asset Oracle, a project exploring real-world information, decentralized verification and on-chain intelligence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BUILDING ASSET ORACLE */}
      <section className="px-6 py-16 md:py-20">
        <div className="max-w-5xl mx-auto border border-borderc rounded-2xl p-8 md:p-12 bg-card">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Building Asset Oracle</h2>
          <p className="text-textsecondary mt-3 max-w-lg leading-relaxed">
            Exploring the intersection of real-world information, decentralized verification and on-chain intelligence.
          </p>
          {ASSET_ORACLE_URL && (
            <a
              href={ASSET_ORACLE_URL}
              target="_blank"
              className="inline-block mt-6 text-accent font-semibold hover:text-highlight transition"
            >
              Explore Asset Oracle →
            </a>
          )}
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contact" className="px-6 py-20 md:py-28 border-t border-borderc">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight max-w-2xl">
            Let's create something that connects.
          </h2>
          <p className="text-textsecondary mt-6 max-w-md text-lg">
            Have a project, campaign or idea you want to bring to life? Let's work.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href="mailto:dreazyempire@gmail.com"
              className="px-6 py-3.5 bg-accent text-mainbg font-semibold rounded-full hover:bg-highlight transition"
            >
              Email
            </a>
            <a
              href="https://x.com/dreazyempire"
              target="_blank"
              className="px-6 py-3.5 border border-borderc rounded-full hover:border-accent hover:text-accent transition"
            >
              X / Twitter
            </a>
            <a
              href="https://t.me/dreazyempire"
              target="_blank"
              className="px-6 py-3.5 border border-borderc rounded-full hover:border-accent hover:text-accent transition"
            >
              Telegram
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-10 border-t border-borderc">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-textsecondary">
          <p className="font-semibold text-textprimary">Dreazy Empire</p>
          <div className="flex gap-5">
            <a href="mailto:dreazyempire@gmail.com" className="hover:text-accent transition">Email</a>
            <a href="https://x.com/dreazyempire" target="_blank" className="hover:text-accent transition">X</a>
            <a href="https://t.me/dreazyempire" target="_blank" className="hover:text-accent transition">Telegram</a>
          </div>
          <p>© 2026 Dreazy Empire. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
