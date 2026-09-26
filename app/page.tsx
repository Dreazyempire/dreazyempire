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

        <div className="flex justify-center gap-6 mt-8">
          <a
            href="https://x.com/dreazyempire"
            target="_blank"
            aria-label="X (Twitter)"
            className="w-12 h-12 flex items-center justify-center rounded-full border border-borderc hover:border-accent transition"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-textprimary">
              <path d="M18.244 2H21.5l-7.51 8.59L23 22h-6.828l-5.35-6.99L4.7 22H1.44l8.03-9.19L1 2h6.914l4.84 6.4L18.244 2Zm-1.196 18h1.833L7.03 3.9H5.06L17.048 20Z"/>
            </svg>
          </a>
          <a
            href="https://t.me/dreazyempire"
            target="_blank"
            aria-label="Telegram"
            className="w-12 h-12 flex items-center justify-center rounded-full border border-borderc hover:border-accent transition"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-textprimary">
              <path d="M21.9 3.6 2.4 11.1c-.9.35-.9 1.66.01 1.99l4.7 1.6 1.83 5.65c.24.75 1.19.96 1.75.4l2.63-2.55 4.97 3.65c.7.5 1.7.13 1.9-.7l3.28-15.1c.24-1.1-.83-2.03-1.86-1.44ZM8.9 14.1l9.3-6.9-7.6 8.2-.3 3.3-1.4-4.6Z"/>
            </svg>
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
